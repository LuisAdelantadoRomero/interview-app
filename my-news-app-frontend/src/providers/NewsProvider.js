import { createContext, useContext, useEffect, useState } from 'react';

//If we want just to test functionality without loading the backend we can useState with this sample
// import exampleNews from '../data/dataExample';

import { useArchivedNews } from "../providers/ArchivedProvider";
const NewsContext = createContext();
const NEWS_URL = process.env.REACT_APP_NEWS_API_URL;
const ARCHIVED_NEWS_URL = process.env.REACT_APP_ARCHIVED_API_URL;


export const NewsProvider = ({ children }) => {
  const { setArchivedNews } = useArchivedNews();
  const [newsList, setNewsList] = useState([]);
  const [loadingTitle, setLoadingTitle] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


    // Fetch news from the API on mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setError(false); // Reset the error state
        setLoading(true); // Set loading to true
        const response = await fetch(NEWS_URL);
        const data = await response.json();
        const sortedData = data.sort((a, b) => {
          const dateA = new Date(a.date); // Convert date to Date object
          const dateB = new Date(b.date); // Convert date to Date object
        
          return dateB - dateA; // Sort in descending order
        });
        
        setNewsList(sortedData); // Update newsList state with fetched data
      } catch {
        setError(true); // Set error to true if an error occurs
      } finally {
        setLoading(false); // Set loading to false regardless of the outcome
      }
    };

    fetchNews(); // Call the fetch function
  }, []);

  const archiveNews = (title) => {
    const newsToArchive = newsList.find(news => news.title === title);
    if (newsToArchive) {
        setNewsList(prevNews =>
            prevNews.map(news =>
              news.title === title ? { ...news, archived: true } : news
            )
          );

          // Add the archived news to the archivedNews list
        setArchivedNews(prevArchived => [
          ...prevArchived,
          { ...newsToArchive, archived: true }
        ]);
    
        try {
            setLoadingTitle(title)
            fetch(`${ARCHIVED_NEWS_URL}/${title}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ archived: false })
            });
        } catch {
          setError(true);
        } finally {
            setLoadingTitle()
        }
    }
}



  return (
    <NewsContext.Provider value={{ newsList, setNewsList, error, loading, archiveNews, loadingTitle }}>
      {children}
    </NewsContext.Provider>
  );
};

// Custom hook
export const useNews = () => useContext(NewsContext);
