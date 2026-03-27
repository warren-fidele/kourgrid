'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { ExternalLink } from 'lucide-react'

export default function StocksPageLoading() {
  return (
    <div className="container mx-auto p-3 sm:p-4 flex flex-col min-h-0 md:h-full">
      {/* Toolbar skeleton - Desktop */}
      <div className="hidden md:flex flex-wrap items-center gap-4 bg-muted/30 border border-border p-3 mb-4">
        <div className="flex-grow max-w-sm relative">
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-[160px]" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
        <Skeleton className="h-10 w-20" />
      </div>

      {/* Toolbar skeleton - Mobile */}
      <div className="md:hidden flex flex-col gap-3 bg-muted/30 border border-border p-3 mb-4">
        <div className="relative w-full">
          <Skeleton className="h-11 w-full" />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <Skeleton className="h-11 w-full" />
          </div>
          <div className="flex-1">
            <Skeleton className="h-11 w-full" />
          </div>
        </div>
        <Skeleton className="h-11 w-full" />
      </div>

      {/* Mobile Card Grid */}
      <div className="md:hidden flex-grow border border-border bg-card min-h-0 overflow-y-auto scrollbar-thin p-3 space-y-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="border border-border bg-card rounded-lg p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-24 rounded" />
                  <Skeleton className="h-5 w-12 rounded" />
                </div>
              </div>
              <Skeleton className="h-11 w-11 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block flex-grow border border-border bg-card min-h-0 overflow-hidden rounded-md">
        <div className="h-full overflow-y-auto overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead className="sticky top-0 bg-muted/50 z-10 border-b border-border">
              <tr className="hover:bg-transparent">
                <th className="text-xs font-semibold text-foreground py-3 px-4 text-left">Symbol</th>
                <th className="text-xs font-semibold text-foreground py-3 px-4 text-left">Entity Name</th>
                <th className="text-xs font-semibold text-foreground py-3 px-4 text-left">Market Segment</th>
                <th className="text-xs font-semibold text-foreground py-3 px-4 text-right">Access</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 20 }).map((_, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-3" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Skeleton className="h-4 w-48" />
                  </td>
                  <td className="py-3 px-4">
                    <Skeleton className="h-4 w-28" />
                  </td>
                  <td className="text-right py-3 px-4">
                    <Skeleton className="h-8 w-8 ml-auto" />
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
