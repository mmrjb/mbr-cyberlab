# MBR CyberLab publishing contract

- This is the public English companion site for MBR CyberLab's long-form lessons.
- Read `mbr-cyberlab.config.json` before integrating a lesson. Keep the current Astro structure and project base path `/mbr-cyberlab`.
- Store one Markdown article per stable lowercase hyphenated slug in `src/content/lessons/`. Start from `templates/lesson.md`; keep all six required `##` sections in order.
- A public lesson needs `draft: false`, a real `youtubeUrl` supplied by the user, `publishedAt`, and `slides: slides/<slug>.html`. Metadata is validated by `src/content.config.ts`.
- Embed the validated video inside **Watch the video** using `youtube-nocookie.com`, with an accessible title and an ordinary YouTube watch link. Do not invent videos, timing, publication dates, results, or sources.
- Place the audience-only HTML slides in `public/slides/` and diagrams in `public/diagrams/<slug>/`. Keep script, presenter notes, rehearsal files, and unpublished video metadata outside this public repository unless explicitly authorized.
- Use the original `public/brand/mbr-logo.png`. Do not replace the logo or introduce character presenters by default.
- Use `href()` from `src/lib/site.ts` for template links. Markdown HTML/image links must include `/mbr-cyberlab/`. Render Mermaid to SVG before publication; this site does not load a Mermaid CDN.
- Run `npm run check` and `npm run build` before publishing. The build checks local links and assets. No separate manual homepage/category edits are needed; lists derive from published content.
- Preserve the article URL on revision, use the real recording's changes, and increment `scriptRevision` when appropriate. Add `updatedAt` for substantive article revisions.
- New ready lessons are authorized for publication to this configured repository by the user's workflow. Review the diff, commit only relevant files, respect branch rules, and verify the deployment for that commit. A pending/failed deployment is not a live page.
- Return the verified article and slides links, plus ready-to-paste YouTube description and caption. Do not post to YouTube or other services without explicit authorization.
- `setup_status` and `site_url_status` describe observed deployment status. Do not change them to configured/live until a matching successful deployment and reachable site are verified.
