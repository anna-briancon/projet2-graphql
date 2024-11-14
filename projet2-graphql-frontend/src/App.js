import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PostList from './components/PostList';
import AddPost from './components/AddPost';
import PostDetail from './components/PostDetail';

const client = new ApolloClient({
  uri: 'http://localhost:8081',
  cache: new InMemoryCache()
});

export default function App() {
  const [sortBy, setSortBy] = useState('new');

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header sortBy={sortBy} setSortBy={setSortBy} />
          <div className="container mx-auto px-4 pt-20 pb-8">
            <Routes>
              <Route path="/" element={<PostList sortBy={sortBy} />} />
              <Route path="/add-post" element={<AddPost />} />
              <Route path="/post/:id" element={<PostDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}