import HeaderComponent from './others/HeaderComponent.jsx'
import { TITLES_OF_APP } from '../constants/contants.js'
  
function HeaderFigure({ toggleHeader }) {
  if (!toggleHeader) {
    return null;
  }

  const logos = [
    {
      src: './src/assets/logos/sass.svg',
      alt: 'Logo Sass'
    },
    {
      src: './src/assets/logos/Bootstrap-5-1.svg',
      alt: 'Logo Bootstrap 5.3'
    },
    {
      src: './src/assets/logos/javascriptES6.svg',
      alt: 'Logo Javascript E6'
    },
    {
      src: './src/assets/logos/react.svg',
      alt: 'Logo React'
    }
  ];

  return (
    <>
      <div className="containerLogos d-flex flex-row justify-content-between align-items-center">
        {logos.map((logo, index) => (
          <figure key={index} className="figure">
            <img className="imageLogo" src={logo.src} alt={logo.alt} />
          </figure>
        ))}
      </div>
      <div className="header-Principal container-fluid d-flex flex-row justify-content-start align-items-center overflow-hidden mx-auto mb-0 pt-4 bg-dark">
        <h2 className="container mx-auto p-0">{TITLES_OF_APP.MAIN_TITLE_APP}</h2>
      </div>
      <HeaderComponent
        title={TITLES_OF_APP.TITLE_MEMO_LIST_HEADER}
        subtitle={TITLES_OF_APP.SUBTITLE_MEMO_LIST_HEADER}
      />
    </>
  );
}

export default HeaderFigure;

/*
    This code defines a functional component called "HeaderFigure" in JavaScript. It takes in a prop called "toggleHeader" as an argument. 
    If "toggleHeader" is "false", the component returns "null". Otherwise, it renders a list of logos using the map function and an array 
    of logo objects.

    Following the logo list, it renders two more elements: a "header" with a "title" and a "subtitle", and another component called 
    "HeaderComponent" with its own props title and subtitle.
*/