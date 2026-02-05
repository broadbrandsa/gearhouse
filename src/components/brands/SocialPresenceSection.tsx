import { BrandSocialPresence } from '@/types/brand';

interface SocialPresenceSectionProps {
    brandName: string;
    content: BrandSocialPresence;
}

const sections = [
    { title: 'What we can clearly observe', key: 'observed' as const },
    { title: 'What the social content is doing well', key: 'doing_well' as const },
    { title: 'Where the social presence limits growth', key: 'limits_growth' as const },
    { title: 'What this means for lead quality', key: 'lead_quality' as const },
    { title: 'Recommended role of social for', key: 'recommended_role' as const }
];

export default function SocialPresenceSection({ brandName, content }: SocialPresenceSectionProps) {
    return (
        <section className="bg-panel-dark border border-panel-border rounded-xl overflow-hidden" id="social-presence">
            <div className="px-6 py-4 border-b border-panel-border flex items-center justify-between bg-background-dark/30">
                <h3 className="text-xs font-black uppercase tracking-widest">Social Presence</h3>
                <span className="text-[9px] font-mono text-gray-500">OBSERVABLE_PATTERNS</span>
            </div>
            <div className="p-6 space-y-6">
                <p className="text-sm text-slate-gray leading-relaxed">{content.intro}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sections.map((section, idx) => (
                        <div
                            key={section.key}
                            className={idx === sections.length - 1 ? 'md:col-span-2 bg-primary/5 border border-primary/20 p-5 rounded-lg' : 'bg-background-dark/40 border border-panel-border p-5 rounded-lg'}
                        >
                            <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">
                                {section.title}{section.key === 'recommended_role' ? ` ${brandName}` : ''}
                            </h4>
                            <ul className="space-y-2">
                                {content[section.key].map((item, itemIdx) => (
                                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-gray-300">
                                        <span className="material-symbols-outlined text-primary text-base leading-none translate-y-0.5">check_small</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
