# PDFWay

PDFWay is a responsive browser-based PDF workspace starter. Core supported operations use browser libraries for local processing.

## Live preview
Enable GitHub Pages from repository Settings → Pages → Deploy from branch main / root. Open the repository Pages URL once enabled.

## Included
- Responsive premium UI, light/dark toggle, tool search and category filtering
- Merge PDFs, extract pages, remove page ranges, rotate, watermark, page numbering
- Images to PDF (JPG/PNG), extract PDF text, basic DOC/CSV text export
- PDF metadata preview
- Honest status UI for functions that need more processing/backend support

## Not connected yet
- Google/OTP authentication: configure Supabase Auth and OAuth providers
- PDF compress, crop, flatten, compare, PDF-to-images, password encryption, OCR, full Office conversion require additional implementation
- No server/backend is included; supported tools process files in the browser

## Security
Do not use this demo for confidential files until you review the deployed code and third-party CDN dependencies. Local processing is intended for supported operations. No authentication backend exists in this starter.


## Updated tools status
- Fixed script handler and added crop-box trimming.
- Password protection, OCR, full Office conversion, and account login still require further integrations.

- Reorder pages with a validated custom page sequence (all pages must be included exactly once).
