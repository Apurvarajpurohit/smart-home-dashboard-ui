import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import {
  lights,
  climateEntities,
  securitySensors,
  zigbeeDevices,
  activityFeed,
  currentSecurityMode,
} from "../data/mockData";
import { Lightbulb, Thermometer, ShieldCheck, Radio, AlertTriangle, Info, Siren } from "lucide-react";

const severityIcon = {
  info: <Info className="h-4 w-4 text-blue-500" />,
  warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
  critical: <Siren className="h-4 w-4 text-rose-500" />,
};

export function Overview() {
  const lightsOn = lights.filter((l) => l.on).length;
  const climateOn = climateEntities.filter((c) => c.on).length;
  const openSensors = securitySensors.filter((s) => s.state === "open").length;
  const onlineDevices = zigbeeDevices.filter((d) => d.status === "online").length;

  const stats = [
    { label: "Lights on", value: `${lightsOn} / ${lights.length}`, icon: Lightbulb, tone: "text-amber-500" },
    { label: "Climate devices active", value: `${climateOn} / ${climateEntities.length}`, icon: Thermometer, tone: "text-blue-500" },
    { label: "Security", value: currentSecurityMode.replace("_", " "), icon: ShieldCheck, tone: "text-emerald-500" },
    { label: "Devices online", value: `${onlineDevices} / ${zigbeeDevices.length}`, icon: Radio, tone: "text-violet-500" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Status across all rooms and systems. All data on this page is sample data for demonstration.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <Card key={label}>
            <div className="flex items-center gap-3">
              <div className={`rounded-xl bg-slate-100 p-2.5 dark:bg-slate-800 ${tone}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                <p className="text-lg font-semibold capitalize">{value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card title="Recent activity" subtitle="Live event feed" className="lg:col-span-2">
          <ul className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
            {activityFeed.map((event) => (
              <li key={event.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <div className="mt-0.5">{severityIcon[event.severity]}</div>
                <div className="flex-1">
                  <p className="text-sm text-slate-800 dark:text-slate-200">{event.message}</p>
                  <p className="text-xs text-slate-400">{event.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Open sensors" subtitle="Doors, windows & motion">
          {openSensors === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">Everything is closed. All clear.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {securitySensors
                .filter((s) => s.state === "open")
                .map((s) => (
                  <li key={s.id} className="flex items-center justify-between text-sm">
                    <span>{s.name}</span>
                    <Badge tone="amber">open</Badge>
                  </li>
                ))}
            </ul>
          )}
          <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {securitySensors.length - openSensors} of {securitySensors.length} sensors closed
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
