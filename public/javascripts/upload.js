$(document).ready(function(){
    $('#right').bind('click', function(){
        var select = $('#friend_chooser')[0];
        console.log(select);
        var choice = select.selectedIndex;
        console.log(choice);
        var value = select.value;
        console.log(value);
        var entry = $('.fg')[choice];
        console.log(entry);
        document.getElementById('targets').add(entry, null);
        select.value = "";
    });
    $('#left').bind('click', function(){

    });
});