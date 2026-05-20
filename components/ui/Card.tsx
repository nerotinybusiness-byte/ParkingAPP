'use client';
import React from 'react';
import { C } from '@/lib/data';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  delay?: number;
  glass?: boolean;
}

export default function Card({ title, children, style, delay = 0, glass = false }: CardProps) {
  return (
    <div
      style={{
        background: glass ? 'rgba(255,255,255,0.75)' : C.surface,
        backdropFilter: glass ? 'blur(12px)' : undefined,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: 18,
        animation: `spring 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s backwards`,
        transition: 'box-shadow .2s ease, transform .2s ease',
        ...style,
      }}
    >
      {title && (
        <h3
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: C.textMid,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 12,
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
