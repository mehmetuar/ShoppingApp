// src/components/categories/CategoryItem.js

import React from 'react';
import { ListGroupItem } from 'reactstrap';

const CategoryItem = ({ category, currentCategory, changeCategory }) => {
  const isActive = category.categoryName === currentCategory;

  return (
    <ListGroupItem
      active={isActive}
      onClick={() => changeCategory(category)}
      style={{ cursor: "pointer" }}
    >
      {category.categoryName}
    </ListGroupItem>
  );
};

export default CategoryItem;

