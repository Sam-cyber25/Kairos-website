import { memo } from 'react'

interface KairosAuroraProps {
  variant?: 'hero' | 'footer'
}

const KairosAurora = memo(function KairosAurora({ variant = 'footer' }: KairosAuroraProps) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
      {/* Base background */}
      <div style={{ position: 'absolute', inset: 0, background: variant === 'hero' ? 'linear-gradient(160deg, #0A1510 0%, #1C352D 50%, #0D1A14 100%)' : 'linear-gradient(160deg, #0D1A14 0%, #1C352D 60%, #0A1510 100%)' }} />
      {/* Blob 1 — upper right, sage green */}
      <div style={{ position: 'absolute', top: variant === 'hero' ? '-10%' : '-20%', right: '-5%', width: '65%', height: '70%', background: 'radial-gradient(ellipse at center, rgba(140,163,153,0.5) 0%, rgba(140,163,153,0.2) 40%, transparent 70%)', filter: 'blur(72px)', animation: 'auroraBlob1 20s ease-in-out infinite', willChange: 'transform' }} />
      {/* Blob 2 — center left, mid green */}
      <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '55%', height: '60%', background: 'radial-gradient(ellipse at center, rgba(62,96,82,0.45) 0%, rgba(62,96,82,0.15) 45%, transparent 70%)', filter: 'blur(80px)', animation: 'auroraBlob2 25s ease-in-out infinite', willChange: 'transform' }} />
      {/* Blob 3 — bottom center, deep green */}
      <div style={{ position: 'absolute', bottom: '-15%', left: '20%', width: '60%', height: '55%', background: 'radial-gradient(ellipse at center, rgba(28,53,45,0.7) 0%, rgba(28,53,45,0.3) 50%, transparent 70%)', filter: 'blur(60px)', animation: 'auroraBlob3 18s ease-in-out infinite', willChange: 'transform' }} />
      {/* Blob 4 — cream accent whisper */}
      <div style={{ position: 'absolute', top: '30%', left: '35%', width: '40%', height: '40%', background: 'radial-gradient(ellipse at center, rgba(248,240,229,0.07) 0%, transparent 65%)', filter: 'blur(90px)', animation: 'auroraBlob4 30s ease-in-out infinite', willChange: 'transform' }} />
      {/* Blob 5 — extra sage depth upper left */}
      <div style={{ position: 'absolute', top: '-5%', left: '5%', width: '45%', height: '50%', background: 'radial-gradient(ellipse at center, rgba(140,163,153,0.25) 0%, transparent 65%)', filter: 'blur(88px)', animation: 'auroraBlob5 22s ease-in-out infinite', willChange: 'transform' }} />
    </div>
  )
})

export { KairosAurora }
