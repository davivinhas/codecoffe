import "./DetailItem.css";
import { useParams } from "react-router-dom";
import React from "react";

const DetailItem = () => {
  const { id } = useParams();

  return (
    <>
      <div className="detail-item-component">
       {id}
      </div>
    </>
  );
};

export default DetailItem;
