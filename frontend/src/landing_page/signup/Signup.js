import React, { useEffect } from "react";

function Signup() {
  useEffect(() => {
    // Redirect to the dashboard signup page
    window.location.href = "http://localhost:3001/signup";
  }, []);

  return (
    <div className="container p-5">
      <div className="row text-center">
        <h2>Redirecting to signup...</h2>
        <p>You are being redirected to the signup page.</p>
      </div>
    </div>
  );
}

export default Signup;
