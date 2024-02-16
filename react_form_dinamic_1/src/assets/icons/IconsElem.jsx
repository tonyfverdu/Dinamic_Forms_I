import { useState, useEffect, useContext } from 'react'
import { MyContext } from '../../context/TheContext'

import IconButtonLabel from './IconButtonLabel'
import IconButtonText from './IconButtonText'
import IconButtonNumber from './IconButtonNumber'
import IconButtonDate from './IconButtonDate'
import IconButtonPhone from './IconButtonPhone'
import IconButtonEmail from './IconButtonEmail'
import IconButtonTextArea from './IconButtonTextArea'
import IconButtonSelect from './IconButtonSelect'
import IconButtonCheckbox from './IconButtonCheckbox'
import IconButtonRadioButton from './IconButtonRadioButton'
import IconButtonTable from './IconButtonTable'
import IconButtonIcons from './IconButtonIcons'
import '../../sass/componentSass/icons/IconsElem.scss'


/**
 * Renders an IconsElem component.
 *
 * @param {object} props - The component props.
 * @param {number} props.height - The height of the component.
 * @return {JSX.Element} The rendered IconsElem component.
 */
function IconsElem({ height, valueComp, setValueComp }) {
  const {setElement, componentSelectObject, setComponentSelectObject} = useContext(MyContext);
  const [elementIcons, setElementIcons] = useState("");

  const iconButtons = [
    IconButtonLabel,
    IconButtonText,
    IconButtonNumber,
    IconButtonDate,
    IconButtonPhone,
    IconButtonEmail,
    IconButtonTextArea,
    IconButtonSelect,
    IconButtonCheckbox,
    IconButtonRadioButton,
    IconButtonTable,
    IconButtonIcons,
  ];

  useEffect(() => {
    setElement(elementIcons);
  }, [elementIcons]);

  const handleTypeComp = (parType) => {
    const elementIcons = {
      label: "label",
      text: "text",
      number: "number",
      date: "date",
      phone: "phone",
      email: "email",
      textarea: "textArea",
      select: "select",
      checkbox: "checkbox",
      radio: "radio",
      table: "table",
      icon: "icon",
    };

    if (parType && elementIcons.hasOwnProperty(parType)) {
      setElementIcons(elementIcons[parType]);
      setValueComp({
        ...valueComp,
        type_Element: parType
      });
    }
  };

  const renderedIconButtons = iconButtons.map(IconButton => (
    <IconButton key={IconButton.type} handleTypeComp={handleTypeComp} />
  ));

  return (
    <div className="row graycolor400 d-flex flex-row justify-content-center align-items-center p-1 mx-auto mb-1"
      style={{ width: "96%" }}>
      <div className="contIcons col d-flex flex-wrap justify-content-center align-items-center">
        <span className="d-flex flex-wrap justify-content-center align-items-center wrap gap-2 p-0 m-0"
          style={{ transform: `scale(${height})` }} >
          {renderedIconButtons}
        </span>
      </div>
    </div>
  );
}

export default IconsElem;

/*
    This code defines a functional component in JavaScript called "IconsElem". 
    
    It takes a single prop "height" which is used to set the scale of the component based on its height.

    Inside the component, it uses the useContext hook to access the value of MyContext and assigns it to the variable theContext. It also uses the useState hook to create a state variable called elementIcons and a function setElementIcons to update it.

    The useEffect hook is used to update the value of theContext.setElement whenever elementIcons changes.

    There is an array called "iconButtons" that contains a list of different icon button components.

    The map function is used to render each icon button component using the IconButton variable. Each rendered 
    icon button component is assigned a unique key based on its type.

    Finally, the component returns a <div> element with the class name "contIcons" and some styling based on the
    height prop. Inside the <div>, it renders the array of rendered icon button components.
*/