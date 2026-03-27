'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

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
    <div className="container mx-auto p-3 sm:p-4 flex flex-col min-h-0 md:h-full">
      <header className="flex items-end justify-between border-b border-border pb-2">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold tracking-tight">KourGrid</h1>
          <p className="text-sm text-muted-foreground hidden sm:block">Loading market data...</p>
        </div>
        <div className="hidden sm:flex text-xs gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </header>

      <div className="md:flex-grow md:overflow-y-auto min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col">
              <div className="flex items-center gap-2 mb-2 px-1">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Card className="border border-border bg-card">
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
      </div>

      <footer className="flex justify-between items-center border-t border-border pt-2">
        <Skeleton className="h-4 w-40" />
      </footer>
    </div>
  )
}
