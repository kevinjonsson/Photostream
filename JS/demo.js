$(document).ready(function () {

getData("soccer");

$('#searchButton').on('click',function(){
    var searchValue = $("#searchInput").val();
    $("#searchInput").val("");
    $("#container").empty();
    $(".loading").show();
    if(searchValue == "" || searchValue == " " || searchValue == "  " || searchValue == "   "){
      alert("Please write something in input field!")
    }
    else{
      getData(searchValue);
    }
});

$('#searchInput').bind("enterKey",function(e){
    var searchValue = $("#searchInput").val();
    $("#searchInput").val("");
    $("#container").empty();
    $(".loading").show();
    getData(searchValue);
 });
 
 $('#searchInput').keyup(function(e){
     if(e.keyCode == 13)
     {
         $(this).trigger("enterKey");
     }
 });

function getData(searchValue){
    var searchText = searchValue;
    $.getJSON("http://www.flickr.com/services/feeds/photos_public.gne?tags="+searchText+"&format=json&jsoncallback=?", function( data ) {
    var item = data.items;
    print(item);
});
}

function print(item){
    $(".loading").hide();
    for(i = 0; i < item.length; i++){
        $(".containerFlex").append("<div class='imgDiv' id='" + i + "'>" + "<img class='photo' id='" + i + "' src='" + item[i].media.m +"' />"+ "</div>");
        $(".containerFloat").append("<div class='imgDiv' id='" + i + "'>" + "<img class='photo' id='" + i + "' src='" + item[i].media.m +"' />"+ "</div>");
    }
    $(".photo").on("click", {
        item: item
    }, myHandler);
}

function myHandler(e){
    i = e.currentTarget.id;
    $("#dialog").empty();
    $("#dialog").dialog("open");
    $("#dialog").dialog({ title: "Title: " + e.data.item[[i]].title });
    $("#dialog").append("<img class='imgDialog' src='"+ e.data.item[[i]].media.m +"'><br>");
    $("#dialog").append("<p class='publisher'>Publisher: " + e.data.item[[i]].published + "</p><br>");
    $("#dialog").append("<p class='published'>Published: " + e.data.item[[i]].published + "</p><br>");
    $("#dialog").append("<p class='author'>Author: " + e.data.item[[i]].author + "</p><br>");
    $("#dialog").append("<p class='date_taken'>Date and time taken: " + e.data.item[[i]].date_taken + "</p>");

}

$("#dialog").dialog({
    autoOpen: false,
    modal: true
});

$("#changeButton").on("click", function(){
    if ($("#container").hasClass("containerFlex")) {
        $('#container').removeClass("containerFlex").addClass("containerFloat");
      }
      else{
        $('#container').removeClass("containerFloat").addClass("containerFlex");
      }

    var $this = $(this);
    $this.toggleClass('SeeMore2');
    if($this.hasClass('SeeMore2')){
        $this.text('Switch to flex');
    } else {
        $this.text('Switch to float');
    }
});

});
