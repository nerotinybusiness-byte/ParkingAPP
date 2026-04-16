'use client';
import React, { useState, useEffect, useRef } from 'react';
import { C } from '@/lib/data';
import Card from '@/components/ui/Card';
import Bar from '@/components/ui/Bar';

const KPI = [
  { label: 'Gross margin', value: '91.4%', color: C.green },
  { label: 'Active spots', value: '1 842', color: C.text },
  { label: 'Bookings today', value: '3 718', color: C.text },
  { label: 'Avg host CAC', value: '1 240 CZK', color: C.yellow },
  { label: 'Cruising cut', value: '~12%', color: C.green },
  { label: 'Revenue MoM', value: '+23%', color: C.green },
];

const UNIT_ROWS = [
  { label: 'Avg booking revenue', value: 68, max: 100, color: C.green, display: '68 CZK' },
  { label: 'Host payout', value: 58, max: 100, color: C.red, display: '-58 CZK' },
  { label: 'Payment processing', value: 3, max: 100, color: C.red, display: '-3 CZK' },
  { label: 'Support cost', value: 1.2, max: 100, color: C.red, display: '-1.2 CZK' },
  { label: 'Contribution margin', value: 5.8, max: 10, color: C.green, display: '5.8 CZK' },
];

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

export default function AdminView() {
  const [sdr, setSdr] = useState(78);
  const [occ, setOcc] = useState(89);
  const sdrRef = useRef(78);
  const occRef = useRef(89);

  useEffect(() => {
    const interval = setInterval(() => {
      sdrRef.current = clamp(sdrRef.current + (Math.random() - 0.5) * 3, 62, 94);
      occRef.current = clamp(occRef.current + (Math.random() - 0.5) * 2, 83, 96);
      setSdr(Math.round(sdrRef.current * 10) / 10);
      setOcc(Math.round(occRef.current * 10) / 10);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const sdrInRange = sdr >= 65 && sdr <= 90;
  const occInSweet = occ >= 85 && occ <= 95;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* KPI strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 12,
        }}
      >
        {KPI.map((k) => (
          <div
            key={k.label}
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: '14px 16px',
              animation: 'fadeIn .3s ease',
            }}
          >
            <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 4 }}>{k.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* SDR card */}
        <Card title="Supply-Demand Ratio (SDR)">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
            {/* Circular gauge */}
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: '50%',
                border: `6px solid ${C.border}`,
                borderTopColor: sdrInRange ? C.green : C.yellow,
                borderRightColor: sdrInRange ? C.green : C.yellow,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'border-color .4s ease',
              }}
            >
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: C.text, textAlign: 'center' }}>
                  {sdr.toFixed(1)}
                </div>
                <div style={{ fontSize: 10, color: C.textSoft, textAlign: 'center' }}>SDR</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: C.textMid, marginBottom: 8 }}>
                Real-time supply vs demand balance
              </div>
              {/* Status badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  color: sdrInRange ? C.green : C.yellow,
                  background: sdrInRange ? C.greenLight : C.yellowLight,
                  padding: '4px 10px',
                  borderRadius: 6,
                }}
              >
                {sdrInRange ? '✓ Balanced market' : '⚠ Out of range'}
              </div>
            </div>
          </div>

          {/* Zone bar */}
          <div style={{ position: 'relative', height: 20, marginBottom: 6 }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 4,
                background: `linear-gradient(to right, ${C.redLight} 0%, ${C.greenLight} 30%, ${C.greenLight} 70%, ${C.yellowLight} 100%)`,
                border: `1px solid ${C.border}`,
              }}
            />
            {/* Indicator */}
            <div
              style={{
                position: 'absolute',
                left: `${((sdr - 50) / 50) * 100}%`,
                top: 2,
                width: 4,
                height: 16,
                borderRadius: 2,
                background: C.text,
                transition: 'left .4s ease',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.textSoft }}>
            <span>Under-supply</span>
            <span>Optimum (65–90)</span>
            <span>Over-supply</span>
          </div>
        </Card>

        {/* Occupancy card */}
        <Card title="Occupancy rate">
          <div style={{ fontSize: 42, fontWeight: 800, color: C.text, marginBottom: 8 }}>
            {occ.toFixed(1)}%
          </div>
          <div style={{ position: 'relative', marginBottom: 8 }}>
            <Bar value={occ} color={occInSweet ? C.green : C.yellow} height={10} />
            {/* Sweet spot markers */}
            <div
              style={{
                position: 'absolute',
                left: '85%',
                top: -2,
                width: 2,
                height: 14,
                background: C.textSoft,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '95%',
                top: -2,
                width: 2,
                height: 14,
                background: C.textSoft,
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.textSoft, marginBottom: 12 }}>
            <span>0%</span>
            <span>Sweet spot 85–95%</span>
            <span>100%</span>
          </div>
          <div
            style={{
              fontSize: 13,
              color: C.textMid,
              background: C.bg,
              padding: 12,
              borderRadius: 8,
              border: `1px solid ${C.border}`,
            }}
          >
            The AI pricing engine continuously adjusts rates to keep city-wide occupancy
            within the 85–95% sweet spot, maximizing revenue while minimizing cruising.
          </div>
        </Card>
      </div>

      {/* Unit economics card */}
      <Card title="Unit economics — per booking">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
          {UNIT_ROWS.map((row) => (
            <div key={row.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                <span style={{ color: C.textMid }}>{row.label}</span>
                <span style={{ fontWeight: 700, color: row.color }}>{row.display}</span>
              </div>
              <Bar value={row.value} max={row.max} color={row.color} height={6} />
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            fontWeight: 700,
            color: C.green,
            background: C.greenLight,
            padding: '4px 10px',
            borderRadius: 6,
          }}
        >
          Gross margin: 91.4%
        </div>
      </Card>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="repeat(6, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
