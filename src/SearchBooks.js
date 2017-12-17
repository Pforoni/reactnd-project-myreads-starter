import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import BooksComponent from './BooksComponent'
import sortBy from 'sort-by'
import Autocomplete from 'react-autocomplete'

class SearchBooks extends Component {
    state = {
        value: '',
        libraryBooks: [],
        myBooks: [],
        searchTerms: [
            { label: 'Android' }, { label: 'Art' }, { label: 'Artificial Intelligence' }, { label: 'Astronomy' }, { label: 'Austen' },
            { label: 'Baseball' }, { label: 'Basketball' }, { label: 'Bhagat' }, { label: 'Biography' }, { label: 'Brief' }, { label: 'Business' },
            { label: 'Camus' }, { label: 'Cervantes' }, { label: 'Christie' }, { label: 'Classics' }, { label: 'Comics' }, { label: 'Cook' }, { label: 'Cricket' }, { label: 'Cycling' },
            { label: 'Desai' }, { label: 'Design' }, { label: 'Development' }, { label: 'Digital Marketing' }, { label: 'Drama' }, { label: 'Drawing' }, { label: 'Dumas' },
            { label: 'Education' }, { label: 'Everything' },
            { label: 'Fantasy' }, { label: 'Film' }, { label: 'Finance' }, { label: 'First' }, { label: 'Fitness' }, { label: 'Football' }, { label: 'Future' },
            { label: 'Games' }, { label: 'Gandhi' },
            { label: 'Homer' }, { label: 'Horror' }, { label: 'Hugo' },
            { label: 'Ibsen' }, { label: 'Journey' }, { label: 'Kafka' }, { label: 'King' }, { label: 'Lahiri' }, { label: 'Larsson' }, { label: 'Learn' }, { label: 'Literary' }, { label: 'Fiction' },
            { label: 'Make' }, { label: 'Manage' }, { label: 'Marquez' }, { label: 'Money' }, { label: 'Mystery' },
            { label: 'Negotiate' }, { label: 'Painting' }, { label: 'Philosophy' }, { label: 'Photography' }, { label: 'Poetry' }, { label: 'Production' }, { label: 'Programming' },
            { label: 'React' }, { label: 'Redux' }, { label: 'River' }, { label: 'Robotics' }, { label: 'Rowling' },
            { label: 'Satire' }, { label: 'Science Fiction' }, { label: 'Shakespeare' }, { label: 'Singh' }, { label: 'Swimming' },
            { label: 'Tale' }, { label: 'Thrun' }, { label: 'Time' }, { label: 'Tolstoy' }, { label: 'Travel' },
            { label: 'Ultimate' }, { label: 'Virtual Reality' }, { label: 'Web Development' }, { label: 'iOS' },
        ]
    }

    componentDidMount() {
        BooksAPI.getAll().then((myBooks) => {
            this.setState({ myBooks })
        })
    }

    clearLibraryBooks = () => {
        this.setState({ libraryBooks: [] })
    }

    updateQuery = (query) => {
        if (query.length) {
            BooksAPI.search(query, 30).then((libraryBooks) => {
                this.setState({ libraryBooks })
            })
        }
        else
            this.clearLibraryBooks()

        this.setState({ value: query })
    }

    handleValueSelect = (id) => {
        let shelfCurrentListBook = this.state.myBooks.filter((b) => b.id === id)
        if (shelfCurrentListBook.length > 0)
            return shelfCurrentListBook[0].shelf

        return "none"
    }

    sendBookToShelf = (e, bookLib) => {
        e.preventDefault();
        const dest = e.target.value

        BooksAPI.update(bookLib.itemBook, dest).then((shelfList) => {
            alert("Book [" + bookLib.itemBook.title + "] added successfully!")
        })
    }

    render() {
        const { value, libraryBooks } = this.state

        if (libraryBooks.hasOwnProperty('length') && libraryBooks.length > 0)
            libraryBooks.sort(sortBy('title'))
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div>
                        <Autocomplete
                            items={this.state.searchTerms}
                            shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                            getItemValue={item => item.label}
                            renderItem={(item, highlighted) =>
                                <div className="search-books-input-wrapper"
                                    key={item.label}
                                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                                >
                                    {item.label}
                                </div>

                            }
                            value={this.state.value}
                            onChange={(event) => this.updateQuery(event.target.value)}
                            onSelect={(value) => this.updateQuery(value)}
                        />
                    </div>

                </div>
                <div className="search-books-results">
                    {libraryBooks.hasOwnProperty('length') && libraryBooks.length > 0 && (
                        <BooksComponent
                            booksShelf={libraryBooks}
                            changeShelf={this.sendBookToShelf}
                            isInShelf={this.handleValueSelect}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default SearchBooks