import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Shield, Zap, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto p-3 sm:p-4 md:p-6 flex flex-col space-y-3 sm:space-y-4 md:space-y-6 min-h-0 md:h-full">
      <header className="border-b border-border pb-3">
        <h1 className="text-lg sm:text-xl font-semibold tracking-tight">About KourGrid</h1>
        <p className="text-sm text-muted-foreground">Mauritius Stock Exchange Analytics Platform</p>
      </header>

      <div className="md:flex-grow md:overflow-y-auto min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Core Directive
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  KourGrid is a specialized analytics platform for the Mauritius Stock
                  Exchange. We transform raw market data into actionable intelligence
                  through systematic analysis and intuitive visualization.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Zap className="h-4 w-4 text-accent" />
                  Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-xs text-primary mt-0.5">01</span>
                    <span><span className="font-medium text-foreground">Performance Tracking:</span> Monitor variance against closing prices with real-time analytics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-xs text-primary mt-0.5">02</span>
                    <span><span className="font-medium text-foreground">Historical Analysis:</span> Deep-dive into year-over-year price performance cycles.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-xs text-primary mt-0.5">03</span>
                    <span><span className="font-medium text-foreground">Fundamental Data:</span> Access key financial ratios and metrics in a unified interface.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col">
            <Card className="border-border bg-card flex-grow flex flex-col">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Shield className="h-4 w-4 text-accent" />
                  Security & Data
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  All data is processed through KourGrid's secure relational database
                  tracking Mauritius market assets and multi-currency instruments.
                  Daily automation cycles ensure data integrity and consistency.
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Product</span>
                    <span className="font-mono font-medium">KourGrid</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Exchange</span>
                    <span className="font-mono font-medium">Mauritius Stock Exchange</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Data Updates</span>
                    <span className="font-mono font-medium">Daily at 5PM</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-mono font-medium text-emerald-400">Operational</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
