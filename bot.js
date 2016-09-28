console.log('The bot is starting ....');

const Twit = require('twit'),
	configs = require('./config'),
	fs = require('fs');


let config = configs.apiKeys;
let followResponses = configs.followResponses;
let statuses = configs.statuses;


let T = new Twit(config);

// Setting up a user stream
let userStream = T.stream('user');


// Anytime someone follows me
userStream.on('follow', followed);


userStream.on('favorite', function(eventMsg){
  console.log(eventMsg.source.screen_name);
  console.log('Favorited!');
})

// Anytie someone tweets to me
userStream.on('tweet', function(eventMsg){
  
  let replyToStatus = eventMsg.id_str;
  let replyTo = eventMsg.in_reply_to_screen_name;
  let txt = eventMsg.text;
  let from = eventMsg.user.screen_name;

  console.log(replyTo + ' ' + from);
  if(replyTo === 'GadheKahiKe'){
    fs.writeFile('output.json', JSON.stringify(eventMsg, null, 2));
    let newTweet = '@' + from + " I'll get back to you after my power nap.";
    if(txt.includes('?'))
      newTweet = '@' + from + " Can you repeat the question?";
    tweet(newTweet, replyToStatus);
  }
})

tweet('Hola, NerdMigos!');
// Daily status updates
setInterval(dailyStatusUpdate, 24*60*60*1000);
  
let userForStatusSearch = {
  screen_name: 'GadheKahiKe',
  count: 1,
  exclude_replies: true,
  include_rts: false
}

// Get users tweets
//T.get('statuses/user_timeline')

function dailyStatusUpdate(){
  let random = Math.floor(Math.random()*10) % statuses.length;
  tweet(statuses[random])
}

// Callback for follow event
function followed(eventMsg){
  let name = eventMsg.source.name;
  let screenName = eventMsg.source.screen_name;
  let random = Math.floor(Math.random()*10) % followResponses.length;

  tweet('@' + screenName + ' ' + followResponses[random]);
}
 
// Callback for tweet event
function tweet(status, replyTo){
    let tweet = {
      status: status,
      in_reply_to_status_id: replyTo
    }
    
    T.post('statuses/update', tweet, tweetCallback)

    function tweetCallback(err, data, response) {
      if(err)
        console.log(err)
      else
        console.log('Moot aaye!');
    }
}
