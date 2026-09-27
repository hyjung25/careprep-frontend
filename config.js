// Public configuration only. NEVER put an API key here.
// Replace the empty production URL with the actual Render service URL after deployment.
window.CAREPREP_CONFIG = {
  backendUrl: ['localhost', '127.0.0.1'].includes(window.location.hostname)
    ? 'http://127.0.0.1:8000'
    : 'https://careprep.onrender.com'
};
