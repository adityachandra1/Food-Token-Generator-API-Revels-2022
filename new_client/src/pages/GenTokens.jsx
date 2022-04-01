

import "./CSS/GenTokens.css";
import React, { useState,useEffect } from "react";
const axios = require('axios').default;


const GenTokens = () => {


  useEffect(() => {
   
    axios.get('http://localhost:8080/get-volunteers-by-cat')
  .then(function (response) {
    // handle success
    
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
  
  
  
  });



  const USERS = [
    {  name: 'Andy', role: "Core Committee Member" },
    {  name: 'Garvit',  role: "Core Committee Member"},
    {  name: 'Yash', role: "Core Committee Member" },
    {  name: 'ajdaijd', role: "Organizer" },
    {  name: 'aaaaa', role: "Organizer" },
    {  name: 'xxaaa', role:"Organizer" },
    {  name: 'Andy', role: "Organizer" },
    {  name: 'Garvit', role: "Organizer" },
    {  name: 'Yash', role: "Volunteer" },
    {  name: 'ajdaijd', role: "Volunteer" },
    {  name: 'aaaaa', role: "Volunteer" },
    {  name: 'xxaaa', role: "Volunteer" }
  ];
  
  const [name, setName] = useState('');

  // the search result
  const [foundUsers, setFoundUsers] = useState(USERS);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = USERS.filter((user) => {
        return user.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(USERS);
      // If the text field is empty, show all users
    }

    setName(keyword);
  };

  return (
   
     
       
    <div className="main-page">

      <div className="gentokens-page">


      <div className="ellipse"></div>
        <div className="list-container">
          {" "}
          <h1>Welcome back, Parthiv</h1>
          <p>System admin and web development</p>
          <div className="tab-menu">
            <button className="active">Organisers</button>
            <button>Core Commitee</button>
            <button>Volunteers</button>
          </div>
          <div className="search-container">
            <p>List of Organisers:-</p>
            <button>Select all</button>
          </div>
        </div>
      

      <div className="bigcontainer">
        <input
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder="Filter"
      />
      <div className="container">
     

      <div className="user-list">
        {foundUsers && foundUsers.length > 0 ? (
          foundUsers.map((user) => (
            <li key={user.id} className="user">
                 <div className="user-id">
                   <input  type="checkbox" id="user-id"  />
                 </div>
              <div className="user-name">{user.name}</div>
              <div className="user-age">{user.role} </div>
            </li>
          ))
        ) : (
          <h1>No results found!</h1>
        )}
      </div>
      
      </div>
      </div>
      <button className="send-button">
      SEND
    </button>

    </div>
    

    </div>
  );
};

export default GenTokens;
