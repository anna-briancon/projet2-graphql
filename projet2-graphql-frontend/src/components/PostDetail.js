import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      link
      author
      createdAt
    }
  }
`;

const GET_COMMENTS = gql`
  query GetComments($postId: ID!) {
    comments(postId: $postId) {
      id
      author
      content
      createdAt
    }
  }
`;

const ADD_COMMENT = gql`
  mutation AddComment($postId: ID!, $author: String!, $content: String!) {
    addComment(postId: $postId, author: $author, content: $content) {
      id
      author
      content
      createdAt
    }
  }
`;

function formatDate(dateValue) {
  console.log('Date reçue:', dateValue);
  
  let date;
  
  // Vérifier si la valeur est un nombre (timestamp)
  if (!isNaN(dateValue)) {
    // Convertir le timestamp en millisecondes en objet Date
    date = new Date(parseInt(dateValue));
  } else {
    // Si ce n'est pas un nombre, essayer de le parser comme une chaîne de date
    date = new Date(dateValue);
  }
  
  // Vérifier si la date est valide
  if (isNaN(date.getTime())) {
    console.error('Date invalide:', dateValue);
    return 'Date invalide';
  }
  
  return date.toLocaleString('fr-FR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

export default function PostDetail() {
  const { id } = useParams();
  const { loading: postLoading, error: postError, data: postData } = useQuery(GET_POST, {
    variables: { id }
  });
  const { loading: commentsLoading, error: commentsError, data: commentsData, refetch: refetchComments } = useQuery(GET_COMMENTS, {
    variables: { postId: id }
  });
  const [addComment] = useMutation(ADD_COMMENT);

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  if (postLoading || commentsLoading) return <p className="text-center">Loading...</p>;
  if (postError || commentsError) return <p className="text-center text-red-500">Error :(</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment({ variables: { postId: id, author, content } });
    setAuthor('');
    setContent('');
    refetchComments();
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6">
      <div className="mb-8 border-b pb-4">
        <div className='flex items-center'>
          <h3 className="text-xl font-semibold text-orange-800">{postData.post.title}</h3>
          <a href={postData.post.link} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition duration-300 block ml-2">
            ({postData.post.link})
          </a>
        </div>
        <div className='flex flex-wrap'>
          <p className="text-gray-600 mr-4 underline">By: {postData.post.author}</p>
          <p className="text-gray-500">{formatDate(postData.post.createdAt)}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-orange-500 w-1/2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Comment:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-orange-500 h-32 w-1/2"
          ></textarea>
        </div>
        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Add Comment
        </button>
      </form>

      <h3 className="text-2xl font-semibold mb-4">Comments</h3>
      {commentsData.comments.map(({ id, author, content, createdAt }) => (
        <div key={id} className="mb-4 border-b pb-4 last:border-b-0">
          <div className='flex items-center justify-between mb-2'>
            <p className="font-semibold text-orange-800">{author}</p>
            <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
          </div>
          <p className="text-gray-600">{content}</p>
        </div>
      ))}
    </div>
  );
}