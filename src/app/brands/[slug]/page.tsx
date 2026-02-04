import { getAllBrands, getBrandBySlug } from '@/lib/brands';
import MetricCard from '@/components/brands/MetricCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const brands = getAllBrands();
    return brands.map((brand) => ({
        slug: brand.slug,
    }));
}

export default function BrandPage({ params }: { params: { slug: string } }) {
    const brand = getBrandBySlug(params.slug);

    if (!brand) {
        notFound();
    }

    const allBrands = getAllBrands();
    const currentIndex = allBrands.findIndex(b => b.slug === brand.slug);
    const prevBrand = currentIndex > 0 ? allBrands[currentIndex - 1] : null;
    const nextBrand = currentIndex < allBrands.length - 1 ? allBrands[currentIndex + 1] : null;

    const sections = [
        { id: 'overview', label: 'Overview' },
        { id: 'how-buyers-find', label: 'How Buyers Find Us' },
        { id: 'priority-channels', label: 'Priority Channels' },
        { id: 'current-presence', label: 'Current Presence' },
        { id: 'gaps-improvements', label: 'Gaps & Improvements' },
        { id: 'performance', label: 'Performance' },
        { id: 'additional-channels', label: 'Additional Channels' },
        { id: 'land-expand', label: 'Land & Expand' },
    ];

    return (
        <div className="relative">
            {/* Sticky Sub-nav */}
            <div className="sticky top-16 z-40 bg-white/90 backdrop-blur border-b border-gray-200 overflow-x-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-4 py-3 min-w-max">
                        {sections.map(section => (
                            <a key={section.id} href={`#${section.id}`} className="px-3 py-1 rounded-full text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-colors">
                                {section.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900">{brand.name}</h1>
                    <p className="mt-2 text-xl text-gray-500">Performance & Opportunity Audit</p>
                </div>

                <div className="space-y-16">
                    <section id="overview" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                        <div className="bg-white shadow rounded-lg p-6 text-gray-700">
                            {brand.sections.overview}
                        </div>
                    </section>

                    <section id="how-buyers-find" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">How Buyers Find This Solution</h2>
                        <div className="bg-white shadow rounded-lg p-6 text-gray-700">
                            {brand.sections.how_buyers_find}
                        </div>
                    </section>

                    <section id="priority-channels" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Priority Channels</h2>
                        <div className="bg-white shadow rounded-lg p-6">
                            <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                {brand.sections.priority_channels.map((channel, idx) => (
                                    <li key={idx}>{channel}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section id="current-presence" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Presence</h2>
                        <div className="bg-white shadow rounded-lg p-6 text-gray-700">
                            {brand.sections.current_presence}
                        </div>
                    </section>

                    <section id="gaps-improvements" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Gaps & Improvements</h2>
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gap</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Impact</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {brand.sections.gaps_improvements.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900">{item.gap}</td>
                                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">{item.impact}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="performance" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance & Lead Leakage</h2>
                        <p className="mb-6 text-gray-600">{brand.sections.performance_leakage}</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <MetricCard label="LCP" value={brand.metrics.lcp} />
                            <MetricCard label="FCP" value={brand.metrics.fcp} />
                            <MetricCard label="TTFB" value={brand.metrics.ttfb || 'N/A'} />
                            <MetricCard label="CLS" value={brand.metrics.cls} />
                            <MetricCard label="Score" value={brand.metrics.score} score={brand.metrics.score} />
                        </div>
                        {brand.metrics.speedIndex && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                <MetricCard label="Speed Index" value={brand.metrics.speedIndex} />
                            </div>
                        )}
                        {brand.metrics.tbt && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                <MetricCard label="TBT" value={brand.metrics.tbt} />
                            </div>
                        )}
                    </section>

                    <section id="additional-channels" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Channels</h2>
                        <div className="bg-white shadow rounded-lg p-6">
                            <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                {brand.sections.additional_channels.map((channel, idx) => (
                                    <li key={idx}>{channel}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section id="land-expand" className="scroll-mt-28">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Land & Expand</h2>
                        <div className="bg-white shadow rounded-lg p-6 text-gray-700">
                            {brand.sections.land_expand}
                        </div>
                    </section>
                </div>

                {/* Prev/Next Nav */}
                <div className="mt-20 border-t border-gray-200 pt-8 flex justify-between">
                    {prevBrand ? (
                        <Link href={`/brands/${prevBrand.slug}`} className="group flex flex-col items-start">
                            <span className="text-sm text-gray-500">Previous</span>
                            <span className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">{prevBrand.name}</span>
                        </Link>
                    ) : <div />}

                    {nextBrand ? (
                        <Link href={`/brands/${nextBrand.slug}`} className="group flex flex-col items-end">
                            <span className="text-sm text-gray-500">Next</span>
                            <span className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">{nextBrand.name}</span>
                        </Link>
                    ) : <div />}
                </div>
            </div>
        </div>
    );
}
