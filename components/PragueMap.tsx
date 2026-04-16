'use client';
import React from 'react';
import { C, Spot } from '@/lib/data';

interface PragueMapProps {
  spots: Spot[];
  mult: number;
  active: Spot | null;
  onSelect: (spot: Spot) => void;
}

export default function PragueMap({ spots, mult, active, onSelect }: PragueMapProps) {
  return (
    <svg
      viewBox="0 0 360 200"
      style={{ width: '100%', height: 'auto', borderRadius: 8, background: C.bg }}
    >
      {/* Street grid — horizontal */}
      {[55, 95, 135, 175].map((y) => (
        <line key={`h${y}`} x1={0} y1={y} x2={360} y2={y} stroke="#e2e0db" strokeWidth={10} />
      ))}
      {/* Street grid — vertical */}
      {[70, 130, 190, 250, 310].map((x) => (
        <line key={`v${x}`} x1={x} y1={0} x2={x} y2={200} stroke="#e2e0db" strokeWidth={10} />
      ))}

      {/* Diagonal streets */}
      <line x1={40} y1={30} x2={320} y2={170} stroke="#e2e0db" strokeWidth={7} />
      <line x1={320} y1={30} x2={40} y2={170} stroke="#e2e0db" strokeWidth={7} />

      {/* Vltava river — outer */}
      <path
        d="M 80,0 C 100,50 120,80 110,120 C 100,160 130,180 140,200"
        fill="none"
        stroke="#b8d8f0"
        strokeWidth={18}
        strokeLinecap="round"
      />
      {/* Vltava river — inner */}
      <path
        d="M 80,0 C 100,50 120,80 110,120 C 100,160 130,180 140,200"
        fill="none"
        stroke="#cde4f2"
        strokeWidth={10}
        strokeLinecap="round"
      />

      {/* Spot markers */}
      {spots.map((spot) => {
        const isActive = active?.id === spot.id;
        const fillColor = spot.available ? C.green : C.red;
        const price = Math.round(spot.basePrice * mult);

        return (
          <g
            key={spot.id}
            onClick={() => onSelect(spot)}
            style={{ cursor: 'pointer' }}
          >
            {/* Ping animation for active */}
            {isActive && (
              <circle
                cx={spot.x}
                cy={spot.y}
                r={8}
                fill={fillColor}
                opacity={0.6}
                style={{ animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }}
              />
            )}

            {/* Main circle */}
            <circle
              cx={spot.x}
              cy={spot.y}
              r={isActive ? 8 : 6}
              fill={fillColor}
              stroke={C.surface}
              strokeWidth={2}
            />

            {/* Price label for active */}
            {isActive && (
              <>
                <rect
                  x={spot.x + 12}
                  y={spot.y - 12}
                  width={52}
                  height={22}
                  rx={5}
                  fill={C.text}
                  opacity={0.9}
                />
                <text
                  x={spot.x + 38}
                  y={spot.y + 2}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={700}
                  fill={C.surface}
                  fontFamily="Figtree, sans-serif"
                >
                  {price} €
                </text>
              </>
            )}
          </g>
        );
      })}

      {/* Legend */}
      <circle cx={16} cy={180} r={5} fill={C.green} />
      <text x={26} y={184} fontSize={9} fill={C.textMid} fontFamily="Figtree, sans-serif">
        Available
      </text>
      <circle cx={16} cy={193} r={5} fill={C.red} />
      <text x={26} y={197} fontSize={9} fill={C.textMid} fontFamily="Figtree, sans-serif">
        Occupied
      </text>
    </svg>
  );
}
