$(function () {
    const
        searchButton = $('#search'),
        lyricsText = $('#lyrics'),
        playMusicButton = $('#play-music'),
        musixMatchKey = '933db136de4c5690257d41e434ec1143',
        youtubeKey = 'AIzaSyBVQsjnNwpI-fOih0uJq-n1KCb1WJTvmh8';
        youtubeURL = ``;
        // videoURL = `https://www.youtube.com/watch?v=${videoID}`,
        // videoID = videoURL.split('=')[1];
        

    // Button click event to search for tracks which also grabs the users input text value
    searchButton.click((e) => {
        e.preventDefault() 
        const inputValue = $('#input-value').val()
        youtubeURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${inputValue}l&key=${youtubeKey}`

    // Begin Youtube API    
        $.ajax({
            url: youtubeURL,
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

                    
    
                    videos.forEach((e) => {
                        $('#temp').append(`
                            <li>
                                <img src="${e.snippet.thumbnails.default.url}">
                                    <div>
                                        <h5>${e.snippet.title}</h5>
                                        <p>${e.snippet.description}</p>
                                    </div>    
                            </li>
                        `)
                    })
                    console.log(images)

            },
            error: err => console.error(err)
        })
    })

})




