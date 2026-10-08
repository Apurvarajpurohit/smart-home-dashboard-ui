import { useState } from "react";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { securitySensors, currentSecurityMode as initialMode } from "../data/mockData";
import type { SecurityMode } from "../types";
import { DoorOpen, DoorClosed, ShieldCheck, ShieldOff, Home } from "lucide-react";

const modes: { id: SecurityMode; label: string; icon: typeof ShieldCheck }[] = [
  { id: "armed_away", label: "Armed Away", icon: ShieldCheck },
  { id: "armed_home", label: "Armed Home", icon: Home },
  { id: "disarmed", label: "Disarmed", icon: ShieldOff },
];

export function Security() {
  const [mode, setMode] = useState<SecurityMode>(initialMode);
  const openCount = securitySensors.filter((s) => s.state === "open").length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Security</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Arm mode and live sensor states. Backed by a layered alert engine (safe / doors / gate) that
          runs independent repeat cadences per sensor class.
        </p>
      </div>

      <Card title="Arm mode">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {modes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-colors ${
                mode === id
                  ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </div>
      </Card>

      <Card title="Sensors" subtitle={`${openCount} open · ${securitySensors.length - openCount} closed`}>
        <ul className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
          {securitySensors.map((sensor) => (
            <li key={sensor.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                {sensor.state === "open" ? (
                  <DoorOpen className="h-4 w-4 text-amber-500" />
                ) : (
                  <DoorClosed className="h-4 w-4 text-emerald-500" />
                )}
                <div>
                  <p className="text-sm font-medium">{sensor.name}</p>
                  <p className="text-xs text-slate-400">{sensor.lastChanged}</p>
                </div>
              </div>
              <Badge tone={sensor.state === "open" ? "amber" : "green"}>{sensor.state}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
