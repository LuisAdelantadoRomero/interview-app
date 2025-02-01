import Layout from "../components/Layout";
import NewsCard from "../components/NewsCard";
import { useNews } from "../providers/NewsProvider";

const NewsDisplay = () => {
  const { newsList } = useNews();

  const activeNews = newsList.filter(news => !news.archived);

  if (!activeNews.length) return <Layout><p data-testid="news-empty">No news available.</p></Layout>

  return (
    <Layout>
      {activeNews.map((item, index) => (
          <NewsCard
            key={index}
            title={item.title}
            image={item.image}
            description={item.description}
            date={item.date}
          />
      ))}
    </Layout>
  );
};

export default NewsDisplay;
