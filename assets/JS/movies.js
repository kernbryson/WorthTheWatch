var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

var getTrailerLink = function(myId){

var apiUrl = "https://imdb-api.com/en/API/Trailer/k_w0qs6e0f/" + myId;
fetch(apiUrl)
.then((response) => response.json())
.then((data) => {
  console.log(data);
  console.log("You clicked" + data.fullTitle);
//   errorMessage: ""
// fullTitle: "The Suicide Squad (2021)"
// imDbId: "tt6334354"
// link: "https://www.imdb.com/video/vi1024573465"
// linkEmbed: "https://www.imdb.com/video/imdb/vi1024573465/imdb/embed"
// thumbnailUrl: "https://m.media-amazon.com/images/M/MV5BNWEyNGE0NTAtMWIzNy00MmE5LWEzYTYtOGZmMTZkZDBiZDdhXkEyXkFqcGdeQWpnYW1i._V1_.jpg"
// title: "The Suicide Squad"
// type: "Movie"
// uploadDate: null
// videoDescription: "Our only hope to save the world is a bunch of supervillains -- what could go wrong? Check out the new trailer for James Gunn&apos;s &apos;The Suicide Squad,&apos; in theaters and streaming exclusively on HBO Max August 6."
// videoId: "vi1024573465"
// videoTitle: "Official &quot;Rain&quot; Trailer"
// year: "2021"
})  
.catch(() => console.log("Error")); 
};

var id = getUrlParameter('id');
console.log("You clicked" + id);
getTrailerLink(id);