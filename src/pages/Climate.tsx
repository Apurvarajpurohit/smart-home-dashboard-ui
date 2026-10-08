import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card } from "../components/Card";
import { ToggleSwitch } from "../components/ToggleSwitch";
import { Badge } from "../components/Badge";
import { climateEntities as initial } from "../data/mockData";
import type { ClimateEntity } from "../types";

export function Climate() {
  const [entities, setEntities] = useState<ClimateEntity[]>(initial);

  function toggle(id: string) {
    setEntities((prev) => prev.map((e) => (e.id === id ? { ...e, on: !e.on } : e)));
  }

  const withHistory = entities.find((e) => e.history.length > 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Climate</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Cooler, fan and exhaust control with tracked-state guards against double-toggle bugs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entities.map((entity) => (
          <Card key={entity.id}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium">{entity.name}</p>
                <Badge tone={entity.mode === "auto" ? "blue" : "slate"}>{entity.mode}</Badge>
              </div>
              <ToggleSwitch checked={entity.on} onChange={() => toggle(entity.id)} label={entity.name} />
            </div>
            <div className="mt-4 flex items-end gap-1">
              <span className="text-3xl font-semibold tabular-nums">{entity.currentTemp.toFixed(1)}°</span>
              <span className="mb-1 text-xs text-slate-400">target {entity.targetTemp}°</span>
            </div>
          </Card>
        ))}
      </div>

      {withHistory && (
        <Card title={`${withHistory.name} — 24h temperature`} subtitle="Sample trend data">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={withHistory.history} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="currentColor" className="text-slate-400" />
                <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="text-slate-400" domain={[18, 32]} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "none", fontSize: 13 }}
                  formatter={(value) => [`${value}°C`, "Temperature"]}
                />
                <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  );
}
