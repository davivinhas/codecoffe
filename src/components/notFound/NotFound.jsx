import { Link } from "react-router-dom";
import "./NotFound.css";

import React from "react";

const NotFound = () => {
  return (
    <>
      <div className="not-found-component">
        <h2>Page Not Found</h2>
        <Link to="/">Return Home</Link>
      </div>
    </>
  );
};

export default NotFound;
