/**
 * BioLinkMockup — 3-slide conceptual vector mockup for Branded Short-Link Hub.
 *
 * Implements:
 *  - Slide 0: Low-latency vanity redirection engine with Redis edge resolution
 *  - Slide 1: Real-time click telemetry, referrer analytics & latency logs
 *  - Slide 2: Dynamic bio-link mobile profile builder with theme customization
 *  - Synchronized vertical slide animation controlled by currentSlide prop
 */

interface BioLinkMockupProps {
  currentSlide?: number
}

export default function BioLinkMockup({ currentSlide = 0 }: BioLinkMockupProps) {
  return (
    <div className="relative w-full h-[460px] bg-white text-ink overflow-hidden font-display select-none">
      <div
        className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col"
        style={{ transform: `translateY(-${currentSlide * 100}%)` }}
      >
        {/* ═════════════════════════════════════════════════════════
            SLIDE 0: Low-Latency Vanity Redirection Engine
        ═════════════════════════════════════════════════════════ */}
        <div className="w-full h-full shrink-0 p-6 flex flex-col justify-between bg-paper/50">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  Edge Redirection Engine // Redis Cluster
                </span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue/10 text-blue font-semibold">
                [ CONCEPTUAL MOCKUP ]
              </span>
            </div>

            {/* Redirection Table */}
            <div className="bg-white rounded-xl border border-ink/10 shadow-sm overflow-hidden text-xs">
              <div className="bg-ink/5 p-3 grid grid-cols-12 font-mono text-[11px] text-ink/60 border-b border-ink/10">
                <span className="col-span-4">Short Vanity Slug</span>
                <span className="col-span-5">Target Destination URL</span>
                <span className="col-span-3 text-right">Edge Resolution</span>
              </div>
              <div className="divide-y divide-ink/5">
                <div className="p-3 grid grid-cols-12 items-center font-mono">
                  <span className="col-span-4 font-bold text-blue">msh.sh/ai-paper</span>
                  <span className="col-span-5 text-ink/70 truncate">arxiv.org/abs/2403.1189</span>
                  <span className="col-span-3 text-right text-emerald-600 font-bold">11.4ms</span>
                </div>
                <div className="p-3 grid grid-cols-12 items-center font-mono">
                  <span className="col-span-4 font-bold text-blue">msh.sh/github</span>
                  <span className="col-span-5 text-ink/70 truncate">github.com/Mishesh06</span>
                  <span className="col-span-3 text-right text-emerald-600 font-bold">9.2ms</span>
                </div>
                <div className="p-3 grid grid-cols-12 items-center font-mono">
                  <span className="col-span-4 font-bold text-blue">msh.sh/bio</span>
                  <span className="col-span-5 text-ink/70 truncate">mishesh.dev/links</span>
                  <span className="col-span-3 text-right text-emerald-600 font-bold">14.1ms</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-ink/40 pt-3 border-t border-ink/5">
            <span>Sub-15ms Edge Cache Invalidation</span>
            <span>Screen 1 of 3</span>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════
            SLIDE 1: Real-Time Click Telemetry & Analytics
        ═════════════════════════════════════════════════════════ */}
        <div className="w-full h-full shrink-0 p-6 flex flex-col justify-between bg-paper">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/10">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue" />
                Live Telemetry &amp; Geographic Stream
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                TELEMETRY ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 bg-white p-4 rounded-xl border border-ink/10 shadow-sm text-center">
                <span className="font-mono text-[11px] text-ink/50 uppercase block mb-1">Total Redirects</span>
                <span className="font-display font-black text-3xl text-ink">482,910</span>
                <span className="text-[10px] text-emerald-600 font-mono block mt-1">+18.4% today</span>
              </div>
              <div className="col-span-4 bg-white p-4 rounded-xl border border-ink/10 shadow-sm text-center">
                <span className="font-mono text-[11px] text-ink/50 uppercase block mb-1">Avg Resolution</span>
                <span className="font-display font-black text-3xl text-blue">12.8ms</span>
                <span className="text-[10px] text-blue font-mono block mt-1">p99 &lt; 15ms</span>
              </div>
              <div className="col-span-4 bg-white p-4 rounded-xl border border-ink/10 shadow-sm text-center">
                <span className="font-mono text-[11px] text-ink/50 uppercase block mb-1">Edge Nodes</span>
                <span className="font-display font-black text-3xl text-emerald-600">24/24</span>
                <span className="text-[10px] text-ink/50 font-mono block mt-1">Global Health 100%</span>
              </div>
            </div>

            <div className="mt-4 bg-white p-4 rounded-xl border border-ink/10 shadow-sm">
              <span className="font-mono text-[11px] text-ink/50 uppercase block mb-2">Referrer Distribution</span>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-ink/5">Direct / API: 44%</div>
                <div className="p-2 rounded bg-ink/5">GitHub / Docs: 32%</div>
                <div className="p-2 rounded bg-ink/5">Twitter / Social: 24%</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-ink/40 pt-3 border-t border-ink/5">
            <span>Streaming Click Analytics</span>
            <span>Screen 2 of 3</span>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════
            SLIDE 2: Dynamic Bio-Link Mobile Profile Builder
        ═════════════════════════════════════════════════════════ */}
        <div className="w-full h-full shrink-0 p-6 flex flex-col justify-between bg-paper/60">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/10">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue" />
                Live Bio-Link Mobile Profile Customizer
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue/10 text-blue font-bold">
                PREVIEW MODE
              </span>
            </div>

            <div className="grid grid-cols-12 gap-6 items-center">
              {/* Phone silhouette */}
              <div className="col-span-5 bg-ink p-3 rounded-2xl shadow-xl max-w-[180px] mx-auto text-paper">
                <div className="bg-white/10 p-3 rounded-xl text-center space-y-2">
                  <div className="w-8 h-8 rounded-full bg-blue mx-auto" />
                  <p className="font-bold text-xs">Mishesh Patel</p>
                  <div className="space-y-1.5 pt-1">
                    <div className="p-1.5 rounded-lg bg-white/20 text-[9px] font-mono">AI Models Repo ↗</div>
                    <div className="p-1.5 rounded-lg bg-white/20 text-[9px] font-mono">arXiv Preprints ↗</div>
                    <div className="p-1.5 rounded-lg bg-white/20 text-[9px] font-mono">Contact Directly ↗</div>
                  </div>
                </div>
              </div>

              {/* Theme Selector */}
              <div className="col-span-7 space-y-3">
                <span className="font-mono text-xs text-ink/50 uppercase block">Theme Engine Presets</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl border border-blue bg-blue/10 font-medium text-blue">✓ Minimalist Swiss</div>
                  <div className="p-2.5 rounded-xl border border-ink/10 bg-white font-medium">Dark Obsidian</div>
                  <div className="p-2.5 rounded-xl border border-ink/10 bg-white font-medium">Nordic Spruce</div>
                  <div className="p-2.5 rounded-xl border border-ink/10 bg-white font-medium">Cyber Grid</div>
                </div>
                <p className="text-xs text-ink/60">Zero third-party script tracking, instant CSS sub-resource loading.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-ink/40 pt-3 border-t border-ink/5">
            <span>Dynamic Bio Profile Builder</span>
            <span>Screen 3 of 3</span>
          </div>
        </div>
      </div>
    </div>
  )
}
