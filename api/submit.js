export default async function handler(req, res) {
  // 1. Enforce strict POST validation parameters
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2. Fetch the secret token safely from Vercel's isolated environment manager
  const FORMSPREE_TOKEN = process.env.FORMSPREE_TOKEN;

  if (!FORMSPREE_TOKEN) {
    return res.status(500).json({ error: 'Server configuration error: Token missing from environment panel.' });
  }

  try {
    // 3. Securely forward the client payloads to Formspree away from public eyes
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_TOKEN}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(req.body),
    });

    if (response.ok) {
      // Smoothly redirect back to your live portfolio home with a success query string parameter
      return res.redirect(303, '/#contact?success=true');
    } else {
      return res.redirect(303, '/#contact?error=true');
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
