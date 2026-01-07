import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

function Posts() {
  const [posts,setPosts] =useState([]);
  useEffect( () =>{
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) =>response.json())
    .then((data) =>setPosts(data))
  },
  
[])

  return (
    <table className='table'>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Title</th>
          <th>Description</th>
          
        </tr>
      </thead>
      <tbody>
        {posts.map((post) =>
         <tr key={post.id}>
          <td>{post.id}</td>
          <td>{post.title}</td>
           <td>{post.body}</td>
           
            <td>
            <Button variant='danger'>Edit</Button>
            <Button variant='primary'>Delete</Button>
             </td>

        </tr>
      )
        
        }
      </tbody>
    </table>
  );
}

export default Posts;