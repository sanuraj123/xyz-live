$(function(){
    $('#search-form').submit(function(e){
        e.preventDefault();
    });
});

function search(){
    // Clear results
    $('#results').html('');
    $('#buttons').html('');
    // Get Form inputs
    q = $('#query').val();
    //run Get Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part:'snippet,id',
            q:q,
            maxResults:5,
            type:'video',
            key:'AIzaSyCHgD7su68j33MQ7FCDB-9I5GfgUufH3Ac'},
        function(data){
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;
            console.log(data);
            $.each(data.items, function(i,item){
                var output = getOutput(item);
                //Display results
                $('#results').append(output);
            });
        }
    );
}

function getOutput(item){
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var channelTitle = item.snippet.channelTitle;
    var thumb = item.snippet.thumbnails.high.url;
    var videoDate = item.snippet.publishedAt;
    
    //  Creating output
    var output = '<a href="" ><div id="item"><li>' + 
        '<div class="list-left" ><img src="'+thumb+'"></div>'+
        '<div class="list-right" >'+
        '<h3>' + title + '</h3>'+
        '<small>By : '+ channelTitle + ', On : ' + videoDate + '</small>'+
        '<p id="vdid" >'+ videoId +'</p>'+
        '<p class="description" >'+ description +'</p>'+
        '</div>'+
        '</li></div></a>'+
        '<div class="clearfix"></div>'+
        '';
    
    return output;
    
     
}

function playVideo(){
    // Clear results
    $('#results').html('');
    $('#buttons').html('');
    $('#play-video').html('');
    
    $('#play-video').append(function(){
        
    });
    
    // Get Form inputs
    q = $('#query').val();
    //run Get Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part:'snippet,id',
            q:q,
            maxResults:5,
            type:'video',
            key:'AIzaSyCHgD7su68j33MQ7FCDB-9I5GfgUufH3Ac'},
        function(data){
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;
            console.log(data);
            $.each(data.items, function(i,item){
                var output = getOutput(item);
                //Display results
                $('#results').append(output);
            });
        }
    );
}






