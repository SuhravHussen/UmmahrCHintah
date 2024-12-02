async function getManagementToken(): Promise<string> {
  const tokenCache = {
    token: null as string | null,
    expiresAt: 0,
  };

  // Return cached token if still valid
  if (tokenCache.token && tokenCache.expiresAt > Date.now()) {
    return tokenCache.token;
  }

  const auth0Config = {
    issuerBaseUrl: process.env.AUTH0_API,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    audience: `${process.env.AUTH0_API}/api/v2/`,
  };

  try {
    const response = await fetch(`${auth0Config.issuerBaseUrl}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: auth0Config.clientId,
        client_secret: auth0Config.clientSecret,
        audience: auth0Config.audience,
        grant_type: 'client_credentials',
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get management token: ${response.statusText}`);
    }

    const data = await response.json();

    // Cache the token
    tokenCache.token = data.access_token;
    tokenCache.expiresAt = Date.now() + data.expires_in * 1000;

    return data.access_token;
  } catch (error) {
    console.error('Error getting management token:', error);
    throw error;
  }
}

export default getManagementToken;
