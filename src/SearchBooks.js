import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
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
        if (query.length >= 3) {
            BooksAPI.search(query, 30).then((libraryBooks) => {
                this.setState({ libraryBooks })
            })
        }
        else
            this.clearLibraryBooks()

        this.setState({ value: query.trim() })
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
        //let shelf = []

        BooksAPI.update(objBookSelected, newShelf).then((shelfList) => {
            alert("Book added successfully!")
        })
    }


    render() {
        const { value, libraryBooks } = this.state

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
                    <ol className="books-grid">
                        {libraryBooks.length > 0 && libraryBooks.map((library) =>
                            <li key={library.id}>
                                <div className="book">
                                    <div className="book-top">
                                    {library.imageLinks ?
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${library.imageLinks.thumbnail})` }} ></div>
                                        : <div className="book-cover" style={{ width: 128, height: 193} }> </div>
                                    }
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