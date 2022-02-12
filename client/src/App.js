import React from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [token, setToken] = React.useState("");

  const generateQR = async (e) => {
    e.preventDefault();
    try {
      console.log("call");
      let stringdata = JSON.stringify(token);
      const res = await axios({
        method: "POST",
        url: "http://localhost:5000/api/scan",
        // body: stringdata,
      });
      console.log("res", res);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div class="container">
      <h1 class="text-center">QR CODE GENERATOR</h1>

      <p>Please type the URL or Text below and click Generate!</p>
      <form class="form" onSubmit={generateQR}>
        <input
          name="text"
          className="form-control"
          placeholder="URL or Text"
          type="text"
          required
          onChange={(e) => setToken(e.target.value)}
        />
        <br />
        <button type="submit" className="btn btn-primary" value="Get QR">
          Generate
        </button>
      </form>
    </div>
  );
}

export default App;
