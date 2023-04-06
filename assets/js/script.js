
$(function () {
    const
        searchButton = $('#search'),
        lyricsText = $('#lyrics'),
        playMusicButton = $('#play-music'),
        iFrame = $('#iframe'),
        musixMatchKey = '933db136de4c5690257d41e434ec1143',
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
        $(document).click((e) => {
            if ($(e.target).is("#search")) {
                return;
            }
            $("#temp").addClass("hidden");
        });

            // temporary variable until search by artist is available
            var artistName = 'Adele'

          // Searches for a song using the artist and song name and returns a the 'common track id'
          $.ajax({
              url: `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/matcher.track.get?q_artist=${artistName}&q_track=${inputValue}&apikey=${musixMatchKey}`,
              method: 'GET',
              dataType: 'json',
              data: 'json',

          success: (data) => {

              var commontrackId = data.message.body.track.commontrack_id;

              // Returns song lyrics using the 'common track id'
              $.ajax({
                  url: `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=${commontrackId}&apikey=${musixMatchKey}`,
                  method: 'GET',
                  dataType: 'json',
                  data: 'json',

              success: (data) => {
                  var songLyrics = data.message.body.lyrics.lyrics_body;

                  $('#lyrics').append(`<p>${songLyrics}</p>`);


              },
              error: err => console.error(err)
              })
          },
          error: err => console.error(err)
      
          })

          })

})