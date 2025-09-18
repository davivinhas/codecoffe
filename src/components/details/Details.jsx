import "./Details.css";
import { itemImages } from "../../code-cafe-resources/items";
import Thumbnail from "../thumbnail/Thumbnail";
import PropTypes from "prop-types";

import React from "react";
import { Outlet } from "react-router-dom";

const Details = ({ items }) => {
  return (
    <>
      <div className="details-component">
        <Outlet></Outlet>
        <div className="details-component-sidebar">
          {items.map((item) => (
            <Thumbnail
              key={item.itemId}
              image={itemImages[item.imageId]}
              title={item.title}
              itemId={item.itemId}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Details;
