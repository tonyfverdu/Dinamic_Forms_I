import { useContext } from 'react';
import { MyContext } from '../../context/TheContext'
import { MdFontDownload } from 'react-icons/md';
import '../../sass/componentSass/icons/IconButton.scss'


function IconButtonLabel({ handleTypeComp }) {
  const { setElement, setObjComponentShow } = useContext(MyContext);

  const handleButton = () => {
    setElement("label");

    setObjComponentShow(prevState => ({
      ...prevState,
      id_Element: "ID_label_001",
      type: "label",
      placeholder: "Soy un componente Label",
      size: 10
    }));
    handleTypeComp("label");
  };

  return (
    <div className="col p-0 m-0">
      <button type="button" className="iconButton" onClick={handleButton}>
        <MdFontDownload />
      </button>
    </div>
  );
}

export default IconButtonLabel;