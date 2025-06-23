import React from "react";
import { Button } from "reactstrap";
import alertify from "alertifyjs";

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = async () => {
    if (product.unitsInStock <= 0) {
      alertify.error("Stokta ürün kalmamıştır.");
      return;
    }

    // Güncellenmiş stok değerini hazırlıyoruz
    const updatedStock = product.unitsInStock - 1;

    try {
      // PATCH isteği ile stok bilgisi güncelleniyor
      await fetch(`http://localhost:3000/products/${product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ unitsInStock: updatedStock }),
      });

      // Sepete ekleme işlemi
      onAddToCart({ ...product, unitsInStock: updatedStock });

     
    } catch (error) {
      alertify.error("Stok güncellenemedi.");
      console.error("PATCH error:", error);
    }
  };

  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.productName}</td>
      <td>{product.quantityPerUnit}</td>
      <td>{product.unitPrice}</td>
      <td>{product.unitsInStock}</td>
      <td>
        <Button
          color="success"
          disabled={product.unitsInStock <= 0}
          onClick={handleAddToCart}
        >
          Sepete Ekle
        </Button>
      </td>
    </tr>
  );
};

export default ProductCard;

