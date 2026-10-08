import { useState } from "react";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { ToggleSwitch } from "../components/ToggleSwitch";
import { automations as initial } from "../data/mockData";
import type { AutomationSummary } from "../types";

const categoryTone = {
  lighting: "amber",
  climate: "blue",
  security: "red",
  maintenance: "slate",
  notification: "green",
} as const;

export function Automations() {
  const [automations, setAutomations] = useState<AutomationSummary[]>(initial);

  function toggle(id: string) {
    setAutomations((prev) => prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Automations</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {automations.filter((a) => a.enabled).length} of {automations.length} active.
        </p>
      </div>

      <Card>
        <ul className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
          {automations.map((automation) => (
            <li key={automation.id} className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium">{automation.name}</p>
                  <Badge tone={categoryTone[automation.category]}>{automation.category}</Badge>
                  <Badge tone="slate">mode: {automation.mode}</Badge>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{automation.description}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {automation.lastTriggered ? `Last triggered ${automation.lastTriggered}` : "Never triggered"}
                </p>
              </div>
              <ToggleSwitch checked={automation.enabled} onChange={() => toggle(automation.id)} label={automation.name} />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
