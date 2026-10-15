import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';

const required = ['What you’ll learn', 'Watch the video', 'The concept', 'Try it yourself', 'Common mistakes', 'Key takeaways & references'];
const dir = 'src/content/lessons';
const files = (await readdir(dir)).filter(name => name.endsWith('.md'));
const errors = [];
let published = 0;
function videoId(value) {
  try {
    const u = new URL(value);
    if (!['https:', 'http:'].includes(u.protocol)) return null;
    const id = u.hostname === 'youtu.be' ? u.pathname.slice(1).split('/')[0] : ['youtube.com','www.youtube.com','m.youtube.com'].includes(u.hostname) ? u.pathname === '/watch' ? u.searchParams.get('v') : /^\/(live|shorts)\//.test(u.pathname) ? u.pathname.split('/')[2] : null : null;
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}
function visibleMarkdown(body) {
  let fence = null;
  return body.replace(/<!--[\s\S]*?-->/g,'').split('\n').filter(line=>{
    const match=line.match(/^ {0,3}(`{3,}|~{3,})/);
    if(match){if(!fence)fence=match[1];else if(match[1][0]===fence[0]&&match[1].length>=fence.length)fence=null;return false;}
    return !fence;
  }).join('\n');
}
for (const file of files) {
  const text = await readFile(path.join(dir,file),'utf8');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if(!match){errors.push(`${file}: missing YAML frontmatter`);continue;}
  let data;
  try{data=parse(match[1]);}catch(error){errors.push(`${file}: ${error.message}`);continue;}
  if(data?.draft !== false)continue;
  published++;
  const slug=file.slice(0,-3), body=visibleMarkdown(match[2]);
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))errors.push(`${file}: use a stable lowercase hyphenated slug`);
  const headings=[...body.matchAll(/^##\s+(.+?)\s*$/gm)].map(m=>m[1]);
  if(JSON.stringify(headings)!==JSON.stringify(required))errors.push(`${file}: include the six required level-two headings in order`);
  const id=videoId(data.youtubeUrl);
  const watch=body.split('## Watch the video')[1]?.split('\n## ')[0]??'';
  if(!id||!watch.includes(`https://www.youtube-nocookie.com/embed/${id}`)||!/<iframe\b[^>]*\btitle=["'][^"']+["']/i.test(watch))errors.push(`${file}: Watch the video needs an accessible embed matching the real youtubeUrl`);
  if(!/\]\(https:\/\/(?:www\.|m\.)?(?:youtube\.com|youtu\.be)\//.test(watch))errors.push(`${file}: add an ordinary YouTube watch link`);
  if(data.slides!==`slides/${slug}.html`)errors.push(`${file}: slides must be slides/${slug}.html`);
  else try{await access(path.join('public',data.slides));}catch{errors.push(`${file}: audience slides file is missing`);}
  if(/VERIFIED_VIDEO_ID|YOUR_URL|REPLACE_ME|Replace with the lesson title/.test(body))errors.push(`${file}: unresolved authoring placeholder`);
}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`Content contract passed: ${published} published lesson(s), ${files.length-published} draft(s).`);
