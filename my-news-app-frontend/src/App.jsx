import './App.css';
import Tabs from './components/Router';
import { NewsProvider } from './providers/NewsProvider';
import { ArchivedProvider } from './providers/ArchivedProvider';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <ArchivedProvider>
        <NewsProvider>
          {/* Added to avoid some warning related to future changes in the router library */}
          <Router future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}>
            <Tabs />
          </Router>
      </NewsProvider>
    </ArchivedProvider>
  );
}

export default App;
