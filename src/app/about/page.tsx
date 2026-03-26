import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="space-y-8 text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          About Portfolio Manager
        </h1>
        <p className="text-xl text-muted-foreground">
          Empowering investors with data-driven insights and market historical analysis.
        </p>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Portfolio Manager is a specialized financial advisory platform designed to help you 
              track, analyze, and optimize your investment holdings. Our platform leverages 
              comprehensive historical data to provide you with a clear picture of market trends 
              and company fundamentals.
            </p>
            <p>
              We believe that informed decisions are the bedrock of successful investing. By 
              providing real-time performance tracking and deep-dive historical analysis, 
              we bridge the gap between complex market data and actionable insights.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Core Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Performance Tracking:</strong> Monitor your unrealized gains and losses against real-time market prices.</li>
              <li><strong>Historical Analysis:</strong> Visualize years of price history to identify patterns and cycles.</li>
              <li><strong>Fundamental Metrics:</strong> Access key financial ratios like P/E, EPS, and Dividend Yield at a glance.</li>
              <li><strong>Market Context:</strong> Understand how companies perform within their specific market segments.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>The Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Built on a robust relational database tracking currencies, markets, and stocks, our 
              platform processes daily automation updates to ensure you always have the latest 
              closing prices and trading volumes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
