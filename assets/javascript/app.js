var gify = {
    topics: ["tigers","gorillas","hawks"],
    more: 10,
    currentTag: "",
    populateArea: function() {
        for (var i = 0; i <= gify.topics.length-1; i++) {
            var newElm = $("<div>");
            newElm.text(gify.topics[i]);
            newElm.addClass("tags");
            newElm.on("click", function() {
                $("#gifarea").empty();
                var content = this.textContent;
                var GIFobj = $.get("https://api.giphy.com/v1/gifs/search?q=" + content  +"&api_key=C4vD2rTzNQERymftt8uTanePEkBN0ZEd&limit=10");
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
                    gify.currentTag = content;
                    gify.more = 10;   
                })
            })
            $("#tagarea").append(newElm);
        }
    }   
}

gify.populateArea();

$("#submit").on("click", function(){
    if ($("#giftext").val().length > 0) {
        $("#tagarea").empty();
        gify.topics.push($("#giftext").val());
        gify.populateArea();
        $("#giftext").val("");
    }
})

$("#more").on("click", function(){
    
    var GIFobj = $.get("https://api.giphy.com/v1/gifs/search?q=" + gify.currentTag  +"&api_key=C4vD2rTzNQERymftt8uTanePEkBN0ZEd&limit="+String(gify.more+10));
    GIFobj.done(function(data) { 
       console.log(gify.more)
       console.log(data.data.length)
        for (var j=gify.more; j <= data.data.length-1; j++) {
            console.log(j)
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
        gify.more += 10;
    })
    
})
