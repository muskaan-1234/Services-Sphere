import * as React from 'react';
import  { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { signupService } from '../services/user';

function SignupCurd() {
  const [obj, setObj] = useState({ email: '', pass: '', type: '' });
  const [errObj, setErrObj] = useState({ email: '', pass: '', type: '' });

  const doCheck = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let errorMessage = '';

    if (name === 'email') {
      // Email validation
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!value) {
        errorMessage = 'Email is required.';
      } else if (!emailRegex.test(value)) {
        errorMessage = 'Please enter a valid email address.';
      }
    } else if (name === 'pass') {
      // Password validation (at least 8 characters)
      if (!value) {
        errorMessage = 'Password is required.';
      } else if (value.length < 8) {
        errorMessage = 'Password must be at least 8 characters.';
      }
    } else if (name === 'type') {
      // Type validation (service_provider or client)
      if (!value) {
        errorMessage = 'User type is required.';
      } else if (value !== 'service_provider' && value !== 'client') {
        errorMessage = 'Please select a valid user type.';
      }
    }

    // Update the error message for the specific field
    setErrObj((prevErrObj) => ({ ...prevErrObj, [name]: errorMessage }));
  };

  const doUpdateBoth = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObj((prevObj) => ({ ...prevObj, [name]: value }));
  };

  // const doSignup = async () => {
  //   const config = {
  //     method: 'post',
  //     headers: {
  //       'accept': 'application/json',
  //       'content-type': 'application/x-www-form-urlencoded'
  //     }
  //   }
  
  //   const url = "http://localhost:3000/user/signup-process-with-post";
  //   const signupData = new URLSearchParams(obj);
  
  //   try {
  //     const resp = await axios.post(url, signupData, config);
  //     alert(JSON.stringify(resp.data));
  //     // handleClose();
  //   } catch (error) {
  //     alert('Error signing up: ' + error.message);
  //   }
  // }
  const doSignup=async()=>
  {
    const res=await signupService(obj);
    alert(res.data);
  }

  return (
    <div>
        <center>
          <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="name@example.com"
              style={{ width: '30%', marginTop: '20px' }}
              onChange={doUpdateBoth}
              onBlur={doCheck}
              value={obj.email}
            />
            {errObj.email}
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
            <Form.Control
              type="password"
              name="pass"
              placeholder="Password"
              style={{ width: '30%', marginTop: '20px' }}
              onChange={doUpdateBoth}
              onBlur={doCheck}
              value={obj.pass}
            />
            {errObj.pass}
          </FloatingLabel>
          <FloatingLabel controlId="floatingSelect" label="User Type" className="mb-3">
            <Form.Select
              aria-label="User Type"
              style={{ width: '30%', marginTop: '20px' }}
              name="type"
             onChange={doUpdateBoth}
              onBlur={doCheck}
              value={obj.type}
            >
              <option>Select User Type</option>
              <option value="Service Provider">Service Provider</option>
              <option value="Client">Client</option>
            </Form.Select>
            {errObj.type}
          </FloatingLabel>
          <Button variant="outline-secondary" style={{ marginTop: '20px' }} type="button" onClick={doSignup}>
            Signup
          </Button>
        </center>
    </div>
  );
}

export default SignupCurd;
