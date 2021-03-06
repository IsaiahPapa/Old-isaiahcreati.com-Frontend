function spawnMob(mobName, image, cost, username){
    username = username.charAt(0).toUpperCase() + username.substring(1);
    var usernameSpan = "<span id='usernameSpan'>" + username +  "</span>";
    var costSpan     = "<span id='costSpan'>" + cost +"</span>";
    var mobNameSpan  = "<span id='mobNameSpan'>" + mobName +"</span>";
    //$("#text").text(username + " spawned in a " + mobName);
    $(".div").queue(function() {
       $("#text").html(usernameSpan + " spawned " + mobNameSpan + " for " + costSpan + " Creati Coins.");
       $(".div").dequeue(); // This is necessary to continue the animation
    });
    /*
    //$("#text-sub").text(cost + " Points");
    $(".div").queue(function() {
       $("#text-sub").text(cost + " Points");;
       $(".div").dequeue(); // This is necessary to continue the animation
    });
    */
    //$(".image").css("background-image", 'url("' + image + '")');
    $(".div").queue(function() {
       $(".image").css("background-image", 'url("' + image + '")');
       $(".div").dequeue(); // This is necessary to continue the animation
    });

    $(".div").animate({left: '0px'}, "slow").delay(4000);

    $(".div").animate({left: '300px'}, "slow");
}

function redeem(name, image, cost, username){
    username = username.charAt(0).toUpperCase() + username.substring(1);
    var usernameSpan = "<span id='usernameSpan'>" + username +  "</span>";
    var costSpan     = "<span id='costSpan'>" + cost +"</span>";
    var NameSpan  = "<span id='mobNameSpan'>" + name +"</span>";

    $(".div").queue(function() {
       $("#text").html(usernameSpan + " redeemed " + NameSpan + " for " + costSpan + " Creati Coins.");
       $(".div").dequeue(); // This is necessary to continue the animation
    });

    $(".div").queue(function() {
       $(".image").css("background-image", 'url("' + image + '")');
       $(".div").dequeue(); // This is necessary to continue the animation
    });

    $(".div").animate({left: '0px'}, "slow").delay(4000);

    $(".div").animate({left: '300px'}, "slow");
}
/*
function redeemVerb(username, verb, text, image, cost, ){
    username = username.charAt(0).toUpperCase() + username.substring(1);
    var usernameSpan = "<span id='usernameSpan'>" + username +  "</span>";
    var costSpan     = "<span id='costSpan'>" + cost +"</span>";
    var textSpawn  = "<span id='mobNameSpan'>" + text +"</span>";

    $(".div").queue(function() {
       $("#text").html(usernameSpan + " " + verb + " " + textSpawn + " for " + costSpan + " Creati Coins.");
       $(".div").dequeue(); // This is necessary to continue the animation
    });

    $(".div").queue(function() {
       $(".image").css("background-image", 'url("' + image + '")');
       $(".div").dequeue(); // This is necessary to continue the animation
    });

    $(".div").animate({left: '0px'}, "slow").delay(4000);

    $(".div").animate({left: '300px'}, "slow");
}

*/

/*
function redeemPoints(id, username){
    var redeemables = [
        //Song Request
        "e82781c8-1b5e-4662-9a16-ca0602b14aa9",
        //Text-to-Speech
        "72c4e371-78c4-446b-9a2b-6d72118c7a5f",
        //Minecraft: Spawn Silverfish
        "a6f3c76c-20f9-4ae1-84dd-839d01ce991d",
        //Minecraft: Spawn Zombie
        "74ea512e-3a0b-4d09-ad6d-1d7fdcfc476d",
        //Minecraft: Spawn Skeleton
        "10b65ae0-3443-4280-bd16-0af2ab8a1f18",
        //Minecraft: Spawn Killer Bunny
        "787dfecc-f019-4c28-9f28-8b8acf02085e",
        //Minecraft: Spawn Enderman
        "e9500045-ffa9-419b-83bb-3d30becea359",
        //Minecraft: Spawn Creeper
        "ec69f103-0aa5-4dfe-8d4c-1b9c1a28fcf8",
        //Minecraft: Spawn Witch
        "17a8edc6-3052-4e5d-a506-3f108d53ef1d",
        //Minecraft: Spawn Charged Creeper
        "189bb067-13b2-4faa-88e7-6645c40f257a",
        //Minecraft: Spawn TNT Primed 
        "ea1139b4-2760-45ca-bfff-4b9b0ada9537",
        //Minecraft: Spawn SLime
        "0d5a1687-b910-4935-91eb-0220c6579019"
    ]
    if(id === "3bef0962-448b-4817-a09b-0409e3898bd4"){
        spawnMob("Endermite", "./assests/gifs/endermite.gif", 100, username);
    }
    if(id === "00b93e75-4e33-44d6-a5ee-949401011fd0"){
        spawnMob("Splash Potion of Nausea", "./assests/potion.png", 200, username);
    }
    
    if(id === "e3b1fb6b-e4fe-4035-a9f7-7297b52a9a5a"){
        spawnMob("Bee", "./assests/MP4/bee.gif", 300, username);
    }
    
    if(id === "aa3fb0ab-c8ef-4361-b8f1-1daa13ef1095"){
        spawnMob("Zap of Lightning", "", 500, username);
    }
    
    if(id === "829fc101-42dc-4946-8773-c3ead0f523ea"){
        spawnMob("Primed TNT Sound", "", 50, username);
    }
    
    if(id === redeemables[11]){
        spawnMob("Slime", "./assests/slime.png", 20, username);
    }
    if(id === redeemables[2]){
        //spawnMob("Silverfish", "./assests/silverfish.png", 50, username);
        spawnMob("Silverfish", "./assests/gifs/silverfish.gif", 75, username);
    }
    else if ( id === redeemables[3]){
        //spawnMob("Zombie", "./assests/zombie.png", 100, username);
        spawnMob("Zombie", "./assests/gifs/zombie.gif", 125, username);
    }
    else if ( id === redeemables[4]){
        //spawnMob("Skeleton", "./assests/skeleton.png", 200, username);
        spawnMob("Skeleton", "./assests/gifs/skeleton.gif", 150, username);
    }
    else if ( id === redeemables[5]){
        //spawnMob("Killer Bunny", "./assests/rabbit.png", 300, username);
        spawnMob("Killer Bunny", "./assests/gifs/rabbit.gif", 200, username);
    }
    else if ( id === redeemables[6]){
        //spawnMob("Enderman", "./assests/enderman.png", 500, username);
        spawnMob("Enderman", "./assests/gifs/enderman.gif", 650, username);
    }
    else if ( id === redeemables[7]){
        //spawnMob("Creeper", "./assests/creeper.png", 1000, username);
        spawnMob("Creeper", "./assests/gifs/creeper.gif", 1500, username);
    }
    else if ( id === redeemables[8] ){
        //spawnMob("Witch", "./assests/witch.png", 1500, username);
        spawnMob("Witch", "./assests/gifs/witch.gif", 1000, username);
    }
    else if ( id === redeemables[9] ){
        spawnMob("Charged Creeper", "./assests/gifs/creeper-charged.gif", 3500, username);
    }
    else if ( id === redeemables[10] ){
        spawnMob("TNT (Primed)", "./assests/gifs/tnt.gif", 5000, username);
    }
    else{
        //$("#text").text("Spaw");
        //$(".image").css("background-image", "url('./assests/creeper.png')");

        //$(".div").animate({width: '300px'}, "slow").delay(5000);
        //$(".div").animate({width: '0px'}, "slow");
    }
    //$.myjQuery();

}
*/