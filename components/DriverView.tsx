'use client';
import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { C, SPOTS, EVENTS, Spot } from '@/lib/data';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import Pill from '@/components/ui/Pill';
import Bar from '@/components/ui/Bar';

const PragueMap = dynamic(() => import('@/components/PragueMap'), { ssr: false });

type GateState = 'idle' | 'opening' | 'open';

export default function DriverView() {
  const [eventIdx, setEventIdx] = useState(0);
  const [active, setActive] = useState<Spot | null>(null);
  const [gate, setGate] = useState<GateState>('idle');

  const mult = EVENTS[eventIdx].mult;
  const o2Price = Math.round(2 * mult);

  const handleGate = useCallback(() => {
    if (gate !== 'idle') return;
    setGate('opening');
    setTimeout(() => setGate('open'), 2000);
    setTimeout(() => setGate('idle'), 5000);
  }, [gate]);

  useEffect(() => {
    setGate('idle');
  }, [active]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: 16,
      }}
    >
      {/* Left column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Card title="Dynamic pricing">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            {EVENTS.map((ev, i) => (
              <Pill
                key={ev.label}
                label={ev.label}
                active={i === eventIdx}
                onClick={() => setEventIdx(i)}
              />
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 8,
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 28, fontWeight: 800, color: C.text }}>
              {o2Price} €
            </span>
            <span style={{ fontSize: 13, color: C.textMid }}>/ hour at O2 Arena</span>
            {mult > 1.5 && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.red,
                  background: C.redLight,
                  padding: '2px 8px',
                  borderRadius: 6,
                }}
              >
                {mult}× surge
              </span>
            )}
          </div>
          <Bar value={mult * 20} max={100} color={mult > 3 ? C.red : C.accent} label="Demand level" />
        </Card>

        <Card title="Prague — live map">
          <PragueMap spots={SPOTS} mult={mult} active={active} onSelect={setActive} />
        </Card>
      </div>

      {/* Right column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Card title="Spot detail">
          {!active ? (
            <div style={{ color: C.textSoft, fontSize: 14, padding: '32px 0', textAlign: 'center' }}>
              → Select a spot on the map
            </div>
          ) : (
            <div style={{ animation: 'fadeIn .25s ease' }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 8 }}>
                {active.name}
              </h4>
              <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                <Tag label={active.type} />
                <Tag
                  label={active.available ? 'Available' : 'Occupied'}
                  color={active.available ? C.green : C.red}
                  bg={active.available ? C.greenLight : C.redLight}
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    background: C.bg,
                    borderRadius: 8,
                    padding: 12,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 2 }}>Price now</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>
                    {Math.round(active.basePrice * mult)} €
                  </div>
                </div>
                <div
                  style={{
                    background: C.bg,
                    borderRadius: 8,
                    padding: 12,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 2 }}>Host</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{active.owner}</div>
                </div>
              </div>

              {/* Gateless access */}
              <div
                style={{
                  background: C.bg,
                  borderRadius: 8,
                  padding: 14,
                  border: `1px solid ${C.border}`,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: C.textSoft,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: 8,
                  }}
                >
                  Gateless access
                </div>
                {gate === 'idle' && (
                  <button
                    onClick={handleGate}
                    style={{
                      width: '100%',
                      padding: '10px 0',
                      fontSize: 13,
                      fontWeight: 700,
                      color: C.surface,
                      background: C.accent,
                      border: 'none',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    Open barrier
                  </button>
                )}
                {gate === 'opening' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', padding: '8px 0' }}>
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        border: `2px solid ${C.accent}`,
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin .6s linear infinite',
                      }}
                    />
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.accent }}>
                      Opening barrier…
                    </span>
                  </div>
                )}
                {gate === 'open' && (
                  <div style={{ textAlign: 'center', padding: '8px 0' }}>
                    <div style={{ fontSize: 20, color: C.green, marginBottom: 4 }}>✓</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.green }}>Barrier open</div>
                    <div style={{ fontSize: 11, color: C.textSoft, marginTop: 4 }}>
                      Auto-closes in a few seconds
                    </div>
                  </div>
                )}
              </div>

              {active.available && (
                <button
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    fontSize: 14,
                    fontWeight: 700,
                    color: C.surface,
                    background: C.green,
                    border: 'none',
                    borderRadius: 10,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  Book this spot
                </button>
              )}
            </div>
          )}
        </Card>

        {/* Mini stats */}
        {[
          { label: 'Spots nearby', value: '14', sub: 'within 500m' },
          { label: 'Avg time saved', value: '18 min', sub: 'vs. street parking' },
          { label: 'CO₂ saved today', value: '2.4 kg', sub: 'less cruising' },
        ].map((s) => (
          <Card key={s.label}>
            <div style={{ fontSize: 11, color: C.textSoft, marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.text }}>{s.value}</div>
            <div style={{ fontSize: 11, color: C.textMid }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      {/* Responsive: collapse to 1 col on small screens */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 340px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
