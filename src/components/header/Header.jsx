import CoffeeLogo from "/home/davi-vinhas/dev/codecoffe/src/code-cafe-resources/images/logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CartIcon from "/home/davi-vinhas/dev/codecoffe/src/code-cafe-resources/images/cart.svg";
import routes from "../../data/routes";
function Header({ children, cart }) {
  const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="header-component">
        <Link to={routes.home}>
          <img src={CoffeeLogo} alt="coffee logo" />
          <h1>Code Café</h1>
        </Link>
        <div className="menu">
          <Link to={routes.cart}>
            <img src={CartIcon} alt="Cart" />
            <div className="badge">{cartQuantity}</div>
          </Link>
        </div>
      </header>
    </>
  );
}

Header.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      itemId: PropTypes.string.isRequired,
      quantity: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Header;
