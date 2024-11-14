import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const ADD_POST = gql`
  mutation AddPost($title: String!, $link: String!, $author: String!) {
    addPost(title: $title, link: $link, author: $author) {
      id
      title
      link
      author
    }
  }
`;

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [author, setAuthor] = useState('');
  const [addPost] = useMutation(ADD_POST);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPost({ variables: { title, link, author } });
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Post</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="link" className="block text-gray-700 text-sm font-bold mb-2">Link:</label>
          <input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition duration-300 rounded">
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
}