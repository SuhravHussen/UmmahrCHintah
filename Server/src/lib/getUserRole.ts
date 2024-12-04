import axios from 'axios';

async function getUserInfo(accessToken: string) {
  try {
    const response = await axios.get(`${process.env.AUTH0_API}/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Pass the access token in the Authorization header
      },
    });

    // The response will contain the user's info
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export default getUserInfo;
