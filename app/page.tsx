'use client';
import React, { useState } from 'react';
import { C } from '@/lib/data';
import DriverView from '@/components/DriverView';
import OwnerView from '@/components/OwnerView';
import AdminView from '@/components/AdminView';

type Role = 'driver' | 'owner' | 'admin';

const ROLES: { key: Role; label: string; icon: string }[] = [
  { key: 'driver', label: 'Driver', icon: '🚗' },
  { key: 'owner', label: 'Host', icon: '🏠' },
  { key: 'admin', label: 'Admin', icon: '📊' },
];

export default function Home() {
  const [role, setRole] = useState<Role>('driver');

  return (
    <div
      style={{
        maxWidth: 1080,
        margin: '0 auto',
        padding: '24px 20px',
        fontFamily: 'Figtree, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: C.text,
              letterSpacing: '-0.01em',
            }}
          >
            ParkShare
            <span style={{ color: C.accent, marginLeft: 6 }}>Czech Republic</span>
          </h1>
          <p style={{ fontSize: 13, color: C.textMid, marginTop: 2 }}>
            Smart parking marketplace for Prague
          </p>
        </div>

        {/* Role switcher */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: 4,
          }}
        >
          {ROLES.map((r) => (
            <button
              key={r.key}
              onClick={() => setRole(r.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: 600,
                color: role === r.key ? C.accent : C.textMid,
                background: role === r.key ? C.accentLight : 'transparent',
                border: role === r.key ? `1px solid ${C.accent}` : '1px solid transparent',
                borderRadius: 8,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all .15s ease',
              }}
            >
              <span>{r.icon}</span>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* View content */}
      <div style={{ animation: 'fadeIn .3s ease' }} key={role}>
        {role === 'driver' && <DriverView />}
        {role === 'owner' && <OwnerView />}
        {role === 'admin' && <AdminView />}
      </div>
    </div>
  );
}
