import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const WEBFLOW_API_TOKEN = import.meta.env.WEBFLOW_API_TOKEN;
  const ECOSYSTEM_COLLECTION_ID = import.meta.env.ECOSYSTEM_COLLECTION_ID;

  if (!WEBFLOW_API_TOKEN || !ECOSYSTEM_COLLECTION_ID) {
    return new Response(JSON.stringify({ error: 'Missing API credentials' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const response = await fetch(
      `https://api.webflow.com/v2/collections/${ECOSYSTEM_COLLECTION_ID}/items?limit=100`,
      {
        headers: {
          'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
          'Accept-Version': '1.0.0',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify({
      items: data.items || []
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error fetching ecosystem:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch ecosystem' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};