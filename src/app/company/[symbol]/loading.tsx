'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CompanyPageLoading() {
  return (
    <div className="container mx-auto p-3 sm:p-4 flex flex-col space-y-3 sm:space-y-4 min-h-0 md:h-full">
      {/* Header skeleton */}
      <header className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-4">
          <Skeleton className="h-11 w-11 rounded-md md:h-9 md:w-9" />
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

      <div className="md:flex-grow md:overflow-y-auto min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          {/* Analytics Section */}
          <div className="lg:col-span-8 flex flex-col min-h-0">
            <div className="flex items-center gap-2 mb-3">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-36" />
            </div>
            <Card className="border border-border bg-card min-h-0">
              <CardContent className="p-3 sm:p-4 h-full min-h-[50vh] md:min-h-0 flex items-center justify-center">
                <div className="w-full space-y-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-64 w-full" />
                  <div className="flex gap-2 justify-center">
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
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex-grow min-h-0 overflow-y-auto space-y-2">
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
    </div>
  )
}
