export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const FORMSPREE_TOKEN = process.env.FORMSPREE_TOKEN;

  if (!FORMSPREE_TOKEN) {
    return res.status(500).json({ error: 'Server configuration error: Token missing.' });
  }

  try {
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_TOKEN}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(req.body),
    });

    if (response.ok) {
      // FIXED: Send clean JSON data responses back instead of reloading the page
      return res.status(200).json({ success: true });
    } else {
      return res.status(response.status).json({ error: 'Formspree transmission failed.' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}