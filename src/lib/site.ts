export const brand = 'MBR CyberLab';
export const repository = 'https://github.com/mmrjb/mbr-cyberlab';
export const description = 'Clear English lessons on networking, cybersecurity, Linux, and Windows. Read the concepts, explore the diagrams, and put them into practice.';
export const paths = [
  { id: 'network', name: 'Network', number: '01', symbol: '↗', tagline: 'Understand the connections.', description: 'Follow how devices communicate, how data moves, and what keeps a network working.', topics: ['Network fundamentals', 'Protocols & addressing', 'Troubleshooting'] },
  { id: 'cybersecurity', name: 'Cybersecurity', number: '02', symbol: '◇', tagline: 'See the evidence.', description: 'Explore security concepts, detection, and the evidence behind an investigation.', topics: ['Security fundamentals', 'Detection & monitoring', 'Digital forensics'] },
  { id: 'linux', name: 'Linux', number: '03', symbol: '>_', tagline: 'Make the terminal familiar.', description: 'Build confidence with the command line, system behavior, and useful logs.', topics: ['Command line', 'Processes & services', 'Logs & permissions'] },
  { id: 'windows', name: 'Windows', number: '04', symbol: '⊞', tagline: 'Know the system beneath.', description: 'Connect everyday Windows behavior with system internals and forensic artifacts.', topics: ['System fundamentals', 'Event logs', 'Endpoint artifacts'] },
] as const;
export type Category = typeof paths[number]['name'];
export function href(path = '') {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
export function youtubeId(value: string): string | null {
  try {
    const url = new URL(value);
    if (!['https:', 'http:'].includes(url.protocol)) return null;
    const host = url.hostname.toLowerCase();
    let id: string | null = null;
    if (host === 'youtu.be') id = url.pathname.slice(1).split('/')[0];
    else if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(host)) {
      if (url.pathname === '/watch') id = url.searchParams.get('v');
      else if (/^\/(shorts|live)\//.test(url.pathname)) id = url.pathname.split('/')[2];
    }
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}
