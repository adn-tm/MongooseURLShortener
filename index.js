'use strict';

var Shortener = require('./lib/MongooseURLShortener');
var express = require('express');

module.exports.MongooseURLShortener = Shortener;

 // Prefer a https://github.com/adn-tm/MongooseURLShortener.git module (without of hits)

var express = require('express');

module.exports.setRouter = function(app, connection, config) {
	var urlShotener= new Shortener(connection);
	var router = express.Router();
	var domain = config.domain.replace(/\/$/, "")
	var prefix = (config.tinyUrlPrefix || "z").replace(/^\//, "").replace(/\/$/, "")

	router.get("/:hash", function(req, res, next){
		if (!req.params.hash) return res.status(400).json({status:400, success:false, message:"bookmark hash not defined" });
		var result = urlShotener.resolve(req.params.hash);
		result.then(function(data){
			console.log(data)
		    if (data && data.url) res.redirect(data.url)
		    else next();
		}).fail(function(err){
			console.error(err)
		    next();
		});
	});

	router.post("/", function(req, res, next){
		if (!req.body.url) return res.status(400).json({status:400, success:false, message:"bookmark URL not defined" });

		var promise = urlShotener.shorten(req.body.url, req.body.data || {});
		promise.then(function(bm){
		    res.status(200).json({status:200, success:true, hash: bm.hash, url: domain+"/"+prefix+"/"+bm.hash});
		}).fail(function(err){
		    return res.status(500).json({status:500, success:false, message:"bookmark URL not generated", error:err });
		});
	});

	app.use("/"+prefix, router);
}