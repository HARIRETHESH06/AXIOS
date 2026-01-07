import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';

function Todo() {
  const [todo,setTodo] =useState([]);
  useEffect( () =>{
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) =>response.json())
    .then((data) =>setTodo(data))
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
        {todo.map((todo) =>
         <tr key={todo.id}>
          <td>{todo.id}</td>
          <td>{todo.title}</td>
           <td>{String(todo.completed)}</td>
           
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

export default Todo;