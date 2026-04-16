export const C = {
  bg:          "#f9f9f8",
  surface:     "#ffffff",
  border:      "#e8e7e4",
  borderStrong:"#d1cfc9",
  text:        "#111110",
  textMid:     "#6b6860",
  textSoft:    "#a3a198",
  accent:      "#1e3a5f",
  accentLight: "#e8edf3",
  accentMid:   "#a3b8d0",
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
  lat: number;
  lng: number;
}

export const SPOTS: Spot[] = [
  { id: 1, name: "Holešovice — Private Garage",  basePrice: 2, type: "Garage",     available: true,  owner: "Jan N.",           lat: 50.1050, lng: 14.4378 },
  { id: 2, name: "Nusle — Courtyard Spot",       basePrice: 3, type: "Yard",       available: true,  owner: "Marie K.",         lat: 50.0640, lng: 14.4340 },
  { id: 3, name: "O2 Arena — Commercial",        basePrice: 2, type: "Commercial", available: true,  owner: "ArenaPark s.r.o.", lat: 50.1047, lng: 14.4900 },
  { id: 4, name: "Vinohrady — Hotel Garage",     basePrice: 4, type: "Hotel",      available: false, owner: "Hotel Omega",      lat: 50.0750, lng: 14.4500 },
  { id: 5, name: "Žižkov — Corporate Lot",       basePrice: 2, type: "Corporate",  available: true,  owner: "Techpark CZ",      lat: 50.0870, lng: 14.4600 },
  { id: 6, name: "Smíchov — Residential",        basePrice: 3, type: "Garage",     available: true,  owner: "HOA Smíchov 12",   lat: 50.0700, lng: 14.4050 },
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
