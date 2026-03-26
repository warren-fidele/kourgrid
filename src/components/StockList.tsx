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
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

  // Get display labels for selected filters
  const selectedMarketLabel = selectedMarket === 'all'
    ? 'All Markets'
    : markets.find(m => m.id.toString() === selectedMarket)?.name || '';

  const selectedCurrencyLabel = selectedCurrency === 'all'
    ? 'All'
    : currencies.find(c => c.id.toString() === selectedCurrency)?.code || '';

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedMarket('all');
    setSelectedCurrency('all');
  };

  return (
    <div className="flex flex-col h-full space-y-4 min-h-0">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 bg-muted/30 border border-border p-3">
        <div className="flex-grow max-w-sm relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10 h-10 rounded-md border-border bg-background text-sm focus:ring-1 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Market:</span>
          <Select value={selectedMarket} onValueChange={(value) => { if (value) setSelectedMarket(value); }}>
            <SelectTrigger className="h-10 w-[160px] rounded-md border-border bg-background text-sm">
              <SelectValue>{() => selectedMarketLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent className="rounded-md border-border bg-popover">
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
          <span className="text-sm font-medium text-muted-foreground">Currency:</span>
          <Select value={selectedCurrency} onValueChange={(value) => { if (value) setSelectedCurrency(value); }}>
            <SelectTrigger className="h-10 w-[120px] rounded-md border-border bg-background text-sm">
              <SelectValue>{() => selectedCurrencyLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent className="rounded-md border-border bg-popover">
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
            className="h-8 text-sm text-destructive hover:bg-destructive/10"
          >
            <FilterX className="h-4 w-4 mr-1" /> Clear
          </Button>
        )}
      </div>

      {/* Table Area */}
      <div className="flex-grow border border-border bg-card min-h-0 overflow-hidden rounded-md">
        <div className="h-full overflow-y-auto overflow-x-auto scrollbar-thin">
          <Table>
            <TableHeader className="sticky top-0 bg-muted/50 z-10 border-b border-border">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-foreground py-3 px-4">Symbol</TableHead>
                <TableHead className="text-xs font-semibold text-foreground py-3 px-4">Entity Name</TableHead>
                <TableHead className="text-xs font-semibold text-foreground py-3 px-4">Market Segment</TableHead>
                <TableHead className="text-xs font-semibold text-foreground py-3 px-4 text-right">Access</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStocks.length > 0 ? (
                filteredStocks.map((stock) => (
                  <TableRow key={stock.id} className="group border-b border-border hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono font-medium text-primary py-3 px-4">
                      <span className="mr-2 text-xs text-muted-foreground">▸</span>
                      {stock.ticker}
                    </TableCell>
                    <TableCell className="font-medium text-sm text-foreground py-3 px-4">{stock.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground py-3 px-4">
                      {stock.markets?.name ?? '—'}
                    </TableCell>
                    <TableCell className="text-right py-3 px-4">
                      <Link
                        href={`/company/${stock.ticker}`}
                        className={cn(
                          "inline-flex items-center justify-center rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                          "h-8 w-8 p-0 hover:bg-primary/10",
                          "text-muted-foreground hover:text-primary"
                        )}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3 text-muted-foreground">
                      <p className="text-sm font-medium">No results found</p>
                      <p className="text-xs">Try adjusting your search or filters</p>
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
