
// Setup an array of various Rick & Morty characters, leaving some obvious ones out so that users can add them (e.g.: Rick Sanchez, Morty Smith)
topics = ["Jerry Smith", "Pickle Rick", "Mr. Meeseeks", "Krombopulos Michael", "Mr. Poopybutthole", "Ants-In-My-Eyes Johnson" ];

//setup variables
var gifURL;
var stillURL;
var rating;

// Setup a div to house all the buttons
var btnSection = $("<section>");
btnSection.attr("id", "btnSection")
$("#addCharacter").before(btnSection);

renderButtons() 

// Render buttons 
function renderButtons() {
	btnSection.empty();
	// Build a button for each item in topics
	for (i = 0; i < topics.length; i++){
		var button = $("<button>").val(topics[i]);
		button.addClass("button");
		button.text(topics[i]);
		btnSection.append(button);
	};
};

// Setup a div to house all the gifs
var gifSection = $("<section>");
gifSection.attr("id", "gifSection")
$("#wrapper").append(gifSection);

// Listener for button clicks
$(document).on("click", ".button", displayGif);

// display Gif function
function displayGif() {
	// clear out the #gifSection
	$("#gifSection").empty();

	// using the button value, begin setting up the API queryURL
    var btnVal = $(this).val();
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=NI5FKdZukPF0w5GPzZvH4UPQ2fTU7C1y&q=" + btnVal + "&limit=10&offset=0&lang=en";

    // Creating an AJAX call for the specific character button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
		
    	// setup a loop to return 10 instances of the responses
    	for (i = 0; i < 9; i++) {

			// setup variables to store each piece of the API object 
			gifURL = response.data[i].images.fixed_height.url;
			stillURL = response.data[i].images.fixed_height_still.url;
			rating = response.data[i].rating;

			console.log(gifURL + " " + stillURL + " " + rating);

			// print the responses to the screen
			// build a new div to house the gif & rating
			var newDiv = $("<div>");
			//assign it a "gif" class
			newDiv.addClass("gif");
			//add a new still-url attribute w/ the stillURL value
			newDiv.attr("still-url", stillURL);
			//add a new gif-url attribute w/ the gifURL value
			newDiv.attr("gif-url", gifURL);
			//add a new data attribute w/ the still value
			newDiv.attr("data", "still");
			//add an img src & add it to the div
			var img = $("<img>");
			img.attr("src", stillURL);
			img.attr("alt", "Giphy of " + btnVal);
			newDiv.append(img);
			var p = $("<p>");
			p.text("Rating: ");
			newDiv.append(p);
			p.append(rating.toUpperCase());
			$("#gifSection").append(newDiv);
		}
    });
}

//Listener for giphy clicks & switch to gifURL
$(document).on("click", ".gif", function() {
	if ($(this).attr("data") === "still" ) {
		$(this).children("img").attr("src", $(this).attr("gif-url"));
		$(this).attr("data", "giphy");
	} else {
		$(this).children("img").attr("src", $(this).attr("still-url"));
		$(this).attr("data", "still");
	};
});

//Listen for a click on the submit new character button
$("#add").on("click", function() {
	// prevent submit button from refreshing page
	event.preventDefault();
	// push the #new-name input's value to the topics[]
	var newName = $("#new-name").val();
	topics.push(newName);
	console.log(topics[topics.length - 1]);
	renderButtons();
	$("#new-name").val('');
})




