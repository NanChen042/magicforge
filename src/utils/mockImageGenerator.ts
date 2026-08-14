// Procedural High-Definition Generative Art Studio Engine (Local Fallback Renderer)

export function generateThemedArtwork(prompt: string, seed: number, ratio: string = '1:1'): string {
  const p = prompt.toLowerCase();
  
  // Determine dominant theme
  let theme: 'cyberpunk' | 'anime' | 'ink' | 'scifi' | 'film' | 'clay' | 'landscape' = 'landscape';
  if (p.includes('cyber') || p.includes('赛博') || p.includes('霓虹') || p.includes('neon')) theme = 'cyberpunk';
  else if (p.includes('anime') || p.includes('新海诚') || p.includes('动漫') || p.includes('二次元') || p.includes('云海')) theme = 'anime';
  else if (p.includes('ink') || p.includes('水墨') || p.includes('国风') || p.includes('山水')) theme = 'ink';
  else if (p.includes('scifi') || p.includes('科幻') || p.includes('神殿') || p.includes('宇宙') || p.includes('space') || p.includes('oracle')) theme = 'scifi';
  else if (p.includes('photo') || p.includes('胶片') || p.includes('微距') || p.includes('摄影') || p.includes('dew')) theme = 'film';
  else if (p.includes('3d') || p.includes('盲盒') || p.includes('黏土') || p.includes('clay') || p.includes('cute')) theme = 'clay';

  const [wRatio, hRatio] = ratio.split(':').map(Number);
  const w = 1024;
  const h = Math.round((1024 * (hRatio || 1)) / (wRatio || 1));

  const svgContent = buildSvgArtwork(theme, prompt, seed, w, h);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
}

function buildSvgArtwork(theme: string, prompt: string, seed: number, w: number, h: number): string {
  if (theme === 'cyberpunk') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#090514"/>
          <stop offset="60%" stop-color="#180c32"/>
          <stop offset="100%" stop-color="#0d041c"/>
        </linearGradient>
        <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#06b6d4"/>
          <stop offset="100%" stop-color="#3b82f6"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#bgGrad)"/>
      <circle cx="${w * 0.5}" cy="${h * 0.6}" r="${w * 0.35}" fill="#e11d48" opacity="0.2" filter="blur(60px)"/>
      <circle cx="${w * 0.7}" cy="${h * 0.3}" r="${w * 0.25}" fill="#06b6d4" opacity="0.25" filter="blur(70px)"/>
      <!-- Buildings -->
      <rect x="${w * 0.08}" y="${h * 0.25}" width="${w * 0.15}" height="${h * 0.75}" fill="#150a29"/>
      <rect x="${w * 0.26}" y="${h * 0.4}" width="${w * 0.18}" height="${h * 0.6}" fill="#20103e"/>
      <rect x="${w * 0.48}" y="${h * 0.15}" width="${w * 0.22}" height="${h * 0.85}" fill="#110722"/>
      <rect x="${w * 0.73}" y="${h * 0.35}" width="${w * 0.2}" height="${h * 0.65}" fill="#1a0d33"/>
      <!-- Glowing Billboards -->
      <rect x="${w * 0.52}" y="${h * 0.28}" width="${w * 0.12}" height="${h * 0.22}" fill="url(#neonCyan)" opacity="0.9" rx="4"/>
      <rect x="${w * 0.29}" y="${h * 0.52}" width="${w * 0.12}" height="${h * 0.08}" fill="#ec4899" opacity="0.9" rx="4"/>
      <!-- Light Trails -->
      <line x1="0" y1="${h * 0.75}" x2="${w}" y2="${h * 0.68}" stroke="#ec4899" stroke-width="4" opacity="0.85"/>
      <line x1="0" y1="${h * 0.82}" x2="${w}" y2="${h * 0.78}" stroke="#06b6d4" stroke-width="3" opacity="0.85"/>
      <!-- Wet Reflection -->
      <rect x="0" y="${h * 0.85}" width="${w}" height="${h * 0.15}" fill="#0a0314"/>
      <ellipse cx="${w * 0.55}" cy="${h * 0.92}" rx="${w * 0.3}" ry="${h * 0.04}" fill="#06b6d4" opacity="0.4" filter="blur(15px)"/>
      <text x="${w * 0.05}" y="${h * 0.95}" fill="#ffffff" opacity="0.7" font-family="monospace" font-size="14">AI GENERATED • SEED: ${seed}</text>
    </svg>`;
  } else if (theme === 'anime') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="50%" stop-color="#38bdf8"/>
          <stop offset="80%" stop-color="#fb923c"/>
          <stop offset="100%" stop-color="#f43f5e"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#skyGrad)"/>
      <circle cx="${w * 0.75}" cy="${h * 0.7}" r="${w * 0.15}" fill="#fef08a" opacity="0.85" filter="blur(10px)"/>
      <!-- Clouds -->
      <path d="M-50 ${h} Q${w * 0.1} ${h * 0.45} ${w * 0.3} ${h * 0.7} Q${w * 0.5} ${h * 0.35} ${w * 0.7} ${h * 0.75} Q${w * 0.85} ${h * 0.3} ${w * 1.1} ${h} Z" fill="#ffffff" opacity="0.9"/>
      <path d="M${w * 0.1} ${h} Q${w * 0.3} ${h * 0.6} ${w * 0.55} ${h * 0.8} Q${w * 0.75} ${h * 0.5} ${w * 1.1} ${h} Z" fill="#fed7aa" opacity="0.7"/>
      <!-- Power Lines -->
      <line x1="0" y1="${h * 0.15}" x2="${w}" y2="${h * 0.3}" stroke="#1e293b" stroke-width="1.5" opacity="0.8"/>
      <line x1="0" y1="${h * 0.25}" x2="${w}" y2="${h * 0.42}" stroke="#1e293b" stroke-width="1.5" opacity="0.7"/>
      <rect x="${w * 0.2}" y="${h * 0.35}" width="6" height="${h * 0.65}" fill="#0f172a"/>
      <line x1="${w * 0.14}" y1="${h * 0.48}" x2="${w * 0.26}" y2="${h * 0.48}" stroke="#0f172a" stroke-width="3"/>
      <text x="${w * 0.05}" y="${h * 0.95}" fill="#ffffff" opacity="0.8" font-family="monospace" font-size="14">MAKOTO SHINKAI AESTHETIC • SEED: ${seed}</text>
    </svg>`;
  } else if (theme === 'ink') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
      <rect width="${w}" height="${h}" fill="#f5f5f4"/>
      <circle cx="${w * 0.8}" cy="${h * 0.28}" r="${w * 0.08}" fill="#dc2626" opacity="0.85"/>
      <path d="M-50 ${h} Q${w * 0.25} ${h * 0.2} ${w * 0.55} ${h}" fill="#a8a29e" opacity="0.4"/>
      <path d="M${w * 0.35} ${h} Q${w * 0.65} ${h * 0.15} ${w * 1.1} ${h}" fill="#78716c" opacity="0.5"/>
      <path d="M-50 ${h} Q${w * 0.18} ${h * 0.4} ${w * 0.45} ${h}" fill="#292524" opacity="0.85"/>
      <path d="M${w * 0.5} ${h} Q${w * 0.78} ${h * 0.35} ${w * 1.15} ${h}" fill="#1c1917" opacity="0.95"/>
      <!-- Birds -->
      <path d="M${w * 0.4} ${h * 0.25} Q${w * 0.42} ${h * 0.23} ${w * 0.44} ${h * 0.25} Q${w * 0.46} ${h * 0.23} ${w * 0.48} ${h * 0.25}" stroke="#292524" stroke-width="2" fill="none"/>
      <path d="M${w * 0.48} ${h * 0.3} Q${w * 0.5} ${h * 0.28} ${w * 0.52} ${h * 0.3} Q${w * 0.54} ${h * 0.28} ${w * 0.56} ${h * 0.3}" stroke="#292524" stroke-width="1.8" fill="none"/>
      <text x="${w * 0.05}" y="${h * 0.95}" fill="#1c1917" opacity="0.7" font-family="monospace" font-size="14">TRADITIONAL INK ART • SEED: ${seed}</text>
    </svg>`;
  } else if (theme === 'scifi') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
      <rect width="${w}" height="${h}" fill="#030712"/>
      <circle cx="${w * 0.5}" cy="${h * 0.5}" r="${w * 0.35}" fill="#0284c7" opacity="0.3" filter="blur(80px)"/>
      <circle cx="${w * 0.5}" cy="${h * 0.45}" r="${w * 0.12}" fill="#ffffff" opacity="0.95" filter="blur(2px)"/>
      <ellipse cx="${w * 0.5}" cy="${h * 0.45}" rx="${w * 0.3}" ry="${h * 0.12}" fill="none" stroke="#38bdf8" stroke-width="3" opacity="0.8" transform="rotate(-15 ${w * 0.5} ${h * 0.45})"/>
      <ellipse cx="${w * 0.5}" cy="${h * 0.45}" rx="${w * 0.38}" ry="${h * 0.16}" fill="none" stroke="#a855f7" stroke-width="2" opacity="0.6" transform="rotate(25 ${w * 0.5} ${h * 0.45})"/>
      <!-- Grid -->
      <line x1="0" y1="${h * 0.85}" x2="${w}" y2="${h * 0.85}" stroke="#0ea5e9" stroke-width="1.5" opacity="0.7"/>
      <line x1="${w * 0.5}" y1="${h * 0.55}" x2="0" y2="${h}" stroke="#0ea5e9" stroke-width="1.5" opacity="0.6"/>
      <line x1="${w * 0.5}" y1="${h * 0.55}" x2="${w}" y2="${h}" stroke="#0ea5e9" stroke-width="1.5" opacity="0.6"/>
      <text x="${w * 0.05}" y="${h * 0.95}" fill="#38bdf8" opacity="0.8" font-family="monospace" font-size="14">QUANTUM NEXUS • SEED: ${seed}</text>
    </svg>`;
  } else {
    // Default high-grade cinematic landscape
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
      <defs>
        <linearGradient id="natureGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="40%" stop-color="#1e3a8a"/>
          <stop offset="70%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#38bdf8"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#natureGrad)"/>
      <circle cx="${w * 0.5}" cy="${h * 0.35}" r="${w * 0.2}" fill="#fef08a" opacity="0.8" filter="blur(30px)"/>
      <path d="M0 ${h} Q${w * 0.3} ${h * 0.6} ${w * 0.6} ${h * 0.8} Q${w * 0.85} ${h * 0.55} ${w} ${h} Z" fill="#047857" opacity="0.85"/>
      <path d="M0 ${h} Q${w * 0.45} ${h * 0.75} ${w} ${h} Z" fill="#065f46" opacity="0.95"/>
      <text x="${w * 0.05}" y="${h * 0.95}" fill="#ffffff" opacity="0.8" font-family="monospace" font-size="14">MAGICFORGE CINEMATIC • SEED: ${seed}</text>
    </svg>`;
  }
}
