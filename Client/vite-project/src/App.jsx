import { useState } from "react";
import axios from "axios";

const App = () => {
  const [token, setToken] = useState("");

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/auth/create-token"
      );

      setToken(response.data.token);
      localStorage.setItem("jwtToken", response.data.token);
      console.log("Token:", response.data.token);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h1>JWT</h1>
      <p>This application handles JWT token creation, updating, and storage.</p>

      <button onClick={handleButtonClick}>
        create, update and store a JWT token
      </button>

      <p>Generated token:</p>
      <p>{token}</p>
    </div>
  );
};

export default App;
