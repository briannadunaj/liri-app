var twitter = require("twitter");
var keys = require("./keys.js");

var spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

var userInput1 = process.argv[2];
var userInput2 = process.argv[3];


// my-tweets command function
function tweets() {
	var client = new twitter({
		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret
	});

	var params = {
		screen_name: "p0rtlandia",
		count: 20
	}; 

	client.get("statuses/user_timeline", params, function(err, tweets, response){
		if (err){
			console.log("Error occurred: " + err);
		} else if (!err){
			for (var i = 0; i < tweets.length; i++) {
				console.log("tweet: " + tweets[i].text);
				console.log("created on: " + tweets[i].created_at);
				console.log("===========================================================");
			}
		}
	})
}; // end of tweets function

// spotify function
function getSpotify() {

	var Spotify = new spotify({
		id: keys.spotifyKeys.id,
		secret: keys.spotifyKeys.secret,
	});

	Spotify.search({
		type: "track",
		query: userInput2,
		limit: 1
	}, function(err, data) {
		if (err) {
			console.log("Error occurred: " + err);
		} else if (!err) {
			console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
			console.log("Song name: " + data.tracks.items[0].name);
			console.log("Preview link: " + data.tracks.items[0].uri);
			console.log("Album: " + data.tracks.items[0].album.name);
			console.log("===========================================================");
		}
	})
} // end of spotify function

// movie function
function movie(){
	var queryURL = "http://www.omdbapi.com/?t=" + userInput2 + "&y=&plot=short&apikey=40e9cece";

	request(queryURL, function(err, response, body) {
		if (err){
			console.log("Error occurred: " + err);
		} else if (!err) {
			var JSONResponse = JSON.parse(body);
			console.log("Title: " + JSONResponse.Title);
			console.log("Year: " + JSONResponse.Year);
			console.log("IMDB Rating: " + JSONResponse.imdbRating);
			console.log("Country : " + JSONResponse.Country);
			console.log("Language: " + JSONResponse.Language);
			console.log("Plot: " + JSONResponse.Plot);
			console.log("Actors: " + JSONResponse.Actors);
			console.log("===========================================================");
		}
	})
} // end of movie function

// fs function
function whatItSays(){
	fs.readFile("random.txt", "utf8", function(err, data){
		if (err){
			console.log("Error occurred: " + err);
		} else if (!err) {
			var dataArr = data.split(",");
			//console.log(dataArr);
			userInput1 = dataArr[0];
			userInput2 = dataArr[1];
			getSpotify();
		}
	}) // end of readFile
} // end of what it says function


if (userInput1 === "my-tweets"){
	tweets();
}

if (userInput1 === "spotify-this-song"){

	if (userInput2 === undefined){
		userInput2 = "The Sign, Ace of Base";
		getSpotify();

	} else {
		getSpotify();
	}

}

if (userInput1 === "movie-this"){
	if (userInput2 === undefined){
		userInput2 = "Mr. Nobody";
		movie();

	} else {
		movie();
	}
}

if (userInput1 === "do-what-it-says"){
	whatItSays();
}

