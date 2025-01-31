import styled from 'styled-components';
import { useNews } from "../providers/NewsProvider";

const Card = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 16px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #f1f1f1; /* Change background on hover */
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2); /* Add shadow effect on hover */
    transform: scale(1.02);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color:rgb(17, 219, 230);
    border: 2px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
`;

const NewsCard = ({ title, image, description, date, archived }) => {
  const { archiveNews, deleteNew } = useNews();
  const handleArchive = () => archiveNews(title);
  const deleteArchive = () => deleteNew(title);

    return (
        <Card>
            <Image src={image} alt={title} />
            <h2>{title}</h2>
            <p>{date}</p>
            <p>{description}</p>
            {!archived ? <Button onClick={handleArchive}>Archive</Button> : <Button onClick={deleteArchive}>Delete</Button>}
        </Card>
        
      );
};

export default NewsCard;
