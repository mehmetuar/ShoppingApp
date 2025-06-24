import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryMenu.css';

const categories = [
  { id: 1, name: "Çeşni", image: "/cesni.png" },
  { id: 2, name: "Deniz Ürünleri", image: "/deniz.png" },
  { id: 3, name: "Et & Tavuk", image: "/ettavuk.png" },
  { id: 4, name: "İçecek", image: "/icecek.png" },
  { id: 5, name: "Şekerleme", image: "/sekerleme.png" },
  { id: 6, name: "Süt Ürünleri", image: "/suturunleri.png" },
  { id: 7, name: "Tahıl", image: "/tahil.png" },
  { id: 8, name: "Tohum", image: "/tohum.png" }
];

const CategoryMenu = ({ onCategoryClick }) => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    onCategoryClick(category);
    navigate('/products');
  };

  return (
    <div className="category-menu">
      {categories.map((category) => (
        <div
          key={category.id}
          className="category-item"
          onClick={() => handleClick(category)}
        >
          <img src={category.image} alt={category.name} />
          <p>{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryMenu;
