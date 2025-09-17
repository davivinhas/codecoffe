import CoffeLogo from "/home/davi-vinhas/dev/codecoffe/src/code-cafe-resources/images/logo.svg";
import './Header.css'

function Header({children}) {
  return (
    <>
      <header className="header-component">
        <img src={CoffeLogo} alt="coffe logo" />
        <h1>{children}</h1>
      </header>
    </>
  );
}

export default Header;
