'use client';
import React, { useEffect, useRef } from 'react';
import { C, Spot } from '@/lib/data';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface PragueMapProps {
  spots: Spot[];
  mult: number;
  active: Spot | null;
  onSelect: (spot: Spot) => void;
}

const PRAGUE_CENTER: [number, number] = [50.083, 14.445];

export default function PragueMap({ spots, mult, active, onSelect }: PragueMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<number, L.CircleMarker>>(new Map());
  const popupRef = useRef<L.Popup | null>(null);

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: PRAGUE_CENTER,
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    L.control.attribution({ position: 'bottomleft', prefix: false })
      .addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>')
      .addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers when spots/mult/active change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();
    if (popupRef.current) {
      popupRef.current.remove();
      popupRef.current = null;
    }

    spots.forEach((spot) => {
      const isActive = active?.id === spot.id;
      const fillColor = spot.available ? C.green : C.red;
      const price = Math.round(spot.basePrice * mult);

      const marker = L.circleMarker([spot.lat, spot.lng], {
        radius: isActive ? 10 : 7,
        fillColor,
        color: '#ffffff',
        weight: 2,
        fillOpacity: 1,
      }).addTo(map);

      marker.on('click', () => onSelect(spot));
      markersRef.current.set(spot.id, marker);

      if (isActive) {
        map.flyTo([spot.lat, spot.lng], 15, { duration: 0.8 });

        const popup = L.popup({
          closeButton: false,
          className: 'parkshare-popup',
          offset: [0, -8],
        })
          .setLatLng([spot.lat, spot.lng])
          .setContent(`<strong>${price} €</strong>`)
          .openOn(map);
        popupRef.current = popup;
      }
    });
  }, [spots, mult, active, onSelect]);

  return (
    <>
      <div
        ref={containerRef}
        style={{ width: '100%', height: 320, borderRadius: 8, overflow: 'hidden' }}
      />
      <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 11, color: C.textMid }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: C.green, display: 'inline-block' }} />
          Available
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: C.red, display: 'inline-block' }} />
          Occupied
        </span>
      </div>
      <style>{`
        .parkshare-popup .leaflet-popup-content-wrapper {
          background: ${C.text};
          color: ${C.surface};
          border-radius: 6px;
          padding: 2px 6px;
          font-size: 13px;
          font-family: Figtree, sans-serif;
          box-shadow: 0 2px 8px rgba(0,0,0,.25);
        }
        .parkshare-popup .leaflet-popup-content {
          margin: 4px 6px;
        }
        .parkshare-popup .leaflet-popup-tip {
          background: ${C.text};
        }
      `}</style>
    </>
  );
}
