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
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home books={this.state.books} />} />
            <Route path="/search" element={<BookSearch />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
export default BooksApp