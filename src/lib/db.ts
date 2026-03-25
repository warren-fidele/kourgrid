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

  // Convert Decimal and BigInt to numbers for serialization
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
