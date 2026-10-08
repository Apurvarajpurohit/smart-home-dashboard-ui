import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { zigbeeDevices, deviceHealthHistory, rooms } from "../data/mockData";
import { BatteryWarning, BatteryMedium, BatteryFull, Wifi, WifiOff } from "lucide-react";

const statusTone = { online: "green", offline: "red", flaky: "amber" } as const;

function BatteryIcon({ level }: { level: number | null }) {
  if (level === null) return <span className="text-xs text-slate-400">mains</span>;
  if (level < 30) return <BatteryWarning className="h-4 w-4 text-rose-500" />;
  if (level < 70) return <BatteryMedium className="h-4 w-4 text-amber-500" />;
  return <BatteryFull className="h-4 w-4 text-emerald-500" />;
}

export function Devices() {
  const online = zigbeeDevices.filter((d) => d.status === "online").length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Devices</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Zigbee mesh health — {online} of {zigbeeDevices.length} devices online.
        </p>
      </div>

      <Card title="Network health, last 7 days" subtitle="Sample data">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deviceHealthHistory} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="currentColor" className="text-slate-400" />
              <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="text-slate-400" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="online" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} name="Online" />
              <Bar dataKey="offline" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Offline" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="All devices">
        <ul className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
          {zigbeeDevices.map((device) => (
            <li key={device.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                {device.status === "offline" ? (
                  <WifiOff className="h-4 w-4 text-rose-500" />
                ) : (
                  <Wifi className="h-4 w-4 text-emerald-500" />
                )}
                <div>
                  <p className="text-sm font-medium">{device.name}</p>
                  <p className="text-xs text-slate-400">
                    {rooms.find((r) => r.id === device.roomId)?.name} · last seen {device.lastSeen}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <BatteryIcon level={device.battery} />
                  {device.battery !== null && `${device.battery}%`}
                </div>
                <span className="text-xs text-slate-400">{device.signal}% signal</span>
                <Badge tone={statusTone[device.status]}>{device.status}</Badge>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
