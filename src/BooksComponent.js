import React, { Component } from 'react'

class BooksComponent extends Component {

    render() {
        const { booksShelf, typeShelf, changeShelf } = this.props
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{typeShelf}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {booksShelf.map((itemBook) =>
                                <li key={itemBook.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${itemBook.imageLinks.thumbnail})` }}></div>
                                            <div className="book-shelf-changer">
                                                <select id={itemBook.id} value={itemBook.shelf} onChange={event => changeShelf(event)}>
                                                    <option value="none" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{itemBook.title}</div>
                                        {itemBook.authors && itemBook.authors.map((author) =>
                                            <div key={author} className="book-authors">{author}</div>
                                        )}

                                    </div>
                                </li>
                            )}
                        </ol>
                    </div>
                </div>

            </div>
        )
    }

}

export default BooksComponent