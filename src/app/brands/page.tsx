import Link from 'next/link';
import { getAllBrands } from '@/lib/brands';
import MetricCard from '@/components/brands/MetricCard';

export default function BrandsIndex() {
    const brands = getAllBrands();

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900">Brand Audits</h1>
                <p className="mt-4 text-gray-500">Select a brand to view full performance analysis.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {brands.map((brand) => (
                    <Link key={brand.slug} href={`/brands/${brand.slug}`} className="block group">
                        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="px-5 py-5">
                                <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                                    {brand.name}
                                </h3>
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div>
                                        <dt className="text-xs text-gray-500">LCP</dt>
                                        <dd className="text-sm font-semibold text-gray-900">{brand.metrics.lcp}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs text-gray-500">Performance</dt>
                                        <dd className={`text-sm font-semibold ${brand.metrics.score >= 90 ? 'text-green-600' : brand.metrics.score >= 50 ? 'text-orange-600' : 'text-red-600'}`}>
                                            {brand.metrics.score}/100
                                        </dd>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-5 py-3 text-sm text-indigo-600 font-medium group-hover:bg-indigo-50 transition-colors">
                                View Audit &rarr;
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
