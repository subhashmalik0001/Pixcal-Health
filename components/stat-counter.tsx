'use client';

import { useEffect, useState } from 'react';

interface StatCounterProps {
  target: number;
  label: string;
  suffix?: string;
}

export function StatCounter({ target, label, suffix = '' }: StatCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = target / 50;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
