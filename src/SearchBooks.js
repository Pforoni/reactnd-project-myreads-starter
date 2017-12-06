import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'
import sortBy from 'sort-by'

class SearchBooks extends Component {
    state = {
        query: '',
        libraryBooks: []
    }

    static propTypes = {
        //libraryBooks: PropTypes.array.isRequired,
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    clearLibraryBooks = () => {
        this.setState({ libraryBooks: [] })
    }
    updateQuery = (query) => {
        //debugger;
        if (query.length >= 3) {
            BooksAPI.search(query, 20).then((libraryBooks) => {
                this.setState({ libraryBooks })
            })
        }
        else
            this.clearLibraryBooks()

        this.setState({ query: query.trim() })
    }
    render() {
        const { query, libraryBooks } = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {libraryBooks.length > 0 && libraryBooks.map((library) =>
                            <li key={library.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${library.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{library.title}</div>
                                    {library.authors  && library.authors.map((author) =>
                                        <div key={author} className="book-authors">{author}</div>
                                    )}
                                    
                                </div>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks