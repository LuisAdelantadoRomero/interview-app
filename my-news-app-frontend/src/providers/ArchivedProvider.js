import { createContext, useContext, useEffect, useState } from 'react';

const ArchivedContext = createContext();
const ARCHIVED_NEWS_URL = process.env.REACT_APP_ARCHIVED_API_URL;
const NEWS_URL = process.env.REACT_APP_NEWS_API_URL;

export const ArchivedProvider = ({ children }) => { 
    const [archivedNews, setArchivedNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    
    useEffect(() => {
        const fetchArchivedNews = async () => {
            try {
                setError(false);
                setLoading(true);
                const response = await fetch(ARCHIVED_NEWS_URL);
                const data = await response.json();
                const sortedData = data.sort((a, b) => {
                    const dateA = new Date(a.date); // Convert date to Date object
                    const dateB = new Date(b.date); // Convert date to Date object
                
                    return dateB - dateA; // Sort in descending order
                });
                setArchivedNews(sortedData);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
    
        fetchArchivedNews();
    }, []);
    

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
          setError(true);
        }
      }
    
    return (
        <ArchivedContext.Provider value={{ archivedNews, deleteNew, loading, error, setArchivedNews }}>
        {children}
        </ArchivedContext.Provider>
    );
}

// Custom hook
export const useArchivedNews = () => useContext(ArchivedContext);