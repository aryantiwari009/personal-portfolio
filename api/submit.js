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

  const successBanner = document.getElementById('success-banner');
  const closeBannerBtn = document.getElementById('close-banner-btn');

  if (successBanner && closeBannerBtn) {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if the backend redirected with the success parameter
    if (urlParams.get('success') === 'true') {
      // 1. Reveal the banner in the DOM structure
      successBanner.classList.remove('hidden');
      
      // 2. Animate it dropping down smoothly from the top
      setTimeout(() => {
        successBanner.classList.remove('-translate-y-full');
      }, 100);

      // 3. Clean up the browser URL string so '?success=true' disappears from the address bar
      const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash;
      window.history.replaceState({ path: cleanUrl }, '', cleanUrl);

      // 4. Set an automatic fade-out timer after 7 seconds
      const autoHideTimer = setTimeout(() => {
        closeBanner();
      }, 7000);

      // Manual dismiss click handler
      closeBannerBtn.addEventListener('click', () => {
        clearTimeout(autoHideTimer);
        closeBanner();
      });
    }

    function closeBanner() {
      successBanner.classList.add('-translate-y-full');
      setTimeout(() => {
        successBanner.classList.add('hidden');
      }, 500);
    }
  }