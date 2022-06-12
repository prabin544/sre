import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Table} from 'react-bootstrap'

export default function TablePage() {

  const [data, setData] = useState([]);

  useEffect(() =>{
    loadUserData();
  }, []);

  const loadUserData = async () =>{
    return await axios
      .get("http://localhost:5000/users")
      .then((response)=> setData(response.data))
      .catch((err) => console.log(err));
  }
  console.log('data', data)
  return (
    <Table striped bordered hover variant="dark">
    <thead>
        <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
        </tr>
    </thead>
    {data.length == 0? (
      <tbody>
        <tr>
        <td> No data Found</td>
        </tr>
      </tbody>
    ): (
      data.map((item,index) =>(
      <tbody key={index}>
          <tr>
          <td>{index+1}</td>
          <td>{item.FirstName}</td>
          <td>{item.LastName}</td>
          <td>{item.Username}</td>
          </tr>
      </tbody>
      ))
    )    
    }    
    </Table>
  )
}
