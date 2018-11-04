var gify = {
    topics: ["tigers","gorillas","hawks"],
    more: 10,
    currentTag: "",
    favorites: [],
    makeCookie: function() {
        var tempTXT = "";
        for (var i = 0; i < gify.favorites.length; i++) {
            tempTXT += gify.favorites[i] + ",";
        }
        var d = new Date();
        d.setTime(d.getTime() + (14*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        var expiration = "; expires=Thu, 18 Dec 2018 12:00:00 UTC"
        document.cookie = tempTXT + "; expires=" + expires;
    },
    getCookie: function() {
        var cookies = document.cookie;
        if (cookies == "") {

        } else if (cookies.isArray =="Array") {
            var splitcookie = cookies.split(";");
            gify.favorites = splitcookie[0].split(",");
        }
    },
    makeFavorites: function() {
        var newElm = $("<div>");
        newElm.text("Favorites");
        newElm.addClass("tags");
        newElm.on("click", function(){
            $("#gifarea").empty();
            for (var j=0; j < gify.favorites.length; j++) {
                var newGIF = $("<img>");
                newGIF.attr("src", gify.favorites[j])
                var convertStill = gify.favorites[j].substring(0,gify.favorites[j].indexOf("_s.gif")) + ".gif"
                newGIF.attr("data-move", convertStill)
                newGIF.attr("data-still", gify.favorites[j])
                newGIF.attr("data-state", "still")
                newGIF.on("click", function(){
                    if ($(this).attr("data-state")== "still") {
                        $(this).attr("data-state", "move")
                        this.src = $(this).attr("data-move")
                    } else if ($(this).attr("data-state")== "move"){
                        $(this).attr("data-state", "still")
                        this.src = $(this).attr("data-still")
                    }
                })
                var newDiv = $("<div>").addClass("cont");
                var newBtn = $("<button>").text("Add Favorite");
                var downBtn = $("<button>").text("Download");
                newBtn.addClass("btn");
                downBtn.addClass("btn");
                newBtn.on("click", function(){
                    var link = this.parentElement.children[0].getAttribute("data-still");
                    if (gify.favorites.indexOf(link) < 0) {
                        gify.favorites.push(link);
                        gify.makeCookie();
                        $(this).text("Remove Favorite")
                    } else {
                        var dump = gify.favorites.splice(gify.favorites.indexOf(link));
                        $(this).text("Add Favorite")
                    }
            })
            newDiv.append(newGIF);
            newDiv.append(newBtn);
            newDiv.append(downBtn);
            $("#gifarea").append(newDiv)    
            }
        });
        $("#tagarea").append(newElm);
    },
    makeGif: function(response) {
        for (var j=0; j <= response.length-1; j++) {
            var newGIF = $("<img>");
            newGIF.attr("src", response[j].images.fixed_width_still.url)
            newGIF.attr("data-move", response[j].images.fixed_width.url)
            newGIF.attr("data-still", response[j].images.fixed_width_still.url)
            newGIF.attr("data-state", "still")
            newGIF.on("click", function(){
                if ($(this).attr("data-state")== "still") {
                    $(this).attr("data-state", "move")
                    this.src = $(this).attr("data-move")
                } else if ($(this).attr("data-state")== "move"){
                    $(this).attr("data-state", "still")
                    this.src = $(this).attr("data-still")
                }
            })
            var newDiv = $("<div>").addClass("cont");
            if (gify.favorites.indexOf(newGIF.attr("data-still")) >= 0) {
                var newBtn = $("<button>").text("Remove Favorite")
            } else {
                var newBtn = $("<button>").text("Add Favorite");
            }
            var downBtn = $("<button>").text("Download");
            newBtn.addClass("btn");
            downBtn.addClass("btn");
            newBtn.on("click", function(){
                var link = this.parentElement.children[0].getAttribute("data-still");
                if (gify.favorites.indexOf(link) < 0) {
                    gify.favorites.push(link);
                    gify.makeCookie();
                    $(this).text("Remove Favorite")
                } else {
                    var dump = gify.favorites.splice(gify.favorites.indexOf(link));
                    $(this).text("Add Favorite")
                }
            })
            newDiv.append(newGIF);
            newDiv.append(newBtn);
            newDiv.append(downBtn);
            $("#gifarea").append(newDiv)
        }
    },
    makeMore: function(response){
        for (var j=gify.more; j <= response.length-1; j++) {
            console.log(j)
            var newGIF = $("<img>");
            newGIF.attr("src", response[j].images.fixed_width_still.url)
            newGIF.attr("data-move", response[j].images.fixed_width.url)
            newGIF.attr("data-still", response[j].images.fixed_width_still.url)
            newGIF.attr("data-state", "still")
            newGIF.on("click", function(){
                if ($(this).attr("data-state")== "still") {
                    $(this).attr("data-state", "move")
                    this.src = $(this).attr("data-move")
                } else if ($(this).attr("data-state")== "move"){
                    $(this).attr("data-state", "still")
                    this.src = $(this).attr("data-still")
                }
            })
            var newDiv = $("<div>").addClass("cont");
            var newDiv = $("<div>").addClass("cont");
            if (gify.favorites.indexOf(newGIF.attr("data-still")) >= 0) {
                var newBtn = $("<button>").text("Remove Favorite")
            } else {
                var newBtn = $("<button>").text("Add Favorite");
            }
            var downBtn = $("<button>").text("Download");
            newBtn.addClass("btn");
            downBtn.addClass("btn");
            newBtn.on("click", function(){
                var link = this.parentElement.children[0].getAttribute("data-still");
                if (gify.favorites.indexOf(link) < 0) {
                    gify.favorites.push(link);
                    gify.makeCookie();
                    $(this).text("Remove Favorite")
                } else {
                    var dump = gify.favorites.splice(gify.favorites.indexOf(link));
                    $(this).text("Add Favorite")
                }
            })
            newDiv.append(newGIF);
            newDiv.append(newBtn);
            newDiv.append(downBtn);
            $("#gifarea").append(newDiv)
        }
    },
    populateArea: function() {
        gify.makeFavorites();
        for (var i = 0; i <= gify.topics.length-1; i++) {
            var newElm = $("<div>");
            newElm.text(gify.topics[i]);
            newElm.addClass("tags");
            newElm.on("click", function() {
                $("#gifarea").empty();
                var content = this.textContent;
                var GIFobj = $.get("https://api.giphy.com/v1/gifs/search?q=" + content  +"&api_key=C4vD2rTzNQERymftt8uTanePEkBN0ZEd&limit=10");
                GIFobj.done(function(result) { 
                    gify.makeGif(result.data)
                    gify.currentTag = content;
                    gify.more = 10;   
                })
            })
            $("#tagarea").append(newElm);
        }
    }   
}
gify.getCookie();
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
        gify.makeMore(data.data)
        gify.more += 10;
    })
    
})

