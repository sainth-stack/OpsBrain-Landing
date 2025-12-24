import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obs-accent-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-obs-bg disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                    {
                        "text-white bg-gradient-to-r from-obs-accent-blue to-obs-accent-teal shadow-lg shadow-blue-950/20 hover:shadow-xl hover:shadow-blue-950/30 hover:brightness-110 active:brightness-95": variant === "primary",
                        "bg-obs-surface-bright/70 text-white hover:bg-obs-surface-bright border border-obs-border": variant === "secondary",
                        "border border-obs-border bg-transparent hover:bg-obs-surface/40 text-obs-text": variant === "outline",
                        "hover:bg-obs-surface/40 text-obs-text": variant === "ghost",
                        "h-9 px-4 text-sm": size === "sm",
                        "h-11 px-6 text-base": size === "md",
                        "h-14 px-8 text-lg": size === "lg",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
