/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * App boot splash / loading screen: spinning dual glow rings around the
 * logo, a letter-by-letter "Scottyhub" fade-in, bouncing dots, a sliding
 * progress bar, and floating background particles.
 */
import React, { useMemo } from 'react';
import splashLogo from '../assets/images/scottyhub_glyph.png';

const BRAND = 'Scottyhub'.split('');

interface Particle {
  id: number;
  left: string;
  delay: string;
  duration: string;
}

export const SplashScreen: React.FC = () => {
  // Floating background particles — generated once per mount, mirroring
  // the original script's random left position / delay / duration.
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
        delay: `${Math.random() * 6}s`,
        duration: `${4 + Math.random() * 6}s`,
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#01002e] overflow-hidden font-sans">
      <style>{`
        .sh-loader-wrapper {
          position: relative;
          width: 260px;
          height: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sh-logo {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          animation: sh-pulse 2.2s ease-in-out infinite;
        }
        .sh-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: #00d4ff;
          border-right-color: #7b2fff;
          animation: sh-spin 1.6s linear infinite;
          filter: drop-shadow(0 0 8px #00d4ff);
        }
        .sh-ring-2 {
          inset: -14px;
          border-top-color: #7b2fff;
          border-right-color: transparent;
          border-bottom-color: #00d4ff;
          animation: sh-spin 3s linear infinite reverse;
          opacity: 0.6;
        }
        .sh-brand {
          margin-top: 40px;
          font-size: 34px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 1px;
          display: flex;
        }
        .sh-brand span {
          opacity: 0;
          animation: sh-fadeLetter 0.5s ease forwards;
        }
        .sh-dots {
          margin-top: 18px;
          display: flex;
          gap: 10px;
        }
        .sh-dots i {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #00d4ff;
          box-shadow: 0 0 10px #00d4ff;
          animation: sh-bounce 1.2s ease-in-out infinite;
        }
        .sh-progress-bar {
          margin-top: 30px;
          width: 220px;
          height: 4px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }
        .sh-progress-bar::after {
          content: "";
          display: block;
          height: 100%;
          width: 40%;
          border-radius: 4px;
          background: linear-gradient(90deg, #00d4ff, #7b2fff);
          box-shadow: 0 0 12px #00d4ff;
          animation: sh-slide 1.4s ease-in-out infinite;
        }
        .sh-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #4d7bff;
          opacity: 0.5;
          animation: sh-float linear infinite;
        }
        @keyframes sh-spin { to { transform: rotate(360deg); } }
        @keyframes sh-pulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 12px rgba(0, 212, 255, 0.4)); }
          50%      { transform: scale(1.06); filter: drop-shadow(0 0 28px rgba(123, 47, 255, 0.7)); }
        }
        @keyframes sh-fadeLetter {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sh-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50%      { transform: translateY(-10px); opacity: 1; }
        }
        @keyframes sh-slide {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(320%); }
        }
        @keyframes sh-float {
          0%   { transform: translateY(100vh) scale(0.6); opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
        }
      `}</style>

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="sh-particle"
          style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}
        />
      ))}

      <div className="sh-loader-wrapper">
        <div className="sh-ring" />
        <div className="sh-ring sh-ring-2" />
        <img className="sh-logo" src={splashLogo} alt="Scottyhub logo" />
      </div>

      <div className="sh-brand">
        {BRAND.map((letter, i) => (
          <span key={i} style={{ animationDelay: `${0.05 * (i + 1)}s` }}>
            {letter}
          </span>
        ))}
      </div>

      <div className="sh-dots">
        <i />
        <i style={{ animationDelay: '0.15s', background: '#4d7bff', boxShadow: '0 0 10px #4d7bff' }} />
        <i style={{ animationDelay: '0.30s', background: '#7b2fff', boxShadow: '0 0 10px #7b2fff' }} />
      </div>

      <div className="sh-progress-bar" />
    </div>
  );
};
