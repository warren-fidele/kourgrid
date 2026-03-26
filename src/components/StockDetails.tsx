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
      <div className="p-4 border border-white/5 bg-white/[0.02]">
        <p className="text-[10px] font-mono text-muted-foreground italic uppercase">Data_Not_Found</p>
      </div>
    );
  }

  const metrics = [
    { label: '52W_High', value: formatNumber(data.high_52w), color: 'text-accent' },
    { label: '52W_Low', value: formatNumber(data.low_52w), color: 'text-destructive' },
    { label: 'Earnings_PS', value: formatNumber(data.eps), color: 'text-primary' },
    { label: 'Dividend_PS', value: formatNumber(data.dps), color: 'text-primary' },
    { label: 'PE_Ratio', value: formatNumber(data.pe_ratio), color: 'text-primary' },
    { label: 'Yield_Perc', value: formatPercentage(data.dividend_yield), color: 'text-primary' },
    { label: 'Net_Asset_Val', value: formatNumber(data.nav), color: 'text-primary' },
    { label: 'Price_To_NAV', value: formatNumber(data.price_to_nav), color: 'text-primary' },
  ];

  return (
    <div className="space-y-1">
      {metrics.map((metric, index) => (
        <motion.div 
          key={metric.label} 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05 * index }}
          className="flex items-center justify-between p-3 border border-white/5 bg-white/[0.02] group hover:bg-white/[0.05] transition-colors"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
            {metric.label}
          </span>
          <span className={`text-sm font-mono font-black tracking-tighter ${metric.color}`}>
            {metric.value ?? '—'}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
