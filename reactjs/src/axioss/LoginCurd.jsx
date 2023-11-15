import * as React from 'react';
import { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { requestPasswordReset } from '../services/user';

function LoginCurd() {
  const [obj, setObj] = useState({ email: '', pass: ''});
  const [errObj, setErrObj] = useState({ email: '', pass: ''});


  const doCheck = (e) => {
    // ... (Validation logic)
  };

  const doUpdateBoth = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObj((prevObj) => ({ ...prevObj, [name]: value }));
  }

  const navigate = useNavigate();

  async function doLogin() {
    const url = "http://localhost:3000/user/login-process-with-post";

    var resp = await axios.post(url, {
      email: obj.email,
      pass: obj.pass,
    });

    if (resp.data.status === false) {
      alert(resp.data.message);
    } else {
      alert(resp.data.message);
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("active_email", resp.data.user.email);

      if (resp.data.user.type === "Client") {
        navigate("/client");
      } else {
        navigate("/spro");
      }
    }
  }
  
  const doForgotPassword = async () => {
    const res = await requestPasswordReset(obj);
    // alert(res.obj);
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
        <p>
          <a href="#" onClick={doForgotPassword}>Forgot Password?</a>
        </p>
        <Button variant="outline-secondary" style={{ marginTop: '15px' }} onClick={doLogin}>
          Login
        </Button>
      </center>
    </div>
  );
}

export default LoginCurd;
