import './App.css';
import Tabs from './components/Router';
import { NewsProvider } from './providers/NewsProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos necesarios

function App() {
  return (
    <div className="App">
      <Router>
        <NewsProvider>
          <Tabs />
          <ToastContainer /> {/* Agregar el ToastContainer aquí */}
        </NewsProvider>
      </Router>
    </div>
  );
}

export default App;
