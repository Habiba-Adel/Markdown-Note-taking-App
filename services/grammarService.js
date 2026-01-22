//now in this file we will use api to making the check by itself so we need a client to send the requests thats why we will use axios
const axios=require('axios');

const checkGrammar = async (content) => {
  if (!content) return [];

  try {
    // now use their api for checking
    const apiUrl = 'https://api.languagetoolplus.com/v2/check';

    
    const params = new URLSearchParams();
    params.append('text', content);
    params.append('language', 'en-US');

    
    const response = await axios.post(apiUrl, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // The API returns grammar issues in response.data.matches
    return response.data.matches;
  } catch (error) {
    console.error('Grammar API error:', error.message);
    // Return empty array if API fails
    return [];
  }
};

module.exports = { checkGrammar };