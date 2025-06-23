import React from "react";
import { Button } from "reactstrap";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.productName}</td>
      <td>{product.quantityPerUnit}</td>
      <td>{product.unitPrice}</td>
      <td>{product.unitsInStock}</td>
      <td>
        <Button color="success" onClick={() => onAddToCart(product)}>
          Sepete Ekle
        </Button>
      </td>
    </tr>
  );
};

export default ProductCard;
