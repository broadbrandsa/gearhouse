import { getAllBrands, getBrandBySlug } from '@/lib/brands';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';

export async function generateStaticParams() {
    const brands = getAllBrands();
    return brands.map((brand) => ({
        slug: brand.slug,
    }));
}


export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const brand = getBrandBySlug(slug);

    if (!brand) {
        notFound();
    }

    const allBrands = getAllBrands();
    const currentIndex = allBrands.findIndex(b => b.slug === brand.slug);
    const prevBrand = currentIndex > 0 ? allBrands[currentIndex - 1] : null;
    const nextBrand = currentIndex < allBrands.length - 1 ? allBrands[currentIndex + 1] : null;

    // Helper to determine score color
    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-primary';
        if (score >= 50) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getScoreBarColor = (score: number) => {
        if (score >= 90) return 'bg-primary';
        if (score >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <>
            <SiteHeader />

            <main className="max-w-[1600px] mx-auto p-6 space-y-6">
                <header className="bg-panel-dark border border-panel-border rounded-xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-40 -mt-40"></div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                                {brand.role_tag || "Brand Performance Audit"}
                            </div>
                            {brand.logo && (
                                <div className="mb-6">
                                    <img
                                        src={brand.logo}
                                        alt={`${brand.name} logo`}
                                        className="h-12 w-auto object-contain opacity-90"
                                    />
                                </div>
                            )}
                            <h1 className="text-6xl font-black tracking-tight mb-4 uppercase">{brand.name}</h1>
                            <p className="text-xl text-slate-gray leading-relaxed mb-8 max-w-3xl">
                                {brand.sections.overview}
                            </p>

                        </div>

                    </div>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6" id="overview">
                    <div className="bg-panel-dark border border-panel-border rounded-xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded">theaters</span>
                            <h3 className="text-xs font-black uppercase tracking-widest text-white">What this brand delivers</h3>
                        </div>
                        <p className="text-sm text-slate-gray leading-loose">
                            {brand.sections.what_delivers || brand.sections.overview}
                        </p>
                    </div>

                    {brand.sections.decision_context && (
                        <div className="bg-panel-dark border border-panel-border rounded-xl p-8 border-l-4 border-l-primary">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded">psychology</span>
                                <h3 className="text-xs font-black uppercase tracking-widest text-white">Decision Context</h3>
                            </div>
                            <p className="text-sm text-slate-gray leading-loose font-medium">
                                {brand.sections.decision_context}
                            </p>
                        </div>
                    )}
                    <div className="bg-panel-dark border border-panel-border rounded-xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded">account_tree</span>
                            <h3 className="text-xs font-black uppercase tracking-widest text-white">
                                {brand.sections.how_it_fits ? "How it fits within the group" : "Current Presence"}
                            </h3>
                        </div>
                        <p className="text-sm text-slate-gray leading-loose">
                            {brand.sections.how_it_fits || brand.sections.current_presence}
                        </p>
                    </div>
                </section>

                <section className="space-y-4" id="buyers">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Primary Discovery Patterns</h2>
                        <div className="h-px bg-panel-border flex-grow"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {brand.sections.discovery_patterns ? (
                            brand.sections.discovery_patterns.map((pattern, idx) => (
                                <div key={idx} className="bg-panel-dark border border-panel-border p-8 rounded-xl hover:border-primary/40 transition-all group">
                                    <span className="material-symbols-outlined text-primary text-3xl mb-6 group-hover:scale-110 transition-transform">{pattern.icon}</span>
                                    <h4 className="font-bold text-sm mb-3 uppercase tracking-wider">{pattern.title}</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">{pattern.description}</p>
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="bg-panel-dark border border-panel-border p-8 rounded-xl hover:border-primary/40 transition-all group">
                                    <span className="material-symbols-outlined text-primary text-3xl mb-6 group-hover:scale-110 transition-transform">diversity_3</span>
                                    <h4 className="font-bold text-sm mb-3 uppercase tracking-wider">Industry familiarity</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">Leveraging a multi-decade footprint in the arts community where word-of-mouth remains the primary catalyst for new long-term contracts.</p>
                                </div>
                                <div className="bg-panel-dark border border-panel-border p-8 rounded-xl hover:border-primary/40 transition-all group">
                                    <span className="material-symbols-outlined text-primary text-3xl mb-6 group-hover:scale-110 transition-transform">manage_search</span>
                                    <h4 className="font-bold text-sm mb-3 uppercase tracking-wider">Problem-led search</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">High-intent searches triggered by specific pain points like equipment failure, budget constraints for ownership, or technical staffing gaps.</p>
                                </div>
                                <div className="bg-panel-dark border border-panel-border p-8 rounded-xl hover:border-primary/40 transition-all group">
                                    <span className="material-symbols-outlined text-primary text-3xl mb-6 group-hover:scale-110 transition-transform">verified</span>
                                    <h4 className="font-bold text-sm mb-3 uppercase tracking-wider">Peer validation</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">Visibility within high-profile production credits serves as proof of capability for institutional buyers and school bursars.</p>
                                </div>
                            </>
                        )}
                    </div>
                </section>

                <section className="bg-panel-dark border border-panel-border rounded-xl overflow-hidden" id="priority">
                    <div className="px-6 py-4 border-b border-panel-border flex items-center justify-between bg-background-dark/30">
                        <h3 className="text-xs font-black uppercase tracking-widest">Priority Channels</h3>
                        <span className="text-[9px] font-mono text-gray-500">REFINED_STRATEGY_{new Date().getFullYear()}</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="bg-background-dark/50 text-gray-500 uppercase font-black tracking-tighter">
                                    <th className="px-6 py-4 border-b border-panel-border">Rank / Channel</th>
                                    <th className="px-6 py-4 border-b border-panel-border">Audit Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-panel-border/50">
                                {brand.sections.priority_channels.map((channel, idx) => (
                                    <tr key={idx} className="hover:bg-primary/5 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <span className="size-6 bg-primary text-background-dark rounded flex items-center justify-center font-black">{idx + 1}</span>
                                                <span className="font-bold text-gray-200 uppercase tracking-widest">{channel}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-gray-400">Primary Channel</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>



                {brand.sections.target_audience && (
                    <section className="bg-panel-dark border border-panel-border rounded-xl overflow-hidden" id="audience">
                        <div className="px-6 py-4 border-b border-panel-border flex items-center justify-between bg-background-dark/30">
                            <h3 className="text-xs font-black uppercase tracking-widest">Target Audience & Engagement Channels</h3>
                            <span className="text-[9px] font-mono text-gray-500">CONVERSION_ALIGNMENT</span>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Column 1: Audience Profiles */}
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-[10px] font-bold text-primary uppercase mb-2">Primary Decision-Makers</h4>
                                    <p className="text-sm text-gray-300 leading-relaxed">{brand.sections.target_audience.primary}</p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-2">What Motivates Their Decisions</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed">{brand.sections.target_audience.motivators}</p>
                                </div>
                            </div>

                            {/* Column 2: Validation & Lead Quality */}
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-2">Where They Validate Those Decisions</h4>
                                    <ul className="space-y-2">
                                        {brand.sections.target_audience.validation_channels.map((channel, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                                                <span className="material-symbols-outlined text-primary text-base leading-none translate-y-0.5">check_small</span>
                                                <span>{channel}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                                    <h4 className="text-[10px] font-bold text-primary uppercase mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">lightbulb</span> What This Means for Lead Quality
                                    </h4>
                                    <p className="text-sm text-gray-300 italic leading-relaxed">"{brand.sections.target_audience.lead_quality}"</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <section className="space-y-4" id="deep-audit">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Deep Audit: Gaps & Improvements</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {brand.sections.gaps_improvements.map((item, idx) => (
                            <div key={idx} className="bg-panel-dark border border-panel-border rounded-xl p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-sm font-black text-primary uppercase">{idx + 1}. {item.gap}</h4>
                                    <span className="text-[9px] font-mono text-yellow-500/80 bg-yellow-500/10 px-2 py-1 rounded">PRIORITY: HIGH</span>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="bg-background-dark/40 p-3 rounded border border-panel-border/50">
                                        <span className="text-[9px] uppercase font-bold text-gray-500 block mb-1">Impact</span>
                                        <p className="text-xs text-gray-300">{item.impact}</p>
                                    </div>
                                    {item.improvement_opportunity && (
                                        <div className="bg-primary/5 p-3 rounded border border-primary/20">
                                            <span className="text-[9px] uppercase font-bold text-primary block mb-1">Improvement Opportunity</span>
                                            <p className="text-xs text-gray-300">
                                                {item.improvement_opportunity}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {brand.sections.brand_limitations && (
                    <section className="bg-panel-dark border border-panel-border rounded-xl p-8 border-l-4 border-l-red-500/50" id="limitations">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-red-400 p-2 bg-red-500/10 rounded">block</span>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-red-400">What This Brand Should Not Try to Do</h3>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            {brand.sections.brand_limitations}
                        </p>
                    </section>
                )}

                <section className="space-y-4" id="performance">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Performance & Digital Readiness</h2>
                        <div className="h-px bg-panel-border flex-grow"></div>
                    </div>
                    <p className="text-[10px] text-gray-500 font-mono">
                        Scores received by PageSpeed Insights by Google - <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://pagespeed.web.dev/</a>
                    </p>
                    {brand.metrics.performance ? (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-panel-dark border border-panel-border p-6 rounded-xl flex flex-col items-center">
                                <div className={`text-4xl font-black mb-1 ${getScoreColor(brand.metrics.performance)}`}>{brand.metrics.performance}</div>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Performance</span>
                                <div className="w-full bg-background-dark h-1 mt-4 rounded-full overflow-hidden">
                                    <div className={`${getScoreBarColor(brand.metrics.performance)} h-full`} style={{ width: `${brand.metrics.performance}%` }}></div>
                                </div>
                            </div>
                            <div className="bg-panel-dark border border-panel-border p-6 rounded-xl flex flex-col items-center">
                                <div className={`text-4xl font-black mb-1 ${getScoreColor(brand.metrics.accessibility || 0)}`}>{brand.metrics.accessibility}</div>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Accessibility</span>
                                <div className="w-full bg-background-dark h-1 mt-4 rounded-full overflow-hidden">
                                    <div className={`${getScoreBarColor(brand.metrics.accessibility || 0)} h-full`} style={{ width: `${brand.metrics.accessibility}%` }}></div>
                                </div>
                            </div>
                            <div className="bg-panel-dark border border-panel-border p-6 rounded-xl flex flex-col items-center">
                                <div className={`text-4xl font-black mb-1 ${getScoreColor(brand.metrics.bestPractices || 0)}`}>{brand.metrics.bestPractices}</div>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Best Practices</span>
                                <div className="w-full bg-background-dark h-1 mt-4 rounded-full overflow-hidden">
                                    <div className={`${getScoreBarColor(brand.metrics.bestPractices || 0)} h-full`} style={{ width: `${brand.metrics.bestPractices}%` }}></div>
                                </div>
                            </div>
                            <div className="bg-panel-dark border border-panel-border p-6 rounded-xl flex flex-col items-center">
                                <div className={`text-4xl font-black mb-1 ${getScoreColor(brand.metrics.seo || 0)}`}>{brand.metrics.seo}</div>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">SEO</span>
                                <div className="w-full bg-background-dark h-1 mt-4 rounded-full overflow-hidden">
                                    <div className={`${getScoreBarColor(brand.metrics.seo || 0)} h-full`} style={{ width: `${brand.metrics.seo}%` }}></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-panel-dark border border-panel-border p-6 rounded-xl flex items-center justify-center">
                            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">No website</p>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-panel-dark/40 border border-panel-border p-6 rounded-xl">
                            <h4 className="text-[10px] font-black uppercase text-primary mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">visibility</span> Performance Leakage
                            </h4>
                            <p className="text-sm text-gray-400 leading-relaxed">{brand.sections.performance_leakage}</p>
                        </div>
                        <div className="bg-panel-dark/40 border border-panel-border p-6 rounded-xl">
                            <h4 className="text-[10px] font-black uppercase text-primary mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">trending_up</span> Land & Expand
                            </h4>
                            <p className="text-sm text-gray-400 leading-relaxed">{brand.sections.land_expand}</p>
                        </div>
                    </div>
                </section>

                <section className="bg-panel-dark border border-panel-border rounded-xl p-8" id="context">
                    <h3 className="text-xs font-black uppercase tracking-widest mb-6">Group Context & Expansion Potential</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <p className="text-sm text-slate-gray leading-loose">
                                Understanding {brand.name}s placement within the Gearhouse Group is essential for high-level tenders. The brand serves as a specialized gateway, offering clients a high-touch, boutique service model while simultaneously providing the massive logistical security of the continent's largest technical supplier.
                            </p>
                            <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl">
                                <span className="text-[10px] font-black uppercase text-primary block mb-2 tracking-widest">Growth Loop: Land, Expand, Retain</span>
                                <div className="grid grid-cols-3 gap-4 pt-2">
                                    <div className="text-center p-3 bg-background-dark rounded border border-panel-border">
                                        <span className="material-symbols-outlined text-primary mb-2">anchor</span>
                                        <div className="text-[10px] font-black uppercase mb-1">Land</div>
                                        <div className="text-[9px] text-gray-500">Niche Lead</div>
                                    </div>
                                    <div className="text-center p-3 bg-background-dark rounded border border-panel-border">
                                        <span className="material-symbols-outlined text-primary mb-2">add_circle</span>
                                        <div className="text-[10px] font-black uppercase mb-1">Expand</div>
                                        <div className="text-[9px] text-gray-500">Group AV & Staging</div>
                                    </div>
                                    <div className="text-center p-3 bg-background-dark rounded border border-panel-border">
                                        <span className="material-symbols-outlined text-primary mb-2">sync</span>
                                        <div className="text-[10px] font-black uppercase mb-1">Retain</div>
                                        <div className="text-[9px] text-gray-500">Multi-Year Partners</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main >

            <footer className="mt-12 border-t border-panel-border bg-panel-dark/50 backdrop-blur-md">
                <div className="max-w-[1600px] mx-auto px-6 py-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                        <div className="max-w-md">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-primary">analytics</span>
                                <h3 className="text-xs font-black uppercase tracking-widest">Closing Audit Note</h3>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                The primary growth opportunity lies in <span className="text-white font-semibold">problem framing</span>. By better leveraging the Gearhouse Group identity as a security layer, {brand.name} can move from being a 'vendor' to a 'strategic production partner.'
                            </p>
                        </div>
                        <div className="flex gap-8">
                            {prevBrand && (
                                <Link className="flex flex-col group" href={`/brands/${prevBrand.slug}`}>
                                    <span className="text-[10px] text-gray-500 font-black uppercase mb-2 flex items-center gap-2 group-hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-xs">arrow_back</span> Previous Brand
                                    </span>
                                    <span className="text-sm font-bold text-gray-200">{prevBrand.name}</span>
                                </Link>
                            )}
                            {nextBrand && (
                                <Link className="flex flex-col items-end group text-right" href={`/brands/${nextBrand.slug}`}>
                                    <span className="text-[10px] text-gray-500 font-black uppercase mb-2 flex items-center gap-2 group-hover:text-primary transition-colors">
                                        Next Brand <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                    </span>
                                    <span className="text-sm font-bold text-gray-200">{nextBrand.name}</span>
                                </Link>
                            )}
                        </div>
                    </div>

                    {brand.sections.lead_growth_recommendations && (
                        <div className="mt-12 pt-12 border-t border-panel-border/30">
                            <h3 className="text-sm font-black uppercase tracking-widest mb-8 text-white">Lead Growth Recommendations</h3>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                                <div className="lg:col-span-8">
                                    <h4 className="text-[10px] font-bold text-primary uppercase mb-3">Overview</h4>
                                    <p className="text-sm text-gray-300 leading-relaxed max-w-3xl">
                                        {brand.sections.lead_growth_recommendations.overview}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="bg-background-dark/30 border border-panel-border rounded-lg p-6">
                                    <h4 className="text-[10px] font-bold text-primary uppercase mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">filter_center_focus</span> Recommended Focus Areas
                                    </h4>
                                    <ul className="space-y-3">
                                        {brand.sections.lead_growth_recommendations.focus_areas.map((area, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                                                <span className="material-symbols-outlined text-primary text-base leading-none translate-y-0.5">check</span>
                                                <span>{area}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-background-dark/30 border border-panel-border rounded-lg p-6">
                                    <h4 className="text-[10px] font-bold text-primary uppercase mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">trending_up</span> Expected Outcomes
                                    </h4>
                                    <ul className="space-y-3">
                                        {brand.sections.lead_growth_recommendations.expected_outcomes.map((outcome, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                                                <span className="material-symbols-outlined text-primary text-base leading-none translate-y-0.5">arrow_forward</span>
                                                <span>{outcome}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-primary/5 border border-primary/10 rounded-lg p-6">
                                <h4 className="text-[10px] font-bold text-primary uppercase mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">campaign</span> Channel & Copy Recommendations
                                </h4>
                                <p className="text-xs text-gray-400 leading-relaxed font-mono">
                                    {brand.sections.lead_growth_recommendations.channel_copy}
                                </p>
                            </div>
                        </div>
                    )}

                    {brand.sections.broadbrand_intervention && (
                        <div className="mt-12 pt-12 border-t border-panel-border/30">
                            <h3 className="text-sm font-black uppercase tracking-widest mb-8 text-white">How BroadBrand Helps Turn This Audit Into Qualified Lead Growth</h3>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                                <div>
                                    <h4 className="text-[10px] font-bold text-primary uppercase mb-3">Current Growth Constraint</h4>
                                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {brand.sections.broadbrand_intervention.constraint}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-bold text-primary uppercase mb-3">BroadBrand Intervention</h4>
                                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {brand.sections.broadbrand_intervention.intervention}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                                <div className="lg:col-span-7">
                                    <h4 className="text-[10px] font-bold text-primary uppercase mb-4">How BroadBrand Supports This in Practice</h4>
                                    <ul className="space-y-6">
                                        {brand.sections.broadbrand_intervention.practical_support.map((item, idx) => (
                                            <li key={idx}>
                                                <h5 className="text-xs font-bold text-white mb-1">{item.title}</h5>
                                                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="lg:col-span-5">
                                    <div className="bg-background-dark/30 border border-panel-border rounded-lg p-6">
                                        <h4 className="text-[10px] font-bold text-primary uppercase mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">published_with_changes</span> Resulting Shift in Lead Quality
                                        </h4>
                                        <ul className="space-y-3">
                                            {brand.sections.broadbrand_intervention.lead_quality_shift.map((outcome, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                                    <span className="material-symbols-outlined text-primary text-base leading-none translate-y-0.5">arrow_forward</span>
                                                    <span>{outcome}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="mt-12 pt-8 border-t border-panel-border/30 flex justify-between items-center text-[9px] font-mono text-gray-600">
                        <div className="flex items-center gap-3">
                            <span>© 2026 Gearhouse Audit by Broadbrand</span>
                            <img
                                src="/logos/broadbrand.png"
                                alt="Broadbrand"
                                className="h-3 w-auto object-contain brightness-0 invert opacity-50"
                            />
                        </div>
                        <span className="text-primary/40 uppercase">Confidential Report</span>
                    </div>
                </div>
            </footer>
        </>
    );
}
