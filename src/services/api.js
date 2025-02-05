import axios from "axios";



export const createShortUrl = async (longUrl) => {
  try {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    console.log("API Base URL:", baseUrl);

    if (!baseUrl) {
      console.error("API Base URL is not defined in environment variables.");
      return null;
    }

    const response = await axios.post(`${baseUrl}/shorten`, { longUrl });
    console.log("response:", response);

    if (response.data && response.data.shortUrl) {

      return { existing: false, shortUrl: `${response.data.shortUrl}` };
    } else if (response.data && response.data.message === "URL already exists") {
   
      return { existing: true, message: "URL already exists", shortUrl: `${baseUrl}/${response.data.url.shortUrl}` };
    } else {
      console.error("Unexpected response data:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error creating short URL:", error);
    return null;
  }


};




export const getLongUrl = async (shortUrl) => {
  try {

    const parsedUrl = new URL(shortUrl);
    const shortUrlCode = parsedUrl.pathname.replace('/', '');
    console.log("shortUrlCode:", shortUrlCode);

    const response = await axios.get(`/${shortUrlCode}`);
    console.log("response:", response);
    if (response.status === 301) {
        return response.headers.location;  
      }
    throw new Error('Failed to retrieve long URL');
  } catch (error) {
    console.error("Error fetching long URL:", error);
    throw error;  
  }
};


