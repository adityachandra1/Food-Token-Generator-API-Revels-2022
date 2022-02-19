import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [email, setEmail] = React.useState('');

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:5000/api/generateqr',
        body: {
          email: email,
        },
      });
      console.log('res', res); //has the url which needs to be mapped with qr code
      //redirect to new url which will show the qr code since the user is not logged in via cafeteria credentials it cannot be availed
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <div class="container">
      <h1 class="text-center">QR CODE GENERATOR</h1>

      <p>Please type in Email ID of the person who you are issuing token to:</p>
      <form class="form" onSubmit={sendEmail}>
        <input
          name="text"
          className="form-control"
          placeholder="Email ID"
          type="text"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button type="submit" className="btn btn-primary" value="Get QR">
          Send Mail
        </button>
      </form>
    </div>
  );
}

export default App;
