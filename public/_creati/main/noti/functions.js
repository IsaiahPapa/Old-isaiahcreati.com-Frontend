function redeem(name, image, cost, username){
    username = username.charAt(0).toUpperCase() + username.substring(1);
    var usernameSpan = "<span id='usernameSpan'>" + username +  "</span>";
    var costSpan     = "<span id='costSpan'>" + cost +"</span>";
    var NameSpan  = "<span id='mobNameSpan'>" + name +"</span>";

    $(".div").css("opacity", "1");

    $(".div").queue(function() {
       $("#text").html(usernameSpan + " redeemed " + NameSpan + " for " + costSpan + " Coins.");
       $(".div").dequeue(); // This is necessary to continue the animation
    });

    $(".div").queue(function() {
       $(".image").css("background-image", 'url("' + image + '")');
       $(".div").dequeue(); // This is necessary to continue the animation
    });

    
    $(".div").addClass("fadeInRight").delay(4000).queue(function(){
        $(this).removeClass("fadeInRight").dequeue();
        $(".div").addClass("fadeOutRight").delay(1000).queue(function(){
            $(this).removeClass("fadeOutRight").dequeue();
        });

    });

    $(".div").css("opacity", "0");

    //$(".div").removeClass("fadeInRight");
    //$(".div").addClass("fadeOutRight");
}


function redeem_old(name, image, cost, username, input){
    username = username.charAt(0).toUpperCase() + username.substring(1);
    var usernameSpan = "<span id='usernameSpan'>" + username +  "</span>";
    var costSpan     = "<span id='costSpan'>" + cost +"</span>";
    var NameSpan  = "<span id='mobNameSpan'>" + name +"</span>";
    
    console.log(name, image, cost, username);
    $(".div").queue(function() {
       $("#text").html(usernameSpan + " redeemed " + NameSpan + " for " + costSpan + " Creati Coins.");
       $(".div").dequeue(); // This is necessary to continue the animation
    });

    $(".div").queue(function() {
       $(".image").css("background-image", 'url("' + image + '")');
       $(".div").dequeue(); // This is necessary to continue the animation
    });

    $(".div").animate({left: '0px'}, "slow").delay(4000);

    $(".div").animate({left: '400px'}, "slow");
}

function redeem_old_bits(username, bits, string){
    var image;
    if(bits <= 10){
        image = "https://cdn.twitchalerts.com/twitch-bits/images/hd/10.gif";
    } else if (bits <= 100){
        image = "https://cdn.twitchalerts.com/twitch-bits/images/hd/100.gif";
    } else if (bits <= 1000){
        image = "https://cdn.twitchalerts.com/twitch-bits/images/hd/1000.gif";
    } else if (bits  <= 5000){
        image = "https://cdn.twitchalerts.com/twitch-bits/images/hd/5000.gif";
    } else{
        console.log("Either something went wrong or someone is super rich/robbed a bank");
    }
    username = username.charAt(0).toUpperCase() + username.substring(1);
    var usernameSpan = "<span id='usernameSpan'>" + username +  "</span>";

    $(".div").queue(function() {
       $("#text").html(usernameSpan + " " + string);
       $(".div").dequeue(); // This is necessary to continue the animation
    });

    $(".div").queue(function() {
       $(".image").css("background-image", 'url("' + image + '")');
       $(".div").dequeue(); // This is necessary to continue the animation
    });

    $(".div").animate({left: '0px'}, "slow").delay(4000);

    $(".div").animate({left: '400px'}, "slow");
}