export const C = {
  bg:          "#f9f9f8",
  surface:     "#ffffff",
  border:      "#e8e7e4",
  borderStrong:"#d1cfc9",
  text:        "#111110",
  textMid:     "#6b6860",
  textSoft:    "#a3a198",
  accent:      "#e8560a",
  accentLight: "#fef3ed",
  accentMid:   "#f7c4a8",
  green:       "#1a7a4a",
  greenLight:  "#eaf4ef",
  red:         "#c0392b",
  redLight:    "#fdf0ef",
  yellow:      "#b45309",
  yellowLight: "#fef9ec",
} as const;

export interface Spot {
  id: number;
  name: string;
  basePrice: number;
  type: string;
  available: boolean;
  owner: string;
  x: number;
  y: number;
}

export const SPOTS: Spot[] = [
  { id: 1, name: "Holešovice — Private Garage",  basePrice: 2, type: "Garage",     available: true,  owner: "Jan N.",           x: 138, y: 72  },
  { id: 2, name: "Nusle — Courtyard Spot",       basePrice: 3, type: "Yard",       available: true,  owner: "Marie K.",         x: 178, y: 152 },
  { id: 3, name: "O2 Arena — Commercial",        basePrice: 2, type: "Commercial", available: true,  owner: "ArenaPark s.r.o.", x: 270, y: 68  },
  { id: 4, name: "Vinohrady — Hotel Garage",     basePrice: 4, type: "Hotel",      available: false, owner: "Hotel Omega",      x: 218, y: 118 },
  { id: 5, name: "Žižkov — Corporate Lot",       basePrice: 2, type: "Corporate",  available: true,  owner: "Techpark CZ",      x: 248, y: 98  },
  { id: 6, name: "Smíchov — Residential",        basePrice: 3, type: "Garage",     available: true,  owner: "HOA Smíchov 12",   x: 112, y: 138 },
];

export const EVENTS = [
  { label: "Normal day",        mult: 1.0 },
  { label: "Hockey at O2",      mult: 4.8 },
  { label: "Morning rush",      mult: 2.1 },
  { label: "Christmas market",  mult: 3.2 },
];

export interface AuditEntry {
  time: string;
  plate: string;
  action: string;
  user: string;
}

export const AUDIT: AuditEntry[] = [
  { time: "08:14", plate: "1AB 2345", action: "Entry", user: "Verified tenant"  },
  { time: "09:02", plate: "2XY 9987", action: "Entry", user: "ParkShare guest"  },
  { time: "09:55", plate: "2XY 9987", action: "Exit",  user: "ParkShare guest"  },
  { time: "11:30", plate: "5PR 4412", action: "Entry", user: "ParkShare guest"  },
  { time: "13:45", plate: "1AB 2345", action: "Exit",  user: "Verified tenant"  },
  { time: "15:20", plate: "3CD 7723", action: "Entry", user: "ParkShare guest"  },
];
