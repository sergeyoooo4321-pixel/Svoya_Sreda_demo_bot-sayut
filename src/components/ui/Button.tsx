import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "dark";

const variantClasses: Record<Variant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  ghost: "btn btn-ghost",
  dark: "btn btn-dark"
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

export function ButtonLink({ href, children, variant = "primary", className, icon, target, rel, ariaLabel }: ButtonLinkProps) {
  return (
    <Link href={href} className={clsx(variantClasses[variant], className)} target={target} rel={rel} aria-label={ariaLabel}>
      <span>{children}</span>
      {icon}
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  icon?: ReactNode;
};

export function Button({ children, variant = "primary", className, icon, ...props }: ButtonProps) {
  return (
    <button className={clsx(variantClasses[variant], className)} {...props}>
      <span>{children}</span>
      {icon}
    </button>
  );
}
