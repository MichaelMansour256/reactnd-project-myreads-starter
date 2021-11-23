import React from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
class Home extends React.Component {

  
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf :PropTypes.func.isRequired
  }

  render() {
    return (<div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf books={this.props.books} onUpdateShelf={this.props.onUpdateShelf} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search"><button >Add a book</button></Link>
      </div>
    </div>);
  }
}

export default Home;