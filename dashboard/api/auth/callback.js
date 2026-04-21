export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing code parameter' });
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await tokenRes.json();

  if (data.error) {
    return res.redirect(
      `https://chaitu2568.github.io/sde-interview-prep/?auth_error=${encodeURIComponent(data.error_description || data.error)}`
    );
  }

  return res.redirect(
    `https://chaitu2568.github.io/sde-interview-prep/#access_token=${data.access_token}`
  );
}
