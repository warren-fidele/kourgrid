'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, Globe, Info } from 'lucide-react'

export default function CompanyPageLoading() {
  return (
    <div className="container mx-auto p-4 flex flex-col space-y-4 min-h-0 h-full">
      {/* Header skeleton */}
      <header className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-9" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-48" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-3" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-3" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        {/* Analytics Section */}
        <div className="lg:col-span-8 flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-primary" />
            <Skeleton className="h-4 w-36" />
          </div>
          <Card className="flex-grow border border-border bg-card min-h-0 overflow-hidden">
            <CardContent className="p-4 h-full flex items-center justify-center">
              <div className="w-full space-y-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-64 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fundamentals Section */}
        <div className="lg:col-span-4 flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-primary" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex-grow min-h-0 overflow-y-auto space-y-2 scrollbar-thin">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-border bg-card/50">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
