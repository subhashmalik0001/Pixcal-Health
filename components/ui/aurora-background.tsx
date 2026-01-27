"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
    children: ReactNode;
    showRadialGradient?: boolean;
}

export const AuroraBackground = ({
    className,
    children,
    showRadialGradient = true,
    ...props
}: AuroraBackgroundProps) => {
    return (
        <div
            className={cn(
                "relative flex flex-col min-h-screen bg-background text-foreground",
                className
            )}
            {...props}
        >
            {/* Aurora animated background - Teal/Green healthcare theme only */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div
                    className={cn(
                        "absolute -inset-[10px] opacity-60",
                        "blur-[80px]",
                        showRadialGradient &&
                        "[mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_30%,transparent_100%)]"
                    )}
                    style={{
                        backgroundImage: "linear-gradient(90deg, #0A6E6E 0%, #14B8A6 20%, #0A9090 40%, #27AE60 60%, #10B981 80%, #0A6E6E 100%)",
                        backgroundSize: "200% 100%",
                        animation: "aurora 8s ease-in-out infinite",
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full flex-1">
                {children}
            </div>

            {/* Inline keyframes for animation */}
            <style jsx global>{`
        @keyframes aurora {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
        </div>
    );
};
