###MongooseURLShortener

Please Share on Twitter if you like #MongooseURLShortener

<a href="https://twitter.com/intent/tweet?hashtags=MongooseURLShortener&amp;&amp;text=Check%20out%20this%20repo%20on%20github&amp;tw_p=tweetbutton&amp;url=https%3A%2F%2Fgithub.com%2Fdropshape&amp;via=dropshape" style="float:right">
<img src="https://raw.github.com/dropshape/MongooseURLShortener/master/twittershare.png">
</a>

A simple URL Shortening library for NodeJS using [Promises/A+](http://promises-aplus.github.io/promises-spec/) results.

####Installation

    npm install mongoose-url-shortener --save

####API
    var Shortener = require("mongoose-url-shortener");
    //Setup Mongoose
    var connection = require('mongoose').connect('mongodb:testing');
    //Initialize Shortener
    var urlShotener = new Shortener.MongooseURLShortener(connection, options);



#####Options
    {
        seed:12345,
        schema: {
            customSchemaValue:Number,
            customSchemaObj:{}
        },
        hits: true // include and calculate hits per link, default is false
    }

####Use as Express router

 var Shortener = require("mongoose-url-shortener");
 var express=require('express');
 var connection = require('mongoose').connect('mongodb:testing');
 
 .....
    var app = express();
    Shortener.setRouter(app, connection, {
        domain: "http://path.to.this.domian",
        tinyUrlPrefix: "/z" , // "/z" is default value
    })

    This func add 2 routes:
        GET http://path.to.this.domian/z/:hash route for decoding short URL
            It does 301 redirection to decoded URL
        POST http://path.to.this.domian/z route for encoding short URL
            JSON body must be an object {"url": "http://path.to.this.domian/readl/long/url/adress#with_long_hash"}

**Seed**
Optional value to use for generating short url's. You must always use the same seed otherwise you will not be able to resolve short urls' back to their original url.

**Schema**
Optional schema properties for the Mongoose object. You can then pass the extra values you define here to be saved along with the URL when shortening or resolving

#####Shorten
Shorten will either create a new short url in your database or resolve to a previously shortened URL.

    url = 'http://www.google.com';
    data = { 'any data you want to record with the short url' : true }
    var promise = urlShortener.shorten(url, data);
    promise.then(function(url){
        console.log(url.hash);
        //aGasjn1Ho
    }).fail(function(err){
        console.error('Error creating short url', err);
    });

#####Resolve
Resolve will return the original URL before shortening if one is available in the database.

    hash = 'aGasjn1Ho';
    data = {ip:'127.0.0.1'};
    var result = urlShotener.resolve(hash, data);
    result.then(function(url){
    console.log(url );
    // { 
    //    type: 'MongooseURLShortener', 
    //    url: 'http://www.google.com', 
    //    hash:'aGasjn1Ho',
    //    hits:{
    //        {ip:'127.0.0.1},
    //        {ip:'127.0.0.1},
    //    },
    //    totalHits: 2
    //}
    }).fail(function(err){});

**data** is an optional object you would like to be saved with each resolution of a URL and can be used for such things
as analytics tracking.

Check out [NodeTinyUrl](https://github.com/dropshape/NodeTinyUrl) for a working implementation

Please Share on Twitter if you like #MongooseURLShortener

<a href="https://twitter.com/intent/tweet?hashtags=MongooseURLShortener&amp;&amp;text=Check%20out%20this%20repo%20on%20github&amp;tw_p=tweetbutton&amp;url=https%3A%2F%2Fgithub.com%2Fdropshape&amp;via=dropshape" style="float:right">
<img src="https://raw.github.com/dropshape/MongooseURLShortener/master/twittershare.png">
</a>
