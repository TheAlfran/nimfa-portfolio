# Nimfa Portfolio

Personal portfolio built with React, TypeScript, Vite, Tailwind CSS v4, and shadcn/ui.
Uses [Bun](https://bun.sh) as the package manager.

## Getting started

```bash
bun install      # install dependencies
bun run dev      # start the dev server at http://localhost:5173
bun run build    # type-check and build to dist/
bun run preview  # preview the production build
bun run lint     # lint with oxlint
```

## Editing content

All text, projects, experience, and links live in `src/data/portfolioData.ts`.

## Updating the resume

The resume popup shows an image of the PDF (sharp, no browser PDF toolbar, works on phones);
the Open and Download buttons give visitors the real PDF.

1. Replace `public/Nimfa-Mae-Sumalinog-Resume.pdf` with the new PDF (same file name).
2. Regenerate the images:
   ```bash
   bun run resume:images
   ```
   This updates `public/resume/` and `src/data/resumePages.ts` (multi-page PDFs work too).

To use a different file name, change `RESUME_PDF` in `src/data/portfolioData.ts`.

## Contact form (EmailJS)

The contact form emails messages to you through [EmailJS](https://www.emailjs.com) — no backend
needed. The email's design is in `emailjs-template.html`.

1. **Create an account** at https://www.emailjs.com (the free plan is enough).
2. **Connect Gmail:** Email Services → Add New Service → Gmail → connect `sumalinognimfa@gmail.com`.
   Copy the **Service ID** (e.g. `service_abc123`).
3. **Create the template:** Email Templates → Create New Template, then:
   - **Content:** click *Edit Content* → *Code Editor*, delete what's there, and paste all of `emailjs-template.html`.
   - **Subject:** `{{topic}} — {{name}}`
   - **To Email:** `sumalinognimfa@gmail.com`
   - **From Name:** `{{name}} (Portfolio)`
   - **Reply To:** `{{email}}`
   - Save, then copy the **Template ID** (e.g. `template_xyz789`).
4. **Public key:** Account → General → copy the **Public Key**.
5. Paste all three into `.env.local`:
   ```
   VITE_EMAILJS_SERVICE_ID=service_abc123
   VITE_EMAILJS_TEMPLATE_ID=template_xyz789
   VITE_EMAILJS_PUBLIC_KEY=your-public-key
   ```
6. Restart `bun run dev` and send yourself a test message.

When you deploy (Vercel, Netlify, etc.), add the same three variables in the host's environment
settings, and in EmailJS (Account → Security) consider limiting requests to your site's domain.

Until the values are set, the form shows a message asking visitors to email you directly.

## Adding shadcn components

```bash
bunx shadcn@latest add dialog
```
