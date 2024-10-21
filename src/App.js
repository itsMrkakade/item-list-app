import React, { useState } from 'react';
import HomePage from './components/HomePage/HomePage';
import AddBookForm from './components/AddBookForm/AddBookForm';
import './App.css';
import one from "./Img/stack-of-books.png";
import two from "./Img/book.png";
import three from "./Img/storytelling.png"
// import cors from 'cors';

// app.use(cors()); 
function App() {
  const [books, setBooks] = useState([]);

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const deleteBook = (indexToDelete) => {
    const updatedBooks = books.filter((book, index) => index !== indexToDelete);
    setBooks(updatedBooks);
  };

  return (
    <div className="App">
      <h1 className='Title'>Book List</h1>
      <h2 className='subtitle'>Where Every Book Finds a Reader</h2>

      <div className="info-boxes">
        <div className="box">
          <img src={one} alt="Discover Books" />
          <h3>Discover New Books</h3>
          <p>Dive into our ever-growing collection of fascinating reads across various genres. Find your next favorite book here!</p>
        </div>
        <div className="box">
          <img src={two} alt="Organize Books" />
          <h3>Organize Your Library</h3>
          <p>Keep track of the books you’ve read or want to read. Add, edit, and manage your personal book collection effortlessly.</p>
        </div>
        <div className="box">
          <img src={three} alt="Share Books" />
          <h3>Share with Friends</h3>
          <p>Loved a book? Share your recommendations with friends and help others discover amazing reads!</p>
        </div>
      </div>


      <AddBookForm addBook={addBook} />
      {/* <HomePage books={books} deleteBook={deleteBook} /> */}


    </div>
  );
}

export default App;
