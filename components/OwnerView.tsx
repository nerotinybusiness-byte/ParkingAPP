'use client';
import React, { useState } from 'react';
import { C, AUDIT } from '@/lib/data';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import Bar from '@/components/ui/Bar';
import StatRow from '@/components/ui/StatRow';

const SPOT_TYPES = ['Garage', 'Yard', 'Hotel', 'Corporate'];

function getAiText(price: number): string {
  if (price < 100) return 'Your price is very competitive. Expect high occupancy but lower margins. Good for building initial reviews.';
  if (price < 140) return 'Sweet spot for most Prague neighborhoods. Balanced occupancy and solid returns.';
  if (price < 200) return 'Premium pricing — works well in high-demand areas like Vinohrady and Holešovice. May see lower occupancy.';
  return 'Top-tier pricing. Best suited for commercial-grade spots near event venues. Occupancy may drop below 40%.';
}

function getBookingProb(price: number): number {
  if (price < 100) return 92;
  if (price < 140) return 78;
  if (price < 200) return 55;
  return 30;
}

export default function OwnerView() {
  const [wizard, setWizard] = useState<number | null>(null);
  const [wizType, setWizType] = useState('Garage');
  const [price, setPrice] = useState(130);
  const [tab, setTab] = useState<'audit' | 'legal'>('audit');

  // Dashboard
  if (wizard === null) {
    const occupancy = price < 140 ? 72 : price < 200 ? 55 : 35;
    const gross = price * (occupancy / 100);
    const fee = gross * 0.15;
    const net = gross - fee;

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card title="AI pricing advisor">
            <div style={{ fontSize: 13, color: C.textMid, marginBottom: 6 }}>Monthly asking price</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: C.text, marginBottom: 8 }}>
              {price.toLocaleString('cs-CZ')} €
            </div>
            <input
              type="range"
              min={60}
              max={240}
              step={5}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              style={{ width: '100%', marginBottom: 12 }}
            />
            <div
              style={{
                fontSize: 13,
                color: C.textMid,
                lineHeight: 1.5,
                background: C.bg,
                padding: 12,
                borderRadius: 8,
                border: `1px solid ${C.border}`,
                marginBottom: 12,
              }}
            >
              {getAiText(price)}
            </div>
            <Bar
              value={getBookingProb(price)}
              color={getBookingProb(price) > 60 ? C.green : C.yellow}
              label="Booking probability"
              showValue
            />
          </Card>

          <button
            onClick={() => setWizard(0)}
            style={{
              padding: '14px 0',
              fontSize: 14,
              fontWeight: 700,
              color: C.surface,
              background: C.accent,
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            + Add a new spot
          </button>

          <Card title="Estimated monthly earnings">
            <StatRow label="Asking price" value={`${price.toLocaleString('cs-CZ')} €`} />
            <StatRow label={`At ${occupancy}% occupancy`} value={`${Math.round(gross).toLocaleString('cs-CZ')} €`} />
            <StatRow label="Platform fee (15%)" value={`-${Math.round(fee).toLocaleString('cs-CZ')} €`} color={C.red} />
            <StatRow label="Net income" value={`${Math.round(net).toLocaleString('cs-CZ')} €`} color={C.green} />
          </Card>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            {/* Tab switcher */}
            <div
              style={{
                display: 'flex',
                gap: 0,
                marginBottom: 16,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              {(['audit', 'legal'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    flex: 1,
                    padding: '10px 0',
                    fontSize: 13,
                    fontWeight: 600,
                    color: tab === t ? C.accent : C.textMid,
                    background: 'none',
                    border: 'none',
                    borderBottom: tab === t ? `2px solid ${C.accent}` : '2px solid transparent',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {t === 'audit' ? 'HOA Audit Log' : 'Legal & Tax'}
                </button>
              ))}
            </div>

            {tab === 'audit' ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      {['Time', 'Plate', 'Action', 'User'].map((h) => (
                        <th
                          key={h}
                          style={{
                            textAlign: 'left',
                            padding: '6px 8px',
                            fontSize: 11,
                            fontWeight: 600,
                            color: C.textSoft,
                            textTransform: 'uppercase',
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {AUDIT.map((row, i) => {
                      const isEntry = row.action === 'Entry';
                      return (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ padding: '8px' }}>{row.time}</td>
                          <td style={{ padding: '8px', fontFamily: 'monospace', fontSize: 12 }}>
                            {row.plate}
                          </td>
                          <td style={{ padding: '8px' }}>
                            <span style={{ color: isEntry ? C.green : C.red, fontWeight: 600 }}>
                              {isEntry ? '↑' : '↓'} {row.action}
                            </span>
                          </td>
                          <td style={{ padding: '8px', color: C.textMid }}>{row.user}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>
                      Long-term rental
                    </span>
                    <Tag label="§ 9 ZDP" color={C.green} bg={C.greenLight} />
                  </div>
                  <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.5 }}>
                    Income from renting a parking spot long-term is taxed as rental income.
                    Annual earnings under 1,200 € may be exempt.
                  </p>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>
                      Short-term hourly
                    </span>
                    <Tag label="Trade license" color={C.yellow} bg={C.yellowLight} />
                  </div>
                  <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.5 }}>
                    Regular hourly rentals may be classified as a business activity. Consider
                    registering a trade license (živnostenský list).
                  </p>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>
                      Liability insurance
                    </span>
                    <Tag label="Recommended" color={C.accent} bg={C.accentLight} />
                  </div>
                  <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.5 }}>
                    We recommend liability insurance covering damage to vehicles parked on your
                    property. ParkShare offers a bundled policy starting at 3.50 €/month.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Responsive */}
        <style>{`
          @media (max-width: 768px) {
            div[style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    );
  }

  // Wizard
  return (
    <Card>
      {/* Step indicator */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 20,
          alignItems: 'center',
        }}
      >
        {[0, 1, 2].map((s) => (
          <React.Fragment key={s}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                background: wizard >= s ? C.accent : C.border,
                color: wizard >= s ? C.surface : C.textMid,
              }}
            >
              {s + 1}
            </div>
            {s < 2 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: wizard > s ? C.accent : C.border,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {wizard === 0 && (
        <div style={{ animation: 'fadeIn .25s ease' }}>
          <h4 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 14 }}>
            Choose spot type
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {SPOT_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => { setWizType(t); setWizard(1); }}
                style={{
                  padding: '16px 12px',
                  fontSize: 14,
                  fontWeight: 600,
                  color: wizType === t ? C.accent : C.text,
                  background: wizType === t ? C.accentLight : C.bg,
                  border: `1px solid ${wizType === t ? C.accent : C.border}`,
                  borderRadius: 10,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {wizard === 1 && (
        <div style={{ animation: 'fadeIn .25s ease' }}>
          <h4 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 14 }}>
            Set your price
          </h4>
          <div style={{ fontSize: 28, fontWeight: 800, color: C.text, marginBottom: 8 }}>
            {price.toLocaleString('cs-CZ')} € / month
          </div>
          <input
            type="range"
            min={60}
            max={240}
            step={5}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            style={{ width: '100%', marginBottom: 12 }}
          />
          <div
            style={{
              fontSize: 13,
              color: C.textMid,
              background: C.bg,
              padding: 12,
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              marginBottom: 16,
            }}
          >
            {getAiText(price)}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setWizard(0)}
              style={{
                flex: 1,
                padding: '12px 0',
                fontSize: 13,
                fontWeight: 600,
                color: C.textMid,
                background: C.bg,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Back
            </button>
            <button
              onClick={() => setWizard(2)}
              style={{
                flex: 1,
                padding: '12px 0',
                fontSize: 13,
                fontWeight: 700,
                color: C.surface,
                background: C.accent,
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {wizard === 2 && (
        <div style={{ animation: 'fadeIn .25s ease' }}>
          <h4 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 14 }}>
            Summary
          </h4>
          <StatRow label="Type" value={wizType} />
          <StatRow label="Monthly price" value={`${price.toLocaleString('cs-CZ')} €`} />
          <StatRow label="Platform fee" value="15%" />
          <StatRow label="Est. occupancy" value={`${getBookingProb(price)}%`} />
          <StatRow label="Net monthly" value={`${Math.round(price * (getBookingProb(price) / 100) * 0.85).toLocaleString('cs-CZ')} €`} color={C.green} />
          <StatRow label="Payout" value="Monthly bank transfer" />
          <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
            <button
              onClick={() => setWizard(1)}
              style={{
                flex: 1,
                padding: '12px 0',
                fontSize: 13,
                fontWeight: 600,
                color: C.textMid,
                background: C.bg,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Back
            </button>
            <button
              onClick={() => setWizard(null)}
              style={{
                flex: 1,
                padding: '12px 0',
                fontSize: 14,
                fontWeight: 700,
                color: C.surface,
                background: C.green,
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Publish spot
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
