// Blog.js
import React from 'react';
import './Blog.css';

function Blog() {
  return (
    <div className="blog-container">
      <h1>Our Fitness Blog</h1>
      <div className="blog-post">
        <h2>Title of the Blog Post</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet feugiat elit, nec
          fermentum velit. Nullam euismod condimentum arcu, vitae fermentum mi dictum id. Cras
          bibendum dapibus metus, sed malesuada purus tempus sed.
        </p>
      </div>
      <div className="blog-post">
        <h2>Title of Another Blog Post</h2>
        <p>
          Donec auctor, arcu nec semper posuere, leo felis rhoncus nulla, vitae aliquet nisi eros
          eu felis. Aliquam erat volutpat. Quisque nec nisi ut nisi placerat viverra.
        </p>
      </div>
      {/* Add more blog posts here */}
    </div>
  );
}

export default Blog;
