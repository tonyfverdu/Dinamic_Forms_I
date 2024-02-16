import { useState, useEffect } from 'react';
import ButtonKlein from './componets_design/ButtonKlein';
import HeaderComponent from './componets_design/HeaderComponent';
import './input.css';

// Tipos de caso
const casos = ["1. Importado", "2. Extracomunitario"]

function App() {
  const [data_submit, setDataSubmit] = useState({}) // Variable de estado para almacenar el JSON completo [data_Submit]
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

  useEffect(() => {
    setCaso("")
  }, [])

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


  useEffect(() => {
    console.log(caso)
  }, [caso])

  useEffect(() => { console.log(ccaa) }, [ccaa])
  useEffect(() => { console.log(poblacion) }, [poblacion])
  useEffect(() => { console.log(provincia) }, [provincia])
  useEffect(() => { console.log(country) }, [country])

  function handleButtonSubmit() {
    setToggle_data_submit(true)
  }

  function handleButtonDelete() {
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

    setDataSubmit(data)
  }

  return (
    <>
      <form className="form" onSubmit={(ev) => handleFormSubmit(ev)}>
        <div className="reg_form">
          <InputTextField
            label_text="Nombre:"
            placeholder_input="Introduce tu nombre"
            id_input="name"
            type_input="text"
          />
          <InputTextField
            label_text="Primer apellido:"
            placeholder_input="Introduce tu primer apellido"
            id_input="primer_apellido"
            type_input="text"
          />
          <InputTextField
            label_text="Segundo apellido:"
            placeholder_input="Introduce tu segundo apellido"
            id_input="segundo_apellido"
            type_input="text"
          />
        </div>

        <div className="reg_form">
          <InputTextField
            label_text="Email:"
            placeholder_input="Introduce tu mail"
            id_input="mail"
            type_input="mail"
          />
          <InputTextField
            label_text="Tel:"
            placeholder_input="+34"
            id_input="tel"
            type_input="tel"
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
            setValue={setProvincia}
          />

          <SelectElement
            select_id="select_poblacion"
            selectTextLabel="Poblacion"
            required={true}
            disabled={false}
            response={[""]}
            optionsValues={poblaciones}
            setValue={setPoblacion}
          />

          <SelectElement
            select_id="select_tipo_caso"
            selectTextLabel="Tipo de caso"
            required={true}
            disabled={false}
            response={[""]}
            optionsValues={casos}
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
      <div>

      </div>
    </>
  )
}

export default App

function InputTextField({ label_text, placeholder_input, id_input, type_input }) {
  return (
    <div className="div_input">
      <label htmlFor={id_input}>{label_text}</label>
      <input id={id_input} type={type_input} placeholder={placeholder_input} />
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
