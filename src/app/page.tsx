import Link from "next/link";
import { getAllBrands } from "@/lib/brands";
import SiteHeader from '@/components/SiteHeader';

export default function Home() {
  const brands = getAllBrands();

  return (
    <div className="min-h-screen font-sans text-foreground bg-background-dark selection:bg-primary/30">
      <SiteHeader />


      <main className="max-w-[1600px] mx-auto p-4 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <header className="lg:col-span-5 bg-panel-dark border border-panel-border rounded-xl p-6 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                Demand & Lead Generation Audit
              </div>
              <h1 className="text-3xl font-black leading-tight tracking-tight">
                A clear view of whats driving leads, and what is <span className="text-primary underline decoration-2 underline-offset-4">leaking</span> them.
              </h1>
              <p className="text-sm text-slate-gray max-w-md leading-relaxed">
                This interactive audit helps Gearhouse align channels, messaging, and digital experience around one goal: more qualified enquiries, not just presence.
              </p>

            </div>
          </header>
          <section className="lg:col-span-7 bg-panel-dark border border-panel-border rounded-xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">query_stats</span>
                <h2 className="text-sm font-black uppercase tracking-widest">Group-level snapshot</h2>
              </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
              <div className="bg-background-dark/50 border border-panel-border p-4 rounded-lg flex flex-col justify-between group hover:border-primary/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-black uppercase tracking-tighter text-gray-300">Channel alignment</h4>
                    <span className="material-symbols-outlined text-sm text-primary">hub</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-normal">Synchronizing social, search, and direct channels to ensure a unified market message and reduced spend waste across the group.</p>
                </div>
              </div>
              <div className="bg-background-dark/50 border border-panel-border p-4 rounded-lg flex flex-col justify-between group hover:border-primary/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-black uppercase tracking-tighter text-gray-300">Lead capture</h4>
                    <span className="material-symbols-outlined text-sm text-primary">target</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-normal">Optimizing forms, landing pages, and UX to reduce friction and convert high-intent traffic into qualified sales enquiries.</p>
                </div>
              </div>
              <div className="bg-background-dark/50 border border-panel-border p-4 rounded-lg flex flex-col justify-between group hover:border-primary/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-black uppercase tracking-tighter text-gray-300">Proof and credibility</h4>
                    <span className="material-symbols-outlined text-sm text-primary">verified</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-normal">Leveraging the authority of the Gearhouse Group to build instant trust with large-scale event planners and corporate clients.</p>
                </div>
              </div>
              <div className="bg-background-dark/50 border border-panel-border p-4 rounded-lg flex flex-col justify-between group hover:border-primary/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-black uppercase tracking-tighter text-gray-300">Performance leakage</h4>
                    <span className="material-symbols-outlined text-sm text-red-500">leak_add</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-normal">Identifying drop-off points in the funnel where prospective leads are lost to competitors or technical errors.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="bg-panel-dark border border-panel-border rounded-xl p-6" id="brands">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">grid_view</span>
                Explore the brands
              </h2>
              <p className="text-[11px] text-gray-500 uppercase tracking-tight font-medium mt-1">Each brand page follows the same audit structure so comparisons are easy.</p>
            </div>

          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {brands.map(brand => (
              <Link key={brand.slug} href={`/brands/${brand.slug}`}>
                <div className="bg-background-dark/30 border border-panel-border p-4 rounded flex flex-col group hover:bg-background-dark hover:border-primary/40 transition-all cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-4 h-8">
                    <div /> {/* Spacer to push logo to right if needed, or just let justify-between work with existing BRAND tag if kept, BUT user wants logo top right. */}
                    {brand.logo ? (
                      <img
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        className="h-8 w-auto object-contain"
                      />
                    ) : (
                      <div className="size-9 bg-primary/10 border border-primary/20 rounded flex items-center justify-center font-black text-primary text-xs">
                        {brand.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <h4 className="text-xs font-bold truncate mb-1 text-gray-200 group-hover:text-primary transition-colors">{brand.name}</h4>
                  <p className="text-gray-500 text-[10px] mb-4 flex-grow leading-relaxed line-clamp-2">
                    {brand.sections.overview.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-panel-border/30">
                    <span className="text-[9px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">VIEW DATA</span>
                    <span className="material-symbols-outlined text-[14px] text-gray-600 group-hover:text-primary">arrow_forward_ios</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <section className="lg:col-span-8 bg-panel-dark border border-panel-border rounded-xl p-6" id="methodology">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">terminal</span>
                How to use this audit
              </h2>

            </div>
            {/* Methodology content matches HTML... */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-[12px] text-slate-gray leading-relaxed">
                  This audit explores the dynamic between the Gearhouse "Umbrella" and its specialist brands. While specialist brands often capture high-intent, niche-specific leads, the Gearhouse Group brand provides the safety and scale required for major contracts.
                </p>
                <p className="text-[12px] text-slate-gray leading-relaxed">
                  The goal of this dashboard is to highlight where lead generation efforts can be cross-pollinated, ensuring that a specialist enquiry doesnt miss the broader group capability, and vice versa.
                </p>
                <div className="pt-2">
                  <h4 className="text-[10px] font-black text-primary uppercase mb-3 tracking-widest">Core Objectives</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[11px] text-gray-400">
                      <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                      <span>Analyze cross-brand lead migration patterns.</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-gray-400">
                      <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                      <span>Evaluate performance of the "Full-Stack" promise.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-lg relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-3 text-red-500">
                    <span className="material-symbols-outlined text-lg">error</span>
                    <h3 className="font-black text-[11px] uppercase tracking-widest">What we did not do</h3>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed relative z-10">
                    This audit does not include deep-dive competitor benchmarking. Instead, we focused exclusively on Gearhouse's internal ecosystem to find and fix "self-inflicted" lead leakage before looking outward at the competitive landscape.
                  </p>
                  <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-7xl text-red-500/10">search_off</span>
                </div>

              </div>
            </div>
          </section>

          <section className="lg:col-span-4 bg-panel-dark border border-panel-border rounded-xl p-6">
            <h2 className="text-sm font-black uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">hub</span>
              Gearhouse as the umbrella
            </h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">Why Gearhouse leads with a full-stack promise</p>
            <div className="space-y-4">
              <p className="text-[11px] text-slate-gray leading-relaxed mb-4">
                In the complex world of event production, clients increasingly seek one accountable partner who can handle everything from power and sound to structures and virtual integration.
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-background-dark/50 border border-panel-border rounded-lg group hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="material-symbols-outlined text-primary text-lg">handshake</span>
                    <h4 className="text-xs font-bold text-gray-200">One accountable partner</h4>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-normal pl-7">Streamlining complex logistics through a single, reliable point of contact for all production needs.</p>
                </div>
                <div className="p-3 bg-background-dark/50 border border-panel-border rounded-lg group hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="material-symbols-outlined text-primary text-lg">layers</span>
                    <h4 className="text-xs font-bold text-gray-200">Specialist depth on demand</h4>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-normal pl-7">Accessing industry-leading expertise within each niche without the friction of multiple suppliers.</p>
                </div>
                <div className="p-3 bg-background-dark/50 border border-panel-border rounded-lg group hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="material-symbols-outlined text-primary text-lg">trending_up</span>
                    <h4 className="text-xs font-bold text-gray-200">Land and expand growth</h4>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-normal pl-7">Creating seamless upsell opportunities as client requirements grow from basic needs to full-scale production.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-8 border-t border-panel-border bg-panel-dark/50 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">analytics</span>
                <p className="text-[11px] font-bold text-gray-400">
                  Prepared for <span className="text-white">Gearhouse Group</span>. Focus: qualified leads in South Africa.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[10px] text-gray-600 font-mono">
              <span>© 2026 Gearhouse Audit by Broadbrand</span>
              <img
                src="/logos/broadbrand.png"
                alt="Broadbrand"
                className="h-3 w-auto object-contain brightness-0 invert opacity-50"
              />
              <span className="w-1 h-1 bg-gray-700 rounded-full ml-2"></span>
              <span>Confidential Report</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
