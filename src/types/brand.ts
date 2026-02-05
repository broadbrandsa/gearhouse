export interface BrandMetrics {
    performance?: number;
    accessibility?: number;
    bestPractices?: number;
    seo?: number;
}

export interface BrandDiscoveryPattern {
    title: string;
    description: string;
    icon: string;
}

export interface BrandGap {
    gap: string;
    impact: string;
    why_matters?: string;
    improvement_opportunity?: string;
}

export interface BrandSocialPresence {
    intro: string;
    observed: string[];
    doing_well: string[];
    limits_growth: string[];
    lead_quality: string[];
    recommended_role: string[];
}

export interface BrandSections {
    overview: string; // Used for header description
    what_delivers?: string; // Specific "What this brand delivers" text
    how_it_fits?: string; // Specific "How it fits within the group" text
    how_buyers_find: string; // Keep for backward compatibility or generic usage
    discovery_patterns?: BrandDiscoveryPattern[];
    discovery_insight?: string; // Audit insight for discovery
    priority_channels: {
        channel: string;
        action: string;
    }[];
    priority_channels_analysis?: {
        channel: string;
        why_matters: string;
        success_looks_like: string;
    }[];
    current_presence: string;
    gaps_improvements: BrandGap[];
    performance_leakage: string;
    additional_channels: string[];
    audit_recommendation?: string;
    land_expand: string;
    target_audience?: {
        primary: string;           // Primary decision-makers
        motivators: string;        // What motivates their decisions
        validation_channels: string[]; // Where they validate those decisions
        lead_quality: string;      // What this means for lead quality
    };
    decision_context?: string; // New section 1
    brand_limitations?: string; // New section 2
    social_presence?: BrandSocialPresence;
    lead_growth_recommendations?: {
        overview: string;
        focus_areas: string[];
        channel_copy: string;
        expected_outcomes: string[];
    };
    broadbrand_intervention?: {
        constraint: string;
        intervention: string;
        practical_support: {
            title: string;
            description: string;
        }[];
        lead_quality_shift: string[];
    };
}


export interface Brand {
    slug: string;
    name: string;
    logo?: string; // Path to brand logo image
    role_tag?: string;
    metrics: BrandMetrics;
    sections: BrandSections;
}
