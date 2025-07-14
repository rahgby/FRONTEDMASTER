import { useEffect, useState } from 'react';
import axios from 'axios';

function AutorForm({ autorEditando, cargarAutores }) {
  const [nombre, setNombre] = useState('');
  const [biografia, setBiografia] = useState('');
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    if (autorEditando) {
      setNombre(autorEditando.nombre);
      setBiografia(autorEditando.biografia);
      setImagen(null);
    }
  }, [autorEditando]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (autorEditando) {
      await axios.put(`http://localhost:8080/api/autores/${autorEditando.id}`, {
        nombre,
        biografia,
        imagenUrl: autorEditando.imagenUrl
      });
    } else {
      const data = new FormData();
      data.append('nombre', nombre);
      data.append('biografia', biografia);
      data.append('imagen', imagen);
      await axios.post('http://localhost:8080/api/autores', data);
    }

    alert(autorEditando ? 'Autor actualizado' : 'Autor creado con éxito');
    setNombre('');
    setBiografia('');
    setImagen(null);
    cargarAutores();
  };

  return (
    <form className="form-autor" onSubmit={handleSubmit}>
      <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
      <textarea placeholder="Biografía" value={biografia} onChange={e => setBiografia(e.target.value)} required />
      <input type="file" onChange={e => setImagen(e.target.files[0])} accept="image/*" />
      {autorEditando && (
        <img src={`http://localhost:8080${autorEditando.imagenUrl}`} alt="Vista previa" />
      )}
      <button type="submit">{autorEditando ? 'Actualizar Autor' : 'Crear Autor'}</button>
    </form>
  );
}

export default AutorForm;