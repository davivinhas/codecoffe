import "./DetailItem.css";
import { useParams } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import { itemImages } from "../../code-cafe-resources/items";
import ItemType from "../../types/ItemType";
import { CartTypes } from "../../reducers/cartReducer";

const DetailItem = ({ items, dispatch }) => {
  const { id } = useParams();
  const detailItem = items.find((item) => item.itemId === id);

  const addItemToCart = () => {
    dispatch({
      type: CartTypes.ADD,
      itemId: detailItem.itemId,
    });
  };

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
            <button onClick={addItemToCart} type="button">
              Add to Cart
            </button>
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
  dispatch: PropTypes.func.isRequired,
};

export default DetailItem;
