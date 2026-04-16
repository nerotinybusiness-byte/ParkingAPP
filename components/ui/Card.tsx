'use client';
import React from 'react';
import { C } from '@/lib/data';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Card({ title, children, style }: CardProps) {
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: 20,
        animation: 'fadeIn .3s ease',
        ...style,
      }}
    >
      {title && (
        <h3
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: C.textMid,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: 14,
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
