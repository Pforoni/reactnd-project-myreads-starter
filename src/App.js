import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import MyBooks from './MyBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MyBooks
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
