# سجل التغييرات (Changelog)

## [2026-09-05]
- `refactor(storage)`: isolate localStorage keys under STORAGE_KEYS (mohammed_*) to prevent collisions with sana-report, and bump PWA cache to v4.
- `refactor(code-quality)`: audit codebase against clean-code principles, extract shared helpers (syncCurrentDraft, formatHoursText), modernize APIs, and elevate PWA cache to v3.
- `refactor(session)`: remove "الفترة" (halaType) and "الفئة" (studentCategory) from session setup, drafts, text exports, and PDF.
- `chore(branding)`: replace all instances of "أكاديمية سنا" with "تقرير حصة القرآن الكريم" across UI, manifest, constants, exports, and icon.
- `refactor(report)`: remove Google Forms submission button, function, and configuration from reporting pipeline.
- `feat(settings)`: lock teacher name to "محمد نبيل" and remove teacher select dropdown across UI and exports.
- `refactor(core)`: remove quran picker modal, helper scripts, dataset files, and associated styles to streamline daily reporting workflow.
