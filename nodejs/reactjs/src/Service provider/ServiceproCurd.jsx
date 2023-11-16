import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './Spro.css';

function ServiceproCurd() {
  const [aemail, setObj] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [city, setCity] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedSubServices, setSelectedSubServices] = useState([]);
  const [fullObj, setFullObj] = useState({});
  const [hasTeam, setHasTeam] = useState('no'); // "yes" or "no"
  const [teamMembers, setTeamMembers] = useState([{ email: '', name: '', contact: '' }]);

  useEffect(() => {
    const ae = localStorage.getItem("active_email");
    setObj(ae);
    if (token) getUser();
  }, []);

  const token = localStorage.getItem('token');

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleSubServiceChange = (e) => {
    const subService = e.target.value;
    if (selectedSubServices.includes(subService)) {
      setSelectedSubServices(selectedSubServices.filter((service) => service !== subService));
    } else {
      setSelectedSubServices([...selectedSubServices, subService]);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user.currentUser", {
        headers: {
          'Authorization': token
        }
      });
      if (res.data.status === true) {
        setFullObj(res.data.user);
        setName(res.data.user.name);
        setContact(res.data.user.contact);
        setCity(res.data.user.city);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const createTeamMember = () => ({ email: '', name: '', contact: '' });

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, createTeamMember()]);
  };

  const removeTeamMember = (index) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers.splice(index, 1);
    setTeamMembers(updatedTeamMembers);
  };

  return (
    <div>
      <Form>
        <div className="row">
          <div className="col-md-4">
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control type="email" placeholder="name@example.com" value={aemail} readOnly />
            </FloatingLabel>
          </div>
          <div className="col-md-4">
            <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
              <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </FloatingLabel>
          </div>
          <div className="col-md-4">
            <FloatingLabel controlId="floatingContact" label="Contact Number" className="mb-3">
              <Form.Control type="text" placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} />
            </FloatingLabel>
          </div>
          <div className="col-md-4">
            <FloatingLabel controlId="floatingCity" label="City" className="mb-3">
              <Form.Control type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
            </FloatingLabel>
          </div>
          <div className="col-md-4">
            <FloatingLabel controlId="floatingService" label="Select Service" className="mb-3">
              <Form.Select
                aria-label="Select service"
                onChange={handleServiceChange}
                value={selectedService}
              >
                <option value="">Select a service</option>
                <option value="Electrician">Electrician</option>
                <option value="Mechanic">Mechanic</option>
                <option value="Plumber">Plumber</option>
              </Form.Select>
            </FloatingLabel>
          </div>
        </div>
      </Form>

      {(selectedService === 'Electrician' || selectedService === 'Mechanic' || selectedService === 'Plumber') && (
        <SubServices
          selectedService={selectedService}
          selectedSubServices={selectedSubServices}
          handleSubServiceChange={handleSubServiceChange}
        />
      )}

      <Form>
        <div className="row">
          <div className="col-md-4">
            <FloatingLabel controlId="floatingTeam" label="Have a Team?" className="mb-3">
              <Form.Check
                type="radio"
                id="teamYes"
                name="hasTeam"
                label="Yes"
                value="yes"
                checked={hasTeam === 'yes'}
                onChange={() => setHasTeam('yes')}
              />
              <Form.Check
                type="radio"
                id="teamNo"
                name="hasTeam"
                label="No"
                value="no"
                checked={hasTeam === 'no'}
                onChange={() => setHasTeam('no')}
              />
            </FloatingLabel>
          </div>
        </div>
      </Form>

      {hasTeam === 'yes' && (
        <div>
          {teamMembers.map((teamMember, index) => (
            <TeamMemberForm
              key={index}
              teamMember={teamMember}
              onRemove={() => removeTeamMember(index)}
            />
          ))}
          <button type="button" className="btn btn-primary" onClick={addTeamMember}>
            Add Team Member
          </button>
        </div>
      )}
    </div>
  );
}

function SubServices({ selectedService, selectedSubServices, handleSubServiceChange }) {
  const subServicesData = {
    Electrician: [
      'Wiring',
      'Lighting Installation',
      'Appliance Repair',
      'Circuit Breaker Replacement',
    ],
    Mechanic: [
      'Car Repair',
      'Motorcycle Repair',
      'Tire Replacement',
      'Engine Diagnostics',
    ],
    Plumber: [
      'Pipe Repair',
      'Drain Cleaning',
      'Water Heater Installation',
      'Bathroom Plumbing',
    ],
  };

  const subServices = subServicesData[selectedService];

  return (
    <div className="mb-3">
      <p>{selectedService} Services:</p>
      {subServices.map((subService)=>
        <Form.Check
          key={subService}
          type="checkbox"
          id={subService}
          label={subService}
          value={subService}
          checked={selectedSubServices.includes(subService)}
          onChange={handleSubServiceChange}
        />
      )}
    </div>
  );
}

function TeamMemberForm({ teamMember, onRemove }) {
  return (
    <div>
      <Form>
        <div className="row">
          <div className="col-md-4">
            <FloatingLabel controlId="floatingTeamMemberEmail" label="Team Member Email" className="mb-3">
              <Form.Control type="email" placeholder="name@example.com" value={teamMember.email} />
            </FloatingLabel>
          </div>
          <div className="col-md-4">
            <FloatingLabel controlId="floatingTeamMemberName" label="Team Member Name" className="mb-3">
              <Form.Control type="text" placeholder="Name" value={teamMember.name} />
            </FloatingLabel>
          </div>
          <div className="col-md-4">
            <FloatingLabel controlId="floatingTeamMemberContact" label="Team Member Contact Number" className="mb-3">
              <Form.Control type="text" placeholder="Contact Number" value={teamMember.contact} />
            </FloatingLabel>
          </div>
          <div className="col-md-4">
            <button type="button" className="btn btn-danger" onClick={onRemove}>
              Remove Team Member
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default ServiceproCurd;
