import { createContext, useContext, useEffect, useState } from 'react';

//If we want just to test functionality without loading the backend we can useState with this sample
import exampleNews from '../data/dataExample';

const NewsContext = createContext();
const NEWS_URL = process.env.REACT_APP_NEWS_API_URL;
const ARCHIVED_NEWS_URL = process.env.REACT_APP_ARCHIVED_API_URL;

export const NewsProvider = ({ children }) => {
  const [newsList, setNewsList] = useState(exampleNews);
  const [archivedNews, setArchivedNews] = useState([]);
  const [loadingTitle, setLoadingTitle] = useState();
    // Fetch news from the API on mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(NEWS_URL);
        const data = await response.json();
        const sortedData = data.sort((a, b) => {
          const dateA = new Date(a.date); // Convert date to Date object
          const dateB = new Date(b.date); // Convert date to Date object
        
          return dateB - dateA; // Sort in descending order
        });
        
        setNewsList(sortedData); // Update newsList state with fetched data
      } catch {
      }
    };

    const fetchArchivedNews = async () => {
      try {
        const response = await fetch(ARCHIVED_NEWS_URL);     
        const data = await response.json();
        setArchivedNews(data); // Update archivedNews state with fetched data
      } catch {
      }
    }

    fetchNews(); // Call the fetch function
    fetchArchivedNews();
  }, []);

  // Function to archive a news item
  const archiveNews = (title) => {
    // First, find the news item by title
    const newsToArchive = newsList.find(news => news.title === title);

    // If the news item exists, proceed
    if (newsToArchive) {
      // Archive the news
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
        fetch(`${NEWS_URL}/archive/${title}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ archived: true })
        });
      } catch {} finally {
        setLoadingTitle()
      }
    }
  };

  const deleteNew = async (title) => {
    try {
      const response = await fetch(`${NEWS_URL}/deleteNew/${title}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the news');
      }
  
      // After successful deletion, update your state if needed
      // For example, removing the deleted news from your archivedNews list
      setArchivedNews(prevArchived =>
        prevArchived.filter(news => news.title !== title)
      );
    } catch (error) {
    }
  }

  

  return (
    <NewsContext.Provider value={{ newsList, archivedNews, archiveNews, deleteNew, loadingTitle }}>
      {children}
    </NewsContext.Provider>
  );
};

// Custom hook
export const useNews = () => useContext(NewsContext);
