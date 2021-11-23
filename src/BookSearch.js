import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types';

class BookSearch extends React.Component {
  state = {
    userInputForSearch: "",
    books: []
  }
  static propTypes = {
    books : PropTypes.array.isRequired,
    onUpdateShelf :PropTypes.func.isRequired
  }
  update = (userInput) => {
    if (!userInput) {
      this.setState({
        userInputForSearch: "",
        books: []
      })
    } else {
      this.setState({ userInputForSearch: userInput })
      BooksAPI.search(userInput).then((books) => {
        if (books.error) {
          books = []
        }
        books.map(book => {
          book.shelf = "none";
          this.props.books.forEach(bookOnShelf => {
            if (book.id === bookOnShelf.id) {
              book.shelf = bookOnShelf.shelf;
            }
          });
          return book;
        });
        this.setState({ books })
      })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/"><button className="close-search" >Close</button></Link>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input type="text" placeholder="Search by title or author" value={this.state.userInputForSearch}
              onChange={(event) => this.update(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  onUpdateShelf={this.props.onUpdateShelf}
                />
              ))
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default BookSearch;