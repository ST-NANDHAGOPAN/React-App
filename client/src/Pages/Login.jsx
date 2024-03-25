import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import useAuth from "../ProtectedRoutes/useAuth";

function Login() {
  const [User, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // To track authentication error
  const [loading, setLoading] = useState(false); // To track loading state

  const navigate = useNavigate();
  const isAuthenticate = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true); // Start loading

    try {
      const response = await fetch(
        "https://64d08349ff953154bb78f9e5.mockapi.io/api/as/users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const users = await response.json();

      // Check if there is a user with the provided credentials
      const foundUser = users.find(
        (userData) =>
          userData.user === User && userData.password === password
      );

      if (foundUser) {
        handleLogin(); // Proceed to login if credentials are correct
      } else {
        setError("Invalid username or password !!"); // Set an error message
      }
    } catch (error) {
      setError("Failed to authenticate");
    } finally {
      setLoading(false); // Stop loading, whether successful or not
    }
  };

  const handleLogin = () => {
    const token = "LoginSuccess"; // Mock token value
    localStorage.setItem("token", JSON.stringify(token));
    console.log(token);
    setError(null); // Clear any previous errors
    navigate("/");

    if (isAuthenticate) {
      navigate("/");
    }
  };

  return (
    <div className="login body1">
      <div className="login-container">
        <h1>Login</h1>
        {error && <p className="error fw-bolder">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="user">User</label>
          <input
            type="text"
            id="user"
            name="user"
            value={User}
            onChange={(event) => setUser(event.target.value)}
            required
            autoComplete="username"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
          />

          {loading ? (
            // Render the loading spinner while loading
            <div className="text-center spinner"></div>
          ) : (
            <button type="submit">Login</button>
          )}
          <br />
          <span className="text-center">New User ?</span>
         
          <NavLink to="/signup">
            <button className="btn btn-primary w-100">Sign Up</button>
          </NavLink>
        </form>
      </div>
    </div>
  );
}

export default Login;
