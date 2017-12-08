import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'
import sortBy from 'sort-by'

class SearchBooks extends Component {
    state = {
        query: '',
        libraryBooks: [],
        myBooks: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((myBooks) => {
            this.setState({ myBooks })
        })
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    clearLibraryBooks = () => {
        this.setState({ libraryBooks: [] })
    }
    updateQuery = (query) => {
        if (query.length >= 3) {
            BooksAPI.search(query, 30).then((libraryBooks) => {
                this.setState({ libraryBooks })
            })
        }
        else
            this.clearLibraryBooks()

        this.setState({ query: query.trim() })
    }

    handleValueSelect = (id) => {
        let shelfCurrentListBook = this.state.myBooks.filter((b) => b.id === id)
        if (shelfCurrentListBook.length > 0)
            return shelfCurrentListBook[0].shelf

        return "none"
    }

    handleChange = (e) => {
        e.preventDefault();
        const objBookSelected = { id: e.target.id }
        const newShelf = e.target.value
        let shelf = []

        BooksAPI.update(objBookSelected, newShelf).then((shelfList) => {
            alert("Book added successfully!")
        })
    }


    render() {
        const { query, libraryBooks } = this.state

        libraryBooks.sort(sortBy('title'))
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
                                            <select id={library.id} value={this.handleValueSelect(library.id)} onChange={this.handleChange}>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{library.title}</div>
                                    {library.authors && library.authors.map((author) =>
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