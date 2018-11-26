$(document).ready(function(){


    // this will be where we connect with the youtube api
    // just testing to see if it works on github
    
    console.log("12 12 12");
    
    
    function searchYouTube(){
    
        var searchTerm = "chicken alfredo";
        // var limit = 5;
        
        var apiKEY = "&key=AIzaSyDpWKvpsuH5kB8LRiI2KFGL3DdqwW5aC7M"
    
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + searchTerm
        + apiKEY;
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
    
            var results = response.items;
    
            for(var i=0; i< results.length; i++) {
            console.log(results);
    
            
    
            var video = results[i].snippet.thumbnails.default.url;
    
            var resultsDisplayed = $("<img>").attr("src", video);
    
            resultsDisplayed.attr("data-id", results[i].id.videoId);
    
            resultsDisplayed.attr("data-title", results[i].snippet.title);
    
            resultsDisplayed.append(video);
    
            $("#video-space").append("<br>",resultsDisplayed);
            }
    
    
        });
    
    };
    
    $("#submit-button").on("click", function(){
            
        event.preventDefault();
    
        alert("click");
        console.log("click click");
        searchYouTube();
    });
    
    function selectVideo(){
        var imgTitle = $(this).attr("data-title");
    
        var imgId = $(this).attr("data-id");

        var player = $("<iframe>");

        player.css("width", "640");
        player.css("height", "360");
        player.attr("type", "text/html");
        player.attr("id", "ytplayer");
        player.attr("src", "https://www.youtube.com/embed/"+ imgId +"?autoplay=1&origin=https://example.com");
        player.attr("frameborder", "0");
    
        // var player = $("<iframe id='ytplayer' type='text/html' width='640' height='360' src='https://www.youtube.com/embed/'" + imgId + " frameborder='0'></iframe>");
    
        // var player = $("<video width='640' height='360'><source src='https://www.youtube.com/embed/'" + imgId + "></video>");

        $("#video-space").hide();
    
        $("#left-space").append(player);
    
        
    
    
    
        console.log(imgTitle);
    
        console.log(imgId);
    
    };
    
    
    // var player;
    
    // function onYouTubeIframeAPIReady() {
    //   player = new YT.Player('player', {
    //     height: '390',
    //     width: '640',
    //     videoId: 'M7lc1UVf-VE',
    //     events: {
    //       'onReady': onPlayerReady,
    //       'onStateChange': onPlayerStateChange
    //     }
    //   });
    // }
    
    
    
    $(document).on("click", "img", selectVideo);
    
    
    
    
    
    });