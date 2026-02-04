interface MetricCardProps {
    label: string;
    value: string | number;
    description?: string;
    score?: number;
}

export default function MetricCard({ label, value, description, score }: MetricCardProps) {
    // Simple color logic based on score if provided (0-100)
    // or just general utility
    let scoreColor = 'text-gray-900';
    if (score !== undefined) {
        if (score >= 90) scoreColor = 'text-green-600';
        else if (score >= 50) scoreColor = 'text-orange-600';
        else scoreColor = 'text-red-600';
    }

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg px-4 py-5 sm:p-6 border border-gray-100">
            <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
            <dd className={`mt-1 text-3xl font-semibold ${scoreColor}`}>{value}</dd>
            {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
            {score !== undefined && (
                <div className="mt-2 text-xs text-gray-400">Score: {score}/100</div>
            )}
        </div>
    );
}
