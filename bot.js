
//Runs when bot is started up
console.log("Twitter bot initialized");

//Initializes my variables
var Twit = require('twit');
var Config = require('./config');
var T = new Twit(Config);
var stream = T.stream('user');





stream.on('follow', function(data){
  var screenname = data.source.screen_name;
  console.log(screenname + "followed you");
  postit(screenname);
});

stream.on('unfollow', function(data){
  console.log("someone unfollowed");
  console.log(data);
});

stream.on('connected', function (response) {
  console.log("connected to twtter");
});








//this is to post the tweet saying status
function postit(name){
  var random = Math.floor(Math.random()*100);
  var nametopost = name;

  var topost = {
    status: "@" + nametopost + " thanks for following me!" + " This is your random number from 0-100: " +  random
  };

  T.post('statuses/update', topost, function(err, data, response) {
    if(err){
      console.log("tweet send failed");
    }else{
      console.log("tweet sent successfully");
      console.log("tweet was" + topost.status);
    }
  });
}


