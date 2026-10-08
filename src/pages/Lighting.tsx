import { useState } from "react";
import { Card } from "../components/Card";
import { ToggleSwitch } from "../components/ToggleSwitch";
import { rooms, lights as initialLights } from "../data/mockData";
import type { LightEntity } from "../types";
import { Lightbulb } from "lucide-react";

export function Lighting() {
  const [lights, setLights] = useState<LightEntity[]>(initialLights);

  function toggle(id: string) {
    setLights((prev) =>
      prev.map((l) => (l.id === id ? { ...l, on: !l.on, brightness: !l.on ? 80 : 0 } : l))
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Lighting</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Toggle switches update local state only — this is a UI demo, not connected to real hardware.
        </p>
      </div>

      {rooms.map((room) => {
        const roomLights = lights.filter((l) => l.roomId === room.id);
        if (roomLights.length === 0) return null;
        return (
          <div key={room.id}>
            <h2 className="mb-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
              {room.name} · {room.floor}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {roomLights.map((light) => (
                <Card key={light.id}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-xl p-2.5 ${
                          light.on
                            ? "bg-amber-100 text-amber-500 dark:bg-amber-500/10"
                            : "bg-slate-100 text-slate-400 dark:bg-slate-800"
                        }`}
                      >
                        <Lightbulb className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{light.name}</p>
                        <p className="text-xs text-slate-400">{light.controlledBy}</p>
                      </div>
                    </div>
                    <ToggleSwitch checked={light.on} onChange={() => toggle(light.id)} label={light.name} />
                  </div>
                  {light.on && (
                    <div className="mt-4">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                          className="h-full rounded-full bg-amber-400"
                          style={{ width: `${light.brightness}%` }}
                        />
                      </div>
                      <p className="mt-1.5 text-xs text-slate-400">{light.brightness}% brightness</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
