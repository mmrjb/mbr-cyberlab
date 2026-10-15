# MBR CyberLab

English lessons and hands-on notes on networking, cybersecurity, Linux, and Windows.
Watch an explanation, read the concept in depth, and put it into practice.

## Website

GitHub Pages destination: https://mmrjb.github.io/mbr-cyberlab/

The first deployment requires **Settings → Pages → Build and deployment → Source: GitHub Actions**.
Then run **Actions → Build and deploy MBR CyberLab → Run workflow**, or re-run the latest failed deployment after enabling Pages.

## Develop locally

Use Node.js 24 and the committed lockfile:

```sh
npm ci
npm run dev
```

Open the local address printed by Astro, including `/mbr-cyberlab/`.

```sh
npm run check
npm run build
```

## Add a lesson

1. Prepare the full recording script, audience HTML slides, and separate presenter notes.
2. Record the video and obtain its real YouTube URL. An unlisted upload can be used while preparing the companion article.
3. Copy `templates/lesson.md` to `src/content/lessons/<stable-slug>.md` and write all six sections. Fill the required metadata and verified video embed.
4. Save the audience slides in `public/slides/<stable-slug>.html` and any diagrams in `public/diagrams/<stable-slug>/`. Do not commit private rehearsal material.
5. Set `draft: false` only when the article, real video link, slides, and references are ready. Run both checks above.
6. Commit the scoped changes to `main`. GitHub Actions builds and deploys the site. Verify that commit's run and the actual page before announcing publication.

Lesson lists, category pages, and the sitemap update from the published Markdown collection. Drafts are excluded from public pages. A repository source file is still visible in a public repository even if marked as a draft; keep private drafts elsewhere.

## Content contract

- `src/content.config.ts`: metadata schema.
- `templates/lesson.md`: six-section article template.
- `mbr-cyberlab.config.json`: paths and publication settings used by the lesson Skill.
- `AGENTS.md`: instructions for automated content updates.

The site starts with empty learning paths. No sample lesson is presented as a recorded or published video.
