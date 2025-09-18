import CoffeeLogo from "/home/davi-vinhas/dev/codecoffe/src/code-cafe-resources/images/logo.svg";
import './Header.css'
import { Link } from "react-router-dom";

function Header({children}) {
  return (
    <>
      <header className="header-component">
        <Link to="/">
        <img src={CoffeeLogo} alt="coffee logo" />
        <h1>Code Café</h1>
      </Link>
      </header>
    </>
  );
}

export default Header;
