// frontend/App.js
import { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/api/data/');
        const jsonData = await response.json();
        setData(jsonData);
        console.log("jsonData: ", jsonData);
      } catch (error) {
        console.error('Error al obtener datos del servidor', error);
      }
    };

    fetchData();
  }, []);


  // Function to handle save and update
  const update_json = {
    "name": "pepe de la morena",
    "primer_apellido": "del",
    "segundo_apellido": "morena",
    "mail": "pede_de_la_morena@gmail.com",
    "tel": "8765873468765",
    "provincia": "Córdoba",
    "poblacion": "Alcaracejos",
    "tipo_caso": "2. Extracomunitario",
    "ccaa": "Balears, Illes",
    "country": ""
  }


  const handleUpdate = async () => {
    const updatedData = update_json; /* dato modificado */
    const fetch_put = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/api/data/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
        const jsonData = await response.json();
        setData(jsonData);
        console.log("jsonData: ", jsonData);
      } catch (error) {
        console.error('Error al obtener datos del servidor', error);
      }
    }

    fetch_put();
  };

  const new_json = {
    "name": "alemany",
    "primer_apellido": "ferztr",
    "segundo_apellido": "hjsga",
    "mail": "alemany@gmail.com",
    "tel": "176187268726",
    "provincia": "Córdoba",
    "poblacion": "Alcaracejos",
    "tipo_caso": "2. Extracomunitario",
    "ccaa": "Balears, Illes",
    "country": ""
  }
  const handleSave = async () => {
    const newData = new_json; /* dato nuevo */
    await fetch('http://127.0.0.1:3001/api/data/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
  };



  const handleDelete = async () => {
    await fetch('http://127.0.0.1:3001/api/data/', {
      method: 'DELETE',
    });
  };

  return (
    <div>
      <h1>Datos</h1>
      {data && (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <button onClick={handleUpdate}>Modificar</button>
          <button onClick={handleSave}>Guardar</button>
          <button onClick={handleDelete}>Borrar</button>
        </div>
      )}
    </div>
  );
};

export default App;