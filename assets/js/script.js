$(function () {
  const searchButton = $("#search"),
    movieDetails = $("#movie-details"),
    iFrame = $("#iframe"),
    textInput = $("#input-value"),
    omdbKey = "30150689",
    youtubeKey = "AIzaSyBVQsjnNwpI-fOih0uJq-n1KCb1WJTvmh8";

  $(document).ready(() => {
    const placeholderMovieTitle = "Shrek";
    const placeholderMovieForSearch = "Shrek" + " trailer";

    getMovieInformation(
      placeholderMovieForSearch,
      placeholderMovieTitle,
      false
    );
  });

  // Button click event to search for tracks which also grabs the users input text value
  searchButton.click((e) => {
    e.preventDefault();
    const inputValue = $("#input-value").val() + " trailer";
    const inputValueForOmdb = $("#input-value").val();

    getMovieInformation(inputValue, inputValueForOmdb, true);
  });

  textInput.keypress((e) => {
    var key = e.which;
    if (key === 13) {
      searchButton.click();
    }
  });

  $(document).click((e) => {
    if ($(e.target).is("#search")) {
      return;
    }
    $("#temp").addClass("hidden");
  });

  function getMovieInformation(
    inputValue,
    inputValueForOmdb,
    shouldPopUpMovieDetails
  ) {
    // Begin Youtube API
    $.ajax({
      url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${inputValue}&key=${youtubeKey}`,
      method: "GET",
      dataType: "json",
      data: {
        type: "video",
        videoEmbeddable: true,
      },
      success: (data) => {
        const videos = data.items,
          images = data.items[0].snippet.thumbnails;

        if (shouldPopUpMovieDetails) {
          popUpMovieDetails(videos, images);
        }

        // Plays 1st video from the search results
        iFrame.attr(
          "src",
          `https://www.youtube.com/embed/${data.items[0].id.videoId}?rel=0`
        );
      },
      error: (err) => console.error(err),
    });

    //  Searches for a movie title and returns (Actors, Awards, Box Office, Director, Genre, Rated, Release date, IMDB rating, other ratings, plot, meta score, run time)
    $.ajax({
      url: `http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&t=${inputValueForOmdb}`,
      method: "GET",
      dataType: "json",
      data: "json",

      success: (data) => {
        // Variables to display on the pag
        var title = data.Title;
        var actors = data.Actors;
        var releaseDate = data.Released;
        var awards = data.Awards;
        var boxOffice = data.BoxOffice;
        var director = data.Director;
        var genre = data.Genre;
        var rated = data.Rated;
        var imdbRating = data.imdbRating;
        var plot = data.Plot;
        var runTime = data.Runtime;
        var rottenTomatoesRating = data.Ratings[1].Value;
        var metaCriticRating = data.Ratings[2].Value;

        movieDetails.html(""); // Resets previous movie details

        $(movieDetails).html(`
    
                <h3 id="movieTitle">${title}</h3>
                <p class="movieDetailsText">Rated: ${rated}</p>
                <p class="movieDetailsText">First released on ${releaseDate}, ${title} has a runtime of ${runTime}.</p>
                <p class="movieDetailsText">Directed by ${director} and starring ${actors}</p>
                <p class="movieDetailsText">${awards}, and a box office of ${boxOffice}</p>
                <p class="movieDetailsText">${plot}</p>
                <h4 id="movieReviews">Movie Reviews: </h4>
                <p class="movieDetailsText">Rotten Tomatoes: ${rottenTomatoesRating}</p>
                <p class="movieDetailsText">Metacritc: ${metaCriticRating}</p>
                <p class="movieDetailsText">IMDB: ${imdbRating}</p>
            `);
      },
      error: (err) => console.error(err),
    });
  }

  function popUpMovieDetails(videos, images) {
    $(".search-element").remove();
    $("#temp").removeClass("hidden");
    videos.forEach((e) => {
      const videoId = e.id.videoId;

      $("#temp").append(`
                <li class="search-element" data-video-id="${videoId}">
                <a>
                    <img src="${e.snippet.thumbnails.default.url}">
                        <div>
                            <h5>${e.snippet.title}</h5>
                            <p>${e.snippet.description}</p>
                        </div>
                    </a>    
                </li>
            `);
      // This allows you to click on a video in the list so it gets sent into the iFrame
      $(`[data-video-id="${videoId}"]`).click(() => {
        iFrame.attr("src", `https://www.youtube.com/embed/${videoId}?rel=0`);
      });
    });
  }
});
