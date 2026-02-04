export default function Methodology() {
    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Audit Methodology</h1>
                <div className="prose prose-indigo text-gray-500">
                    <p className="mb-4">
                        Our audit process evaluates the technical performance and user experience of key brand properties.
                    </p>
                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Core Vitals</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>LCP (Largest Contentful Paint)</strong>: Measures loading performance.</li>
                        <li><strong>FCP (First Contentful Paint)</strong>: Measures visual response.</li>
                        <li><strong>CLS (Cumulative Layout Shift)</strong>: Measures visual stability.</li>
                    </ul>
                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Scoring</h2>
                    <p>
                        Scores are derived from standard Lighthouse performance runs on mobile and desktop simulations.
                    </p>
                </div>
            </div>
        </div>
    );
}
