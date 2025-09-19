import "./DetailItem.css";
import { useParams } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import { itemImages } from "../../code-cafe-resources/items";
import ItemType from "../../types/ItemType";

const DetailItem = ({ items }) => {
  const { id } = useParams();
  const detailItem = items.find((item) => item.itemId === id);

  return (
    <>
      <div className="detail-item-component">
        {detailItem ? (
          <>
            <img
              className="details-image"
              src={itemImages[detailItem.imageId]}
              alt={detailItem.title}
            />
            <h2>{detailItem.title}</h2>
            {Boolean(detailItem.description) && (
              <h6>{detailItem.description}</h6>
            )}
            <div>${(detailItem.salePrice ?? detailItem.price).toFixed(2)}</div>
            {detailItem.salePrice !== undefined && <div>On Sale!</div>}
          </>
        ) : (
          <h2>Unknown item</h2>
        )}
      </div>
    </>
  );
};

DetailItem.propTypes = {
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default DetailItem;
