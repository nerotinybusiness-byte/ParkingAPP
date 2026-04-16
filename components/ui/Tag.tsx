'use client';
import React from 'react';
import { C } from '@/lib/data';

interface TagProps {
  label: string;
  color?: string;
  bg?: string;
}

export default function Tag({ label, color = C.textMid, bg = C.bg }: TagProps) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 11,
        fontWeight: 600,
        color,
        background: bg,
        padding: '3px 9px',
        borderRadius: 6,
        border: `1px solid ${C.border}`,
      }}
    >
      {label}
    </span>
  );
}
