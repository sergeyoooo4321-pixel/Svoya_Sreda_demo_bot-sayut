import clsx from "clsx";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "sage" | "clay" | "steel" | "light";
  className?: string;
};

export function Badge({ children, tone = "light", className }: BadgeProps) {
  return <span className={clsx("badge", `badge-${tone}`, className)}>{children}</span>;
}
