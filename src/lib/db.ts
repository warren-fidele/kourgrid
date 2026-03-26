import prisma from './prisma';

export async function getStocks() {
  return await prisma.stocks.findMany({
    include: {
      markets: true,
      currencies: true,
    },
    orderBy: {
      ticker: 'asc',
    },
  });
}

export async function getStockByTicker(ticker: string) {
  return await prisma.stocks.findFirst({
    where: {
      ticker: ticker,
    },
    include: {
      markets: true,
      currencies: true,
    },
  });
}

export async function getHistoricalPrices(stockId: number) {
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
}

export async function getTradingData(stockId: number) {
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
}

export async function getTopGainers(limit = 5) {
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
}

export async function getTopLosers(limit = 5) {
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
}

export async function getTopDividendStocks(limit = 5) {
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
}

export async function getMostActiveStocks(limit = 5) {
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
    volume: Number(a.volume),
  }));
}

export async function getHighestValueStocks(limit = 5) {
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
    value: Number(v.traded_value),
  }));
}

export async function getBestPEStocks(limit = 5) {
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
    pe: Number(p.pe_ratio),
  }));
}

export async function getMarkets() {
  return await prisma.markets.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function getCurrencies() {
  return await prisma.currencies.findMany({
    orderBy: { code: 'asc' },
  });
}
