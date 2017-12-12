import React from 'react';
import { Route } from 'react-router-dom'
import MyBooks from './MyBooks'
import SearchBooks from './SearchBooks'
import './App.css'

const BooksApp = React.createClass({
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
})

export default BooksApp
