'use client';
import React from 'react';
import { C } from '@/lib/data';

interface PillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function Pill({ label, active, onClick }: PillProps) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 13,
        fontWeight: 600,
        padding: '6px 14px',
        borderRadius: 8,
        border: `1px solid ${active ? C.accent : C.border}`,
        background: active ? C.accentLight : C.surface,
        color: active ? C.accent : C.textMid,
        cursor: 'pointer',
        transition: 'all .15s ease',
        fontFamily: 'inherit',
      }}
    >
      {label}
    </button>
  );
}
