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
                    
    
                    videos.forEach((e) => {
                        
                        
                        $('#temp').append(`
                            <li>
                                <a href="https://www.youtube.com/embed/${e.id.videoId}?rel=0">
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
        })
    })

})
