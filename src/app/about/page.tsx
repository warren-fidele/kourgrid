import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Shield, Zap, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="h-[calc(100vh-3.5rem)] container mx-auto p-4 flex flex-col space-y-4 overflow-hidden">
      <header className="border-b border-white/5 pb-2">
        <h1 className="text-lg font-bold uppercase tracking-tight font-mono">System_Information_Intel</h1>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">// Portfolio_Terminal_Overview</p>
      </header>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
        <div className="space-y-4 overflow-y-auto pr-2 scrollbar-hide">
          <div className="p-4 border border-white/5 bg-white/[0.02]">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
              <Target className="h-3 w-3" /> Core_Directive
            </h2>
            <p className="text-[11px] font-mono text-muted-foreground leading-relaxed uppercase">
              Portfolio_Terminal is a specialized financial intelligence platform. 
              Our directive is to bridge the gap between raw market data and actionable strategy 
              through high-density analytics and real-time system monitoring.
            </p>
          </div>

          <div className="p-4 border border-white/5 bg-white/[0.02]">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
              <Zap className="h-3 w-3" /> System_Capabilities
            </h2>
            <ul className="space-y-2 text-[10px] font-mono text-muted-foreground uppercase">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">[01]</span>
                <span>Performance_Tracking: Monitor unrealized variance against real-time closing prices.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">[02]</span>
                <span>Historical_Audit: Deep-dive into year-over-year price performance cycles.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">[03]</span>
                <span>Fundamental_HUD: Access key financial ratios via the unified command interface.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 border border-white/5 bg-white/[0.02] flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
              <Shield className="h-3 w-3" /> Security_Protocol
            </h2>
            <p className="text-[11px] font-mono text-muted-foreground leading-relaxed uppercase">
              All data is processed through our secure relational database tracking 
              multi-currency assets and global market segments. Daily automation cycles 
              ensure information integrity.
            </p>
          </div>
          
          <div className="pt-8 opacity-20 text-[9px] font-mono space-y-1">
            <p>BUILD_VERSION: 1.0.4-RELEASE</p>
            <p>ENCRYPTION: AES-256-BIT</p>
            <p>ACCESS: GRANTED</p>
          </div>
        </div>
      </div>
    </div>
  );
}
