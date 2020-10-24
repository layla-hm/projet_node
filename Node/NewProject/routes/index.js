var express = require('express');
var router = express.Router();
var admin = require('../models/admin')
var assur = require('../models/assur')
var agent = require('../models/agent')
var client = require('../models/client')
var boitier = require('../models/boitier')
var voiture = require('../models/voiture')
var table = require('../models/table')
/* GET home page. */

router.post('/admin', function (req, res, next) {
  admin.create(req.body).exec(function (err, data) {
    if (err) throw err
    res.send(data);
  });
});

router.get('/admin', function (req, res, next) {
  console.log("start this route")
  admin.find({}).select('FirstName LastName').exec(function (err, data) {
    if (err) throw err
    console.log(data)
    res.json(data);
  });
});
router.put('/admin', function (req, res, next) {
  console.log("start this route")
  admin.findById(id).exec(function (err, data) {
    if (err) throw err
    console.log(data)
    res.json(data);
  });
});
router.delete('/admin', function (req, res, next) {
  console.log("start this route")
  admin.findByIdAndDelete(id, { FirstName: 'layla' }).exec(function (err, data) {
    if (err) throw err
    console.log(data)
    res.json(data);
  });
});

router.post('/assur', function (req, res, next) {
  assur.create(req.body).exec(function (err, data) {
    if (err) throw err
    res.send(data);
  });
});
router.get('/assur', function (req, res, next) {
  console.log("start this route")
  assur.find({}).select('FirstName LastName').exec(function (err, data) {
    if (err) throw err
    console.log(data)
    res.json(data);
  });
});

router.post('/agent', function (req, res, next) {
  agent.create(req.body).exec(function (err, data) {
    if (err) throw err
    res.send(data);
  });
});
router.get('/agent', function (req, res, next) {
  console.log("start this route")
  agent.find({}).select('FirstName LastName').exec(function (err, data) {
    if (err) throw err
    console.log(data)
    res.json(data);
  });
});


router.post('/client', function (req, res, next) {
  client.create(req.body).exec(function (err, data) {
    if (err) throw err
    res.send(data);
  });
});
router.get('/client', function (req, res, next) {
  console.log("start this route")
  client.find({}).select('FirstName LastName').exec(function (err, data) {
    if (err) throw err
    console.log(data)
    res.json(data);
  });
});


router.post('/voiture', function (req, res, next) {
  voiture.create(req.body).exec(function (err, data) {
    if (err) throw err
    res.send(data);
  });
});
router.get('/voiture', function (req, res, next) {
  console.log("start this route")
  voiture.find({}).exec(function (err, data) {
    if (err) throw err
    console.log(data)
    res.json(data);
  });
});


router.post('/boitier', function (req, res, next) {
  boitier.create(req.body).exec(function (err, data) {
    if (err) throw err
    res.send(data);
  });
});
router.get('/boitier', function (req, res, next) {
  console.log("start this route")
  boitier.find({}).exec(function (err, data) {
    if (err) throw err
    console.log(data)
    res.json(data);
  });
});

router.post('/table/:idBoitier', function (req, res, next) {
  boitier.findById(req.params.idBoitier).exec(function (err, resp) {


    table.create({
      Vitesse: req.body.Vitesse,
      RPM: req.body.RPM,
      Temperature: req.body.Temperature,

      assurances: resp.assurance,
      boitiers: req.params.idBoitier,
      voitures: resp.voitures,
      clients: resp.clients,
    }, function (err, small) {
      if (err) return handleError(err);
      res.json(small)
    });


  })

});
router.get('/assur/:id_assur', function (req, res, next) {
  console.log("start this route")
  assur.findById(req.params.id_assur).select(client)
    .populate("clients")
    .exec(function (err, data) {
      if (err) throw err
      console.log(data)
      res.json(data);
    });
});

router.put('/table/:cin', function (req, res, next) {
  console.log("start this route")
  table.find({ $and: [{ cin: req.params.cin }, { created_at: { $gte: new Date(req.body.DD) } }, { created_at: { $lte: new Date(req.body.DF) } }] }).exec(function (err, data) {
    if (err) throw err
    console.log(data)
    res.json(data);
  });
});

router.get('/test/:a',function(req, res , next){
  let a=req.params.a
  console.log(a)
});


module.exports = router;
