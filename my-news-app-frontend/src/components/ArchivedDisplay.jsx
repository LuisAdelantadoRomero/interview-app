import NewsCard from "./NewsCard";
import { useNews } from "../providers/NewsProvider";


const ArchivedDisplay = () => {
  const { archivedNews } = useNews();

  if (!archivedNews || archivedNews.length === 0) {
    return <p>No archived news</p>
  }
    return (
      <div>
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
    </div>
    );
}

export default ArchivedDisplay;