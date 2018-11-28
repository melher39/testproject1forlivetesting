$(document).ready(function(){


    // this will be where we connect with the youtube api
    
    // this function will be used to search the YouTube API with the userSearch as its argument
    function searchYouTube(userSearch){
    
        // clear the page of any content in order to load the new results
        // $("#thumbnail-space").empty();
    
        // $("#content-space").empty();

        // Clears the divs prior to displaying the search results
        $("#title-recipe-results").empty();
        $("#title-youtube-results").empty();
        $("#results-display-recipe-api").empty();
        $("#results-display-youtube-api").empty();
    
        // the search term applied to the ajax call is the user's and is being passed through the function
        var searchTerm = userSearch;
        
        // personal API key granted by YouTube
        var apiKEY = "&key=AIzaSyDpWKvpsuH5kB8LRiI2KFGL3DdqwW5aC7M"
    
        // search query to be used
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + searchTerm
        + apiKEY;
    
        // jquery ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
    
        })
       
        // once we have a successful response from the API...
        .then(function(response){
    
            // store the results in a var
            var results = response.items;
    
            // loop through the results for as long as the list of results (5) and do the following...
            for(var i = 0; i < results.length; i++) {
    
            // video snippet will be displayed as a thumbnail
            var video = results[i].snippet.thumbnails.medium.url;
    
            // title of each video respective to the thumbnail
            var videoTitle = results[i].snippet.title;
    
            // dynamically create a new div with the source as the previous thumbnail url
            var resultsDisplayed = $("<img>").attr("src", video);

            // 
            resultsDisplayed.attr("id", "youtube-results")
    
            // retrieve the corresponding video ID and title of the video
            resultsDisplayed.attr("data-id", results[i].id.videoId);
    
            // videoTitle.css()
    
            
    
            // resultsDisplayed.attr("data-title", results[i].snippet.title);
    
            // attach all the previously attained info to the div created earlier
            resultsDisplayed.append(video);

            // display the title identifying the youtube videos
            $("#title-youtube-results").html("<h2>YouTube Video Results</h2>");
    
            // display the thumbnails on the pre-existing div
            $("#results-display-youtube-api").append("<p>", "<h5>"+ videoTitle + "</h5>", "<br>",  resultsDisplayed, "</p>");
            
            }
    
    
        });
    
    };
    
    // code to be run when the user clicks the search button
    $("#submit-button").on("click", function(){
            
        // prevent the form from reloading the page
        event.preventDefault();
    
        // store the user input search term in a var and eliminate any whitespace before and after the term
        var userSearch = $("#keyword-input").val().trim();
    
        console.log("this is the term " + userSearch);
    
        // initiate the searchYouTube function and pass through the userSearch var as an argument
        searchYouTube(userSearch);
    });
    
    // this function will display the youtube video on the page
    function selectVideo(){
        // Clears the divs prior to displaying the search results
        $("#title-recipe-results").empty();
        $("#title-youtube-results").empty();
        $("#results-display-recipe-api").empty();
        $("#results-display-youtube-api").empty();

        // retrieve the data-title attribute from the thumbanil being clicked and store it
        // var imgTitle = $(this).attr("data-title");
    
        // retrieve the data-id attribute from the thumbnail being clicked and store it
        var imgId = $(this).attr("data-id");
    
        // dynamically create a new iframe element
        var player = $("<iframe>");
    
        // add width and height specifications to the video player
        player.css("width", "640");
        player.css("height", "360");
    
        //add an id, type, source and frameborder attibute to the video player 
        player.attr("type", "text/html");
        player.attr("id", "ytplayer");
    
        // the video being displayed will have the imgId as its videoId
        player.attr("src", "https://www.youtube.com/embed/"+ imgId +"?autoplay=1&origin=https://example.com");
        player.attr("frameborder", "0");
    
        // var player = $("<iframe id='ytplayer' type='text/html' width='640' height='360' src='https://www.youtube.com/embed/'" + imgId + "'?autoplay=1&origin=http://example.com' frameborder='0'></iframe>");
    
        // var player = $("<iframe id='ytplayer' type='text/html' width='640' height='390' src='https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com' frameborder='0' ></iframe>")
    
        // var player = $("<video width='640' height='360'><source src='https://www.youtube.com/embed/" + imgId + "'></video>");
        
        // hide the video thumbnails list
        // $("#thumbnail-space").empty();
       
    
        // display the video on the left side of the screen
        $("#results-display-recipe-api").append(player);
    
        
        // console.log(imgTitle);
    
        console.log(imgId);
    
        console.log("this " , player);
    
    };
    
    
    // since the video thumbnails will be dynamically created, then add an on-click function to 
    // the img element tag and run the selectVideo function
    $(document).on("click", "#youtube-results", selectVideo);
    
    
    });