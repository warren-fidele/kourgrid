'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronRight } from 'lucide-react'

export default function DashboardLoading() {
  const sections = [
    { title: 'Top Gainers' },
    { title: 'Top Losers' },
    { title: 'High Yield' },
    { title: 'Most Active' },
    { title: 'Top Value' },
    { title: 'Best PE' },
  ]

  return (
    <div className="container mx-auto p-4 flex flex-col space-y-4 min-h-0 h-full">
      <header className="flex items-end justify-between border-b border-border pb-3">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold tracking-tight">KourGrid</h1>
          <p className="text-sm text-muted-foreground">Loading market data...</p>
        </div>
        <div className="hidden sm:flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </header>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-0 overflow-hidden">
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col min-h-0">
            <div className="flex items-center gap-2 mb-3">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Card className="border border-border bg-card flex-grow overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableBody>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i} className="border-b border-border">
                        <TableCell className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-3 w-3" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-3 px-4">
                          <Skeleton className="h-4 w-16 ml-auto" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <footer className="flex justify-between items-center border-t border-border pt-3">
        <Skeleton className="h-4 w-40" />
      </footer>
    </div>
  )
}
