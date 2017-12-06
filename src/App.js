import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import MyBooks from './MyBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends Component {
  /*state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }*/

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MyBooks
            /*books={this.state.books}*/
          />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks

          />
        )} />
      </div>
    )
  }
}

export default BooksApp
