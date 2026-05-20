'use client';
import React from 'react';
import { C } from '@/lib/data';

export type Role = 'driver' | 'owner' | 'admin';

interface TabBarProps {
  role: Role;
  onChange: (role: Role) => void;
}

const ICONS: Record<Role, React.ReactNode> = {
  driver: (
    <path d="M5 11l1.6-4.3A2 2 0 018.5 5.4h7a2 2 0 011.9 1.3L19 11m-14 0h14m-14 0v4.5a1 1 0 001 1h1a1 1 0 001-1V15h8v.5a1 1 0 001 1h1a1 1 0 001-1V11M7.5 14h.01M16.5 14h.01" />
  ),
  owner: (
    <path d="M3.5 11L12 4l8.5 7M5.5 9.7V19a1 1 0 001 1h3.5v-5h4v5H18a1 1 0 001-1V9.7" />
  ),
  admin: (
    <path d="M3.5 20.5h17M7 20.5V11M12 20.5V4.5M17 20.5v-6.5" />
  ),
};

const LABELS: Record<Role, string> = {
  driver: 'Driver',
  owner: 'Host',
  admin: 'Admin',
};

export default function TabBar({ role, onChange }: TabBarProps) {
  const roles: Role[] = ['driver', 'owner', 'admin'];
  return (
    <div
      style={{
        flexShrink: 0,
        display: 'flex',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderTop: `1px solid ${C.border}`,
        padding: '8px 16px 26px',
        zIndex: 30,
      }}
    >
      {roles.map((r) => {
        const active = r === role;
        const color = active ? C.accent : C.textSoft;
        return (
          <button
            key={r}
            onClick={() => onChange(r)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'inherit',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: 'stroke .15s ease' }}
            >
              {ICONS[r]}
            </svg>
            <span style={{ fontSize: 10, fontWeight: 600, color }}>{LABELS[r]}</span>
          </button>
        );
      })}
    </div>
  );
}
