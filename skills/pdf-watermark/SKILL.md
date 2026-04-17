---
name: pdf-watermark
description: "Add watermarks to PDFs and images — text stamps (CONFIDENTIAL, DRAFT, APPROVED), logo/image overlays, tiled or single placement, custom color/opacity/angle/font, and position presets. Powered by PDFAPIHub."
---

# PDF Watermark

Add text or image watermarks to PDFs and images with full control over styling, placement, and tiling.

## Tools

| Tool | Description |
|------|-------------|
| `watermark_document` | Full-featured watermark with custom text/image, color, opacity, angle, position, tiled mode |
| `stamp_confidential` | Quick preset: tiled "CONFIDENTIAL" watermark across every page |
| `stamp_draft` | Quick preset: tiled "DRAFT" watermark across every page |
| `stamp_approved` | Quick preset: bold green "APPROVED" stamp at center |
| `add_logo_watermark` | Overlay a logo/stamp image with opacity and position control |

## Setup

Get your **free API key** at [https://pdfapihub.com](https://pdfapihub.com).

Configure in `~/.openclaw/openclaw.json`:

```json
{
  "plugins": {
    "entries": {
      "pdf-watermark": {
        "enabled": true,
        "env": {
          "PDFAPIHUB_API_KEY": "your-api-key-here"
        }
      }
    }
  }
}
```

Or set the environment variable in config: `"env": { "PDFAPIHUB_API_KEY": "your-key" }`

## Usage Examples

**Mark a document as confidential:**
> Add a CONFIDENTIAL watermark to this PDF: https://pdfapihub.com/sample.pdf

**Mark as draft:**
> Stamp DRAFT on every page of this report

**Approve a document:**
> Add an APPROVED stamp to this contract

**Custom watermark text:**
> Add "FOR INTERNAL USE ONLY" watermark in red at 20% opacity, tiled across every page

**Copyright watermark:**
> Add "© 2026 Acme Corp" watermark at the bottom-right of every page

**Logo overlay:**
> Overlay our company logo at bottom-right with 15% opacity on this PDF

**Tiled logo:**
> Tile our logo across every page of this portfolio at 8% opacity

## Documentation

Full API docs: [https://pdfapihub.com/docs](https://pdfapihub.com/docs)
