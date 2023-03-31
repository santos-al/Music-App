$(function () {
    const
        searchButton = $('#search'),
        lyricsText = $('#lyrics'),
        playMusicButton = $('#play-music'),
        musixMatchKey = '933db136de4c5690257d41e434ec1143',
        youtubeKey = 'AIzaSyBVQsjnNwpI-fOih0uJq-n1KCb1WJTvmh8';
        youtubeURL = ``;

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
            success: data => console.log(data),
            error: err => console.error(err)
        })
    })

})