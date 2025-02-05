import React, { useState } from "react";
import { createShortUrl, getLongUrl } from "../services/api";

const Url = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlecreateShortUrl = async (e) => {
    e.preventDefault(); 
  
    try {
      const response = await createShortUrl(longUrl); 
      console.log("API Response:", response);
  
      if (response && response.shortUrl) {
      
        setShortUrl(response.shortUrl);
        setError(""); 
      } else {
        
        setError("Failed to shorten URL");
        setShortUrl(""); 
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "An unexpected error occurred");
      setShortUrl(""); 
    }
  };

  const handleCopyClick = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl)
        .then(() => {
          alert("URL copied to clipboard!");
        })
        .catch((err) => {
          alert("Failed to copy URL");
          console.error("Error copying URL:", err);
        });
    }
  }

  const handleShortUrlClick = (shortUrl) => {
    window.open(shortUrl, "_blank");
  };
  
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Create a link</h1>
        <form onSubmit={handlecreateShortUrl}>
          <div className="mb-4">
            <label
              htmlFor="longUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Destination
            </label>
            <input
              type="url"
              id="destination"
              className="mt-1 block w-full h-14 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg p-4"
              placeholder="https://example.com/my-long-url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Link
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 text-red-600">
            <p>{error}</p>
          </div>
        )}

 {shortUrl && typeof shortUrl === "string" && (
  console.log("shortUrl:", shortUrl),
      <div className="mt-4">
        <p className="text-green-600">
            Shortened URL:{" "}
            <button
              onClick={() => handleShortUrlClick(shortUrl)} 
              className="text-blue-600 underline"
              disabled={loading} 
            >
              {shortUrl}
            </button>
          </p>

   
        <button
          type="button"
          onClick={handleCopyClick}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Copy
        </button>
      </div>
    )}
      </div>
    </div>
  );
};

export default Url;
