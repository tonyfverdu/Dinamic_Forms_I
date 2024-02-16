import { BsXSquareFill } from 'react-icons/bs';

/**
 * Renders a button component.
 *
 * @return {JSX.Element} The rendered button component.
 */
const ButtonX = ({toggleHeader, setToggleHeader}) => {
  const toggleHeaderHandler = () => setToggleHeader(!toggleHeader);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mx-auto p-0 m-0">
      <button
        type="button"
        className="contIconExit"
        aria-label="Close"
        value={toggleHeader}
        onClick={toggleHeaderHandler}
      >
        <BsXSquareFill />
      </button>
    </div>
  );
};

export default ButtonX;

/*
    This code defines a React functional component called "ButtonX". It renders a button with an "X" icon inside it. 
    When the button is clicked, it toggles the value of "toggleHeader" using the "toggleHeaderHandler" function. 
    The "toggleHeader state variable" is initially set to "false" using the useState hook.
*/