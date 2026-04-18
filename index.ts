import type { PluginEntry } from "@anthropic/openclaw-plugin-sdk";

const API_BASE = "https://pdfapihub.com/api";

async function callApi(
  endpoint: string,
  body: Record<string, unknown>,
  apiKey: string
): Promise<unknown> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CLIENT-API-KEY": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error(`PDFAPIHub API error (${res.status}): ${text}`);
    }
    throw new Error(
      `PDFAPIHub API error (${res.status}): ${(parsed as any).error || text}`
    );
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }
  return {
    success: true,
    content_type: contentType,
    message: "Binary file returned. Use output='url' or output='base64' for usable results.",
  };
}

function getApiKey(config: Record<string, unknown>): string {
  const key = (config.apiKey as string) || "";
  if (!key) {
    throw new Error(
      "PDFAPIHub API key not configured. Set it under plugins.entries.pdf-add-watermark in your openclaw.json: either as apiKey (string) or via env.PDFAPIHUB_API_KEY. Get a free key at https://pdfapihub.com"
    );
  }
  return key;
}

function buildBody(params: Record<string, unknown>): Record<string, unknown> {
  const body: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      body[key] = value;
    }
  }
  return body;
}

const plugin: PluginEntry = {
  id: "pdf-add-watermark",
  name: "PDF Watermark",
  register(api) {
    // ─── Watermark Document ──────────────────────────────────
    api.registerTool({
      name: "watermark_document",
      description:
        "Add a text or image watermark to a PDF or image file. Supports custom text with color, opacity, angle, and font size, or overlay a logo/stamp image (PNG with transparency). Choose single placement at a position preset or tiled mode to repeat diagonally across every page. Auto-detects PDF vs image input.",
      parameters: {
        type: "object",
        properties: {
          file_url: {
            type: "string",
            description: "URL to a PDF or image file to watermark.",
          },
          base64_file: {
            type: "string",
            description: "Base64-encoded PDF or image.",
          },
          text: {
            type: "string",
            description: "Watermark text (e.g. 'CONFIDENTIAL', 'DRAFT', '© Acme Corp').",
          },
          color: {
            type: "string",
            description: "Text color as hex string. Default: '#000000'.",
          },
          opacity: {
            type: "number",
            description: "Watermark transparency (0-1). Default: 0.15.",
          },
          angle: {
            type: "number",
            description: "Rotation angle in degrees. Default: 30.",
          },
          font_size: {
            type: "number",
            description: "Font size in points. Auto-calculated if omitted.",
          },
          position: {
            type: "string",
            enum: ["center", "top-left", "top-right", "bottom-left", "bottom-right", "top-center", "bottom-center"],
            description: "Watermark placement. Default: 'center'.",
          },
          mode: {
            type: "string",
            enum: ["single", "tiled"],
            description: "'single' = one watermark (default). 'tiled' = repeat across entire page.",
          },
          watermark_image_url: {
            type: "string",
            description: "URL to a watermark image (logo/stamp) to overlay instead of text.",
          },
          base64_watermark_image: {
            type: "string",
            description: "Base64-encoded watermark image.",
          },
          output_format: {
            type: "string",
            enum: ["file", "url", "base64", "both"],
            description: "Output mode. Default: 'url'.",
          },
        },
      },
      async execute(params, context) {
        const apiKey = getApiKey(context.config);
        return callApi("/v1/watermark", buildBody(params), apiKey);
      },
    });

    // ─── Stamp Confidential ──────────────────────────────────
    api.registerTool({
      name: "stamp_confidential",
      description:
        "Quick preset: add a tiled 'CONFIDENTIAL' watermark across every page of a PDF. Gray text at 10% opacity, 45° angle. Just pass the file URL.",
      parameters: {
        type: "object",
        properties: {
          file_url: {
            type: "string",
            description: "URL to the PDF or image file.",
          },
          base64_file: {
            type: "string",
            description: "Base64-encoded PDF or image.",
          },
          output_format: {
            type: "string",
            enum: ["file", "url", "base64"],
            description: "Output mode. Default: 'url'.",
          },
        },
      },
      async execute(params, context) {
        const apiKey = getApiKey(context.config);
        const body: Record<string, unknown> = {
          ...buildBody(params),
          text: "CONFIDENTIAL",
          color: "#888888",
          opacity: 0.1,
          angle: 45,
          mode: "tiled",
        };
        return callApi("/v1/watermark", body, apiKey);
      },
    });

    // ─── Stamp Draft ─────────────────────────────────────────
    api.registerTool({
      name: "stamp_draft",
      description:
        "Quick preset: add a tiled 'DRAFT' watermark across every page of a PDF. Light gray text at 10% opacity, 45° angle. Just pass the file URL.",
      parameters: {
        type: "object",
        properties: {
          file_url: {
            type: "string",
            description: "URL to the PDF or image file.",
          },
          base64_file: {
            type: "string",
            description: "Base64-encoded PDF or image.",
          },
          output_format: {
            type: "string",
            enum: ["file", "url", "base64"],
            description: "Output mode. Default: 'url'.",
          },
        },
      },
      async execute(params, context) {
        const apiKey = getApiKey(context.config);
        const body: Record<string, unknown> = {
          ...buildBody(params),
          text: "DRAFT",
          color: "#cccccc",
          opacity: 0.1,
          angle: 45,
          mode: "tiled",
        };
        return callApi("/v1/watermark", body, apiKey);
      },
    });

    // ─── Stamp Approved ──────────────────────────────────────
    api.registerTool({
      name: "stamp_approved",
      description:
        "Quick preset: add a bold green 'APPROVED' stamp at the center of every page. 30% opacity, slight angle. Just pass the file URL.",
      parameters: {
        type: "object",
        properties: {
          file_url: {
            type: "string",
            description: "URL to the PDF or image file.",
          },
          base64_file: {
            type: "string",
            description: "Base64-encoded PDF or image.",
          },
          output_format: {
            type: "string",
            enum: ["file", "url", "base64"],
            description: "Output mode. Default: 'url'.",
          },
        },
      },
      async execute(params, context) {
        const apiKey = getApiKey(context.config);
        const body: Record<string, unknown> = {
          ...buildBody(params),
          text: "APPROVED",
          color: "#228B22",
          opacity: 0.3,
          angle: -15,
          font_size: 72,
          position: "center",
          mode: "single",
        };
        return callApi("/v1/watermark", body, apiKey);
      },
    });

    // ─── Add Logo Watermark ──────────────────────────────────
    api.registerTool({
      name: "add_logo_watermark",
      description:
        "Overlay a logo or stamp image onto a PDF or image. Supports PNG transparency, custom opacity, position presets, and tiled mode for repeating the logo across every page.",
      parameters: {
        type: "object",
        properties: {
          file_url: {
            type: "string",
            description: "URL to the PDF or image file to watermark.",
          },
          base64_file: {
            type: "string",
            description: "Base64-encoded PDF or image.",
          },
          watermark_image_url: {
            type: "string",
            description: "URL to the logo/stamp image (PNG/JPG). PNG transparency supported.",
          },
          base64_watermark_image: {
            type: "string",
            description: "Base64-encoded logo/stamp image.",
          },
          opacity: {
            type: "number",
            description: "Logo opacity (0-1). Default: 0.2.",
          },
          position: {
            type: "string",
            enum: ["center", "top-left", "top-right", "bottom-left", "bottom-right", "top-center", "bottom-center"],
            description: "Logo placement. Default: 'bottom-right'.",
          },
          mode: {
            type: "string",
            enum: ["single", "tiled"],
            description: "'single' = one logo at position (default). 'tiled' = repeat across page.",
          },
          angle: {
            type: "number",
            description: "Rotation angle for tiled mode. Default: 30.",
          },
          output_format: {
            type: "string",
            enum: ["file", "url", "base64", "both"],
            description: "Output mode. Default: 'url'.",
          },
        },
      },
      async execute(params, context) {
        const apiKey = getApiKey(context.config);
        const body = buildBody(params);
        if (!body.opacity) body.opacity = 0.2;
        if (!body.position) body.position = "bottom-right";
        return callApi("/v1/watermark", body, apiKey);
      },
    });
  },
};

export default plugin;
