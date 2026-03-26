import { Card, CardContent } from './ui/card';
import * as motion from 'framer-motion/client';
import { formatNumber, formatPercentage } from '@/lib/utils';

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
      <div className="p-4 border border-border bg-card rounded-md">
        <p className="text-sm text-muted-foreground">Data not available</p>
      </div>
    );
  }

  const metrics = [
    { label: '52W High', value: formatNumber(data.high_52w), color: 'text-accent' },
    { label: '52W Low', value: formatNumber(data.low_52w), color: 'text-destructive' },
    { label: 'EPS', value: formatNumber(data.eps), color: 'text-foreground' },
    { label: 'Dividend/Sh', value: formatNumber(data.dps), color: 'text-foreground' },
    { label: 'P/E Ratio', value: formatNumber(data.pe_ratio), color: 'text-foreground' },
    { label: 'Yield', value: formatPercentage(data.dividend_yield), color: 'text-accent' },
    { label: 'NAV', value: formatNumber(data.nav), color: 'text-foreground' },
    { label: 'P/NAV', value: formatNumber(data.price_to_nav), color: 'text-foreground' },
  ];

  return (
    <div className="space-y-2">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.03 * index }}
          className="flex items-center justify-between p-3 border border-border bg-card/50 rounded hover:bg-muted/30 transition-colors"
        >
          <span className="text-sm font-medium text-muted-foreground">
            {metric.label}
          </span>
          <span className={`text-sm font-semibold ${metric.color}`}>
            {metric.value ?? '—'}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
