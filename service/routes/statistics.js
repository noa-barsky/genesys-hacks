module.exports = function (app, storage, statisticsApi) {

  app.get('/statistics/getValue', (req, res) => {

    statisticsApi.getStatValue(req.query.InboundCalls, req.query.objectId, req.query.Agent).then( (data) => {
      res.send({statistics: data});
    })
    .catch( (e) => {
      res.send(e.response.text);
    })
  });

}