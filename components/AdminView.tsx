'use client';
import React, { useState, useEffect, useRef } from 'react';
import { C } from '@/lib/data';
import Card from '@/components/ui/Card';
import Bar from '@/components/ui/Bar';

const KPI = [
  { label: 'Gross margin', value: '91.4%', color: C.green },
  { label: 'Active spots', value: '1 842', color: C.text },
  { label: 'Bookings today', value: '3 718', color: C.text },
  { label: 'Avg host CAC', value: '50 €', color: C.yellow },
  { label: 'Cruising cut', value: '~12%', color: C.green },
  { label: 'Revenue MoM', value: '+23%', color: C.green },
];

const UNIT_ROWS = [
  { label: 'Avg booking revenue', value: 68, max: 100, color: C.green, display: '2.70 €' },
  { label: 'Host payout', value: 58, max: 100, color: C.red, display: '-2.30 €' },
  { label: 'Payment processing', value: 3, max: 100, color: C.red, display: '-0.12 €' },
  { label: 'Support cost', value: 1.2, max: 100, color: C.red, display: '-0.05 €' },
  { label: 'Contribution margin', value: 5.8, max: 10, color: C.green, display: '0.23 €' },
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* KPI strip — staggered entry */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 8,
        }}
      >
        {KPI.map((k, i) => (
          <div
            key={k.label}
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: '10px 8px',
              animation: `spring .5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.06}s backwards`,
            }}
          >
            <div style={{ fontSize: 9, color: C.textSoft, marginBottom: 3 }}>{k.label}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* SDR card */}
        <Card title="SDR — Live" delay={0.1}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            {/* Circular gauge */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                border: `5px solid ${C.border}`,
                borderTopColor: sdrInRange ? C.green : C.yellow,
                borderRightColor: sdrInRange ? C.green : C.yellow,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'border-color .4s ease',
                animation: sdrInRange ? undefined : 'glowPulse 2s ease infinite',
              }}
            >
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.text, textAlign: 'center', transition: 'color .3s' }}>
                  {sdr.toFixed(1)}
                </div>
                <div style={{ fontSize: 9, color: C.textSoft, textAlign: 'center' }}>SDR</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: 11,
                  fontWeight: 700,
                  color: sdrInRange ? C.green : C.yellow,
                  background: sdrInRange ? C.greenLight : C.yellowLight,
                  padding: '3px 8px',
                  borderRadius: 6,
                  animation: sdrInRange ? undefined : 'pulse 1.5s ease infinite',
                  transition: 'background .3s, color .3s',
                }}
              >
                {sdrInRange ? '✓ Balanced' : '⚠ Out of range'}
              </div>
              <div style={{ fontSize: 11, color: C.textMid, marginTop: 6, lineHeight: 1.4 }}>
                Supply vs demand balance
              </div>
            </div>
          </div>

          {/* Zone bar */}
          <div style={{ position: 'relative', height: 16, marginBottom: 4 }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 4,
                background: `linear-gradient(to right, ${C.redLight} 0%, ${C.greenLight} 30%, ${C.greenLight} 70%, ${C.yellowLight} 100%)`,
                border: `1px solid ${C.border}`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: `${((sdr - 50) / 50) * 100}%`,
                top: 1,
                width: 4,
                height: 14,
                borderRadius: 2,
                background: C.text,
                transition: 'left .5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: C.textSoft }}>
            <span>Under</span>
            <span>Optimum</span>
            <span>Over</span>
          </div>
        </Card>

        {/* Occupancy card */}
        <Card title="Occupancy — Live" delay={0.16}>
          <div style={{ fontSize: 36, fontWeight: 800, color: C.text, marginBottom: 6, transition: 'color .3s' }}>
            {occ.toFixed(1)}%
          </div>
          <div style={{ position: 'relative', marginBottom: 6 }}>
            <Bar value={occ} color={occInSweet ? C.green : C.yellow} height={8} />
            <div
              style={{
                position: 'absolute',
                left: '85%',
                top: -2,
                width: 2,
                height: 12,
                background: C.textSoft,
                opacity: 0.6,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '95%',
                top: -2,
                width: 2,
                height: 12,
                background: C.textSoft,
                opacity: 0.6,
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: C.textSoft, marginBottom: 10 }}>
            <span>0%</span>
            <span>Sweet 85–95%</span>
            <span>100%</span>
          </div>
          <div
            style={{
              fontSize: 11,
              color: C.textMid,
              lineHeight: 1.5,
              background: C.bg,
              padding: 10,
              borderRadius: 8,
              border: `1px solid ${C.border}`,
            }}
          >
            AI pricing engine keeps occupancy in the sweet spot, maximizing revenue.
          </div>
        </Card>
      </div>

      {/* Unit economics */}
      <Card title="Unit economics" delay={0.22}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
          {UNIT_ROWS.map((row, i) => (
            <div key={row.label} style={{ animation: `fadeIn .3s ease ${0.3 + i * 0.06}s backwards` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                <span style={{ color: C.textMid }}>{row.label}</span>
                <span style={{ fontWeight: 700, color: row.color }}>{row.display}</span>
              </div>
              <Bar value={row.value} max={row.max} color={row.color} height={5} />
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 11,
            fontWeight: 700,
            color: C.green,
            background: C.greenLight,
            padding: '3px 8px',
            borderRadius: 6,
          }}
        >
          Gross margin: 91.4%
        </div>
      </Card>

      {/* Responsive */}
      <style>{`
        @container app (max-width: 768px) {
          div[style*="repeat(6, 1fr)"] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
