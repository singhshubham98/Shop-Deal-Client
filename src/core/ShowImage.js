import React from "react";
import { API } from "../config";
import { Link } from "react-router-dom";
const ShowImage = ({ item, url, minHeight, maxHeight, className }) => {
  return (
    <div className="product-img">
      <Link to={`/product/${item._id}`}>
        <img
          className={`mb-3 ${className}`}
          src={`${API}/${url}/photo/${item._id}`}
          style={{
            minHeight: `${minHeight}`,
            maxHeight: `${maxHeight}`,
            borderRadius: "5px",
            cursor: "pointer"
          }}
          alt={item.name}
        />
      </Link>
    </div>
  );
};

export default ShowImage;
