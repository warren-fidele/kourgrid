'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
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
import { Search, FilterX } from 'lucide-react';
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
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or ticker..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Market</label>
              <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                <SelectTrigger>
                  <SelectValue placeholder="All Markets" />
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
              <label className="text-sm font-medium">Currency</label>
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="All Currencies" />
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
          
          {(searchTerm || selectedMarket !== 'all' || selectedCurrency !== 'all') && (
            <div className="mt-4 flex justify-end">
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                <FilterX className="h-4 w-4" /> Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Ticker</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Market</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStocks.length > 0 ? (
                filteredStocks.map((stock) => (
                  <TableRow key={stock.id}>
                    <TableCell className="font-mono font-bold">{stock.ticker}</TableCell>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell>{stock.markets?.name ?? 'N/A'}</TableCell>
                    <TableCell>{stock.currencies?.code ?? 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/company/${stock.ticker}`}>View Details</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No stocks found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
