const express = require('express');
var controller = require("../controllers/clientcont");
var app=express.Router();

app.post("/save-client-process-with-post", controller.save_client_process_with_post);
app.post("/fetch-client-data", controller.fetch_client_data);
app.post("/update-client-data",controller.update_client_data);
module.exports = app;
