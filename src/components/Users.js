import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
//import { Prev } from 'react-bootstrap/esm/PageItem';


function Users() {
  const [users,setUsers] =useState([]);

  const [newName,setNewName]=useState("");
  const [newEmail,setNewEmail]=useState("");
  const [newWebsite,setNewWebsite]=useState("");
  const[newCity,setCity]=useState("");
  const[newStreet,setStreet]=useState("");
  const [editingId,setEditingId]=useState(null);

  useEffect( () =>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) =>response.json())
    .then((data) =>setUsers(data))
  },
  
[])
 function addUser(){
    const name = newName.trim();
    const email=  newEmail.trim();
    const website = newWebsite.trim();
    const city=newCity.trim();
    const street=newStreet.trim();
    if(name&& email && website && city && street){
      fetch('https://jsonplaceholder.typicode.com/users',
        {
            method:"POST",
            body:JSON.stringify(
                {
                    name,email,website,address:{city,street}
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
        setNewEmail("");
        setNewWebsite("");
         setCity("");
        setStreet("");
      }
    )
    }
 }
 function startEdit(user){
  setEditingId(user.id);
  setNewName(user.name || "");
  setNewEmail(user.email || "");
  setNewWebsite(user.website || "");
  setCity(user.address.city||"");
  setStreet(user.address.street||"")
 }
 
 function updateUser(){
  const name=newName.trim();
  const email=newEmail.trim();
  const website=newWebsite.trim();
  const city=newCity.trim();
  const street=newStreet.trim();
if(!editingId || !name || !email || !website ||!city||!street)
  return;

fetch(`https://jsonplaceholder.typicode.com/users/${editingId}`,
  {
    method:"PUT",
    headers:{"Content-Type":"application/json; charset=utf-8"},
    body: JSON.stringify({name, email,website,city,street})
  })
 .then((response)=> response.json())
 .then((updated) => {
   setUsers((prev)=>
     prev.map((u)=>
       u.id === editingId
   ?{
        ...u,
        name,email,website,address: { city, street }
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
        setNewEmail("");
        setNewWebsite("");
        setCity("");
        setStreet("");

 }
function deleteUser(id){
    if(!window.confirm("Do you want to delete?"))return;
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
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
          <th>Email</th>
          <th>Website</th>
           <th>Address</th>
           <th>Street</th>
           <th>Action</th>
          
          
        </tr>
      </thead>
      <tbody>
        {users.map((user) =>
         <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
           <td>{user.email}</td>
            <td>{user.website}</td>
            <td>{user.address.city}</td>
            <td>{user.address.street}</td>
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
                <input type='email' placeholder='Enter Email'
               value={newEmail}
               onChange={(e)=>
                setNewEmail(e.target.value)
               }
               />
               </td>

              <td><input type='url' placeholder='Enter Website'value={newWebsite}
               onChange={(e)=>
                setNewWebsite(e.target.value)
               }
              
              /></td>
               <td><input type='text' placeholder='Enter City' value={newCity}
            onChange={(e)=>
                setCity(e.target.value)
            }></input></td>
            <td><input type='text' placeholder='Enter Street' value={newStreet}
            onChange={(e)=>
                setStreet(e.target.value)
            }></input></td>

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
export default Users;