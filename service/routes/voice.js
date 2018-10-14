module.exports = function (app, workspaceApi) {

  // Toggle agent state
  app.get('/voice/state', async (req, res) => {
    try {
      const query = req.query.state;
      var response = null;
      if (query !== 'Ready') {
        response = await workspaceApi.voice.ready();
      } else {
        response = await workspaceApi.voice.notReady('AfterCallWork');
      }
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  });

  // Answer call by id
  app.get('/voice/call/Answer', async (req, res) => {
    try {
      const callId = req.query.id;
      var response = await workspaceApi.voice.answerCall(callId);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  });

  // Hold call by id
  app.get('/voice/call/Hold', async (req, res) => {
    try {
      const callId = req.query.id;
      var response = await workspaceApi.voice.holdCall(callId);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  });

  // Release call by id
  app.get('/voice/call/Release', async (req, res) => {
    try {
      const callId = req.query.id;
      var response = await workspaceApi.voice.releaseCall(callId);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  });

  // Retrieve call by id
  app.get('/voice/call/Retrieve', async (req, res) => {
    try {
      const callId = req.query.id;
      var response = await workspaceApi.voice.retrieveCall(callId);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  });


  app.post('/sendSMS_Callback', async (req, res) => {
    
    var smsData = req.body;
    console.log(smsData)

      const TMClient = require('textmagic-rest-client');
      var c = new TMClient('suhaskabinna', '0VmRkLoeXvXjXxjE5NNd87g9RcWNtB'); 
      c.Messages.send({text: 'Thank you for calling CIBC, We appretiate your business. Due to long wait time we will call you back by end of day today. Thank you for your patience', phones: smsData.to}, function(err, res){
        });


      // Call back clients  
      try {
        console.log('in here now')
        const callId = "+19057199829";
        var response = await workspaceApi.voice.makeCall(smsData.to);
        res.send(response);
      } catch (error) {
        res.send(error);
      }
    // res.send('sent');
    // Send data to sms server

    // var sms = require("../../node_modules/smsjs/sms");
    // var server = sms.server.connect({
    //   user: "suhas.servesh2@gmail.com",
    //   password: "Ilovepanda123",
    //   host: "smtp.gmail.com",
    //   ssl: true
    // });

    // send the message and get a callback with an error or details of the message that was sent
    // server.send({
    //   text: smsData.subject,
    //   from: "suhas.servesh2@gmail.com",
    //   to: "suhas.servesh@gmail.com;suhas.servesh1@gmail.com",
    //   cc: "",
    //   subject: smsData.message
    // }, function (err, message) {
    //     console.log(err || message);
    //   });
    res.send('sent');
  });

  app.get('/voice/calls', async (req, res) => {
    try {
      console.log('in here now')
      const callId = "+19057199829";
      var response = await workspaceApi.voice.makeCall(callId);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  });


}
