# PDF Watermark — OpenClaw Plugin

Add watermarks to PDFs and images using the [PDFAPIHub](https://pdfapihub.com) API. This OpenClaw plugin gives your AI agent the ability to stamp text watermarks, overlay logos, and apply quick presets for CONFIDENTIAL, DRAFT, and APPROVED documents.

## What It Does

Protect and mark your documents with text or image watermarks — tiled across every page or placed at specific positions. Includes one-command presets for the most common watermark needs.

### Features

- **Text Watermarks** — Custom text with color, opacity, angle, and font size
- **Image/Logo Watermarks** — Overlay PNG/JPG logos with transparency support
- **Tiled Mode** — Repeat watermark diagonally across the entire page
- **Single Placement** — Place watermark at a specific position preset
- **Position Presets** — center, top-left, top-right, bottom-left, bottom-right, top-center, bottom-center
- **Quick Presets** — One-command CONFIDENTIAL, DRAFT, and APPROVED stamps
- **Custom Styling** — Hex color, opacity (0-1), rotation angle, font size
- **PDF & Image Support** — Works with both PDF documents and image files
- **Auto-Detection** — Automatically detects whether input is a PDF or image
- **Multiple Output Formats** — Download URL, base64 string, or raw file

## Tools

| Tool | Description |
|------|-------------|
| `watermark_document` | Full-featured: custom text/image, color, opacity, angle, position, tiled mode |
| `stamp_confidential` | Quick preset: tiled "CONFIDENTIAL" watermark across every page |
| `stamp_draft` | Quick preset: tiled "DRAFT" watermark across every page |
| `stamp_approved` | Quick preset: bold green "APPROVED" stamp at center |
| `add_logo_watermark` | Overlay a logo/stamp image with opacity and position control |

## Installation

```bash
openclaw plugins install clawhub:pdf-add-watermark
```

## Configuration

**Privacy note:** Files you process are uploaded to PDFAPIHub's cloud service for watermarking. Files are auto-deleted after 30 days.

```json
{
  "plugins": {
    "entries": {
      "pdf-add-watermark": {
        "enabled": true,
        "apiKey": "your-api-key-here"
      }
    }
  }
}
```

Or use the `env` approach:

```json
{
  "plugins": {
    "entries": {
      "pdf-add-watermark": {
        "enabled": true,
        "env": {
          "PDFAPIHUB_API_KEY": "your-api-key-here"
        }
      }
    }
  }
}
```

Get your **free API key** at [https://pdfapihub.com](https://pdfapihub.com).

## Usage Examples

Just ask your OpenClaw agent:

- *"Add a CONFIDENTIAL watermark to this PDF"*
- *"Mark this report as DRAFT"*
- *"Stamp APPROVED on this contract"*
- *"Add 'FOR INTERNAL USE ONLY' in red at 20% opacity across every page"*
- *"Overlay our company logo at bottom-right with 15% opacity"*
- *"Add © 2026 Acme Corp watermark to all pages"*

## Use Cases

- **Confidential Marking** — Stamp internal documents before circulation
- **Draft Management** — Mark documents as DRAFT during review cycles
- **Approval Workflows** — Stamp APPROVED or REJECTED on reviewed documents
- **Brand Protection** — Overlay company logos on photos and PDFs
- **Copyright Protection** — Add © watermarks before public sharing
- **Legal Documents** — Mark as COPY, ORIGINAL, or VOID
- **Photography Proofs** — Watermark photo proofs before client purchase

## API Documentation

Full API docs: [https://pdfapihub.com/docs](https://pdfapihub.com/docs)

## License

MIT
