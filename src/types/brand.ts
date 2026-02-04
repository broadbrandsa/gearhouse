export interface BrandMetrics {
    lcp: string;
    fcp: string;
    ttfb?: string;
    cls: string;
    score: number;
    speedIndex?: string;
    tbt?: string;
}

export interface BrandGap {
    gap: string;
    impact: string;
}

export interface BrandSections {
    overview: string;
    how_buyers_find: string;
    priority_channels: string[];
    current_presence: string;
    gaps_improvements: BrandGap[];
    performance_leakage: string;
    additional_channels: string[];
    land_expand: string;
}

export interface Brand {
    slug: string;
    name: string;
    metrics: BrandMetrics;
    sections: BrandSections;
}
