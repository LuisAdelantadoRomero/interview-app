import { createContext, useContext, useEffect, useState } from 'react';

//If we want just to test functionality without loading the backend we can useState with this sample
import exampleNews from '../data/dataExample';

const NewsContext = createContext();
const NEWS_URL = process.env.REACT_APP_NEWS_API_URL;
const ARCHIVED_NEWS_URL = process.env.REACT_APP_ARCHIVED_API_URL;
console.log("NEWS_URL:", NEWS_URL); // Debugging
console.log("ARCHIVED_NEWS_URL:", ARCHIVED_NEWS_URL); // Debugging

export const NewsProvider = ({ children }) => {
  const [newsList, setNewsList] = useState([]);
  const [archivedNews, setArchivedNews] = useState([]);
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
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    const fetchArchivedNews = async () => {
      try {
        const response = await fetch(ARCHIVED_NEWS_URL);
        debugger
        const data = await response.json();
        setArchivedNews(data); // Update archivedNews state with fetched data
      } catch (error) {
        console.error('Error fetching archived news:', error);
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
        fetch(`${NEWS_URL}/archive/${title}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ archived: true })
        });
      } catch (error) {
        console.error('Error archiving news:', error);
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
      console.log('News deleted successfully');
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  }

  

  return (
    <NewsContext.Provider value={{ newsList, archivedNews, archiveNews, deleteNew }}>
      {children}
    </NewsContext.Provider>
  );
};

// Custom hook
export const useNews = () => useContext(NewsContext);
