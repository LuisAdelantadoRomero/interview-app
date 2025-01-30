import { Routes, Route, Link } from 'react-router-dom';
import NewsDisplay from './NewsDisplay';
import ArchivedDisplay from './ArchivedDisplay';
import styled from 'styled-components';

export const TabsContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
`;

export const TabButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 20px;
`;

export const TabButton = styled(Link)`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #f1f1f1;
  border: 2px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  color: inherit;
  
  &.active {
    background-color: #007bff;
    color: white;
  }

  &:hover {
    background-color: #e2e2e2;
  }
`;

export const TabContent = styled.div`
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const Tabs = () => {
  return (
    <TabsContainer>
      <TabButtons>
        <TabButton to="/news" activeClassName="active">
          News
        </TabButton>
        <TabButton to="/archived" activeClassName="active">
          Archived
        </TabButton>
      </TabButtons>

      <TabContent>
        <Routes>
          <Route path="/news" element={<NewsDisplay />} />
          <Route path="/archived" element={<ArchivedDisplay />} />
        </Routes>
      </TabContent>
    </TabsContainer>
  );
};

export default Tabs;
