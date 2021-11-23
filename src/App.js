import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import BookSearch from './BookSearch.js'
import Home from './Home.js'

class BooksApp extends React.Component {
  
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    flag: true
  }
  
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  updateShelf=(book,shelf)=>{
    console.log("this.state.flag");
    const index=this.state.books.findIndex((b)=>b.id===book.id);
    const bookslist=this.state.books;
    //it is not in shelves
    if(index===-1){
      book.shelf=shelf;
      bookslist.push(book);
    }
    else{
      bookslist[index].shelf=shelf

    }
    this.setState({books:bookslist,flag:!this.state.flag});
    BooksAPI.update(book,shelf);
    console.log("this.state.flag");
  }
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home books={this.state.books} onUpdateShelf={this.updateShelf} />} />
            <Route path="/search" element={<BookSearch onUpdateShelf={this.updateShelf}/>} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
export default BooksApp