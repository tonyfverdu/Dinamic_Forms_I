import { useContext } from 'react'
import { MyContext } from '../../context/TheContext'
import { MdTextFields } from 'react-icons/md';
import '../../sass/componentSass/icons/IconButton.scss'


function IconButtonText({ handleTypeComp }) {
  const { setElement, setObjComponentShow } = useContext(MyContext);

  function handleButton() {
    setElement("text");

    setObjComponentShow(prevState => ({
      ...prevState,
      id_Element: "ID_text_001",
      type: "text",
      placeholder: "Valor Componente Text ...",
      size: 25,
      dimensions: { width: 4, height: "2.4rem" },
      labelElement: "Componente Text: ",
    }));
    handleTypeComp("text");
  };

  return (
    <div className="col p-0 m-0">
      <button type="button" className="iconButton" onClick={handleButton}>
        <MdTextFields />
      </button>
    </div>
  )
}

export default IconButtonText;

/*
    // const newObjComponentShow = {
    //   ...prevValues,
    //   id_Element: "ID_text_001",
    //   type: "text",
    //   placeholder: "Valor Componente Text ...",
    //   size: 25,
    //   dimensions: { width: 4, height: "2.4rem" },
    //   labelElement: "Componente Text: ",
    //   valueComponent: theContext.text,
    //   setComponent: theContext.setText
    // };
*/

/*
  const component = {
    blockOrigen: "The first Block",
    orderInBlock: "1",
    position: { row: 0, col: 3 },
    dimensions: { width: 4, height: "2.4rem" },
    labelElement: "Soy un componente Text",
    required: true,
    disabled: false,
    response: ["Ich war ein Textelement im Vergangenheit"],
    placeholder: "Ja, ich bin ein Text so",
    size: 25,
    valueComponent: "",
    setComponent: theContext.setText
  }
*/