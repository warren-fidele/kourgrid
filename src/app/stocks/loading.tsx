'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

export default function StocksPageLoading() {
  return (
    <div className="container mx-auto p-4 flex flex-col min-h-0 h-full">
      {/* Toolbar skeleton */}
      <div className="flex flex-wrap items-center gap-4 bg-muted/30 border border-border p-3 mb-4">
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

      {/* Table skeleton */}
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
              {Array.from({ length: 20 }).map((_, i) => (
                <TableRow key={i} className="border-b border-border">
                  <TableCell className="py-3 px-4">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell className="text-right py-3 px-4">
                    <Skeleton className="h-8 w-8 ml-auto" />
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
