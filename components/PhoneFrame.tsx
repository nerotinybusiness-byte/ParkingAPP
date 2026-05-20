'use client';
import React, { useState, useEffect } from 'react';
import { C } from '@/lib/data';

interface PhoneFrameProps {
  children: React.ReactNode;
  tabBar?: React.ReactNode;
  eyebrow?: string;
  title?: string;
}

function StatusBar({ light = false, time }: { light?: boolean; time?: string }) {
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
      <span style={{ fontSize: 16, fontWeight: 600, color, letterSpacing: '-0.01em', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", Figtree, sans-serif' }}>
        {time || '9:41'}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {/* Cellular — 4 bars, iOS 17 style */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill={color}>
          <rect x="0" y="9" width="3" height="3" rx="0.7" opacity="0.35" />
          <rect x="4.5" y="6" width="3" height="6" rx="0.7" />
          <rect x="9" y="3" width="3" height="9" rx="0.7" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.7" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill={color}>
          <path d="M8 3.4c2.1 0 4 .8 5.5 2.1a.6.6 0 010 .85l-.55.55a.6.6 0 01-.8 0A6.4 6.4 0 008 5.2a6.4 6.4 0 00-4.15 1.5.6.6 0 01-.8 0L2.5 6.15a.6.6 0 010-.85A8.6 8.6 0 018 3.4z" />
          <path d="M8 6.8c1.15 0 2.2.4 3 1.1a.6.6 0 010 .85l-.65.65a.5.5 0 01-.7 0A2.8 2.8 0 008 8.6c-.7 0-1.3.25-1.65.8a.5.5 0 01-.7 0l-.65-.65a.6.6 0 010-.85A4.5 4.5 0 018 6.8z" />
          <circle cx="8" cy="11" r="1.2" />
        </svg>
        {/* Battery */}
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none" style={{ marginLeft: 1 }}>
          <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke={color} strokeOpacity="0.35" strokeWidth="1" />
          <rect x="2" y="2" width="17" height="9" rx="2" fill={light ? '#fff' : C.green} />
          <path d="M25 4.5a1.3 1.3 0 010 4" stroke={color} strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function useCurrentTime() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return now;
}

function formatTime(d: Date) {
  return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
}

function formatDate(d: Date) {
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const now = useCurrentTime();
  return (
    <div
      onClick={onUnlock}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 999,
        borderRadius: 46,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Wallpaper photo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/lockscreen.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          backgroundColor: '#1a3050',
        }}
      />

      {/* Top gradient for status bar legibility */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 140,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* Bottom gradient */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* Content layer */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <StatusBar light time={formatTime(now)} />

        {/* Lock icon */}
        <div style={{ marginTop: 4, marginBottom: 4 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>

        {/* Time — iOS style: ultra thin, massive */}
        <div
          style={{
            fontSize: 82,
            fontWeight: 200,
            color: '#fff',
            letterSpacing: '-1px',
            lineHeight: 1,
            textShadow: '0 1px 8px rgba(0,0,0,0.3)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Figtree, sans-serif',
          }}
        >
          {formatTime(now)}
        </div>

        {/* Date — iOS style */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.95)',
            textShadow: '0 1px 4px rgba(0,0,0,0.3)',
            marginTop: 2,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Figtree, sans-serif',
          }}
        >
          {formatDate(now)}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Bottom actions — flashlight & camera */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '0 46px',
            marginBottom: 16,
          }}
        >
          {/* Flashlight */}
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: 'rgba(40,40,40,0.55)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18h6" />
              <path d="M10 22h4" />
              <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
            </svg>
          </div>

          {/* Camera */}
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: 'rgba(40,40,40,0.55)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
        </div>

        {/* Home indicator */}
        <div
          style={{
            width: 134,
            height: 5,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.7)',
            marginBottom: 8,
          }}
        />
      </div>
    </div>
  );
}

export default function PhoneFrame({ children, tabBar, eyebrow, title }: PhoneFrameProps) {
  const [locked, setLocked] = useState(true);
  const now = useCurrentTime();

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
            {/* Lock screen */}
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

            <StatusBar time={formatTime(now)} />

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
                isolation: 'isolate',
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
