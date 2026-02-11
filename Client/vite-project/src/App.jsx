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

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) 
        return window.alert("No token found in localStorage");     // Check if the token exists in localStorage before making the request
      
      const response = await axios.get("http://localhost:8000/auth/verify-token", {
        headers: {
          Authorization: `Bearer ${token}`,                         // Include the token in the Authorization header
        },
      });
      return window.alert(response.data.message + " Session expires in: " +
        response.data.session_expries_in + " seconds");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      fontFamily: "'Segoe UI', 'Roboto', sans-serif",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
      padding: "40px",
      maxWidth: "500px",
      width: "100%",
    },
    heading: {
      color: "#333",
      fontSize: "32px",
      fontWeight: "700",
      marginBottom: "12px",
      textAlign: "center",
    },
    description: {
      color: "#666",
      fontSize: "16px",
      lineHeight: "1.6",
      marginBottom: "30px",
      textAlign: "center",
    },
    buttonGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      marginBottom: "30px",
    },
    primaryButton: {
      backgroundColor: "#667eea",
      color: "white",
      border: "none",
      padding: "14px 24px",
      fontSize: "16px",
      fontWeight: "600",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
    },
    secondaryButton: {
      backgroundColor: "#764ba2",
      color: "white",
      border: "none",
      padding: "14px 24px",
      fontSize: "16px",
      fontWeight: "600",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 12px rgba(118, 75, 162, 0.4)",
    },
    tokenBox: {
      backgroundColor: "#f5f5f5",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      padding: "16px",
      marginTop: "20px",
    },
    tokenLabel: {
      color: "#555",
      fontSize: "14px",
      fontWeight: "600",
      marginBottom: "8px",
      margin: "0 0 8px 0",
    },
    tokenValue: {
      color: "#333",
      fontSize: "13px",
      fontFamily: "monospace",
      wordBreak: "break-all",
      backgroundColor: "white",
      padding: "12px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      margin: "0",
      maxHeight: "120px",
      overflowY: "auto",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>JWT Token Manager</h1>
        <p style={styles.description}>
          This application handles JWT token creation, updating, and storage.
        </p>

        <div style={styles.buttonGroup}>
          <button onClick={handleButtonClick} style={styles.primaryButton}>
            Create, Update & Store Token
          </button>

          <button onClick={verifyToken} style={styles.secondaryButton}>
            Verify Token
          </button>
        </div>

        {token && (
          <div style={styles.tokenBox}>
            <p style={styles.tokenLabel}>Generated Token:</p>
            <p style={styles.tokenValue}>
              {typeof token === "string" ? token : "No Token"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
