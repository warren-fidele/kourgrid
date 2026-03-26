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
        <div className="h-full overflow-y-auto overflow-x-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-background border-b border-white/10">
              <tr className="hover:bg-transparent">
                {['Symbol', 'Entity_Name', 'Market_Segment', 'Access'].map((header) => (
                  <th key={header} className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground py-2 px-3 text-left">
                    {header === 'Symbol' ? (
                      <Skeleton className="h-2 w-12 inline-block" />
                    ) : header === 'Entity_Name' ? (
                      <Skeleton className="h-2 w-32 inline-block" />
                    ) : header === 'Market_Segment' ? (
                      <Skeleton className="h-2 w-24 inline-block" />
                    ) : (
                      <Skeleton className="h-2 w-12 inline-block ml-auto" />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 20 }).map((_, i) => (
                <tr key={i} className="border-b border-white/5 group hover:bg-primary/5">
                  <td className="font-mono font-black text-primary text-xs py-3 px-3">
                    <Skeleton className="h-3 w-20" />
                  </td>
                  <td className="font-medium text-xs py-3 px-3">
                    <Skeleton className="h-3 w-48" />
                  </td>
                  <td className="py-3 px-3">
                    <Skeleton className="h-3 w-28" />
                  </td>
                  <td className="text-right py-3 px-3">
                    <Skeleton className="h-7 w-7 ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
