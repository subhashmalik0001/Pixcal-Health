"use client";

import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <AuroraBackground className="min-h-screen">
            {children}
        </AuroraBackground>
    );
}
