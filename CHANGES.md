# Portfolio Updates — 7 July 2026

## How to apply
Copy these files into your local portfolio-website repo (same paths), then:

    git add src/App.jsx index.html public/ CHANGES.md
    git rm Junior_software_engineer.pdf --cached 2>/dev/null || true
    git commit -m "Fix project links, align content with CV, replace CV PDF"
    git push

(Also delete public/Junior_software_engineer.pdf if it still exists locally.)

## What changed

1. **Project cards** — URL Shortener and Web Content Scraper now link to their real
   repos. The two Tontrac projects are no longer links; they show
   "Professional Work · Code Private" instead of a misleading GitHub link.
2. **House Marketplace removed** — replaced with Web Content Scraper (original work,
   accurate description).
3. **Duplicate id fixed** — Skills section is now id="skills"; "Skills" added to nav.
4. **"#1 CS University" badge removed** (also removed from the About paragraph) —
   unverifiable superlatives cost more than they earn.
5. **Experience updated** — added computer-vision (OpenCV/OCR/LPR) and on-site
   deployment bullets to match the new CV.
6. **Skills cards aligned with CV** — removed C#, Java, Flask, Microservices;
   added SQL Server, T-SQL, WebSockets; Soft Skills card replaced with a
   Computer Vision card (your real differentiator).
7. **About section** — now mentions AWS Developer Associate + AZ-900 (in progress).
8. **Stats row** — "1+ Year Experience" replaced with "50+ Sites Supported"
   (stronger and verifiable; the tenure number was a stretch at 9 months).
9. **CV PDF replaced** — old Junior_software_engineer.pdf deleted; new
   Chrisnerg_Mqobo_CV.pdf added; all three download links updated.
10. **SEO** — meta description added to index.html.
