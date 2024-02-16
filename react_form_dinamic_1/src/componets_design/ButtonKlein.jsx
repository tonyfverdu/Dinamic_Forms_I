/* eslint-disable react/prop-types */
import '../sass/componentSass/ButtonKlein.scss'


function ButtonKlein({ handleButton, text, parW, parH, parFS }) {
  const buttonType = text === 'Delete' || text === 'Return' || text === 'Exit' ? 'reset' :
    text === 'Submit' || text === 'Login' || text === 'Query' ? 'submit' : 'button';

  const buttonValue = text === 'Delete' || text === 'Exit' || text === 'Return' ? text :
    text === 'Submit' || text === 'Login' || text === 'Query' ? text : text;

  return (
    <div className="containerButton">
      <button
        style={{ width: parW, height: parH, fontSize: parFS }}
        type={buttonType}
        value={buttonValue}
        className={`button ${text === 'Delete' || text === 'Exit' || text === 'Return' ? 'buttonReset' : ''}`.trimEnd()}
        onClick={handleButton}>
        {text}
      </button>
    </div>
  )
}

export default ButtonKlein