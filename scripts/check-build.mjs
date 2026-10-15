import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist'), base='/mbr-cyberlab/';
async function walk(dir){const files=[];for(const item of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,item.name);if(item.isDirectory())files.push(...await walk(p));else files.push(p);}return files;}
const htmlFiles=(await walk(root)).filter(file=>file.endsWith('.html'));
const errors=[];
for(const file of htmlFiles){
  const html=await readFile(file,'utf8');
  if(!/<html\b[^>]*lang="en"/.test(html))errors.push(`${file}: missing English document language`);
  for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
    const value=match[1].replaceAll('&amp;','&');
    if(!value||value.startsWith('#')||/^(?:https?:|data:|mailto:|tel:)/.test(value))continue;
    if(value.startsWith('//'))continue;
    let target;
    if(value.startsWith('/')){
      if(!value.startsWith(base)){errors.push(`${file}: missing project base path: ${value}`);continue;}
      target=path.join(root,decodeURIComponent(value.slice(base.length).split(/[?#]/)[0]));
    }else target=path.resolve(path.dirname(file),decodeURIComponent(value.split(/[?#]/)[0]));
    if(target!==root&&!target.startsWith(root+path.sep)){errors.push(`${file}: link escapes build output: ${value}`);continue;}
    let exists=false;
    for(const candidate of [target,path.join(target,'index.html'),target+'.html']){
      try{if((await stat(candidate)).isFile()){exists=true;break;}}catch{}
    }
    if(!exists)errors.push(`${file}: missing local destination ${value}`);
  }
}
for(const required of ['index.html','about/index.html','lessons/index.html','topics/network/index.html','topics/cybersecurity/index.html','topics/linux/index.html','topics/windows/index.html','sitemap.xml','brand/mbr-logo.png']){
  try{await stat(path.join(root,required));}catch{errors.push(`Required output missing: ${required}`);}
}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`Build links and assets passed across ${htmlFiles.length} HTML pages.`);
