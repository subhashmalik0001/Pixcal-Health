'use client';

import { ReactNode } from 'react';
import { Activity } from 'lucide-react';

interface VitalsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  status: 'green' | 'yellow' | 'red';
  icon: ReactNode;
  trend?: string;
  description?: string;
}

export function VitalsCard({
  title,
  value,
  unit,
  status,
  icon,
  trend,
  description,
}: VitalsCardProps) {
  const statusColors = {
    green: 'border-green-success/30 bg-green-success/10',
    yellow: 'border-amber-warning/30 bg-amber-warning/10',
    red: 'border-red-critical/30 bg-red-critical/10',
  };

  const statusBadgeColors = {
    green: 'bg-green-success',
    yellow: 'bg-amber-warning',
    red: 'bg-red-critical',
  };

  return (
    <div
      className={`rounded-2xl border-2 p-6 backdrop-blur-md transition-all hover:shadow-lg ${statusColors[status]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg glass/50">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">{title}</h3>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${statusBadgeColors[status]}`} />
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-bold text-foreground">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>

      {trend && (
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Activity className="w-3 h-3" />
          {trend}
        </p>
      )}
    </div>
  );
}
