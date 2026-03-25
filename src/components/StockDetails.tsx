import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface TradingData {
  high_52w: number | null;
  low_52w: number | null;
  eps: number | null;
  dps: number | null;
  nav: number | null;
  pe_ratio: number | null;
  dividend_yield: number | null;
  price_to_nav: number | null;
}

export default function StockDetails({ data }: { data: TradingData | null }) {
  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Fundamental Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No fundamental data available.</p>
        </CardContent>
      </Card>
    );
  }

  const metrics = [
    { label: '52W High', value: data.high_52w?.toFixed(2) },
    { label: '52W Low', value: data.low_52w?.toFixed(2) },
    { label: 'EPS', value: data.eps?.toFixed(2) },
    { label: 'DPS', value: data.dps?.toFixed(2) },
    { label: 'P/E Ratio', value: data.pe_ratio?.toFixed(2) },
    { label: 'Dividend Yield', value: data.dividend_yield ? `${(data.dividend_yield * 100).toFixed(2)}%` : null },
    { label: 'NAV', value: data.nav?.toFixed(2) },
    { label: 'P/NAV', value: data.price_to_nav?.toFixed(2) },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fundamental Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </span>
              <span className="text-lg font-bold">
                {metric.value ?? 'N/A'}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
