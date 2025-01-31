import './App.css';
import Tabs from './components/Router';
import { NewsProvider } from './providers/NewsProvider';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
      <NewsProvider>
          <Router>
              <Tabs />
          </Router>
      </NewsProvider>
  );
}

export default App;
