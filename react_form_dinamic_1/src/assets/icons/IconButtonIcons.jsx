import { useContext } from 'react'
import { MyContext } from '../../context/TheContext'
import { TbIcons } from 'react-icons/tb';
import '../../sass/componentSass/icons/IconButton.scss'


function IconButtonIcons({ handleTypeComp }) {
  const { setElement, setObjComponentShow } = useContext(MyContext);

  function handleButton() {
    setElement("icon");

    setObjComponentShow(prevState => ({
      ...prevState,
      id_Element: "ID_icon_001",
      type: "icon",
      srcURLIcon: "src/assets/iconImages/",
      nameImage: "iconImage.svg",
      widthImage: 25,
      dimensions: { width: 4, height: "2.4rem" },
      labelElement: "Image: ",
    }));
    handleTypeComp("icon");
  };

  return (
    <div className="col p-0 m-0">
      <button type="button" className="iconButton" onClick={handleButton}>
        <TbIcons />
      </button>
    </div>
  )
}

export default IconButtonIcons;