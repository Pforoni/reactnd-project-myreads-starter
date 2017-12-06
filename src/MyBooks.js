import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'

class MyBooks extends Component {
    /*static propTypes = {
        books: PropTypes.array.isRequired,
    }*/

    state = {
        books: [],
    }
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    handleChange = (e) => {
        e.preventDefault();
        const objBookSelected = { id: e.target.id }
        const newShelf = e.target.value
        let shelf = []

        BooksAPI.update(objBookSelected, newShelf).then((shelfList) => {     
            shelf = this.state.books.filter((c) => c.id === objBookSelected.id)
            this.setState((state) => ({
                books: state.books.filter((c) => c.id !== objBookSelected.id)
            }))
            shelf[0].shelf = newShelf
            this.setState((state) => ({
                books: state.books.concat([shelf[0]])
            }))
        })
    }

    render() {
        //const { books } = this.props
        //const { wantToRead, currentlyReading, read } = this.state
        //const { shelf } = this.state
        const { books } = this.state

        let bookswantToRead
        let bookscurrentlyReading
        let booksread

        if (books && books.length > 0) {
            bookscurrentlyReading = books.filter((book) => book.shelf === "currentlyReading")
            bookswantToRead = books.filter((book) => book.shelf === "wantToRead")
            booksread = books.filter((book) => book.shelf === "read")
        }

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            {books && books.length > 0 && bookscurrentlyReading.length > 0 && (
                                <h2 className="bookshelf-title">Currently Reading</h2>
                            )}
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {books && books.length > 0 && bookscurrentlyReading.length > 0 && bookscurrentlyReading.map((currentReading) =>
                                        <li key={currentReading.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${currentReading.imageLinks.thumbnail})` }}></div>
                                                    <div className="book-shelf-changer">
                                                        <select id={currentReading.id} value={currentReading.shelf} onChange={this.handleChange}>
                                                            <option value="none" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{currentReading.title}</div>
                                                {currentReading.authors && currentReading.authors.map((author) =>
                                                    <div key={author} className="book-authors">{author}</div>
                                                )}

                                            </div>
                                        </li>
                                    )}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            {books && books.length > 0 && bookswantToRead.length > 0 && (
                                <h2 className="bookshelf-title">Want to Read</h2>
                            )}
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {books && books.length > 0 && bookswantToRead.length > 0 && bookswantToRead.map((wantToRead) =>
                                        <li key={wantToRead.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${wantToRead.imageLinks.thumbnail})` }}></div>
                                                    <div className="book-shelf-changer">
                                                        <select id={wantToRead.id} value={wantToRead.shelf} onChange={this.handleChange}>
                                                            <option value="none" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead" >Want to Read</option>
                                                            <option value="read" >Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{wantToRead.title}</div>
                                                {wantToRead.authors && wantToRead.authors.map((author) =>
                                                    <div key={author} className="book-authors">{author}</div>
                                                )}

                                            </div>
                                        </li>
                                    )}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            {books && books.length > 0 && booksread.length > 0 && (
                                <h2 className="bookshelf-title">Read</h2>
                            )}
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {books && books.length > 0 && booksread.length > 0 && booksread.map((read) =>
                                        <li key={read.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${read.imageLinks.thumbnail})` }}></div>
                                                    <div className="book-shelf-changer">
                                                        <select id={read.id} value={read.shelf} onChange={this.handleChange}>
                                                            <option value="none" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead" >Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{read.title}</div>
                                                {read.authors && read.authors.map((author) =>
                                                    <div key={author} className="book-authors">{author}</div>
                                                )}

                                            </div>
                                        </li>
                                    )}
                                </ol>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to="/search"
                        className="add-contact"
                    >Add a book</Link>
                </div>
            </div>
        )
    }

}

export default MyBooks