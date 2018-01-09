var topics = [
    "Rio de Janeiro, Brazil",
    "Istanbul, Turkey",
    "Lisbon, Portugal",
    "Florence, Italy",
    "Normandy, France",
    "Chefchaouen, Morocco",
    "Amsterdam",
    "Cape Town, South Africa",
    "Bruges, Belgum",
    "Seattle, Washington",
    "Vatican City",
    "Saint Petersburg, Russia",
    "Kyoto, Japan",
    "Havana, Cuba",
    "Salzburg, Austria",
    "Buenos Aires, Argentina",
    "Prague, Czech Republic",
    "Seville, Spain",
    "Washington, DC",
    "Edinburgh, Scotland",
    "Budapest, Hungary",
    "San Francisco, California",
    "New York, New York",
    "Lucerne, Switzerland",
    "Mumbai, India"
];

console.log(topics);
//Show the buttons
function renderBtns() {
    $("#cities-view").empty();

    //Loop through the array of topics
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("cities");
        a.addClass("waves-effect waves-light btn")
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#cities-view").append(a);
    }
}

$("#add-city").on("click", function (event) {
    event.preventDefault();
    //Grab the new city from the input box
    var cities = $("#cities-input").val().trim();
    topics.push(cities);
    console.log(topics);
    $("#cities-input").empty();

    renderBtns();

});
renderBtns();


var apiKey = "WrtVFWvKIUD0Gm201ig9k832EnKKQ37z";

$("#cities-view").on("click", ".cities", function () {
    $("#citiesGifs").empty();
    //"this" = button clicked
    var city = $(this).attr("data-name");

 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        city + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // data returned
        .done(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;

            // 4 loop
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r") {
                    // new dic for new class=item
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);
                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;
                    var cityImage = $("<img>");
                    // giving attributes to image
                    cityImage.attr("src", still);
                    cityImage.attr("data-still", still);
                    cityImage.attr("data-animated", animated);
                    cityImage.attr("data-state", "still");
                    cityImage.addClass("moveImage");

                    //append
                    gifDiv.append(p);
                    gifDiv.append(cityImage);

                    //prepend
                    $("#citiesGifs").prepend(gifDiv);
                }
            }
          
        });

    
    $("#citiesGifs").unbind().on("click", ".moveImage", function () {
        var state = $(this).attr("data-state");
        //Check for current state and change it after the click
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animated"));
            $(this).attr('data-state', 'animated');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }
       
    });
});