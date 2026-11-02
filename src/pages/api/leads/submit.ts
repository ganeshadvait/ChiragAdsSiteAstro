import type { APIRoute } from "astro";

export const prerender = false;

const json = (data: unknown, status: number) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // Add current timestamp if not provided
    const leadData = {
      ...body,
      date_time: body.date_time || new Date().toISOString(),
    };

    const apiUrl = "http://api.advaitlabs.com/api/leads/submit";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    });

    const data = await response.json();

    if (!response.ok) {
      return json({ error: "Failed to submit lead", details: data }, response.status);
    }

    return json(data, 200);
  } catch (error) {
    console.error("Lead submission proxy error:", error);
    return json(
      { error: "Internal server error", message: (error as Error).message },
      500,
    );
  }
};

export const GET: APIRoute = () =>
  json({ message: "Use POST method to submit leads" }, 405);
