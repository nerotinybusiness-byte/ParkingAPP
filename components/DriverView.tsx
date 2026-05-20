'use client';
import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { C, SPOTS, EVENTS, Spot } from '@/lib/data';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import Bar from '@/components/ui/Bar';

const PragueMap = dynamic(() => import('@/components/PragueMap'), { ssr: false });

type GateState = 'idle' | 'opening' | 'open';

const STATS = [
  { icon: '📍', value: '14', label: 'Nearby' },
  { icon: '⏱', value: '18m', label: 'Saved' },
  { icon: '🌿', value: '2.4kg', label: 'CO₂ cut' },
];

export default function DriverView() {
  const [eventIdx, setEventIdx] = useState(0);
  const [active, setActive] = useState<Spot | null>(null);
  const [gate, setGate] = useState<GateState>('idle');

  const mult = EVENTS[eventIdx].mult;

  const handleGate = useCallback(() => {
    if (gate !== 'idle') return;
    setGate('opening');
    setTimeout(() => setGate('open'), 2000);
    setTimeout(() => setGate('idle'), 5000);
  }, [gate]);

  useEffect(() => { setGate('idle'); }, [active]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Search bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 14px',
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          animation: 'slideDown .4s ease backwards',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.textSoft} strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <span style={{ fontSize: 14, color: C.textSoft, flex: 1 }}>Search in Prague...</span>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: C.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <path d="M4 8h16M4 16h16" />
          </svg>
        </div>
      </div>

      {/* Event filter chips */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          paddingBottom: 2,
          animation: 'fadeIn .4s ease .1s backwards',
        }}
      >
        {EVENTS.map((ev, i) => {
          const isActive = i === eventIdx;
          return (
            <button
              key={ev.label}
              onClick={() => setEventIdx(i)}
              style={{
                flexShrink: 0,
                fontSize: 12,
                fontWeight: 600,
                padding: '5px 12px',
                borderRadius: 20,
                border: isActive ? `1.5px solid ${C.accent}` : `1px solid ${C.border}`,
                background: isActive ? C.accent : C.surface,
                color: isActive ? '#fff' : C.textMid,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all .2s ease',
              }}
            >
              {ev.label}
              {ev.mult > 1.5 && (
                <span style={{ marginLeft: 4, fontSize: 10, opacity: 0.8 }}>
                  {ev.mult}×
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Map hero */}
      <div
        style={{
          borderRadius: 14,
          overflow: 'hidden',
          border: `1px solid ${C.border}`,
          animation: 'spring .5s cubic-bezier(0.34, 1.56, 0.64, 1) .15s backwards',
          position: 'relative',
        }}
      >
        <PragueMap spots={SPOTS} mult={mult} active={active} onSelect={setActive} />

        {/* Floating surge badge */}
        {mult > 1.5 && (
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              fontSize: 11,
              fontWeight: 700,
              color: '#fff',
              background: 'rgba(192, 57, 43, 0.9)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px',
              borderRadius: 8,
              animation: 'pulse 2s ease infinite',
              zIndex: 20,
            }}
          >
            {mult}× surge active
          </div>
        )}
      </div>

      {/* Mini stats row */}
      {!active && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: '10px 8px',
                textAlign: 'center',
                animation: `spring .5s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.2 + i * 0.08}s backwards`,
              }}
            >
              <div style={{ fontSize: 16, marginBottom: 2 }}>{s.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.text, lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: C.textSoft }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Spot detail — bottom sheet style */}
      {active && (
        <div
          key={active.id}
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            padding: '6px 16px 16px',
            animation: 'slideUp .35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Drag handle */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0 10px' }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border }} />
          </div>

          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 6, lineHeight: 1.25 }}>
                {active.name}
              </h4>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                <Tag label={active.type} />
                <Tag
                  label={active.available ? 'Available' : 'Occupied'}
                  color={active.available ? C.green : C.red}
                  bg={active.available ? C.greenLight : C.redLight}
                />
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: C.text, lineHeight: 1 }}>
                {Math.round(active.basePrice * mult)} €
              </div>
              <div style={{ fontSize: 10, color: C.textSoft }}>/ hour</div>
            </div>
          </div>

          {/* Info row */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                flex: 1,
                background: C.bg,
                borderRadius: 10,
                padding: '8px 10px',
                border: `1px solid ${C.border}`,
              }}
            >
              <div style={{ fontSize: 10, color: C.textSoft }}>Host</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{active.owner}</div>
            </div>
            <div
              style={{
                flex: 1,
                background: C.bg,
                borderRadius: 10,
                padding: '8px 10px',
                border: `1px solid ${C.border}`,
              }}
            >
              <div style={{ fontSize: 10, color: C.textSoft }}>Distance</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>~350m</div>
            </div>
          </div>

          {/* Gateless access */}
          <div
            style={{
              background: C.bg,
              borderRadius: 10,
              padding: 12,
              border: `1px solid ${C.border}`,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: C.textSoft,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
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
                  background: `linear-gradient(135deg, ${C.accent}, #2a4f7a)`,
                  border: 'none',
                  borderRadius: 10,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'transform .15s ease, box-shadow .15s ease',
                  boxShadow: '0 2px 8px rgba(30,58,95,0.25)',
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
                    border: `2.5px solid ${C.accent}`,
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
              <div style={{ textAlign: 'center', padding: '6px 0' }}>
                <div style={{ fontSize: 24, color: C.green, animation: 'bounceCheck .5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>✓</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.green }}>Barrier open</div>
                <div style={{ fontSize: 10, color: C.textSoft, marginTop: 2 }}>
                  Auto-closes in a few seconds
                </div>
              </div>
            )}
          </div>

          {/* Book button */}
          {active.available && (
            <button
              style={{
                width: '100%',
                padding: '13px 0',
                fontSize: 14,
                fontWeight: 700,
                color: '#fff',
                background: `linear-gradient(135deg, ${C.green}, #1a8a54)`,
                border: 'none',
                borderRadius: 12,
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: '0 4px 14px rgba(26,122,74,0.3)',
                transition: 'transform .15s ease, box-shadow .15s ease',
                animation: 'scaleIn .3s ease .1s backwards',
              }}
            >
              Book this spot
            </button>
          )}
        </div>
      )}
    </div>
  );
}
