import prisma from './prisma';

function handleDbError(error: unknown, operation: string): never {
  console.error(`Database error in ${operation}:`, error);
  throw new Error(`Failed to ${operation}. Please try again later.`);
}

export async function getStocks() {
  try {
    return await prisma.stocks.findMany({
      include: {
        markets: true,
        currencies: true,
      },
      orderBy: {
        ticker: 'asc',
      },
    });
  } catch (error) {
    handleDbError(error, 'fetch stocks');
  }
}

export async function getStockByTicker(ticker: string) {
  try {
    return await prisma.stocks.findFirst({
      where: {
        ticker: ticker,
      },
      include: {
        markets: true,
        currencies: true,
      },
    });
  } catch (error) {
    handleDbError(error, `fetch stock by ticker "${ticker}"`);
  }
}

export async function getHistoricalPrices(stockId: number) {
  try {
    const prices = await prisma.prices_history.findMany({
      where: {
        stock_id: stockId,
      },
      orderBy: {
        date: 'asc',
      },
    });

    return prices.map((p) => ({
      id: Number(p.id),
      date: p.date ? p.date.toISOString().split('T')[0] : '',
      price: p.price ? Number(p.price) : 0,
    }));
  } catch (error) {
    handleDbError(error, `fetch historical prices for stock ID ${stockId}`);
  }
}

export async function getChartData(stockId: number) {
  try {
    // Fetch all three data types in parallel
    const [prices, quotes, trading] = await Promise.all([
      prisma.prices_history.findMany({
        where: { stock_id: stockId },
        orderBy: { date: 'asc' },
      }),
      prisma.quotes_history.findMany({
        where: { stock_id: stockId },
        orderBy: { date: 'asc' },
      }),
      prisma.trading_data_history.findMany({
        where: { stock_id: stockId },
        orderBy: { date: 'asc' },
      }),
    ]);

    // Create maps for O(1) lookup
    const priceMap = new Map(prices.map(p => [p.date?.toISOString().split('T')[0] || '', p.price || 0]));
    const quoteMap = new Map(quotes.map(q => [q.date?.toISOString().split('T')[0] || '', q]));
    const tradingMap = new Map(trading.map(t => [t.date?.toISOString().split('T')[0] || '', t]));

    // Get all unique dates from any source
    const allDates = new Set<string>();
    prices.forEach(p => p.date && allDates.add(p.date.toISOString().split('T')[0]));
    quotes.forEach(q => q.date && allDates.add(q.date.toISOString().split('T')[0]));
    trading.forEach(t => t.date && allDates.add(t.date.toISOString().split('T')[0]));

    // Build merged data array sorted by date
    const chartData = Array.from(allDates)
      .sort()
      .map(date => ({
        date,
        price: Number(priceMap.get(date) ?? 0),
        volume: Number(quoteMap.get(date)?.volume ?? 0),
        vwap: Number(quoteMap.get(date)?.closing_vwap ?? null),
        high_52w: Number(tradingMap.get(date)?.high_52w ?? null),
        low_52w: Number(tradingMap.get(date)?.low_52w ?? null),
        pe_ratio: Number(tradingMap.get(date)?.pe_ratio ?? null),
        eps: Number(tradingMap.get(date)?.eps ?? null),
        dividend_yield: Number(tradingMap.get(date)?.dividend_yield ?? null),
      }));

    return chartData;
  } catch (error) {
    handleDbError(error, `fetch chart data for stock ID ${stockId}`);
  }
}

export async function getTradingData(stockId: number) {
  try {
    const data = await prisma.trading_data_history.findFirst({
      where: {
        stock_id: stockId,
      },
      orderBy: {
        date: 'desc',
      },
    });

    if (!data) return null;

    return {
      ...data,
      id: Number(data.id),
      high_52w: data.high_52w ? Number(data.high_52w) : null,
      low_52w: data.low_52w ? Number(data.low_52w) : null,
      eps: data.eps ? Number(data.eps) : null,
      dps: data.dps ? Number(data.dps) : null,
      nav: data.nav ? Number(data.nav) : null,
      pe_ratio: data.pe_ratio ? Number(data.pe_ratio) : null,
      dividend_yield: data.dividend_yield ? Number(data.dividend_yield) : null,
      price_to_nav: data.price_to_nav ? Number(data.price_to_nav) : null,
      date: data.date ? data.date.toISOString().split('T')[0] : null,
    };
  } catch (error) {
    handleDbError(error, `fetch trading data for stock ID ${stockId}`);
  }
}

export async function getTopGainers(limit = 5) {
  try {
    const gainers = await prisma.quotes_history.findMany({
      where: {
        price_change: { gt: 0 },
      },
      orderBy: [
        { date: 'desc' },
        { price_change: 'desc' },
      ],
      take: limit,
      include: {
        stocks: true,
      },
    });

    return gainers.map(g => ({
      ticker: g.stocks?.ticker,
      name: g.stocks?.name,
      change: Number(g.price_change),
      price: Number(g.closing_vwap),
    }));
  } catch (error) {
    handleDbError(error, 'fetch top gainers');
  }
}

export async function getTopLosers(limit = 5) {
  try {
    const losers = await prisma.quotes_history.findMany({
      where: {
        price_change: { lt: 0 },
      },
      orderBy: [
        { date: 'desc' },
        { price_change: 'asc' },
      ],
      take: limit,
      include: {
        stocks: true,
      },
    });

    return losers.map(l => ({
      ticker: l.stocks?.ticker,
      name: l.stocks?.name,
      change: Number(l.price_change),
      price: Number(l.closing_vwap),
    }));
  } catch (error) {
    handleDbError(error, 'fetch top losers');
  }
}

export async function getTopDividendStocks(limit = 5) {
  try {
    const dividends = await prisma.trading_data_history.findMany({
      where: {
        dividend_yield: { gt: 0 },
      },
      orderBy: [
        { date: 'desc' },
        { dividend_yield: 'desc' },
      ],
      take: limit,
      include: {
        stocks: true,
      },
    });

    return dividends.map(d => ({
      ticker: d.stocks?.ticker,
      name: d.stocks?.name,
      yield: Number(d.dividend_yield),
    }));
  } catch (error) {
    handleDbError(error, 'fetch top dividend stocks');
  }
}

export async function getMostActiveStocks(limit = 5) {
  try {
    const active = await prisma.quotes_history.findMany({
      where: {
        volume: { gt: 0 },
      },
      orderBy: [
        { date: 'desc' },
        { volume: 'desc' },
      ],
      take: limit,
      include: {
        stocks: true,
      },
    });

    return active.map(a => ({
      ticker: a.stocks?.ticker,
      name: a.stocks?.name,
      volume: Number(a.volume),
    }));
  } catch (error) {
    handleDbError(error, 'fetch most active stocks');
  }
}

export async function getHighestValueStocks(limit = 5) {
  try {
    const value = await prisma.quotes_history.findMany({
      where: {
        traded_value: { gt: 0 },
      },
      orderBy: [
        { date: 'desc' },
        { traded_value: 'desc' },
      ],
      take: limit,
      include: {
        stocks: true,
      },
    });

    return value.map(v => ({
      ticker: v.stocks?.ticker,
      name: v.stocks?.name,
      value: Number(v.traded_value),
    }));
  } catch (error) {
    handleDbError(error, 'fetch highest value stocks');
  }
}

export async function getBestPEStocks(limit = 5) {
  try {
    const pe = await prisma.trading_data_history.findMany({
      where: {
        pe_ratio: { gt: 0 },
      },
      orderBy: [
        { date: 'desc' },
        { pe_ratio: 'asc' },
      ],
      take: limit,
      include: {
        stocks: true,
      },
    });

    return pe.map(p => ({
      ticker: p.stocks?.ticker,
      name: p.stocks?.name,
      pe: Number(p.pe_ratio),
    }));
  } catch (error) {
    handleDbError(error, 'fetch best PE stocks');
  }
}

export async function getMarkets() {
  try {
    return await prisma.markets.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    handleDbError(error, 'fetch markets');
  }
}

export async function getCurrencies() {
  try {
    return await prisma.currencies.findMany({
      orderBy: { code: 'asc' },
    });
  } catch (error) {
    handleDbError(error, 'fetch currencies');
  }
}
