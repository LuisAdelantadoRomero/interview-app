import Layout from "../components/Layout";
import NewsCard from "../components/NewsCard";
import { useArchivedNews } from "../providers/ArchivedProvider";

const ArchivedDisplay = () => {
  const { archivedNews, loading, error } = useArchivedNews();

  if (loading) {
    return <Layout><p data-testid="archive-loading">Loading archived news...</p></Layout>
  }

  if (error) {
    return <Layout><p data-testid="archive-error">An error occurred while loading archived news.</p></Layout>
  }

  if (!archivedNews || archivedNews.length === 0) {
    return <Layout><p data-testid="archive-empty">No archived news.</p></Layout>
  }
    return (
      <Layout>
      {archivedNews.map((item, index) => (
        <NewsCard
          key={index}
          title={item.title}
          image={item.image}
          description={item.description}
          date={item.date}
          archived={item.archived}
        />
      ))}
    </Layout>
    );
}

export default ArchivedDisplay;