import Layout from "../components/Layout";
import NewsCard from "../components/NewsCard";
import { useNews } from "../providers/NewsProvider";

const ArchivedDisplay = () => {
  const { archivedNews } = useNews();

  if (!archivedNews || archivedNews.length === 0) {
    return <Layout><p>No archived news.</p></Layout>
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