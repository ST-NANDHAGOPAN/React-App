import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Error() {
  const navigate = useNavigate();

  useEffect(() => {
    // After 2 seconds (2000 milliseconds), redirect to the home page
    const timeout = setTimeout(() => {
      navigate('/');
    }, 2000);

    // Cleanup the timeout if the component unmounts before redirection
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="body2 error-container"><br />
      <h1>Page Not Found</h1>
      <p>Redirecting to the HOME PAGE...</p>
      <div className="spinner"></div>
    </div>
  );
}

