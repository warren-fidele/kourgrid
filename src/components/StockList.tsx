'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Search, FilterX, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface Stock {
  id: number;
  name: string | null;
  ticker: string | null;
  market_id: number | null;
  currencies_id: number | null;
  markets: { id: number; name: string } | null;
  currencies: { id: number; code: string } | null;
}

interface Market {
  id: number;
  name: string;
}

interface Currency {
  id: number;
  code: string;
}

interface StockListProps {
  initialStocks: Stock[];
  markets: Market[];
  currencies: Currency[];
}

export default function StockList({ initialStocks, markets, currencies }: StockListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarket, setSelectedMarket] = useState<string>('all');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('all');

  const filteredStocks = useMemo(() => {
    return initialStocks.filter((stock) => {
      const matchesSearch = 
        (stock.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        (stock.ticker?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      
      const matchesMarket = 
        selectedMarket === 'all' || stock.market_id?.toString() === selectedMarket;
      
      const matchesCurrency = 
        selectedCurrency === 'all' || stock.currencies_id?.toString() === selectedCurrency;

      return matchesSearch && matchesMarket && matchesCurrency;
    });
  }, [searchTerm, selectedMarket, selectedCurrency, initialStocks]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedMarket('all');
    setSelectedCurrency('all');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-none shadow-lg bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold tracking-tight text-muted-foreground uppercase">Search Assets</label>
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    placeholder="Search by name or ticker..."
                    className="pl-10 h-11 bg-background/50 border-muted-foreground/20 focus-visible:ring-primary transition-all shadow-inner"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold tracking-tight text-muted-foreground uppercase">Market</label>
                <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                  <SelectTrigger className="h-11 bg-background/50 border-muted-foreground/20 focus:ring-primary">
                    <SelectValue placeholder="All Markets">
                      {selectedMarket === 'all' ? 'All Markets' : markets.find(m => m.id.toString() === selectedMarket)?.name}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Markets</SelectItem>
                    {markets.map((market) => (
                      <SelectItem key={market.id} value={market.id.toString()}>
                        {market.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold tracking-tight text-muted-foreground uppercase">Currency</label>
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger className="h-11 bg-background/50 border-muted-foreground/20 focus:ring-primary">
                    <SelectValue placeholder="All Currencies">
                      {selectedCurrency === 'all' ? 'All Currencies' : currencies.find(c => c.id.toString() === selectedCurrency)?.code}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Currencies</SelectItem>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.id} value={currency.id.toString()}>
                        {currency.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <AnimatePresence>
              {(searchTerm || selectedMarket !== 'all' || selectedCurrency !== 'all') && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 flex justify-end"
                >
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters} 
                    className="gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                  >
                    <FilterX className="h-4 w-4" /> Clear All Filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      <Card className="border-none shadow-xl bg-card/30 backdrop-blur-md overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="hover:bg-transparent border-muted">
                  <TableHead className="w-[120px] font-bold text-foreground">Ticker</TableHead>
                  <TableHead className="font-bold text-foreground">Company Name</TableHead>
                  <TableHead className="font-bold text-foreground">Market</TableHead>
                  <TableHead className="font-bold text-foreground">Currency</TableHead>
                  <TableHead className="text-right font-bold text-foreground pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <motion.tbody 
                variants={container}
                initial="hidden"
                animate="show"
                className="divide-y divide-muted/30"
              >
                {filteredStocks.length > 0 ? (
                  filteredStocks.map((stock) => (
                    <motion.tr 
                      key={stock.id}
                      variants={item}
                      className="group hover:bg-muted/20 transition-colors"
                    >
                      <TableCell className="font-mono font-black text-primary py-4">
                        <div className="bg-primary/10 px-2 py-1 rounded inline-block">
                          {stock.ticker}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{stock.name}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-secondary/30 text-secondary-foreground">
                          {stock.markets?.name ?? 'N/A'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-muted-foreground">
                          {stock.currencies?.code ?? 'N/A'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          asChild
                          className="group/btn relative overflow-hidden"
                        >
                          <Link href={`/company/${stock.ticker}`} className="flex items-center gap-1 group-hover/btn:translate-x-1 transition-transform">
                            Details <ArrowRight className="h-4 w-4 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                          </Link>
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-48 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2 opacity-50">
                        <Search className="h-10 w-10 mb-2" />
                        <p className="text-lg font-semibold">No assets match your search</p>
                        <p className="text-sm">Try adjusting your filters or keyword</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </motion.tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
