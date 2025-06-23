// src/components/categories/CategoryList.js

import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';
import CategoryItem from './CategoryItem'; // Yeni component import edildi

export default class CategoryList extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    fetch("http://localhost:3000/categories")
      .then(response => response.json())
      .then(data => this.setState({ categories: data }));
  };

  render() {
    const { currentCategory, changeCategory, info } = this.props;

    return (
      <div className="category-list">
        <h3>{info.title}</h3>

        <ListGroup>
          {this.state.categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              currentCategory={currentCategory}
              changeCategory={changeCategory}
            />
          ))}
        </ListGroup>

        <h4>{currentCategory}</h4>
      </div>
    );
  }
}

