import AutorForm from './components/AutorForm';
import AutorCard from './components/AutorCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/main.scss';

function App() {
  const [autores, setAutores] = useState([]);
  const [autorEditando, setAutorEditando] = useState(null);

  const cargarAutores = async () => {
    const res = await axios.get('http://localhost:8080/api/autores');
    setAutores(res.data);
  };

  useEffect(() => {
    cargarAutores();
  }, []);

  return (
    <div className="app-container">
      <h1>📚 Autores Literarios</h1>
      <AutorForm autorEditando={autorEditando} cargarAutores={cargarAutores} />
      <div className="autores-grid">
        {autores.map((autor) => (
          <AutorCard
            key={autor.id}
            autor={autor}
            setAutorEditando={setAutorEditando}
            cargarAutores={cargarAutores}
          />
        ))}
      </div>
    </div>
  );
}

export default App;