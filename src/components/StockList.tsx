'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
import { Search, FilterX, ExternalLink } from 'lucide-react';
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

  return (
    <div className="flex flex-col h-full space-y-4 min-h-0">
      {/* High Density Toolbar */}
      <div className="flex flex-wrap items-center gap-4 bg-white/[0.02] border border-white/5 p-2">
        <div className="flex-grow max-w-sm relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            placeholder="Search Terminal..."
            className="pl-8 h-8 rounded-none border-white/10 bg-transparent text-[10px] font-mono uppercase tracking-widest focus:ring-1 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono text-muted-foreground uppercase font-bold">Market:</span>
          <Select value={selectedMarket} onValueChange={setSelectedMarket}>
            <SelectTrigger className="h-8 rounded-none border-white/10 bg-transparent text-[10px] font-mono uppercase w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none border-white/10 bg-background font-mono text-xs">
              <SelectItem value="all">All Markets</SelectItem>
              {markets.map((market) => (
                <SelectItem key={market.id} value={market.id.toString()}>
                  {market.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono text-muted-foreground uppercase font-bold">Cur:</span>
          <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
            <SelectTrigger className="h-8 rounded-none border-white/10 bg-transparent text-[10px] font-mono uppercase w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none border-white/10 bg-background font-mono text-xs">
              <SelectItem value="all">All</SelectItem>
              {currencies.map((currency) => (
                <SelectItem key={currency.id} value={currency.id.toString()}>
                  {currency.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(searchTerm || selectedMarket !== 'all' || selectedCurrency !== 'all') && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters} 
            className="h-8 text-[9px] font-mono uppercase tracking-tighter text-destructive hover:bg-destructive/10"
          >
            <FilterX className="h-3 w-3 mr-1" /> Clear
          </Button>
        )}
      </div>

      {/* High Density Table Area */}
      <div className="flex-grow border border-white/5 bg-white/[0.02] min-h-0 overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-auto scrollbar-hide">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10 border-b border-white/10">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground py-2">Symbol</TableHead>
                <TableHead className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground py-2">Entity_Name</TableHead>
                <TableHead className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground py-2">Market_Segment</TableHead>
                <TableHead className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground py-2 text-right">Access</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStocks.length > 0 ? (
                filteredStocks.map((stock) => (
                  <TableRow key={stock.id} className="group border-b border-white/5 hover:bg-primary/5 transition-colors">
                    <TableCell className="font-mono font-black text-primary text-xs py-3">{stock.ticker}</TableCell>
                    <TableCell className="font-medium text-xs">{stock.name}</TableCell>
                    <TableCell>
                      <span className="text-[10px] font-mono font-bold text-muted-foreground">
                        {stock.markets?.name ?? '—'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild className="h-7 px-2 hover:bg-primary/10">
                        <Link href={`/company/${stock.ticker}`}>
                          <ExternalLink className="h-3 w-3 text-primary" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2 opacity-50">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-widest">No_Results_Found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
