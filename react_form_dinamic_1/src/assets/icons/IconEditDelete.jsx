import { useState, useEffect, useContext } from 'react';
import { MyContext } from '../../context/TheContext.jsx';
import { IconContext } from 'react-icons';
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';
import '../../sass/componentSass/icons/IconEditDelete.scss';

import DataCompMenu from '../TeilLeft/MenuLeft/DataCompMenu.jsx';
import ShowElements from '../TeilLeft/ShowElements.jsx';
import IconsElem from './IconsElem.jsx';

import FieldText from '../TeilLeft/MenuLeft/FieldText.jsx';
import FieldSelect from '../TeilLeft/MenuLeft/FieldSelect.jsx';
import ButtonX from '../ButtonX';
import ActionButtons from '../TeilLeft/MenuLeft/ActionButtons';
import { TITLES_RCM_LEFT, GROUP_BUTTONS_ACTIONS, TYPE_ELEMENTS2 } from '../../constants/contants.js';
import Popup from 'reactjs-popup';

const IconEditDelete = ({ component, handleComponent, deleteComponent, refElementDiv }) => {
  const { tooRead,
    formObject, setFormObject,
    arrayOfBlocks, setArrayOfBlocks,
    blockSelectObject, setBlockSelectObject,

    indexOfBlockInArray, setIndexOfBlockInArray,
    arrayOfComponentsObject, setArrayOfComponetsObject,

    arrayOfRowsCompsObject, setArrayOfRowsCompsObject,
    componentSelectObject, setComponentSelectObject } = useContext(MyContext);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indexInArrayOfComponents, setIndexInArrayOfComponents] = useState(0);
  const [componentSelectLocal, setComponentSelectLocal] = useState(component);

  const styleCircleCSS = {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    width: "auto",
    height: "auto",
    padding: "0.05rem",
    hover: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      transform: "scale(0.5)",
      transformScale: "0.5"
    },
    backgroundImage: "../../assets/icons/eyeicon.svg",
  };

  const contentStyle = { width: '20%', height: 'auto' };
  const overlayStyle = { width: 'auto', height: 'auto' };

  useEffect(() => {
    // console.log('blockSelectObject: ', blockSelectObject);
    // console.log('indexOfBlockInArray: ', indexOfBlockInArray);

    console.log('component: ', component);
    // const indexEs = blockSelectObject.columns[indexOfBlockInArray].components.indexOf(componentSelectLocal);
    // setIndexInArrayOfComponents(indexEs);
    // console.log('indexEs: ', indexEs);

    setComponentSelectLocal(component);
    setComponentSelectObject(component);

    // console.log('blockSelectObject.columns[indexOfBlockInArray].components: ', blockSelectObject.columns[indexOfBlockInArray].components);

    // console.log('componentSelectLocal: ', componentSelectLocal);
    // console.log('component: ', component.title_Element);
  }, [component, tooRead]);

  // useEffect(() => {
  //   setComponentSelectObject(component);
  //   console.log('componentSelectLocal: ', component);
  // }, [componentSelectLocal]);

  return (
    <div className="contIconsEditDelete d-flex justify-content-between align-items-center flex-column m-0 p-0 rounded-end">
      <IconContext.Provider value={{ color: "rgba(251, 182, 53, 0.9)", size: "1rem", className: "contIcon" }}>
        <div className="d-flex flex-row justify-content-center align-items-center m-0 p-0"
          onClick={() => handleComponent(component)}
          title="Edit"
        >
          <Popup
            trigger={
              <button
                type="button"
                className="btn btn-outline-secondary d-flex justify-content-center align-items-center border-0 m-0 p-0"
                style={styleCircleCSS}
              >
                <MdModeEdit />
              </button>
            }
            open={isModalOpen}
            position="bottom center"
            contentStyle={contentStyle}
            overlayStyle={overlayStyle}
          >
            {(close) => (
              <>
                <div className="modalPopup">
                  <ButtonX toggleHeader={isModalOpen} setToggleHeader={close} />
                </div>
                <div className="content w-full">
                  {/* ****     Icons - Components    **** */}
                  {
                    !tooRead &&
                    <div className="row p-1">
                      <IconsElem
                        height={"0.8"}
                        valueComp={componentSelectLocal}
                        setValueComp={setComponentSelectLocal}
                      />
                    </div>
                  }
                  {/* <ShowDataComponent
                    valueComp={component}
                    setValueComp={handleComponent}
                  /> */}
                  <ShowElements
                    valueComp={componentSelectLocal}
                  />
                </div>
                <div
                  className="w-full d-flex justify-content-end align-items-center mx-auto"
                  style={{ padding: "0.05rem", marginBottom: "0.2rem" }}
                >
                  <ActionButtons {...GROUP_BUTTONS_ACTIONS} />
                </div>
              </>
            )}
          </Popup>
        </div>
      </IconContext.Provider>

      <IconContext.Provider value={{ color: "rgba(250, 29, 29, 0.9)", size: "1rem", className: "contIcon" }}>
        <div className="d-flex flex-row justify-content-center align-items-center m-0 p-0"
          onClick={() => deleteComponent(refElementDiv)}
          title="Delete"
        >
          <MdDeleteForever />
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default IconEditDelete;


const ShowDataComponent = ({ valueComp, setValueComp }) => {
  const { tooRead } = useContext(MyContext);
  const [compSelectLocal, setCompSelectLocal] = useState({});

  useEffect(() => {
    setCompSelectLocal(valueComp);
  }, [valueComp]);

  function handleChangeTYPECOMP(ev) {
    ev.preventDefault();
    const { value } = ev.target;

    setCompSelectLocal({ ...compSelectLocal, type_Element: value });
    setValueComp({ ...valueComp, type_Element: value });
  };
  function handleChangeTITLECOMP(ev) {
    ev.preventDefault();
    const { value } = ev.target;

    setCompSelectLocal({ ...compSelectLocal, title_Element: value });
    setValueComp({ ...valueComp, type_Element: value });
  };

  // Define the static JSX element outside the return statement
  const fieldSelect_Type = (
    <FieldSelect
      title={TITLES_RCM_LEFT.COMPONENT_TYPE}
      value={compSelectLocal.type_Element}
      fontSize="0.5rem"
      arrayValues={TYPE_ELEMENTS2}
      action={handleChangeTYPECOMP}
    />
  );
  const fieldText_Title = (
    <FieldText
      title={TITLES_RCM_LEFT.COMPONENT_TITLE}
      value={compSelectLocal.title_Element}
      fontSize="0.5rem"
      action={handleChangeTITLECOMP}
    />
  );


  return (
    <div id="accordionComp" className="accordion container-fluid graycolor400 d-flex flex-column justify-content-center align-items-center p-0 mx-auto">
      <div className="accordion-body p-0 mb-0 mx-auto">
        <div className="row d-flex justify-content-center align-items-center gap-1 mb-0">
          <div className="col-3 d-flex flex-column justify-content-start align-items-center p-1 bg-body"
            style={{ margin: "auto 0.08rem" }}
          >
            {fieldSelect_Type}
          </div>
          <div className="col d-flex flex-column justify-content-start align-items-start p-1 bg-body">
            {fieldText_Title}
          </div>
        </div>
      </div>
    </div>

  );
};
