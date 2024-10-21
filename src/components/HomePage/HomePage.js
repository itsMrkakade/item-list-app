import React from 'react';
import './HomePage.css';
import Swal from "sweetalert2";
 
 import axios from 'axios';

function HomePage({ books,deleteId ,selectedItems }) {
 console.log("array" ,selectedItems )

  

  return (
    <div>
      <h2>Your Books</h2>
      <ul>
  {selectedItems && selectedItems.length > 0 ? (
    selectedItems.map((book, index) => (
      <li key={index}>
        <div className='showbook'>
          <strong>Title:</strong> {book.title} <br />
          <strong>Author:</strong> {book.author} <br />
          <strong>Genre:</strong> {book.genre} <br />
          <strong>Year:</strong> {book.year}
        </div>
        {/* <button onClick={ DeleteBook}>Delete</button> */}
      </li>
    ))
  ) : (
    (
      <strong>The List of books </strong>
    ))}
</ul>
    </div>
  );
}

export default HomePage;
