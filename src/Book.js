import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateShelf :PropTypes.func.isRequired
  }
  
  
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{
              width: 128, height: 193,
              backgroundImage: `url(${this.props.book.imageLinks !== undefined ? this.props.book.imageLinks.thumbnail : ''})`
            }}></div>
          <div className="book-shelf-changer">
            
            <select onChange={(event)=>this.props.onUpdateShelf(this.props.book,event.target.value)} value={this.props.book.shelf? this.props.book.shelf:"none"}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors}</div>
      </div>
    );
  }
}

export default Book;