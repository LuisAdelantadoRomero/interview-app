import NewsCard from "./NewsCard";
import { useNews } from "../providers/NewsProvider";

const NewsDisplay = () => {
  const { newsList } = useNews();

  const activeNews = newsList.filter(news => !news.archived);

  if (activeNews.length === 0) {
    return <p>No news available.</p>;
  }

  return (
    <div>
      {activeNews.map((item, index) => (

          <NewsCard
            key={index}
            title={item.title}
            image={item.image}
            description={item.description}
            date={item.date}
          />
      ))}
    </div>
  );
};

export default NewsDisplay;
