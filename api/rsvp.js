export default async function handler(req, res) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

  const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  if (req.method === 'GET') {
    const { slug } = req.query;
    const response = await fetch(`${SUPABASE_URL}/rest/v1/guests?slug=eq.${slug}&select=*`, { headers });
    const data = await response.json();
    
    if (data && data.length > 0) return res.status(200).json(data[0]);
    return res.status(404).json({ error: 'Guest not found' });
  }

  if (req.method === 'POST') {
    const { slug, attending, notes } = req.body;
    const response = await fetch(`${SUPABASE_URL}/rest/v1/guests?slug=eq.${slug}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ attending, notes })
    });
    
    const data = await response.json();
    return res.status(200).json(data);
  }
}
