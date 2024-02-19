import { saveAs } from 'file-saver';

import { useState, useEffect } from 'react';
import ButtonKlein from './componets_design/ButtonKlein';
import HeaderComponent from './componets_design/HeaderComponent';
import './input.css';

// Tipos de caso
const casos = ["1. Importado", "2. Extracomunitario"]
const data_ini = {
  "name": "",
  "primer_apellido": "",
  "segundo_apellido": "",
  "mail": "",
  "tel": "",
  "provincia": "",
  "poblacion": "",
  "tipo_caso": "",
  "ccaa": "",
  "country": ""
}
const data_user_delete = {
  "name": "",
  "primer_apellido": "",
  "segundo_apellido": "",
  "mail": "",
  "tel": "",
  "provincia": "",
  "poblacion": "",
  "tipo_caso": "",
  "ccaa": "",
  "country": ""
}
const data_user_ini =
{
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
}

function App() {
  // File Saver
  function exportJSON(data) {
    const string_json = JSON.stringify(data, null, 2);
    const file = new Blob([string_json], { type: "text/plain;charset=utf-8" });
    const filePath = 'save.json';
    saveAs(file, filePath);
  }

  // Variables de estado
  const [data_submit, setDataSubmit] = useState(data_ini) // Variable de estado para almacenar el JSON completo [data_Submit]
  const [toggle_data_submit, setToggle_data_submit] = useState(false)

  const [caso, setCaso] = useState("")

  const [ccaas, setCCAAs] = useState([])
  const [ccaa, setCCAA] = useState("")

  const [provincias, setProvincias] = useState([])
  const [provincia, setProvincia] = useState("")
  const [codes_provincias, setCodes_Provincias] = useState([])
  const [code_provincia, setCode_Provincia] = useState("")

  const [poblaciones, setPoblaciones] = useState([])
  const [poblacion, setPoblacion] = useState("")

  const [countries, setCountries] = useState([]); // Variable de estado para almacenar el JSON completo
  const [country, setCountry] = useState("") // Variable de estado para almacenar el campo "es_name"

  // 1.- Provincias fetch
  useEffect(() => {
    if (provincia !== "") {
      setProvincias([])
    }

    fetch("./public/data/provincias.json")
      .then(response => response.json())
      .then(data => {
        const labels = (data.map(item => item.label));
        const code_labels = (data.map(item => item.code));

        setProvincias(labels)
        setCodes_Provincias(code_labels)
        const provincia_select = data.filter(item => {
          console.log("provincia: ", provincia)
          if (item.label === provincia) return item.code
        })
        setCode_Provincia(provincia_select[0].code)
        console.log("provincia code: ", provincia_select[0].code)
        // console.log(labels)
      })
      .catch(error => console.error(error));
  }, [provincia])

  // 2.- CCAAs fetch
  useEffect(() => {
    if (ccaa !== "") {
      setCCAAs([])
    }
    fetch("./public/data/ccaas.json")
      .then(response => response.json())
      .then(data => {
        const labels = (data.map(item => item.label));
        setCCAAs(labels)

        // console.log(labels)
      })
      .catch(error => console.error(error));
  }, [ccaa])

  // 3.- Poblaciones fetch
  useEffect(() => {
    if (poblacion !== "") {
      setPoblaciones([])
    }

    fetch("./public/data/poblaciones.json")
      .then(response => response.json())
      .then(data => {
        console.log("code_provincia:  ", code_provincia)
        const filter_poblaciones = data.filter(item => item.parent_code === code_provincia)
        const labels = filter_poblaciones.map(item => item.label);
        setPoblaciones(labels)

        //console.log(labels)
      })
      .catch(error => console.error(error));
  }, [poblacion, code_provincia])

  // 4.- Countries fetch
  useEffect(() => {
    if (country !== "") {
      setCountries([])
    }

    fetch("./public/data/paises.json")
      .then(response => response.json())
      .then(data => {
        const esNames = (data.map(item => item.es_name));
        setCountries(esNames)

        // console.log(esNames)
      })
      .catch(error => console.error(error));
  }, [country])


  useEffect(() => { console.log(caso) }, [caso])
  useEffect(() => { console.log(ccaa) }, [ccaa])
  useEffect(() => { console.log(poblacion) }, [poblacion])
  useEffect(() => { console.log(provincia) }, [provincia])
  useEffect(() => { console.log(country) }, [country])

  function handleButtonSubmit() {
    setToggle_data_submit(true)
  }

  function handleButtonDelete() {
    setDataSubmit(data_ini)
    setCaso("")
    setCCAAs([])
    setCCAA("")
    setProvincias([])
    setProvincia("")
    setCodes_Provincias([])
    setCode_Provincia("")
    setPoblaciones([])
    setPoblacion("")
    setCountries([])
    setCountry("")

    setToggle_data_submit(false)
  }

  function handleFormSubmit(ev) {
    ev.preventDefault();
    const data = {
      name: ev.target.name.value,
      primer_apellido: ev.target.primer_apellido.value,
      segundo_apellido: ev.target.segundo_apellido.value,
      mail: ev.target.mail.value,
      tel: ev.target.tel.value,
      provincia: provincia,
      poblacion: poblacion,
      tipo_caso: caso,
      ccaa: ccaa,
      country: country,
    }
    console.log(JSON.stringify(data))
    exportJSON(data)

    setDataSubmit(data)
    handleSave(data)
  }

  const handleSave = async (parJSON) => {
    const newData = parJSON; /* dato nuevo */
    await fetch('http://127.0.0.1:3001/api/data/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
  };

  /////////////////////////////////////////////////////////////
  const BASE_DATA_JSON = "data/json/data_ini.json"
  function handleButtonInitialUser() {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/api/dataini/');
        const jsonData = await response.json();
        setDataSubmit(jsonData);
        console.log("jsonData: ", jsonData);
      } catch (error) {
        console.error('Error al obtener datos del servidor', error);
      }
    };

    fetchData();
  }

  function handleButtonUpdatelUser() {
    console.log("Entro en el handleButtonUpdatelUser")
    const fetchDataUpdated = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/api/dataupdated/');
        const jsonData = await response.json();
        setDataSubmit(jsonData);
        console.log("En handleButtonUpdatelUser, jsonData: ", jsonData);
      } catch (error) {
        console.error('Error al obtener datos del servidor', error);
      }
    };

    fetchDataUpdated();
  }


  return (
    <>
      <div className="buttons_ini">
        <ButtonKlein
          handleButton={handleButtonInitialUser}
          text="Initial User"
          parW="9rem"
          parH="2.6rem"
          parFS="1rem"
        />
        <ButtonKlein
          handleButton={handleButtonUpdatelUser}
          text="Updated User"
          parW="9rem"
          parH="2.6rem"
          parFS="1rem"
        />
      </div>
      <form className="form" onSubmit={(ev) => handleFormSubmit(ev)}>
        <div className="reg_form">
          <InputTextField
            label_text="Nombre:"
            placeholder_input="Introduce tu nombre"
            id_input="name"
            type_input="text"
            value={data_submit["name"]}
            setValue={(ev) => setDataSubmit({ ...data_submit, "name": ev.target.value })}
          />
          <InputTextField
            label_text="Primer apellido:"
            placeholder_input="Introduce tu primer apellido"
            id_input="primer_apellido"
            type_input="text"
            value={data_submit["primer_apellido"]}
            setValue={(ev) => setDataSubmit({ ...data_submit, "primer_apellido": ev.target.value })}
          />
          <InputTextField
            label_text="Segundo apellido:"
            placeholder_input="Introduce tu segundo apellido"
            id_input="segundo_apellido"
            type_input="text"
            value={data_submit["segundo_apellido"]}
            setValue={(ev) => setDataSubmit({ ...data_submit, "segundo_apellido": ev.target.value })}
          />
        </div>

        <div className="reg_form">
          <InputTextField
            label_text="Email:"
            placeholder_input="Introduce tu mail"
            id_input="mail"
            type_input="mail"
            value={data_submit["mail"]}
            setValue={(ev) => setDataSubmit({ ...data_submit, "mail": ev.target.value })}
          />
          <InputTextField
            label_text="Tel:"
            placeholder_input="+34"
            id_input="tel"
            type_input="tel"
            value={data_submit["tel"]}
            setValue={(ev) => setDataSubmit({ ...data_submit, "tel": ev.target.value })}
          />
        </div>

        <div className="reg_form">
          <SelectElement
            select_id="select_provincia"
            selectTextLabel="Provincia"
            required={true}
            disabled={false}
            response={[""]}
            optionsValues={provincias}
            value={provincia}
            setValue={setProvincia}
          />

          <SelectElement
            select_id="select_poblacion"
            selectTextLabel="Poblacion"
            required={true}
            disabled={false}
            response={[""]}
            optionsValues={poblaciones}
            value={poblacion}
            setValue={setPoblacion}
          />

          <SelectElement
            select_id="select_tipo_caso"
            selectTextLabel="Tipo de caso"
            required={true}
            disabled={false}
            response={[""]}
            optionsValues={casos}
            value={caso}
            setValue={setCaso}
          />

        </div>

        <div className="reg_form">
          {
            caso === "" ?
              <HeaderComponent
                title="Selecciona un caso"
                subtitle="1.- Importado  2.- Extracomunitario"
              />
              :
              caso === "1. Importado" ?
                <SelectElement
                  select_id="select_pais"
                  selectTextLabel="Pais"
                  required={true}
                  disabled={false}
                  response={[""]}
                  optionsValues={countries}
                  value={country}
                  setValue={setCountry}
                />
                :
                <SelectElement
                  select_id="select_ccaa"
                  selectTextLabel="Comunidad Autonoma"
                  required={true}
                  disabled={false}
                  response={[""]}
                  optionsValues={ccaas}
                  value={ccaa}
                  setValue={setCCAA}
                />
          }
        </div>

        <div className="group_buttons">
          <ButtonKlein
            handleButton={handleButtonDelete}
            text="Delete"
            parW="6rem"
            parH="2.6rem"
            parFS="1rem"
          />
          <ButtonKlein
            handleButton={handleButtonSubmit}
            text="Submit"
            parW="6rem"
            parH="2.6rem"
            parFS="1rem"
          />
        </div>
      </form>
      {
        toggle_data_submit && <DataSubmit data_submit={data_submit} />
      }

    </>
  )
}

export default App

function InputTextField({ label_text, placeholder_input, id_input, type_input, value, setValue }) {
  return (
    <div className="div_input">
      <label htmlFor={id_input}>{label_text}</label>
      <input id={id_input} type={type_input} placeholder={placeholder_input} value={value}
        onChange={setValue} />
    </div>

  )
}

function SelectElement({ select_id, selectTextLabel, required, disabled, response, optionsValues, setValue }) {
  const [valueSelect, setValueSelect] = useState(response[0])
  //const [responseSelect, setResponseSelect] = useState(response[0])

  useEffect(() => {
    setValueSelect(response[0])
  }, [])

  function handleOnChangeSelect(ev) {
    ev.preventDefault();
    setValueSelect(ev.target.value)
    setValue(ev.target.value)
  }


  return (
    <div className="containerSelect">
      <label htmlFor={select_id}>{selectTextLabel}</label>
      <select id={select_id} size="1" aria-label=".form-select-sm" disabled={disabled} required={required} value={valueSelect}
        onChange={(ev) => handleOnChangeSelect(ev)} >
        <option value="">Select option</option>
        {
          optionsValues.map(element => <option key={element} value={element} >{element}</option>)
        }
      </select>
    </div>
  );
}

function DataSubmit({ data_submit }) {
  return (
    <div>
      <p>{data_submit.name} {data_submit.primer_apellido} {data_submit.segundo_apellido}</p>
      <p>{data_submit.mail}</p>
      <p>{data_submit.tel}</p>
      <p>{data_submit.provincia}</p>
      <p>{data_submit.poblacion}</p>
      {/* <p>{data_submit.tipo_caso}</p>
      <p>{data_submit.tipo_caso.country}</p>
      <p>{data_submit.tipo_caso.ccaa}</p> */}
    </div>
  )
}
