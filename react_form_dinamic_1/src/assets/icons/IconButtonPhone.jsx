import { useContext } from 'react'
import { MyContext } from '../../context/TheContext'
import { MdPhone } from 'react-icons/md';
import '../../sass/componentSass/icons/IconButton.scss'


function IconButtonPhone({ handleTypeComp }) {
  const { setElement, setObjComponentShow } = useContext(MyContext);

  function handleButton() {
    setElement("phone");

    setObjComponentShow(prevState => ({
      ...prevState,
      id_Element: "ID_phone_001",
      type: "phone",
      placeholder: "91-111-1111",
      size: 12,
      dimensions: { width: 3, height: "2.4rem" },
      labelElement: "Componente Phone: ",
    }));
    handleTypeComp("phone");
  }

  return (
    <div className="col p-0 m-0">
      <button type="button" className="iconButton" onClick={handleButton}>
        <MdPhone />
      </button>
    </div>
  )
}

export default IconButtonPhone;

/*
  const component = {
    id_Element: "ID_0005",
    type: "text",
    blockOrigen: "The first Block",
    orderInBlock: "5",
    position: { row: 1, col: 0 },
    dimensions: { width: 4, height: "2.4rem" },
    labelElement: "Soy un componente Phone",
    required: true,
    disabled: false,
    response: ["96-123-1234"],
    placeholder: "91-111-1111",
    size: 20,
    valueComponent: "",
    setComponent: theContext.setPhone
  }
*/