import type {
  Room,
  LightEntity,
  ClimateEntity,
  SecuritySensor,
  ZigbeeDevice,
  AutomationSummary,
  ActivityEvent,
  SecurityMode,
} from "../types";

// All data on this page is sample/mock data for demonstration purposes only.
// It mirrors the shape of a real Home Assistant-backed smart home dashboard
// but contains no real device identifiers, locations, or personal data.

export const rooms: Room[] = [
  { id: "living_room", name: "Living Room", floor: "Ground Floor" },
  { id: "kitchen", name: "Kitchen", floor: "Ground Floor" },
  { id: "bathroom", name: "Bathroom", floor: "First Floor" },
  { id: "parking", name: "Parking", floor: "Ground Floor" },
  { id: "office", name: "Office", floor: "First Floor" },
  { id: "entrance", name: "Entrance", floor: "Ground Floor" },
];

export const lights: LightEntity[] = [
  { id: "l1", name: "Hall Light", roomId: "living_room", on: true, brightness: 80, controlledBy: "Presence + sunset automation" },
  { id: "l2", name: "Reading Lamp", roomId: "living_room", on: false, brightness: 0, controlledBy: "Manual" },
  { id: "l3", name: "Main Light", roomId: "kitchen", on: true, brightness: 100, controlledBy: "Schedule" },
  { id: "l4", name: "Platform Light", roomId: "kitchen", on: false, brightness: 0, controlledBy: "Force-off at 11am" },
  { id: "l5", name: "Motion Light", roomId: "bathroom", on: false, brightness: 0, controlledBy: "Occupancy sensor" },
  { id: "l6", name: "Gate Light", roomId: "parking", on: true, brightness: 60, controlledBy: "Sunset automation" },
  { id: "l7", name: "Desk Lamp", roomId: "office", on: true, brightness: 45, controlledBy: "Manual" },
  { id: "l8", name: "Entry Light", roomId: "entrance", on: false, brightness: 0, controlledBy: "Door sensor" },
];

export const climateEntities: ClimateEntity[] = [
  {
    id: "c1",
    name: "Living Room Cooler",
    roomId: "living_room",
    kind: "cooler",
    on: true,
    mode: "auto",
    currentTemp: 23.4,
    targetTemp: 22,
    history: [
      { time: "6am", temp: 26.1 },
      { time: "9am", temp: 27.8 },
      { time: "12pm", temp: 29.6 },
      { time: "3pm", temp: 30.2 },
      { time: "6pm", temp: 27.9 },
      { time: "9pm", temp: 24.1 },
      { time: "12am", temp: 22.8 },
    ],
  },
  {
    id: "c2",
    name: "Living Room Fan",
    roomId: "living_room",
    kind: "fan",
    on: true,
    mode: "auto",
    currentTemp: 23.4,
    targetTemp: 22,
    history: [],
  },
  {
    id: "c3",
    name: "Bathroom Exhaust",
    roomId: "bathroom",
    kind: "exhaust",
    on: false,
    mode: "auto",
    currentTemp: 21.0,
    targetTemp: 21,
    history: [],
  },
];

export const securitySensors: SecuritySensor[] = [
  { id: "s1", name: "Main Gate", kind: "door", state: "closed", lastChanged: "2 hours ago" },
  { id: "s2", name: "Side Door", kind: "door", state: "closed", lastChanged: "5 hours ago" },
  { id: "s3", name: "Office Window", kind: "window", state: "closed", lastChanged: "1 day ago" },
  { id: "s4", name: "Safe", kind: "safe", state: "closed", lastChanged: "3 days ago" },
  { id: "s5", name: "Parking Motion", kind: "motion", state: "open", lastChanged: "4 minutes ago" },
];

export const currentSecurityMode: SecurityMode = "armed_home";

export const zigbeeDevices: ZigbeeDevice[] = [
  { id: "z1", name: "Hall Presence Sensor", roomId: "living_room", type: "sensor", status: "online", battery: null, signal: 92, lastSeen: "just now" },
  { id: "z2", name: "Kitchen Presence Sensor", roomId: "kitchen", type: "sensor", status: "offline", battery: 61, signal: 0, lastSeen: "13 days ago" },
  { id: "z3", name: "Bathroom IR Sensor", roomId: "bathroom", type: "sensor", status: "online", battery: 88, signal: 74, lastSeen: "2 min ago" },
  { id: "z4", name: "Parking Presence Sensor", roomId: "parking", type: "sensor", status: "flaky", battery: 45, signal: 38, lastSeen: "9 min ago" },
  { id: "z5", name: "Gate Contact Sensor", roomId: "entrance", type: "sensor", status: "online", battery: 72, signal: 81, lastSeen: "1 min ago" },
  { id: "z6", name: "Wireless Button", roomId: "living_room", type: "button", status: "online", battery: 95, signal: 90, lastSeen: "6 min ago" },
  { id: "z7", name: "Office Door Sensor", roomId: "office", type: "sensor", status: "online", battery: 67, signal: 69, lastSeen: "4 min ago" },
];

export const automations: AutomationSummary[] = [
  { id: "a1", name: "Living Room: Cooler On (Presence + Temp)", enabled: true, mode: "single", lastTriggered: "18 min ago", description: "Turns on cooler when present and warm, with a tracked-state guard against double-toggle.", category: "climate" },
  { id: "a2", name: "Hall Light On (Presence, Dark Only)", enabled: true, mode: "single", lastTriggered: "2 hours ago", description: "Uses sun.sun state instead of calendar-scoped sunset condition.", category: "lighting" },
  { id: "a3", name: "Zigbee Network Watchdog", enabled: true, mode: "single", lastTriggered: "6 days ago", description: "Auto-restarts the Zigbee coordinator if two distant sensors both go offline.", category: "maintenance" },
  { id: "a4", name: "Multi-Tier Door Open Alert Engine", enabled: true, mode: "parallel", lastTriggered: "1 day ago", description: "Layered alerting for safe / main door / other doors with independent repeat cadences.", category: "security" },
  { id: "a5", name: "Grid Failure & Backup Management", enabled: true, mode: "restart", lastTriggered: "11 days ago", description: "Guards the restore branch against a sleeping inverter sensor causing false alerts.", category: "notification" },
  { id: "a6", name: "Watchdog: Critical Automation Health Check", enabled: true, mode: "single", lastTriggered: "9 hours ago", description: "Flags if a critical automation didn't fire, or a security automation got disabled.", category: "maintenance" },
  { id: "a7", name: "Kiosk Charger: Battery Control", enabled: false, mode: "single", lastTriggered: "3 days ago", description: "Temporary workaround automation — kept disabled pending the debounce fix.", category: "maintenance" },
];

export const activityFeed: ActivityEvent[] = [
  { id: "e1", time: "4 min ago", message: "Parking Presence Sensor signal degraded (38% link quality)", severity: "warning" },
  { id: "e2", time: "18 min ago", message: "Living Room Cooler turned on (presence + temperature threshold)", severity: "info" },
  { id: "e3", time: "2 hours ago", message: "Hall Light turned on at dusk", severity: "info" },
  { id: "e4", time: "9 hours ago", message: "Daily automation health check passed", severity: "info" },
  { id: "e5", time: "13 days ago", message: "Kitchen Presence Sensor went offline — still unresolved", severity: "critical" },
];

export const deviceHealthHistory = [
  { day: "Mon", online: 48, offline: 2 },
  { day: "Tue", online: 49, offline: 1 },
  { day: "Wed", online: 45, offline: 5 },
  { day: "Thu", online: 50, offline: 0 },
  { day: "Fri", online: 47, offline: 3 },
  { day: "Sat", online: 49, offline: 1 },
  { day: "Sun", online: 48, offline: 2 },
];
