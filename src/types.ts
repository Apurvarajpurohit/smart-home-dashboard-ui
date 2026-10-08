export type DeviceStatus = "online" | "offline" | "flaky";

export interface Room {
  id: string;
  name: string;
  floor: string;
}

export interface LightEntity {
  id: string;
  name: string;
  roomId: string;
  on: boolean;
  brightness: number; // 0-100, only meaningful when on
  controlledBy: string; // which automation/pattern controls it, for display
}

export interface ClimateEntity {
  id: string;
  name: string;
  roomId: string;
  kind: "cooler" | "fan" | "exhaust";
  on: boolean;
  mode: "auto" | "manual";
  currentTemp: number;
  targetTemp: number;
  history: { time: string; temp: number }[];
}

export interface SecuritySensor {
  id: string;
  name: string;
  kind: "door" | "window" | "safe" | "motion";
  state: "closed" | "open";
  lastChanged: string;
}

export type SecurityMode = "armed_away" | "armed_home" | "disarmed";

export interface ZigbeeDevice {
  id: string;
  name: string;
  roomId: string;
  type: "sensor" | "switch" | "light" | "button";
  status: DeviceStatus;
  battery: number | null; // null if mains-powered
  signal: number; // 0-100 link quality
  lastSeen: string;
}

export interface AutomationSummary {
  id: string;
  name: string;
  enabled: boolean;
  mode: "single" | "restart" | "queued" | "parallel";
  lastTriggered: string | null;
  description: string;
  category: "lighting" | "climate" | "security" | "maintenance" | "notification";
}

export interface ActivityEvent {
  id: string;
  time: string;
  message: string;
  severity: "info" | "warning" | "critical";
}
