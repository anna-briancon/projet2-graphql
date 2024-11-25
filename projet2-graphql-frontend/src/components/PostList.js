import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_POSTS = gql`
  query GetPosts($sortBy: String) {
    posts(sortBy: $sortBy) {
      id
      title
      link
      author
      createdAt
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

function formatDate(dateValue) {
  console.log('Date reçue:', dateValue);
  
  let date;
  
  if (!isNaN(dateValue)) {
    date = new Date(parseInt(dateValue));
  } else {
    date = new Date(dateValue);
  }
  
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

export default function PostList({ sortBy }) {
  const { loading, error, data, refetch } = useQuery(GET_POSTS, {
    variables: { sortBy }
  });
  const [deletePost] = useMutation(DELETE_POST);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      await deletePost({ variables: { id } });
      refetch();
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Posts</h2>
        <Link to="/add-post" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-8 rounded-full transition duration-300">
          Add Post
        </Link>
      </div>
      <ul className="space-y-4">
        {data.posts.map(({ id, title, link, author, createdAt }) => (
          <li key={id} className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 hover:shadow-lg">
            <div className="flex">
              <div className="flex-grow p-6">
                <div className='flex items-center'>
                  <Link to={`/post/${id}`} className="text-xl font-semibold hover:text-orange-800 transition duration-300">{title}</Link>
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500 transition duration-300 block ml-2">
                    ({link})
                  </a>
                </div>
                <div className='flex flex-wrap mt-2'>
                  <p className="text-gray-600">By: {author}</p>
                  <p className="text-gray-500 font-semibold ml-3">{formatDate(createdAt)}</p>
                  <Link to={`/post/${id}`} className="text-gray-400 hover:text-gray-600 transition duration-300 ml-3 underline">See/Add comments</Link>
                </div>
              </div>
              <div className="flex items-center justify-center mr-5">
                <button
                  onClick={() => handleDelete(id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full text-sm transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}