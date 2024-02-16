import { useContext } from 'react'
import { MyContext } from '../../context/TheContext'
import { MdRadioButtonChecked } from 'react-icons/md';
import '../../sass/componentSass/icons/IconButton.scss'


function IconButtonRadioButton() {
  const theContext = useContext(MyContext)

  function handleButton() {
    theContext.setElement("radioButtons")
    theContext.setObjComponentShow({
      ...theContext.objComponentShow, id_Element: "ID_text_001",
      type: "radioButtons", placeholder: "false", size: 25,
      dimensions: { width: 3, height: "2.4rem" },
      labelElement: "Radio Buttons Group: ",
      legend:"Radio Buttons Group: ",
      valueComponent: theContext.radioButtons,
      setComponent: theContext.setRadioButtons,
      radioButtons: [
        {
          id_Element: "ID_00010.1",
          labelElement: "RadioButton 1",
          name: "pruebaRB",
          required: true,
          disabled: false,
          checked: false,
          response: [false],
          setRadioButton: theContext.setRadioButton
        },
        {
          id_Element: "ID_00010.2",
          labelElement: "RadioButton 2",
          name: "pruebaRB",
          required: true,
          disabled: false,
          checked: false,
          response: [false],
          setRadioButton: theContext.setRadioButton
        },
        {
          id_Element: "ID_00010.3",
          labelElement: "RadioButton 3",
          name: "pruebaRB",
          required: true,
          disabled: false,
          checked: false,
          response: [false],
          setRadioButton: theContext.setRadioButton
        }
      ]
    })
  }

  return (
    <div className="col p-0 m-0">
      <button type="button" className="iconButton" onClick={handleButton}>
        <MdRadioButtonChecked />
      </button>
    </div>
  )
}

export default IconButtonRadioButton;

/*
  const component = {
    id_Element: "ID_0010",
    type: "radioButtons",
    blockOrigen: "The first Block",
    orderInBlock: "10",
    position: { row: 2, col: 9 },
    dimensions: { width: 3, height: "2.4rem" },
    labelElement: "Soy un componente grupo de  RadioButton",
    required: true,
    disabled: false,
    response: [false.toString()],
    placeholder: false.toString(),
    legend: "Choose a option",
    name: "pruebaRB",
    setComponent: theContext.setRadioButton,
    radioButtons: [
      {
        id_Element: "ID_00010.1",
        labelElement: "Soy un componente RadioButton",
        name: "pruebaRB",
        required: true,
        disabled: false,
        checked: false,
        response: [false],
        setRadioButton: theContext.setRadioButton
      },
      {
        id_Element: "ID_00010.2",
        labelElement: "Soy un componente RadioButton",
        name: "pruebaRB",
        required: true,
        disabled: false,
        checked: false,
        response: [false],
        setRadioButton: theContext.setRadioButton
      },
      {
        id_Element: "ID_00010.3",
        labelElement: "Soy un componente RadioButton",
        name: "pruebaRB",
        required: true,
        disabled: false,
        checked: false,
        response: [false],
        setRadioButton: theContext.setRadioButton
      }
    ]
  }
*/

