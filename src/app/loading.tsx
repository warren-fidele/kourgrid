'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Zap, Activity, Target, BarChart, Banknote, PieChart } from 'lucide-react'

export default function DashboardLoading() {
  const sections = [
    { title: 'Top_Gainers', icon: Zap, color: 'text-accent' },
    { title: 'Top_Losers', icon: Activity, color: 'text-destructive' },
    { title: 'High_Yield', icon: Target, color: 'text-primary' },
    { title: 'Most_Active', icon: BarChart, color: 'text-blue-400' },
    { title: 'Top_Value', icon: Banknote, color: 'text-emerald-400' },
    { title: 'Best_PE', icon: PieChart, color: 'text-orange-400' },
  ]

  return (
    <div className="h-[calc(100vh-3.5rem)] container mx-auto p-4 flex flex-col space-y-4 overflow-hidden">
      <header className="flex items-end justify-between border-b border-white/5 pb-2">
        <div className="space-y-1">
          <h1 className="text-lg font-bold tracking-tighter uppercase font-mono">Market_Intelligence_Terminal</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
            // High_Density_Analytics // System_Status: Loading...
          </p>
        </div>
        <div className="hidden sm:flex text-[10px] font-mono text-muted-foreground uppercase gap-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
      </header>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 min-h-0 overflow-hidden">
        {sections.map((section, idx) => (
          <div key={section.title} className="flex flex-col min-h-0">
            <div className="flex items-center gap-2 mb-1.5 px-1">
              <section.icon className={`h-3 w-3 ${section.color}`} />
              <h2 className={`text-[9px] font-mono font-black uppercase tracking-widest ${section.color}`}>
                {section.title}
              </h2>
            </div>
            <Card className="border border-white/5 bg-white/[0.02] overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableBody>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i} className="border-b border-white/5">
                        <TableCell className="font-mono font-bold text-[10px] py-2 px-3">
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-2 w-2" />
                            <Skeleton className="h-2 w-24" />
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-black font-mono text-[10px] py-2 px-3">
                          <Skeleton className="h-2 w-16 ml-auto" />
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

      <footer className="flex justify-between items-center border-t border-white/5 pt-2">
        <div className="text-[9px] font-mono text-muted-foreground uppercase animate-pulse">
          // Loading Data...
        </div>
      </footer>
    </div>
  )
}
