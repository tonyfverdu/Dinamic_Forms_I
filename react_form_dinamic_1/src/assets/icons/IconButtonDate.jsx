import { useContext } from 'react'
import { MyContext } from '../../context/TheContext'
import { BsCalendarDate } from 'react-icons/bs';
import '../../sass/componentSass/icons/IconButton.scss'


function IconButtonDate({ handleTypeComp }) {
  const { setElement, setObjComponentShow } = useContext(MyContext);

  function handleButton() {
    setElement("date");

    setObjComponentShow(prevState => ({
      ...prevState,
      id_Element: "ID_date_001",
      type: "date",
      placeholder: "01/01/2023",
      size: 20,
      dimensions: { width: 3, height: "2.4rem" },
      labelElement: "Componente Date: ",
    }));
    handleTypeComp("date");
  }



  return (
    <div className="col p-0 m-0">
      <button type="button" className="iconButton" onClick={handleButton}>
        <BsCalendarDate />
      </button>
    </div>
  )
}

export default IconButtonDate;

/*
  const component = {
    id_Element: "ID_0003",
    type: "date",
    blockOrigen: "The first Block",
    orderInBlock: "3",
    position: { row: 0, col: 9 },
    dimensions: { width: 3, height: "2.4rem" },
    labelElement: "Soy un componente Date",
    required: true,
    disabled: false,
    response: ["01/01/2023"],
    placeholder: "01/01/2023",
    size: 20,
    valueComponent: "",
    setComponent: theContext.setDate
  }
*/