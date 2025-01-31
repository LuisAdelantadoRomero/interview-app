import { Routes, Route } from 'react-router-dom';
import ArchivedDisplay from '../pages/ArchivedDisplay';
import NewsDisplay from '../pages/NewsDisplay';

export const routes = {
    News: <NewsDisplay />,
    Archived: <ArchivedDisplay />,
}

const Tabs = () => {
  return (
    <Routes>
      {Object.keys(routes).map((routeKey) => (
          <Route path={`/${routeKey}`} element={routes[routeKey]} key={routeKey} />
      ))}
    </Routes>
    
  );
};

export default Tabs;
