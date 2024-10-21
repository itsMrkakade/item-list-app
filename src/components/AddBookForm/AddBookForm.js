import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddBookForm.css';
import HomePage from '../HomePage/HomePage';
import Swal from "sweetalert2";

function AddBookForm({ addBook }) {
  const [id,setId]=useState('');
  const [title, setTitle] = useState('');
  const [titleErr, setTitleErr] = useState('');
  const [author, setAuthor] = useState('');
  const [authorErr, setAuthorErr] = useState('');
  const [genre, setGenre] = useState('');
  const [genreErr, setGenreErr] = useState('');
  const [year, setYear] = useState('');
  const [yearErr, setYearErr] = useState('');
  const [error, setError] = useState('');
  const [booksList, setBooksList] = useState([]);
  const [isValid,setIsValid] = useState('');
  const [deleteId,setDeleteId] = useState('')
  const [selectedItem,setSelectedItem] = useState([]);
  

  const [selectedRows,setSelectedRows] = useState(new Set())
  const [selectAll,setSelectAll] = useState(new Set())

  const genres = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance',
    'Science Fiction',
    'Thriller',
    'Western',
    'Documentary',
    'Animation',
    'Musical',
    'Historical',
    'Crime',
  ];

  useEffect(() => {
    // Call your function here
    getAllBooks();
  }, []);

  const handleCheckboxChange = (event) => {
    console.log("event",event)
    console.log("event id",event.id)
    setSelectedItem(event); 
    setDeleteId(event.id)
    setSelectedRows((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(event.id)) {
        newSelection.delete(event.id);
      } else {
        newSelection.add(event.id);
      }
      return newSelection;
    });
  };

  

  const getAllBooks = async () => {
    try {
      axios.get('http://localhost:5000/api/getAllBooks')// Use the endpoint without base URL
        .then((response) => {
          if (response && response.data) {
            setBooksList(response.data);
            console.log("response", response.data);
          }
        })
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  const handleAddBooks = () => {

  }

  const handleDelete = (event) =>{

  }

  const handleEdit = (item) => {
   setId(item.id);
   setTitle(item.title);
   setGenre(item.genre);
   setYear(item.year);
  }

  const handleChangeTitle = (event) =>{
    const value = event.target.value;
    if(value.length===0){
      setTitleErr("Please provide valid information");
    }else{
      setTitleErr("");
    }
    setTitle(value);
  }
  const handleChangeAuthor = (event) =>{
    const value = event.target.value;
    if(value.length===0){
      setAuthorErr("Please provide valid information");
    }else{
      setAuthorErr("");
    }
    setAuthor(value);
  }
  const handleChangeGenre= (event) =>{
    const value = event.target.value;
    if(value.length===0){
      setGenreErr("Please provide valid information");
    }else{
      setGenreErr("");
    }
    setGenre(value);
  }
    const handleChangeYear= (event) =>{
      const value = event.target.value;
      if(value.length===0){
        setYearErr("Please provide valid information");
      }else{
        setYearErr("");
      }
      setYear(value);
    }


  const handleSubmit = async (e) => {
    let isValid = false;
    e.preventDefault();
    if (title.trim() && author.trim() && genre.trim() && year.trim()) {
      const yearNum = parseInt(year);
      const currentYear = new Date().getFullYear();

      if (isNaN(yearNum) || yearNum < 1000 || yearNum > currentYear) {
        setError('Please enter a valid publication year.');
        isValid= true
      }
     

      addBook({ title, author, genre, year: yearNum });
      setTitle('');
      setAuthor('');
      setGenre('');
      setYear('');
      setError('');
      isValid=true; // Clear the error message
    } else {
      setError('All fields are required.');
      isValid = false;
    }
    if(isValid){
      const requestBody ={
        "title": title,
        "author": author,
        "genre": genre,
        "year": year
      }
      try {
        const response = await fetch(
          `http://localhost:5000/api/createBooks`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );
        const result = await response.json();
        console.log("response",result);
        getAllBooks();
      } catch (error) {
      }
      
    }
  };

  const DeleteBook = () =>{
    console.log("ID",deleteId)
    try {
      Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
      }).then((result) => {
          if (result.isConfirmed) {
              axios({
                  method: "delete",
                  url: `http://localhost:5000/api/deleteBooks/${deleteId}`,
                  responseType: "stream",
              }).then(function (response) {
                  Swal.fire({
                      title: "GOOD JOB!",
                      text: "Loader deleted successfully!",
                      icon: "success"
                  });
                  // getAllLoader(pageNo, pageSize);
                  getAllBooks();
              }).catch(function (error) {
                  Swal.fire({
                      title: "Error!",
                      text: "There was an error deleting your file.",
                      icon: "error"
                  });
              });
          }
      });

  } catch (error) {
      console.error("Error fetching data", error);
  }
  }

  return (
    <><form onSubmit={handleSubmit}>
      <div className='book-fields'>
        <div className='text-field'>
      <input
        type="text"
        className={`form-control  ${titleErr ? "is-invalid" : ""
        }`}
        value={title}
        onChange={handleChangeTitle}
        placeholder="Book Title"
        required 
        />
          {titleErr && <p style={{ color: 'red' }}>{titleErr}</p>}
          </div>
         
          <div className='author-field'>
      <input
        type="text"
        className={`form-control  ${authorErr ? "is-invalid" : ""
        }`}
        value={author}
        onChange={handleChangeAuthor}
        placeholder="Author"
        required />
         {titleErr && <p style={{ color: 'red' }}>{titleErr}</p>}
         </div>
         
         <div className='genre-field'>
      <select 
      className={`form-control  ${genreErr ? "is-invalid" : ""
      }`}
      value={genre} 
      onChange={handleChangeGenre} 
      required>
        <option value="" disabled>Select a genre</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      {titleErr && <p style={{ color: 'red' }}>{titleErr}</p>}
      </div>
      
      <div className='year-field'>
      <input
        type="number"
        className={`form-control  ${yearErr ? "is-invalid" : ""
        }`}
        value={year}
        onChange={handleChangeYear}
        placeholder="Publication Year"
        required />
         {titleErr && <p style={{ color: 'red' }}>{titleErr}</p>}
         </div>
      <button type="submit">Add Book</button>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      </div>
    </form>
    <div>
    <HomePage />
    </div>
    <div className='book-table'>
    <div className='table-responsive'>
    <table className="table table-striped">
        <thead>
          <tr>
            <th style={{width:"5%"}}>
              <input
                type="checkbox"
                id="selectAll"
                
              />
            </th>
            <th  style={{width:"5%"}}>
              Sr.No
            </th>
            <th style={{width:"20%"}}>
              BOOK TITLE
            </th>
            <th style={{width:"20%"}}>
              AUTHOR
            </th>
            <th style={{width:"20%"}}>
              GENRE
            </th>
            <th style={{width:"20%"}}>
              PUBLICAITION YEAR
            </th>
            <th style={{ width: "10%" }}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {booksList && booksList.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center">
                <p>No results found</p>
              </td>
            </tr>
          ) : (
            booksList && booksList.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(item.id)}
                    onChange={() => handleCheckboxChange(item)} />
                </td>
                 <td>{index + 1}</td>
                {/* Conditionally render Name data */}
                 <td>{item.title}</td>

                {/* Conditionally render Description data */}
                <td>{item.author}</td>
                <td>{item.genre}</td>
                <td>{item.year}</td>

                <td>
                  <div className="form-button-action">
                    {/* <button
                      type="button"
                      data-bs-toggle="tooltip"
                      title="Edit Task"
                      className="btn btn-link btn-primary btn-lg"
                      // onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button> */}
                    <button
                      type="button"
                      data-bs-toggle="tooltip"
                      title="Remove"
                      className="btn btn-link btn-danger"
                      onClick={ DeleteBook}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
      </div>
      </>
  );
}

export default AddBookForm;
