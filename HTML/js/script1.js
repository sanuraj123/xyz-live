$(function(){
    $('#search-form').submit(function(e){
        e.preventDefault();
    });
});

function search(){
    // Clear results
    $('#results').html('');
    $('#buttons').html('');
    $('#play-video').html('');
    // Get Form inputs
    q = $('#query').val();
    //run Get Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part:'snippet,id',
            q:q,
            maxResults:30,
            type:'video',
            key:'AIzaSyCHgD7su68j33MQ7FCDB-9I5GfgUufH3Ac'},
        function(data){
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;
            console.log(data);
            $.each(data.items, function(i,item){
                var output = getOutput(i,item);
                //Display results
                $('#results').append(output);
                $('#item' + i + '').click(function(){
                    //var vidid = $('#vdid' + i + '').text();
                    //alert(vidid);
                    playVideo();
                });
            });
        }
    );
}

function getOutput(i,item){
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var channelTitle = item.snippet.channelTitle;
    var thumb = item.snippet.thumbnails.high.url;
    var videoDate = item.snippet.publishedAt;
    
    //  Creating output
    var output = '<div id="item'+ i +'" onclick="playVideo()"><li>' + 
        '<div class="list-left" ><img src="'+thumb+'"></div>'+
        '<div class="list-right" >'+
        '<h3>' + title + '</h3>'+
        '<small>By : '+ channelTitle + ', On : ' + videoDate + '</small>'+
        '<p id="vdid'+ i +'" >'+ videoId +'</p>'+
        '<p class="description" >'+ description +'</p>'+
        '</div>'+
        '</li></div>'+
        '<div class="clearfix"></div>'+
        '';
    
    return output;
    
     
}

function playVideo(){
    var vidid = $("#vdid0").html()
    $('#play-video').html('');
    var iframe = '<iframe width="854" height="480" src="https://www.youtube.com/embed/'+ vidid +'?rel=0&autoplay=1" frameborder="0" allow="autoplay"'+ 'allowfullscreen></iframe>';
    $('#play-video').append(iframe);
    
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
                var output = getOutput(i,item);
                //Display results
                $('#results').append(output);
                $('#item' + i + '').click(function(){
                    var vidid = $('#vdid' + i + '').text();
                    //alert(vidid);
                    playVideo();
                })
            });
        }
    );
    

}








