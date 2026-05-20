'use client';
import React, { useState } from 'react';
import { C, AUDIT } from '@/lib/data';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import Bar from '@/components/ui/Bar';
import StatRow from '@/components/ui/StatRow';

const SPOT_TYPES = [
  { label: 'Garage', icon: '🏗' },
  { label: 'Yard', icon: '🌳' },
  { label: 'Hotel', icon: '🏨' },
  { label: 'Corporate', icon: '🏢' },
];

function getAiText(price: number): string {
  if (price < 100) return 'Very competitive price. Expect high occupancy but lower margins. Great for building initial reviews.';
  if (price < 140) return 'Sweet spot for most Prague neighborhoods. Balanced occupancy and solid returns.';
  if (price < 200) return 'Premium pricing — works in high-demand areas like Vinohrady and Holešovice. Slightly lower occupancy.';
  return 'Top-tier pricing. Best for commercial spots near event venues. Occupancy may drop below 40%.';
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

  if (wizard === null) {
    const occupancy = price < 140 ? 72 : price < 200 ? 55 : 35;
    const gross = price * (occupancy / 100);
    const fee = gross * 0.15;
    const net = gross - fee;
    const prob = getBookingProb(price);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* AI Pricing */}
        <Card title="AI pricing advisor" delay={0}>
          <div style={{ fontSize: 12, color: C.textMid, marginBottom: 4 }}>Monthly asking price</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: C.text, transition: 'color .2s' }}>
              {price}
            </span>
            <span style={{ fontSize: 14, color: C.textMid }}>€ / month</span>
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
              fontSize: 12,
              color: C.textMid,
              lineHeight: 1.5,
              background: C.bg,
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${C.border}`,
              marginBottom: 12,
              transition: 'all .3s ease',
            }}
          >
            {getAiText(price)}
          </div>
          <Bar
            value={prob}
            color={prob > 60 ? C.green : C.yellow}
            label="Booking probability"
            showValue
          />
        </Card>

        {/* Add spot CTA */}
        <button
          onClick={() => setWizard(0)}
          style={{
            padding: '13px 0',
            fontSize: 14,
            fontWeight: 700,
            color: '#fff',
            background: `linear-gradient(135deg, ${C.accent}, #2a4f7a)`,
            border: 'none',
            borderRadius: 12,
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: '0 4px 14px rgba(30,58,95,0.25)',
            transition: 'transform .15s ease, box-shadow .15s ease',
            animation: 'spring .5s cubic-bezier(0.34, 1.56, 0.64, 1) .1s backwards',
          }}
        >
          + Add a new spot
        </button>

        {/* Earnings breakdown */}
        <Card title="Estimated monthly earnings" delay={0.12}>
          {[
            { label: 'Asking price', value: `${price} €`, color: C.text },
            { label: `At ${occupancy}% occupancy`, value: `${Math.round(gross)} €`, color: C.text },
            { label: 'Platform fee (15%)', value: `-${Math.round(fee)} €`, color: C.red },
            { label: 'Net income', value: `${Math.round(net)} €`, color: C.green },
          ].map((row, i) => (
            <div
              key={row.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '9px 0',
                borderBottom: i < 3 ? `1px solid ${C.border}` : 'none',
                fontSize: 13,
                animation: `fadeIn .3s ease ${0.15 + i * 0.05}s backwards`,
              }}
            >
              <span style={{ color: C.textMid }}>{row.label}</span>
              <span style={{ fontWeight: 700, color: row.color }}>{row.value}</span>
            </div>
          ))}
        </Card>

        {/* Tabs: Audit / Legal */}
        <Card delay={0.18}>
          <div
            style={{
              display: 'flex',
              gap: 0,
              marginBottom: 14,
              position: 'relative',
            }}
          >
            {(['audit', 'legal'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1,
                  padding: '9px 0',
                  fontSize: 12,
                  fontWeight: 700,
                  color: tab === t ? C.accent : C.textSoft,
                  background: tab === t ? C.accentLight : 'transparent',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all .2s ease',
                }}
              >
                {t === 'audit' ? 'Audit Log' : 'Legal & Tax'}
              </button>
            ))}
          </div>

          <div key={tab} style={{ animation: 'fadeIn .25s ease' }}>
            {tab === 'audit' ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr>
                      {['Time', 'Plate', 'Action', 'User'].map((h) => (
                        <th
                          key={h}
                          style={{
                            textAlign: 'left',
                            padding: '5px 6px',
                            fontSize: 10,
                            fontWeight: 700,
                            color: C.textSoft,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            borderBottom: `1px solid ${C.border}`,
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
                        <tr
                          key={i}
                          style={{
                            borderBottom: `1px solid ${C.border}`,
                            animation: `fadeIn .3s ease ${i * 0.04}s backwards`,
                          }}
                        >
                          <td style={{ padding: '7px 6px', fontSize: 12 }}>{row.time}</td>
                          <td style={{ padding: '7px 6px', fontFamily: 'monospace', fontSize: 11 }}>
                            {row.plate}
                          </td>
                          <td style={{ padding: '7px 6px' }}>
                            <span style={{ color: isEntry ? C.green : C.red, fontWeight: 700, fontSize: 12 }}>
                              {isEntry ? '↑' : '↓'} {row.action}
                            </span>
                          </td>
                          <td style={{ padding: '7px 6px', color: C.textMid, fontSize: 11 }}>{row.user}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { title: 'Long-term rental', tag: '§ 9 ZDP', tagColor: C.green, tagBg: C.greenLight, text: 'Income from renting long-term is taxed as rental income. Annual earnings under 1,200 € may be exempt.' },
                  { title: 'Short-term hourly', tag: 'Trade license', tagColor: C.yellow, tagBg: C.yellowLight, text: 'Regular hourly rentals may require a trade license (živnostenský list).' },
                  { title: 'Liability insurance', tag: 'Recommended', tagColor: C.accent, tagBg: C.accentLight, text: 'ParkShare offers bundled liability coverage starting at 3.50 €/month.' },
                ].map((item, i) => (
                  <div key={item.title} style={{ animation: `slideUp .3s ease ${i * 0.06}s backwards` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{item.title}</span>
                      <Tag label={item.tag} color={item.tagColor} bg={item.tagBg} />
                    </div>
                    <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5 }}>{item.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  // Wizard
  return (
    <div style={{ animation: 'slideUp .35s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
      <Card>
        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 18, alignItems: 'center' }}>
          {[0, 1, 2].map((s) => (
            <React.Fragment key={s}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                  background: wizard >= s ? `linear-gradient(135deg, ${C.accent}, #2a4f7a)` : C.border,
                  color: wizard >= s ? '#fff' : C.textMid,
                  transition: 'all .3s ease',
                  boxShadow: wizard >= s ? '0 2px 8px rgba(30,58,95,0.25)' : 'none',
                }}
              >
                {wizard > s ? '✓' : s + 1}
              </div>
              {s < 2 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    borderRadius: 1,
                    background: wizard > s ? C.accent : C.border,
                    transition: 'background .3s ease',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {wizard === 0 && (
          <div style={{ animation: 'spring .4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 12 }}>
              Choose spot type
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {SPOT_TYPES.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => { setWizType(t.label); setWizard(1); }}
                  style={{
                    padding: '14px 10px',
                    fontSize: 13,
                    fontWeight: 600,
                    color: wizType === t.label ? C.accent : C.text,
                    background: wizType === t.label ? C.accentLight : C.bg,
                    border: `1.5px solid ${wizType === t.label ? C.accent : C.border}`,
                    borderRadius: 12,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all .2s ease',
                    animation: `spring .4s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.06}s backwards`,
                  }}
                >
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{t.icon}</div>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {wizard === 1 && (
          <div style={{ animation: 'spring .4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 12 }}>
              Set your price
            </h4>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: C.text }}>{price}</span>
              <span style={{ fontSize: 14, color: C.textMid }}>€ / month</span>
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
                fontSize: 12,
                color: C.textMid,
                lineHeight: 1.5,
                background: C.bg,
                padding: 10,
                borderRadius: 8,
                border: `1px solid ${C.border}`,
                marginBottom: 14,
              }}
            >
              {getAiText(price)}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setWizard(0)}
                style={{
                  flex: 1, padding: '11px 0', fontSize: 13, fontWeight: 600,
                  color: C.textMid, background: C.bg, border: `1px solid ${C.border}`,
                  borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'all .15s ease',
                }}
              >
                Back
              </button>
              <button
                onClick={() => setWizard(2)}
                style={{
                  flex: 1, padding: '11px 0', fontSize: 13, fontWeight: 700,
                  color: '#fff', background: `linear-gradient(135deg, ${C.accent}, #2a4f7a)`,
                  border: 'none', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 2px 10px rgba(30,58,95,0.25)',
                  transition: 'transform .15s ease',
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {wizard === 2 && (
          <div style={{ animation: 'spring .4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 12 }}>
              Summary
            </h4>
            {[
              { label: 'Type', value: wizType },
              { label: 'Monthly price', value: `${price} €` },
              { label: 'Platform fee', value: '15%' },
              { label: 'Est. occupancy', value: `${getBookingProb(price)}%` },
              { label: 'Net monthly', value: `${Math.round(price * (getBookingProb(price) / 100) * 0.85)} €`, color: C.green },
              { label: 'Payout', value: 'Monthly transfer' },
            ].map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 0', borderBottom: `1px solid ${C.border}`, fontSize: 13,
                  animation: `fadeIn .25s ease ${i * 0.04}s backwards`,
                }}
              >
                <span style={{ color: C.textMid }}>{row.label}</span>
                <span style={{ fontWeight: 700, color: row.color || C.text }}>{row.value}</span>
              </div>
            ))}
            <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
              <button
                onClick={() => setWizard(1)}
                style={{
                  flex: 1, padding: '11px 0', fontSize: 13, fontWeight: 600,
                  color: C.textMid, background: C.bg, border: `1px solid ${C.border}`,
                  borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                Back
              </button>
              <button
                onClick={() => setWizard(null)}
                style={{
                  flex: 1, padding: '11px 0', fontSize: 14, fontWeight: 700,
                  color: '#fff', background: `linear-gradient(135deg, ${C.green}, #1a8a54)`,
                  border: 'none', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 4px 14px rgba(26,122,74,0.3)',
                  animation: 'scaleIn .3s ease .15s backwards',
                }}
              >
                Publish spot
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
