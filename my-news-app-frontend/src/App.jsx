import './App.css';
import Tabs from './components/Tabs';
import { NewsProvider } from './providers/NewsProvider';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

function App() {
  return (
    <div className="App">
      <Router> {/* Wrap the app with Router */}
        <NewsProvider>
          <Tabs />
        </NewsProvider>
      </Router>

    </div>
  );
}

export default App;
