import clsx from "clsx";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export function Section({ children, className, id, ...props }: SectionProps) {
    return (
        <section
            id={id}
            className={clsx("py-20 sm:py-32 overflow-hidden scroll-mt-24", className)}
            {...props}
        >
            {children}
        </section>
    );
}
