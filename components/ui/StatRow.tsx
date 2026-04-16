'use client';
import React from 'react';
import { C } from '@/lib/data';

interface StatRowProps {
  label: string;
  value: string;
  color?: string;
}

export default function StatRow({ label, value, color = C.text }: StatRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 0',
        borderBottom: `1px solid ${C.border}`,
        fontSize: 13,
      }}
    >
      <span style={{ color: C.textMid }}>{label}</span>
      <span style={{ fontWeight: 600, color }}>{value}</span>
    </div>
  );
}
