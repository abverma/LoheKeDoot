console.log('The bot is starting ....');

const Twit = require('twit'),
		configs = require('./config');


let config = configs.apiKeys;

let status = 'pyar karo na robo!';

let T = new Twit(config);

tweet(status);

function tweet(status){
    var tweet = {
      status: status
    }

    T.post('statuses/update', tweet, tweetCallback)

    function tweetCallback(err, data, response) {
      if(err)
        console.log(err)
      else {
        console.log('Moot aaye!');
        console.log(data);
        //console.log(response);
      }  
        
    }
}