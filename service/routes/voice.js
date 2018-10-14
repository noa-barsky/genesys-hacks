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
    // TM Client to send SMS to customers about delay
    const TMClient = require('textmagic-rest-client');
    var c = new TMClient('suhaskabinna', '0VmRkLoeXvXjXxjE5NNd87g9RcWNtB');
    c.Messages.send({ text: 'Thank you for calling CIBC, We appretiate your business. Due to long wait time we will call you back by end of day today. Thank you for your patience', phones: smsData.to }, function (err, res) {
    });


    // Call back clients. Should be ideally afte certain delay
    try {
      console.log('in here now')
      var response = await workspaceApi.voice.makeCall(smsData.to);
      res.send(response);
    } catch (error) {
      res.send(error);
    };
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
