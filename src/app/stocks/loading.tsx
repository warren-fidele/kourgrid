'use client'

import StockList from '@/components/StockList'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Search, FilterX } from 'lucide-react'

export default function StocksPageLoading() {
  return (
    <div className="h-[calc(100vh-3.5rem)] container mx-auto p-4 flex flex-col min-h-0">
      {/* Toolbar skeleton */}
      <div className="flex flex-wrap items-center gap-4 bg-white/[0.02] border border-white/5 p-2 mb-4">
        <div className="flex-grow max-w-sm relative">
          <Skeleton className="h-8 absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-[140px]" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-8 w-[100px]" />
        </div>
        <Skeleton className="h-8 w-16" />
      </div>

      {/* Table skeleton */}
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
              {Array.from({ length: 20 }).map((_, i) => (
                <TableRow key={i} className="group border-b border-white/5 hover:bg-primary/5 transition-colors">
                  <TableCell className="font-mono font-black text-primary text-xs py-3 px-3">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell className="font-medium text-xs py-3 px-3">
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell className="py-3 px-3">
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell className="text-right py-3 px-3">
                    <Skeleton className="h-7 w-7 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
