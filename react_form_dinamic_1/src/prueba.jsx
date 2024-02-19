import { useState, useEffect } from 'react';

const user_ini_json = JSON.stringify({
  "name": "jose antonio",
  "primer_apellido": "fer",
  "segundo_apellido": "ver",
  "mail": "Ruth2007paredes@gmail.com",
  "tel": "8765873468765",
  "provincia": "Córdoba",
  "poblacion": "Alcaracejos",
  "tipo_caso": "2. Extracomunitario",
  "ccaa": "Balears, Illes",
  "country": ""
});

function My_Fetch() {
  const [data, setData] = useState({});
  const [filename, setFilename] = useState('');
  const [inputData, setInputData] = useState('');

  useEffect(() => {
    // fetchData('example'); // Fetch initial data for the 'example' file
    fetch("./public/data/paises.json")
      .then(response => response.json())
      .then(data => {
        const esNames = (data.map(item => item.es_name));
        setCountries(esNames)

        // console.log(esNames)
      })
      .catch(error => console.error(error));
  }, []);

  const fetchData = async (filename) => {
    try {
      const response = await fetch(`./data/json/${filename}`);
      const jsonData = await response.json();
      setData(jsonData);
      setFilename(filename);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    try {
      await fetch(`./data/json/${filename}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
      });
      fetchData(filename); // Refresh data after save
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`./data/json/${filename}`, {
        method: 'DELETE'
      });
      setData({});
      setFilename('');
      setInputData('');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <h1>JSON File Editor</h1>
      <label htmlFor="filename">Filename:</label>
      <input
        type="text"
        id="filename"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
      />
      <button onClick={() => fetchData(filename)}>Load</button>
      <br />
      <textarea
        value={JSON.stringify(data, null, 2)}
        rows={10}
        readOnly
      />
      <br />
      <label htmlFor="inputData">Input Data:</label>
      <textarea
        id="inputData"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        rows={5}
      />
      <br />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}