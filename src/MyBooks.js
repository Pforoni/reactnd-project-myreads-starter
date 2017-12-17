import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import BooksComponent from './BooksComponent'
import sortBy from 'sort-by'

class MyBooks extends Component {

    state = {
        books: [],
    }
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    changeBookShelf = (e, selBook) => {
        e.preventDefault();
        const newShelf = e.target.value

        BooksAPI.update(selBook.itemBook, newShelf).then((shelfList) => {
            selBook.itemBook.shelf = newShelf
            this.setState((state) => ({
                books: state.books
            }))
        })
    }

    render() {
        const { books } = this.state

        let bookswantToRead
        let bookscurrentlyReading
        let booksread

        if (books && books.length > 0) {
            bookscurrentlyReading = books.filter((book) => book.shelf === "currentlyReading")
            bookswantToRead = books.filter((book) => book.shelf === "wantToRead")
            booksread = books.filter((book) => book.shelf === "read")

            bookscurrentlyReading.sort(sortBy('title'))
            bookswantToRead.sort(sortBy('title'))
            booksread.sort(sortBy('title'))
        }

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {books && books.length > 0 && bookscurrentlyReading.length > 0 && (
                            <BooksComponent
                                booksShelf={bookscurrentlyReading}
                                typeShelf={"Currently Reading"}
                                changeShelf={this.changeBookShelf}
                            />
                        )}
                        {books && books.length > 0 && bookswantToRead.length > 0 && (
                            <BooksComponent
                                booksShelf={bookswantToRead}
                                typeShelf={"Want to Read"}
                                changeShelf={this.changeBookShelf}
                            />
                        )}
                        {books && books.length > 0 && booksread.length > 0 && (
                            <BooksComponent
                                booksShelf={booksread}
                                typeShelf={"Read"}
                                changeShelf={this.changeBookShelf}
                            />
                        )}
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