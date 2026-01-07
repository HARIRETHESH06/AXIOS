import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
//import { Prev } from 'react-bootstrap/esm/PageItem';

function Database() {
  
  const [users,setUsers] =useState([]);
//  const[id,setId]=useState[""];
  const [newName,setNewName]=useState("");
  const [newage,setAge]=useState("");
  const[newCity,setCity]=useState("");
  const [editingId,setEditingId]=useState(null);

  useEffect( () =>{
    fetch('http://localhost:3001/users')
    .then((response) =>response.json())
    .then((data) =>setUsers(data))
  },
  
[])
 function addUser(){
    //const id=setId.trim();
    const name = newName.trim();
    const age=  newage.trim();
    const city=newCity.trim();
    
    if( name&& age && city ){
      fetch('http://localhost:3001/users',
        {
            method:"POST",
            body:JSON.stringify(
                {
                    name,age,city
                }),
                headers: {
                    "Content-Type":"application/json; charset=utf-8"
                }
            
        }
      )
      .then((response)=>response.json())
      .then(data => {
        setUsers([...users,data]); 
        alert("User Added Successfully");
        setNewName("");
        setAge("");
        setCity("");
      }
    )
    }
 }
 function startEdit(user){
  setEditingId(user.id);
  setNewName(user.name || "");
  setAge(user.age || "");
  setCity(user.city||"");
  
 }
 function updateUser(){
  const name=newName.trim();
  const age=newage.trim();
  const city=newCity.trim();
  
if(!editingId || !name || !age||!city)
  return;

fetch(`http://localhost:3001/users/${editingId}`,
  {
    method:"PUT",
    headers:{"Content-Type":"application/json; charset=utf-8"},
    body: JSON.stringify({name, age,city})
  })
 .then((response)=> response.json())
 .then((updated) => {
   setUsers((prev)=>
     prev.map((u)=>
       u.id === editingId
   ?{
        ...u,
        name,age,city
           }
       : u
  )
  );
  alert("User Updated Successfully!");
  cancelEdit();
 }


)
.catch(()=> alert("update Failed"));
 }
 function cancelEdit(){
  setEditingId(null);
   setNewName("");
   setAge("");
   setCity("");

 }
function deleteUser(id){
    if(!window.confirm("Do you want to delete?"))return;
  fetch(`http://localhost:3001/users/${id}`,
    {
      method:"DELETE"})
      .then(()=>{
        setUsers((prev)=>prev.filter((u)=> u.id !==id));
        alert("User deleted Successfully")
      } ).catch(()=>alert("User Delete failed!"));
}
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
          
          
        </tr>
      </thead>
      <tbody>
        {users.map((user) =>
         <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
           <td>{user.age}</td>
            <td>{user.city}</td>
            
            <td>
            <Button variant='success'onClick={()=> startEdit(user)}>Edit</Button>
            <Button variant='primary' onClick={()=>deleteUser(user.id)} >Delete</Button>
             </td>

        </tr>
      )
        
        }
        
      </tbody>
      <tfoot>
        <tr>
            <td></td>
             <td><input type='text' placeholder='Enter Name'value={newName}
             onChange={(e)=>
                setNewName(e.target.value)
             }/>
             </td>
               <td>
                <input type='number' placeholder='Enter Age'
               value={newage}
               onChange={(e)=>
                setAge(e.target.value)
               }
               />
               </td>
              <td><input type='text' placeholder='Enter City'value={newCity}
               onChange={(e)=>
                setCity(e.target.value)
               }
              
              /></td>
              <td>
                {editingId?(
                  <>
                  <Button variant='success' onClick={updateUser} >Update user</Button>
                  <Button  variant='danger' onClick={cancelEdit}>Cancel</Button>
                  </>
                ) :(<Button variant='danger' onClick={addUser}>Add User</Button> ) }
              </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default Database;