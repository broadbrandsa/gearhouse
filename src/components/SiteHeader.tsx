import Link from 'next/link';
import { getAllBrands } from '@/lib/brands';

export default function SiteHeader() {
    const brands = getAllBrands();

    return (
        <nav className="sticky top-0 z-50 w-full bg-background-dark/95 backdrop-blur-xl border-b border-panel-border">
            <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
                {/* Left: Logos */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center">
                        <img
                            src="/logos/gearhouse.png"
                            alt="Gearhouse"
                            className="h-8 w-auto object-contain brightness-0 invert"
                        />
                    </Link>
                    <div className="h-6 w-px bg-white/20"></div>
                    <Link href="/" className="flex items-center">
                        <img
                            src="/logos/broadbrand.png"
                            alt="Broadbrand"
                            className="h-6 w-auto object-contain brightness-0 invert"
                        />
                    </Link>
                </div>

                {/* Center: Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-sm font-bold uppercase tracking-widest text-slate-gray hover:text-white transition-colors"
                    >
                        Home
                    </Link>

                    <div className="group relative">
                        <button className="text-sm font-bold uppercase tracking-widest text-slate-gray group-hover:text-white transition-colors flex items-center gap-1 py-4">
                            Brands
                            <span className="material-symbols-outlined text-sm">expand_more</span>
                        </button>

                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[240px]">
                            <div className="bg-panel-dark border border-panel-border rounded-xl shadow-2xl p-2 flex flex-col gap-1 backdrop-blur-sm">
                                {brands.map((brand) => (
                                    <Link
                                        key={brand.slug}
                                        href={`/brands/${brand.slug}`}
                                        className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-gray hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        {brand.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Contact Button */}
                <div className="flex items-center">
                    <a
                        href="mailto:yaron@dsg.co.za"
                        className="bg-primary hover:bg-primary-hover text-background-dark px-6 py-2.5 rounded font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">mail</span>
                        Contact Us
                    </a>
                </div>
            </div>
        </nav>
    );
}
