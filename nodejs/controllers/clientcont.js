var mongoose = require("mongoose");
var path = require("path");
var getClientUserSchema = require("../models/clientmodel");

var clientUserColRef = getClientUserSchema();

async function save_client_process_with_post(req, resp) {
  console.log(req.body);

  var profilePicName = req.files.profilepic.name;
  var proofPicName = req.files.proofpic.name;

  var profilePicPath = path.join(__dirname, '..', 'uploads', profilePicName);
  var proofPicPath = path.join(__dirname, '..', 'uploads', proofPicName);

  req.files.profilepic.mv(profilePicPath);
  req.files.proofpic.mv(proofPicPath);

  var obj = new clientUserColRef(req.body);
  obj.picpath = profilePicName; 
  obj.proofpath = proofPicName; 

  obj.save()
    .then((doc) => {
      console.log("Client data saved successfully");
      console.log("Saved Client Data:", doc); 
      resp.send("Client data saved successfully");
    })
    .catch((err) => {
      console.error(err);
      resp.status.send('An error occurred while saving the data.');
    });
}

async function fetch_client_data(req, resp) {
  const { email } = req.body;

  try {
    const clientData = await clientUserColRef.findOne({ email }).exec();

    if (clientData) {
      const responseData = {
        email: clientData.email,
        name: clientData.name,
        contact: clientData.contact,
        address: clientData.address,
        city: clientData.city,
        prooftype: clientData.prooftype,
        profilePicURL: `http://yourserver.com/${clientData.picpath}`,
        proofPicURL: `http://yourserver.com/${clientData.proofpath}`,
      };

      console.log("Fetched Client Data:", clientData);
      resp.status(200).send(JSON.stringify(responseData)); // Fixed the response line
    } else {
      resp.status(500).send(JSON.stringify({ message: 'Client data not found for the provided email' }));
    }
  } catch (error) {
    console.error(error);
    resp.status(500).send(JSON.stringify({ message: 'An error occurred while fetching client data' }));
  }
}

async function update_client_data(req, resp) {
  const { email, name, contact, address, city, prooftype } = req.body;

  try {
    const clientData = await clientUserColRef.findOne({ email }).exec();

    if (!clientData) {
      return resp.status(404).json({ message: 'Client data not found for the provided email' });
    }

    // Update the fields with the new values
    clientData.name = name;
    clientData.contact = contact;
    clientData.address = address;
    clientData.city = city;
    clientData.prooftype = prooftype;

    // Check if profilepic is provided and not null
    if (req.files && req.files.profilepic && req.files.profilepic.name) {
      var profilePicName = req.files.profilepic.name;
      var profilePicPath = path.join(__dirname, '..', 'uploads', profilePicName);
      req.files.profilepic.mv(profilePicPath);
      clientData.picpath = profilePicName;
    }

    // Check if proofpic is provided and not null
    if (req.files && req.files.proofpic && req.files.proofpic.name) {
      var proofPicName = req.files.proofpic.name;
      var proofPicPath = path.join(__dirname, '..', 'uploads', proofPicName);
      req.files.proofpic.mv(proofPicPath);
      clientData.proofpath = proofPicName;
    }

    const updatedClientData = await clientData.save();
    console.log("Updated Client Data:", updatedClientData); // Log the updated data
    resp.status(200).json({ message: 'Client data updated successfully', updatedData: updatedClientData });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: 'An error occurred while updating client data' });
  }
}


module.exports = {
  save_client_process_with_post,
  fetch_client_data,
  update_client_data
};
