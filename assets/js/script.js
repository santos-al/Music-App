
$(function () {
    const
        searchButton = $('#search'),
        lyricsText = $('#lyrics'),
        playMusicButton = $('#play-music'),
        iFrame = $('#iframe'),
        omdbKey = '30150689'
        youtubeKey = 'AIzaSyBVQsjnNwpI-fOih0uJq-n1KCb1WJTvmh8';

    // Button click event to search for tracks which also grabs the users input text value
    searchButton.click((e) => {
        e.preventDefault() 
        const inputValue = $('#input-value').val();

    // Begin Youtube API    
        $.ajax({
            url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${inputValue}&key=${youtubeKey}`,
            method: 'GET',
            dataType: 'json',
            data: {
                type: 'video',
                videoEmbeddable: true
            },
            success: (data) => {
                const
                    videos = data.items,
                    images = data.items[0].snippet.thumbnails;
                    
                    console.log(data)
                    
                    $(".search-element").remove();
                        $("#temp").removeClass("hidden");
                    videos.forEach((e) => {
                        
                        
                        $('#temp').append(`
                            <li class="search-element">
                            <a>
                                <img src="${e.snippet.thumbnails.default.url}">
                                    <div>
                                        <h5>${e.snippet.title}</h5>
                                        <p>${e.snippet.description}</p>
                                    </div>
                                </a>    
                            </li>
                        `)
                        // Plays 1st video from the search results
                        iFrame.attr('src', `https://www.youtube.com/embed/${data.items[0].id.videoId}?rel=0`)
            
                    })
                    

            },
            error: err => console.error(err)
        });


        //  Searches for a movie title and returns (Actors, Awards, Box Office, Director, Genre, Rated, Release date, IMDB rating, other ratings, plot, meta score, run time)
          $.ajax({
              url: `http://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&t=${inputValue}`,
              method: 'GET',
              dataType: 'json',
              data: 'json',

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

            console.log(data);

            $('#lyrics').append(`
                <h3>${title}</h3>
                <p>Directed by ${director} and starring ${actors}</p>
                <p>${title} is about ${plot}. With a run time of ${runTime}</p>
                <p>First released on ${releaseDate}</p>
            `)
      
          },
          error: err => console.error(err)

          })
    })
    $(document).click((e) => {
        if ($(e.target).is("#search")) {
            return;
        }
        $("#temp").addClass("hidden");
    });
})
