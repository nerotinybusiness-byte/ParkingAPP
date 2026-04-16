'use client';
import React from 'react';
import { C } from '@/lib/data';

interface BarProps {
  value: number;
  max?: number;
  color?: string;
  bg?: string;
  height?: number;
  label?: string;
  showValue?: boolean;
}

export default function Bar({
  value,
  max = 100,
  color = C.accent,
  bg = C.border,
  height = 6,
  label,
  showValue = false,
}: BarProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      {(label || showValue) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 12,
            color: C.textMid,
            marginBottom: 4,
          }}
        >
          {label && <span>{label}</span>}
          {showValue && <span style={{ fontWeight: 600 }}>{value}%</span>}
        </div>
      )}
      <div
        style={{
          width: '100%',
          height,
          borderRadius: height / 2,
          background: bg,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            borderRadius: height / 2,
            background: color,
            transition: 'width .4s ease',
          }}
        />
      </div>
    </div>
  );
}
