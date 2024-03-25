import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";


export const SignUp = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true); // Start loading when navigating
   
    // Check if a user with the same username already exists
    fetch("https://64d08349ff953154bb78f9e5.mockapi.io/api/as/users")
      .then((response) => response.json())
      .then((data) => {
        const userExists = data.some(
          (existingUser) => existingUser.user === user
        );

        if (userExists) {
          alert("User with the same username already exists");
        } else {
          // If the user doesn't exist, proceed with creating the new user
          const userData = {
            user,
            password,
          };

          fetch("https://64d08349ff953154bb78f9e5.mockapi.io/api/as/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Data sent successfully:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            })
            .finally(() => {
              setUser("");
              setPassword("");
              setLoading(false); // Stop loading when navigation is complete
              navigate("/login");
            });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="login body1">
      <div className="login-container">
        <h1>SignUp</h1>
        {loading ? (
          // Render the loading spinner when navigating
          <div  className="text-center spinner"></div>
        ) : (
          // Render the login form when not navigating
          <form onSubmit={handleSubmit}>
            <label htmlFor="user">User</label>
            <input
              type="text"
              id="user"
              name="user"
              value={user}
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

            <button type="submit">Signup</button>
            <br />
            <span className="text-center">Already Signup ?</span>
            <NavLink to="/login">
              <button className="btn btn-primary w-100">Go To login</button>
            </NavLink>
          </form>
        )}
      </div>
    </div>
  );
};
