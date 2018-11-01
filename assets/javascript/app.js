var gify = {
    topics: ["tigers","gorillas","hawks"],
    populateArea: function(myArray) {
        for (var i = 0; i <= myArray.length-1; i++) {
            var newElm = $("<div>");
            newElm.text(myArray[i]);
            newElm.addClass("tags");
            newElm.on("click", function() {
                $("#gifarea").empty();
                var content = this.textContent;
                var GIFobj = $.get("https://api.giphy.com/v1/gifs/search?q=" + content  +"&api_key=C4vD2rTzNQERymftt8uTanePEkBN0ZEd&limit=5");
                GIFobj.done(function(data) { 
                    for (var j=0; j <= data.data.length-1; j++) {
                        var newGIF = $("<img>");
                        newGIF.attr("src", data.data[j].images.fixed_width_still.url)
                        newGIF.attr("alt", data.data[j].images.fixed_width.url) 
                        newGIF.on("click", function(){
                            var swap = this.src;
                            this.src = this.alt;
                            this.alt = swap;
                        })
                        $("#gifarea").append(newGIF)
                     }
                })
            })
            $("#tagarea").append(newElm);
        }
    }   
}

gify.populateArea(gify.topics);

$("#submit").on("click", function(){
    if ($("#giftext").val().length > 0) {
        gify.populateArea([$("#giftext").val()]);
        $("#giftext").val("");
    }
    
    
})

