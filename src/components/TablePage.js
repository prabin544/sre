import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Table, Button, Col, Row} from 'react-bootstrap'

export default function TablePage() {

  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortvalue, setSortValue] = useState("");

  const sortOPtions = ["FirstName"]
  const filterOPtions = ["Dev", "Prod", "Uat"]


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

  const handleSearch = async (e) => {
    e.preventDefault();
    return await axios
    .get(`http://localhost:5000/users?q=${value}`)
    .then((response) => {
      setData(response.data);
      setValue("");
    })
    .catch((err) => console.log(err));
  };

  const handleSort = async (e) => {
    let value = e.target.value
    setSortValue(value);
    return await axios
    .get(`http://localhost:5000/users?_sort=${value}&_order=asc`)
    .then((response) => {
      setData(response.data);
    })
    .catch((err) => console.log(err));
  };

  const handleFilter = async (e) => {
    let value = e.target.value
    return await axios
    .get(`http://localhost:5000/users?Env=${value}`)
    .then((response) => {
      setData(response.data);
    })
    .catch((err) => console.log(err));
  };

  const handleReset = () => {
    loadUserData();
  };

  return (
    <>
    <form
      style={{
        margin: "auto",
        padding: "15px",
        maxwidth: "400px",
        aligncontent: "center",
      }}
      className="d-flex input-group w-auto"
      onSubmit={handleSearch}
    >
      <input
        type= "text"
        className='form-control'
        placeholder='Search Name...'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type='submit' variant="info">Search</Button>
      <Button variant="info" className='mx-2' onClick={()=>handleReset()}>Reset</Button>
    </form>
    <h5 className='text-center'>Table Heading</h5>
    <Table striped bordered hover variant="dark">
    <thead>
        <tr>
        <th>#</th>
        <th>Env</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
        </tr>
    </thead>
    {data.length === 0? (
      <tbody>
        <tr>
        <td colSpan={4}> No data Found</td>
        </tr>
      </tbody>
    ): (
      data.map((item,index) =>(
      <tbody key={index}>
          <tr>
          <td>{index+1}</td>
          <td>{item.Env}</td>
          <td>{item.FirstName}</td>
          <td>{item.LastName}</td>
          <td>{item.Username}</td>
          </tr>
      </tbody>
      ))
    )    
    }    
    </Table>
    <Row>
      <Col size="8">
        <h5>Sort By:</h5>
        <select 
          style={{ width: "50%", borderRadius: "2px", height: "35px"}}
          onChange={handleSort}
          value={sortvalue}
        >
          <option>Please Select Value</option>
          {sortOPtions.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </Col>
      <Col size="8">
        <h5>Filter By Env:</h5>
        <select 
          style={{ width: "50%", borderRadius: "2px", height: "35px"}}
          onChange={handleFilter}
        >
          <option>Please Select Value</option>
          {filterOPtions.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </Col>
    </Row>
    </>
  )
}
