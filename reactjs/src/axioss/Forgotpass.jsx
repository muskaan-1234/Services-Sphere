import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { verifyResetToken } from '../services/user'; // Import the getUserEmail function

function Forgotpass() {
  const { token } = useParams(); // Use useParams here to get the token
  const [obj, setObj] = useState({
    newpass: '',
    confirmpass: '',
    token: token, // Set the token in the state
  });

  const doUpdate = (e) => {
    const { name, value } = e.target;
    setObj({ ...obj, [name]: value });
  };

  useEffect(() => {
    verifyResetToken(token)
      .then((data) => {
        console.log('Token received in frontend:', token);
        console.log('Data received from server:', data);
        // Perform additional actions if needed
      })
      .catch((error) => {
        console.error('Error verifying token:', error);
        // Handle the error as needed
      });
  }, [token]);

  return (
    <div>
      <center>
        <FloatingLabel controlId="floatingNewPassword" label="New Password" className="mb-3">
          <Form.Control
            type="password"
            name="newpass"
            placeholder="New Password"
            value={obj.newpass}
            onChange={doUpdate}
            style={{ width: '30%', marginTop: '20px' }}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
          <Form.Control
            type="password"
            name="confirmpass"
            placeholder="Confirm Password"
            value={obj.confirmpass}
            onChange={doUpdate}
            style={{ width: '30%', marginTop: '20px' }}
          />
        </FloatingLabel>
        <Button variant="secondary" size="lg" style={{ marginTop: '20px' }}>
          Update Password
        </Button>
      </center>
    </div>
  );
}

export default Forgotpass;
