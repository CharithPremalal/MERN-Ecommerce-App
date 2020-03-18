import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';

const Card = ({ product }) => {
  return (
    <div className='card '>
      <div className='card-header card-header-1 '>{product.name}</div>
      <div className='card-body'>
      <ShowImage item={product} url="product" />
        <p className='card-p  mt-2'>{product.description} </p>
        <p className='card-p black-10'>$ {product.price}</p>
        <button className='btn btn-outline-primary mt-2 mb-2'>
          View Product
        </button>

        <button className='btn btn-outline-danger mt-2 mb-2'>
          Add to Card
        </button>
      </div>
    </div>
  );
};
export default Card;
