var express = require('express'),
    elasticsearch = require('elasticsearch');

var server = express(),
    es = elasticsearch.Client({ host: process.env.ES_PORT || 'localhost:9200' });

server.get('/*', function (req, res, next) {
  es.search(req.query)
    .then(function(results) {
      res.status(200).json(results);
    },
    function(err) {
      next(err);
    });
});

server.use(function(err, req, res, next) {
  res.status(500).json(err);
});

server.listen(process.env.PORT || 3005);
