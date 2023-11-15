import React, { useState, useEffect, useRef } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function ClientCurd() {
  const [obj, setFormData] = useState({
    email: '',
    name: '',
    contact: '',
    address: '',
    city: '',
    prooftype: '',
    profilepic: null,
    proofpic: null,
  });

  const [profilePicName, setProfilePicName] = useState('');
  const [proofPicName, setProofPicName] = useState('');
  const [key, setKey] = useState(Date.now());

  const profilePicRef = useRef(null);
  const proofPicRef = useRef(null);

  useEffect(() => {
    const ae = localStorage.getItem('active_email');
    if (ae) {
      setFormData({
        ...obj,
        email: ae,
      });
    }
  }, []);

  const doUpdateAll = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...obj,
      [name]: value,
    });
  };

  const doUpdateProfilePic = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...obj,
        profilepic: file,
      });

      setProfilePicName(file.name);

      const profileFileInput = document.getElementById('profileFileInput');
      if (profileFileInput) {
        profileFileInput.placeholder = file.name;
      }
    }
  };

  const doUpdateProofPic = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...obj,
        proofpic: file,
      });

      setProofPicName(file.name);

      const proofFileInput = document.getElementById('proofFileInput');
      if (proofFileInput) {
        proofFileInput.placeholder = file.name;
      }
    }
  };

  var doSave = async () => {
    const config = {
      method: 'post',
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const url = 'http://localhost:3000/client/save-client-process-with-post';
    var formData = new FormData();
    for (var x in obj) {
      formData.append(x, obj[x]);
    }
    try {
      const resp = await axios.post(url, formData, config);
      alert(resp.data);
    } catch (error) {
      alert('Error While validating Email: ' + error.message);
    }
  };

  var doFetchData = async () => {
    const url = 'http://localhost:3000/client/fetch-client-data';
    const data = {
      email: obj.email,
    };

    try {
      const response = await axios.post(url, data);
      console.log('Response from server:', response.data);

      const {
        name,
        contact,
        address,
        city,
        prooftype,
        picpath,
        proofpath,
      } = response.data;

      setFormData({
        ...obj,
        name,
        contact,
        address,
        city,
        prooftype,
      });

      // Form the complete URLs for the images based on your server setup
      const serverURL = 'http://localhost:3000';
      const profilePicURL = `${serverURL}/uploads/${picpath}`;
      const proofPicURL = `${serverURL}/uploads/${proofpath}`;

      if (profilePicRef.current) {
        profilePicRef.current.onerror = () => console.error('Error loading profile picture');
        profilePicRef.current.onload = () => console.log('Profile picture loaded');
        profilePicRef.current.src = profilePicURL;
        profilePicRef.current.style.display = 'block';
      }

      if (proofPicRef.current) {
        proofPicRef.current.onerror = () => console.error('Error loading proof picture');
        proofPicRef.current.onload = () => console.log('Proof picture loaded');
        proofPicRef.current.src = proofPicURL;
        proofPicRef.current.style.display = 'block';
      }

      setKey(Date.now());
    } catch (error) {
      alert('Error fetching data: ' + error.message);
    }
  };
  
  var doUpdate = async () => {
    const config = {
      method: 'post',
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const url = 'http://localhost:3000/client/update-client-data';
    var formData = new FormData();
    for (var x in obj) {
      formData.append(x, obj[x]);
    }
    try {
      const resp = await axios.post(url, formData, config);
      alert(resp.data.message);
    } catch (error) {
      alert('Error updating client data: ' + error.message);
    }
  };
  
    return (
      <div>
        <Form key={key}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FloatingLabel
              controlId="email"
              label="Email address"
              style={{ width: '55%', marginTop: '30px', marginLeft: '30px' }}
            >
              <Form.Control
                type="email"
                name="email"
                value={obj.email}
                onChange={doUpdateAll}
                placeholder="name@example.com"
                readOnly
              />
            </FloatingLabel>
            <Button
              variant="primary"
              size="lg"
              style={{ marginLeft: '10px', marginTop: '24px' }}
              onClick={doFetchData}
            >
              Fetch Data
            </Button>
          </div>

          <div className="row mb-3">
            <div className="col-md-6" style={{ width: '40%', marginLeft: '30px', marginTop: '30px' }}>
              <FloatingLabel controlId="name" label="Name">
                <Form.Control
                  type="text"
                  name="name"
                  value={obj.name}
                  onChange={doUpdateAll}
                  placeholder="Enter name"
                />
              </FloatingLabel>
            </div>
            <div className="col-md-6" style={{ width: '40%', marginTop: '30px' }}>
              <FloatingLabel controlId="contact" label="Contact Number">
                <Form.Control
                  type="tel"
                  name="contact"
                  value={obj.contact}
                  onChange={doUpdateAll}
                  placeholder="Enter contact number"
                />
              </FloatingLabel>
            </div>
          </div>

          <div className="row mb-3" style={{ marginTop: '10px' }}>
            <div className="col-md-6" style={{ width: '40%', marginLeft: '30px' }}>
              <FloatingLabel controlId="address" label="Address">
                <Form.Control
                  type="text"
                  name="address"
                  value={obj.address}
                  onChange={doUpdateAll}
                  placeholder="Enter address"
                />
              </FloatingLabel>
            </div>
            <div className="col-md-6" style={{ width: '25%' }}>
              <FloatingLabel controlId="city" label="City">
                <Form.Control
                  type="text"
                  name="city"
                  value={obj.city}
                  onChange={doUpdateAll}
                  placeholder="Enter city"
                />
              </FloatingLabel>
            </div>
            <div className="col-md-6" style={{ width: '25%' }}>
              <FloatingLabel controlId="prooftype" label="Proof Type">
                <Form.Select
                  name="prooftype"
                  value={obj.prooftype}
                  onChange={doUpdateAll}
                  aria-label="Proof Type"
                >
                  <option>Choose proof type</option>
                  <option value="Aadhar Card">Aadhar Card</option>
                  <option value="Pan Card">Pan Card</option>
                  <option value="Voter Card">Voter Card</option>
                  <option value="Driving License">Driving License</option>
                </Form.Select>
              </FloatingLabel>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6" style={{ marginTop: '10px' }}>
              <Form.Group controlId="profilepic">
                <Form.Label style={{ marginLeft: '30px', marginBottom: '10px' }}>Profile Picture</Form.Label>
                <Form.Control type="file" name="profilepic" onChange={doUpdateProfilePic} />
              </Form.Group>
              {obj.profilepic && (
                <img
                  ref={profilePicRef}
                  src={URL.createObjectURL(obj.profilepic)}
                  alt="Profile Preview"
                  style={{ display: 'block', maxWidth: '50%', maxHeight: '50%' }}
                />
              )}
              {!obj.profilepic && (
                <div
                  style={{
                    display: 'block',
                    width: '10%',
                    height: '10%',
                  }}
                >
                </div>
              )}
            </div>
            <div className="col-md-6" style={{ marginTop: '10px' }}>
              <Form.Group controlId="proofpic">
                <Form.Label style={{ marginBottom: '10px' }}>Proof Picture</Form.Label>
                <Form.Control type="file" name="proofpic" onChange={doUpdateProofPic} />
              </Form.Group>
              {obj.proofpic && (
                <img
                  ref={proofPicRef}
                  src={URL.createObjectURL(obj.proofpic)}
                  alt="Proof Preview"
                  style={{ display: 'block', maxWidth: '100%' }}
                />
              )}
              {!obj.proofpic && (
                <div
                  style={{
                    display: 'block',
                    maxWidth: '10%',
                    maxHeight: '10%',
                  }}
                >
                </div>
              )}
            </div>
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-center" style={{ marginTop: '40px', marginRight: '80px' }}>
            <Button variant="success" size="lg" onClick={doSave}>
              Save
            </Button>
            <Button variant="warning" size="lg" onClick={doUpdate}>
              Update
            </Button>
          </div>
        </Form>
      </div> 
    );
}

export default ClientCurd;
