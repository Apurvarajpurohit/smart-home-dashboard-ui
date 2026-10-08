type Tone = "green" | "red" | "amber" | "slate" | "blue";

const toneClasses: Record<Tone, string> = {
  green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  red: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  slate: "bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-400",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
};

export function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}
