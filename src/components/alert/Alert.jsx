import "./Alert.css";
import PropTypes from "prop-types";
import React from "react";

const Alert = ({ children, visible }) => {
  return (
    <>
      <div
        className={`alert-component ${visible && "visible"}`}
        role="alert"
        hidden={!visible}
      >{children}</div>
    </>
  );
};

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Alert;
