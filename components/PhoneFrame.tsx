'use client';
import React from 'react';
import { C } from '@/lib/data';

interface PhoneFrameProps {
  children: React.ReactNode;
  tabBar?: React.ReactNode;
  eyebrow?: string;
  title?: string;
}

function StatusBar() {
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
      <span style={{ fontSize: 15, fontWeight: 700, color: C.text, letterSpacing: '0.02em' }}>
        9:41
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill={C.text}>
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12" fill={C.text}>
          <path d="M8.5 2.2c2.6 0 5 1 6.8 2.6.3.3.3.7 0 1l-.7.7c-.3.3-.6.3-.9 0A8 8 0 008.5 4.4 8 8 0 002.3 6.5c-.3.3-.6.3-.9 0l-.7-.7c-.3-.3-.3-.7 0-1A10 10 0 018.5 2.2z" />
          <path d="M8.5 6.1c1.4 0 2.7.5 3.7 1.4.3.3.3.7 0 1l-.8.8c-.2.2-.5.2-.8 0a3.3 3.3 0 00-4.2 0c-.3.2-.6.2-.8 0l-.8-.8c-.3-.3-.3-.7 0-1A5.5 5.5 0 018.5 6z" />
          <circle cx="8.5" cy="11" r="1.4" />
        </svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
          <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke={C.text} strokeOpacity="0.4" />
          <rect x="2" y="2" width="17" height="9" rx="2" fill={C.green} />
          <rect x="24" y="4" width="2" height="5" rx="1" fill={C.text} fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

export default function PhoneFrame({ children, tabBar, eyebrow, title }: PhoneFrameProps) {
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
