console.log('The bot is starting ....');

const Twit = require('twit'),
		config = require('./config').apiKeys;


let T = new Twit(config);
let param = { q: 'Modi since:2016-07-11', count: 10 };

// search tweets with contents in param
//T.get('search/tweets', param, searchCallback);

function searchCallback(err, data, response) {
  if(err)
  	console.log('Something went wrong!');

  let statuses = data.statuses;
  let tweets = null;
  if(statuses)
  		statuses
  		 	.map(x => x.text)
  		 	.forEach(tweet => {
  		 		console.log(tweet);
  		 		console.log();
  		 	})  
};

//get tweet by id
T.get('statuses/show',{id: "780493462130917376"}, function(err, data, response){
	if(err)
		console.log(err);
	else {
		console.log(data.text);
	}
})