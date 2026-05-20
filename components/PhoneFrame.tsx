'use client';
import React, { useState } from 'react';
import { C } from '@/lib/data';

interface PhoneFrameProps {
  children: React.ReactNode;
  tabBar?: React.ReactNode;
  eyebrow?: string;
  title?: string;
}

function StatusBar({ light = false }: { light?: boolean }) {
  const color = light ? '#fff' : C.text;
  return (
    <div
      style={{
        height: 52,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '0 30px 6px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <span style={{ fontSize: 15, fontWeight: 700, color, letterSpacing: '0.02em' }}>
        9:41
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill={color}>
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12" fill={color}>
          <path d="M8.5 2.2c2.6 0 5 1 6.8 2.6.3.3.3.7 0 1l-.7.7c-.3.3-.6.3-.9 0A8 8 0 008.5 4.4 8 8 0 002.3 6.5c-.3.3-.6.3-.9 0l-.7-.7c-.3-.3-.3-.7 0-1A10 10 0 018.5 2.2z" />
          <path d="M8.5 6.1c1.4 0 2.7.5 3.7 1.4.3.3.3.7 0 1l-.8.8c-.2.2-.5.2-.8 0a3.3 3.3 0 00-4.2 0c-.3.2-.6.2-.8 0l-.8-.8c-.3-.3-.3-.7 0-1A5.5 5.5 0 018.5 6z" />
          <circle cx="8.5" cy="11" r="1.4" />
        </svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
          <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke={color} strokeOpacity="0.4" />
          <rect x="2" y="2" width="17" height="9" rx="2" fill={light ? '#fff' : C.green} />
          <rect x="24" y="4" width="2" height="5" rx="1" fill={color} fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

function PugFace() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      {/* Head */}
      <ellipse cx="60" cy="62" rx="42" ry="38" fill="#d4a574" />
      {/* Ears */}
      <ellipse cx="24" cy="38" rx="16" ry="20" fill="#b8895a" transform="rotate(-15 24 38)" />
      <ellipse cx="96" cy="38" rx="16" ry="20" fill="#b8895a" transform="rotate(15 96 38)" />
      <ellipse cx="24" cy="38" rx="10" ry="14" fill="#c49a68" transform="rotate(-15 24 38)" />
      <ellipse cx="96" cy="38" rx="10" ry="14" fill="#c49a68" transform="rotate(15 96 38)" />
      {/* Face mask */}
      <ellipse cx="60" cy="72" rx="28" ry="22" fill="#e8c9a0" />
      {/* Eyes */}
      <circle cx="42" cy="55" r="10" fill="#1a1a1a" />
      <circle cx="78" cy="55" r="10" fill="#1a1a1a" />
      <circle cx="45" cy="52" r="3" fill="#fff" />
      <circle cx="81" cy="52" r="3" fill="#fff" />
      {/* Nose */}
      <ellipse cx="60" cy="68" rx="8" ry="5" fill="#2a2a2a" />
      <circle cx="56" cy="67" r="1.5" fill="#444" />
      <circle cx="64" cy="67" r="1.5" fill="#444" />
      {/* Mouth */}
      <path d="M52 74 Q60 82 68 74" stroke="#6b5a48" strokeWidth="2" fill="none" strokeLinecap="round" />
      <line x1="60" y1="73" x2="60" y2="77" stroke="#6b5a48" strokeWidth="1.5" strokeLinecap="round" />
      {/* Wrinkles */}
      <path d="M38 45 Q42 42 46 45" stroke="#b8895a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M74 45 Q78 42 82 45" stroke="#b8895a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Tongue */}
      <ellipse cx="60" cy="82" rx="5" ry="4" fill="#e88" />
    </svg>
  );
}

function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  return (
    <div
      onClick={onUnlock}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        borderRadius: 46,
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'linear-gradient(160deg, #0f1923 0%, #1a2a3d 30%, #243b55 60%, #1a2a3d 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: 'fadeIn .5s ease',
      }}
    >
      <StatusBar light />

      {/* Lock icon */}
      <div style={{ marginTop: 8, marginBottom: 6 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      </div>

      {/* Time */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 200,
          color: '#fff',
          letterSpacing: '-2px',
          lineHeight: 1,
          marginBottom: 4,
        }}
      >
        9:41
      </div>

      {/* Date */}
      <div style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: 40 }}>
        Tuesday, May 20
      </div>

      {/* Pug */}
      <div style={{ animation: 'float 3s ease-in-out infinite', marginBottom: 16 }}>
        <PugFace />
      </div>

      {/* ParkShare logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
          }}
        >
          🅿️
        </div>
        <span style={{ fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.02em' }}>
          ParkShare
        </span>
      </div>

      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
        Smart parking for Prague
      </div>

      {/* Swipe indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          animation: 'pulse 2s ease infinite',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
        <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.45)' }}>
          Tap to unlock
        </span>
      </div>

      {/* Home indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 134,
          height: 5,
          borderRadius: 3,
          background: 'rgba(255,255,255,0.6)',
        }}
      />
    </div>
  );
}

export default function PhoneFrame({ children, tabBar, eyebrow, title }: PhoneFrameProps) {
  const [locked, setLocked] = useState(true);

  return (
    <div style={{ position: 'relative', filter: 'drop-shadow(0 40px 70px rgba(20,18,16,0.35))' }}>
      {/* Side buttons */}
      <div style={{ position: 'absolute', left: -3, top: 150, width: 4, height: 30, borderRadius: 4, background: 'linear-gradient(90deg, #2a2a2c, #4a4a4d)' }} />
      <div style={{ position: 'absolute', left: -3, top: 200, width: 4, height: 58, borderRadius: 4, background: 'linear-gradient(90deg, #2a2a2c, #4a4a4d)' }} />
      <div style={{ position: 'absolute', left: -3, top: 272, width: 4, height: 58, borderRadius: 4, background: 'linear-gradient(90deg, #2a2a2c, #4a4a4d)' }} />
      <div style={{ position: 'absolute', right: -3, top: 215, width: 4, height: 95, borderRadius: 4, background: 'linear-gradient(270deg, #2a2a2c, #4a4a4d)' }} />

      {/* Titanium frame */}
      <div
        style={{
          padding: 5,
          borderRadius: 62,
          background: 'linear-gradient(150deg, #5a5a5d 0%, #2c2c2e 22%, #6e6e72 48%, #2c2c2e 74%, #5a5a5d 100%)',
        }}
      >
        {/* Black bezel */}
        <div style={{ padding: 11, borderRadius: 57, background: '#050505' }}>
          {/* Screen */}
          <div
            style={{
              position: 'relative',
              width: 380,
              height: 770,
              borderRadius: 46,
              overflow: 'hidden',
              background: C.bg,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Lock screen easter egg */}
            {locked && <LockScreen onUnlock={() => setLocked(false)} />}

            {/* Dynamic Island */}
            <div
              style={{
                position: 'absolute',
                top: 11,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 122,
                height: 34,
                borderRadius: 18,
                background: '#000',
                zIndex: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 12,
              }}
            >
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#1c1c2e', boxShadow: 'inset 0 0 2px rgba(80,80,140,0.6)' }} />
            </div>

            <StatusBar />

            {/* App nav header */}
            {(title || eyebrow) && (
              <div
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '4px 18px 12px',
                  background: C.surface,
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <div>
                  {eyebrow && (
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {eyebrow}
                    </div>
                  )}
                  {title && (
                    <div style={{ fontSize: 20, fontWeight: 800, color: C.text, letterSpacing: '-0.01em' }}>
                      {title}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: C.accentLight,
                    color: C.accent,
                    border: `1px solid ${C.accentMid}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  TB
                </div>
              </div>
            )}

            {/* Scrollable content */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: 14,
                containerType: 'inline-size',
                containerName: 'app',
              } as React.CSSProperties}
            >
              {children}
            </div>

            {tabBar}

            {/* Home indicator */}
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 134,
                height: 5,
                borderRadius: 3,
                background: C.text,
                opacity: 0.85,
                zIndex: 40,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
