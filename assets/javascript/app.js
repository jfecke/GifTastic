var gify = {
    topics: ["tigers","gorillas","hawks"],
    more: 10,
    currentTag: "",
    favorites: [],
    favoriteID: [],
    getObject: async function(gifid) {
        $.get("https://api.giphy.com/v1/gifs?ids=" + gifid  +"&api_key=C4vD2rTzNQERymftt8uTanePEkBN0ZEd").done(function(response) {
            console.log(response.data[0])
            return response.data[0]
        })
    },
    removeFavorite: function(badelement) {
        var tempArray = [];
        for (var i = 0; i < gify.favoriteID.length; i++) {
            if (gify.favoriteID[i] != badelement) {
                tempArray.push(gify.favoriteID[i]);
            }
        }
        gify.favoriteID = tempArray;
    },
    makeCookie: function() {
        var tempTXT = "";
        for (var i = 0; i < gify.favoriteID.length; i++) {
            tempTXT += gify.favoriteID[i] + ",";
        }
        var d = new Date();
        d.setTime(d.getTime() + (14*24*60*60*1000));
        var expires = "; expires="+ d.toUTCString();
        var expiration = "; expires=Thu, 18 Dec 2018 12:00:00 UTC"
        document.cookie = tempTXT + expires;
    },
    getCookie: function() {
        var cookies = document.cookie;
        if (cookies == "") {

        } else {
            var splitcookie = cookies.split(";");
            gify.favoriteID = splitcookie[0].split(",");
            gify.favoriteID.pop();
        }
    },
    makeFavorites: function() {
        var newElm = $("<div>");
        newElm.text("Favorites");
        newElm.addClass("tags");
        newElm.on("click", function(){
            gify.currentTag = "";
            $("#gifarea").empty();
            for (var j=0; j < gify.favoriteID.length; j++) {
                
                $.get("https://api.giphy.com/v1/gifs?ids=" + gify.favoriteID[j]  +"&api_key=C4vD2rTzNQERymftt8uTanePEkBN0ZEd").done(function(response) {
                    var gifOBJ = response.data[0]
                    console.log(gifOBJ)
                    var newGIF = $("<img>");
                    newGIF.attr("src", gifOBJ.images.original_still.url);
                    newGIF.attr("id", gifOBJ.id);
                    newGIF.attr("data-move", gifOBJ.images.original.url);
                    newGIF.attr("data-still", gifOBJ.images.original_still.url);
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
                    if (gify.favoriteID.indexOf(newGIF.attr("id")) >= 0) {
                        var newBtn = $("<button>").text("Remove")
                    } else {
                        var newBtn = $("<button>").text("Add Favorite");
                    }
                    var downBtn = $("<button>").text("Download");
                    newBtn.addClass("btn");
                    downBtn.addClass("btn");
                    newBtn.on("click", function(){
                        var link = this.parentElement.children[0].getAttribute("data-still");
                        var gifid = this.parentElement.children[0].id;
                        if (gify.favoriteID.indexOf(gifid) < 0) {
                            gify.favoriteID.push(gifid);
                            gify.makeCookie();
                            $(this).text("Remove")
                        } else {
                            gify.removeFavorite(gifid);
                            $(this).text("Add Favorite");
                        }
                    })
                newDiv.append(newGIF);
                newDiv.append(newBtn);
                newDiv.append(downBtn);
                $("#gifarea").append(newDiv)  
                })
            
            }
        });
        $("#tagarea").append(newElm);
    },
    makeGif: function(response) {
        $("#btn-holder").css("display","block")
        for (var j=0; j <= response.length-1; j++) {
            var newGIF = $("<img>");
            newGIF.attr("src", response[j].images.original_still.url);
            newGIF.attr("id", response[j].id);
            newGIF.attr("data-move", response[j].images.original.url);
            newGIF.attr("data-still", response[j].images.original_still.url);
            newGIF.attr("data-state", "still");
            newGIF.on("click", function(){
                if ($(this).attr("data-state")== "still") {
                    $(this).attr("data-state", "move")
                    this.src = $(this).attr("data-move")
                } else if ($(this).attr("data-state")== "move"){
                    $(this).attr("data-state", "still")
                    this.src = $(this).attr("data-still")
                }
            });
            var newDiv = $("<div>").addClass("cont");
            if (gify.favoriteID.indexOf(newGIF.attr("id")) >= 0) {
                var newBtn = $("<button>").text("Remove")
            } else {
                var newBtn = $("<button>").text("Add Favorite");
            }
            var downBtn = $("<button>").text("Download");
            newBtn.addClass("btn");
            downBtn.addClass("btn");
            newBtn.on("click", function(){
                var link = this.parentElement.children[0].getAttribute("data-still");
                var gifid = this.parentElement.children[0].id;
                if (gify.favoriteID.indexOf(gifid) < 0) {
                    gify.favoriteID.push(gifid);
                    gify.makeCookie();
                    $(this).text("Remove")
                } else {
                    gify.removeFavorite(gifid);
                    $(this).text("Add Favorite");
                }
            })
            newDiv.append(newGIF);
            newDiv.append(newBtn);
            newDiv.append(downBtn);
            $("#gifarea").append(newDiv);
        }
    },
    makeMore: function(response){
        for (var j=gify.more; j <= response.length-1; j++) {
            var newGIF = $("<img>");
            newGIF.attr("src", response[j].images.original_still.url);
            newGIF.attr("id", response[j].id);
            newGIF.attr("data-move", response[j].images.original.url);
            newGIF.attr("data-still", response[j].images.original_still.url);
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
            if (gify.favoriteID.indexOf(newGIF.attr("id")) >= 0) {
                var newBtn = $("<button>").text("Remove")
            } else {
                var newBtn = $("<button>").text("Add Favorite");
            }
            var downBtn = $("<button>").text("Download");
            newBtn.addClass("btn");
            downBtn.addClass("btn");
            newBtn.on("click", function(){
                var link = this.parentElement.children[0].getAttribute("data-still");
                var gifid = this.parentElement.children[0].id;
                if (gify.favoriteID.indexOf(gifid) < 0) {
                    gify.favoriteID.push(gifid);
                    gify.makeCookie();
                    $(this).text("Remove")
                } else {
                    gify.removeFavorite(gifid);
                    $(this).text("Add Favorite");
                }
            })
            newDiv.append(newGIF);
            newDiv.append(newBtn);
            newDiv.append(downBtn);
            $("#gifarea").append(newDiv);
        }
    },
    populateArea: async function() {
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
    if ($("#giftext").val().length > 0 && gify.topics.indexOf($("#giftext").val()) < 0) {
        $("#tagarea").empty();
        gify.topics.push($("#giftext").val());
        gify.populateArea();
        $("#giftext").val("");
    }  else {
        $("#giftext").val("");
    }
})

$("#more").on("click", function(){
    if (gify.currentTag != "") {
        var GIFobj = $.get("https://api.giphy.com/v1/gifs/search?q=" + gify.currentTag  +"&api_key=C4vD2rTzNQERymftt8uTanePEkBN0ZEd&limit="+String(gify.more+10));
    GIFobj.done(function(data) { 
        gify.makeMore(data.data)
        gify.more += 10;
    })
    }
})