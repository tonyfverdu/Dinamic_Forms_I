import { useContext } from 'react'
import { MyContext } from '../../context/TheContext'
import { MdCheckBox } from 'react-icons/md';
import '../../sass/componentSass/icons/IconButton.scss'


function IconButtonCheckbox() {
  const theContext = useContext(MyContext)

  function handleButton() {
    theContext.setElement("checkbox")
    theContext.setObjComponentShow({
      ...theContext.objComponentShow, id_Element: "ID_checkbox_001",
      type: "text", placeholder: false.toString(), size: 25,
      dimensions: { width: 3, height: "2.4rem" },
      labelElement: " Componente Checkbox",
      checked: false,
      valueComponent: theContext.checkbox,
      setComponent: theContext.setCheckbox
    })
  }

  return (
    <div className="col p-0 m-0">
      <button type="button" className="iconButton" onClick={handleButton}>
        <MdCheckBox />
      </button>
    </div>
  )
}

export default IconButtonCheckbox;

/*
const component = {
    id_Element: "ID_0009",
    type: "checkbox",
    blockOrigen: "The first Block",
    orderInBlock: "9",
    position: { row: 2, col: 8 },
    dimensions: { width: 3, height: "2.4rem" },
    labelElement: "Soy un componente Checkbox",
    required: true,
    disabled: false,
    checked: undefined,
    response: [false.toString()],
    placeholder: false.toString(),
    size: 30,
    valueComponent: undefined,
    setComponent: theContext.setCheckbox
  }
*/