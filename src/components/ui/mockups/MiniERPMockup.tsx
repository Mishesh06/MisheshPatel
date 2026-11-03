/**
 * MiniERPMockup — 3-slide conceptual vector mockup for Mini ERP + CRM Operations Portal.
 *
 * Implements:
 *  - Slide 0: Unified customer accounts directory & credit balance limits
 *  - Slide 1: Multi-warehouse inventory SKU engine with low-stock thresholds & audit movements
 *  - Slide 2: Delivery challan workflow manager with gate-pass and e-way bill verification
 *  - Vertical slide transition controlled by currentSlide prop
 */

interface MiniERPMockupProps {
  currentSlide?: number
}

export default function MiniERPMockup({ currentSlide = 0 }: MiniERPMockupProps) {
  return (
    <div className="relative w-full h-[460px] bg-white text-ink overflow-hidden font-display select-none">
      <div
        className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col"
        style={{ transform: `translateY(-${currentSlide * 100}%)` }}
      >
        {/* ═════════════════════════════════════════════════════════
            SLIDE 0: Unified Customer Accounts & Credit Directory
        ═════════════════════════════════════════════════════════ */}
        <div className="w-full h-full shrink-0 p-6 flex flex-col justify-between bg-paper/50">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  Customer Accounts CRM // Credit Audit
                </span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue/10 text-blue font-semibold">
                [ CONCEPTUAL MOCKUP ]
              </span>
            </div>

            <div className="bg-white rounded-xl border border-ink/10 shadow-sm overflow-hidden text-xs">
              <div className="bg-ink/5 p-3 grid grid-cols-12 font-mono text-[11px] text-ink/60 border-b border-ink/10">
                <span className="col-span-5">Enterprise Client</span>
                <span className="col-span-4">Credit Limit Status</span>
                <span className="col-span-3 text-right">Tax ID / GSTIN</span>
              </div>
              <div className="divide-y divide-ink/5">
                <div className="p-3 grid grid-cols-12 items-center font-mono">
                  <span className="col-span-5 font-bold text-ink">TechCorp Systems Pvt.</span>
                  <span className="col-span-4 text-emerald-600 font-semibold">$84,000 / $100k</span>
                  <span className="col-span-3 text-right text-ink/60">24AAACT1289P</span>
                </div>
                <div className="p-3 grid grid-cols-12 items-center font-mono">
                  <span className="col-span-5 font-bold text-ink">Apex Global Logistics</span>
                  <span className="col-span-4 text-emerald-600 font-semibold">$32,500 / $50k</span>
                  <span className="col-span-3 text-right text-ink/60">27AABCA4412R</span>
                </div>
                <div className="p-3 grid grid-cols-12 items-center font-mono">
                  <span className="col-span-5 font-bold text-ink">Metro Dynamics Inc.</span>
                  <span className="col-span-4 text-amber-600 font-semibold">$96,200 / $100k</span>
                  <span className="col-span-3 text-right text-ink/60">29AABCM9981K</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-ink/40 pt-3 border-t border-ink/5">
            <span>Automated Client Balance Tracking</span>
            <span>Screen 1 of 3</span>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════
            SLIDE 1: Multi-Warehouse Inventory & SKU Engine
        ═════════════════════════════════════════════════════════ */}
        <div className="w-full h-full shrink-0 p-6 flex flex-col justify-between bg-paper">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/10">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue" />
                Multi-Warehouse Stock Movement Ledger
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                AUDITED MOVEMENTS
              </span>
            </div>

            <div className="grid grid-cols-12 gap-3 mb-4">
              <div className="col-span-4 bg-white p-3.5 rounded-xl border border-ink/10 text-center">
                <span className="text-[10px] font-mono text-ink/50 uppercase block">Warehouse North</span>
                <span className="font-display font-black text-2xl text-ink">12,480 SKUs</span>
              </div>
              <div className="col-span-4 bg-white p-3.5 rounded-xl border border-ink/10 text-center">
                <span className="text-[10px] font-mono text-ink/50 uppercase block">Warehouse Central</span>
                <span className="font-display font-black text-2xl text-blue">8,920 SKUs</span>
              </div>
              <div className="col-span-4 bg-white p-3.5 rounded-xl border border-ink/10 text-center">
                <span className="text-[10px] font-mono text-ink/50 uppercase block">Low Stock Alerts</span>
                <span className="font-display font-black text-2xl text-amber-600">3 SKUs</span>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-ink/10 text-xs font-mono space-y-2">
              <div className="flex justify-between items-center text-ink/80 pb-1.5 border-b border-ink/5">
                <span>[MOV-8841] SKU-IND-409 Inbound Transfer (Dock 4)</span>
                <span className="text-emerald-600 font-bold">+500 Units</span>
              </div>
              <div className="flex justify-between items-center text-ink/80">
                <span>[MOV-8840] SKU-IND-881 Dispatched via Challan #9942</span>
                <span className="text-blue font-bold">-120 Units</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-ink/40 pt-3 border-t border-ink/5">
            <span>Automated Low-Stock Thresholds</span>
            <span>Screen 2 of 3</span>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════
            SLIDE 2: Delivery Challan Dispatch Manager
        ═════════════════════════════════════════════════════════ */}
        <div className="w-full h-full shrink-0 p-6 flex flex-col justify-between bg-paper/60">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/10">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Delivery Challan Dispatch System
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                GATE PASS VERIFIED
              </span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-ink/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs text-ink/50">CHALLAN IDENTIFIER</span>
                  <p className="font-display font-bold text-xl text-ink">#CH-2025-9942</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-xs font-bold">
                  ✓ Dispatch Ready
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-3 border-t border-ink/5">
                <div>
                  <span className="text-ink/50 block">Recipient:</span>
                  <span className="font-bold text-ink">TechCorp Systems Facility B</span>
                </div>
                <div>
                  <span className="text-ink/50 block">E-Way Bill Status:</span>
                  <span className="text-emerald-600 font-bold">Generated #88192301</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-ink/5 text-xs font-mono text-ink/70 flex items-center justify-between">
                <span>Gate Pass Security Signature</span>
                <span className="text-emerald-600 font-bold">VERIFIED (14:32 IST)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-ink/40 pt-3 border-t border-ink/5">
            <span>Sequential Challan Generation Engine</span>
            <span>Screen 3 of 3</span>
          </div>
        </div>
      </div>
    </div>
  )
}
