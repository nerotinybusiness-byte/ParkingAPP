'use client';
import React, { useState } from 'react';
import { C } from '@/lib/data';
import DriverView from '@/components/DriverView';
import OwnerView from '@/components/OwnerView';
import AdminView from '@/components/AdminView';
import PhoneFrame from '@/components/PhoneFrame';
import TabBar, { Role } from '@/components/TabBar';

const TITLES: Record<Role, { eyebrow: string; title: string }> = {
  driver: { eyebrow: 'ParkShare', title: 'Find parking' },
  owner: { eyebrow: 'ParkShare', title: 'My spots' },
  admin: { eyebrow: 'ParkShare', title: 'Dashboard' },
};

const FEATURES = [
  { icon: '📍', title: 'Dynamic pricing', text: 'Prices react to demand in real time — hockey games, morning rush, Christmas markets.' },
  { icon: '🅿️', title: 'Share your spot', text: 'Rent out your garage or yard and earn money when you\'re not using it.' },
  { icon: '📊', title: 'Smart dashboard', text: 'Live occupancy metrics, supply-demand balance and unit economics at a glance.' },
];

export default function Home() {
  const [role, setRole] = useState<Role>('driver');

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(1200px 600px at 80% -10%, #dce5f0 0%, transparent 55%), radial-gradient(900px 500px at 0% 110%, #e7f2ec 0%, transparent 50%), linear-gradient(135deg, #f2f4f7 0%, #f9f9f8 50%, #f1f5f2 100%)',
        fontFamily: 'Figtree, sans-serif',
      }}
    >
      <div
        className="landing"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '56px 32px',
          display: 'grid',
          gridTemplateColumns: '1fr 460px',
          gap: 48,
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        {/* Marketing column */}
        <div className="marketing">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              fontWeight: 700,
              color: C.accent,
              background: C.accentLight,
              border: `1px solid ${C.accentMid}`,
              padding: '6px 14px',
              borderRadius: 999,
              marginBottom: 24,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.accent, animation: 'ping 1.6s ease-out infinite' }} />
            LIVE DEMO — try the phone on the right
          </div>

          <h1
            style={{
              fontSize: 52,
              lineHeight: 1.05,
              fontWeight: 800,
              color: C.text,
              letterSpacing: '-0.03em',
              marginBottom: 20,
            }}
          >
            Smart shared
            <br />
            parking for
            <span style={{ color: C.accent }}> Prague</span>
          </h1>

          <p style={{ fontSize: 18, lineHeight: 1.6, color: C.textMid, maxWidth: 460, marginBottom: 36 }}>
            ParkShare connects drivers looking for parking with owners of available spots.
            Try all three app views in the interactive phone demo.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 480 }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 2 }}>{f.title}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.5, color: C.textMid }}>{f.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phone column */}
        <div className="phone-col" style={{ display: 'flex', justifyContent: 'center' }}>
          <PhoneFrame
            eyebrow={TITLES[role].eyebrow}
            title={TITLES[role].title}
            tabBar={<TabBar role={role} onChange={setRole} />}
          >
            <div key={role} style={{ animation: 'fadeIn .3s ease' }}>
              {role === 'driver' && <DriverView />}
              {role === 'owner' && <OwnerView />}
              {role === 'admin' && <AdminView />}
            </div>
          </PhoneFrame>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .landing {
            grid-template-columns: 1fr !important;
            justify-items: center;
            text-align: center;
            padding: 40px 20px !important;
            gap: 32px !important;
          }
          .marketing h1 { font-size: 36px !important; }
          .phone-col { order: -1; }
        }
      `}</style>
    </main>
  );
}
