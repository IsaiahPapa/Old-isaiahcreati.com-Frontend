
//
//
//	RANDOM Primary Weapon
//
//

function randomPrimaryGunAndAttachemnts(){
    var randomGun = Math.floor(Math.random() * primaryWeapons.primaryList.length);

    //between 3 and 5 attachments
    var randomAttachmentAmount = Math.floor(Math.random() * 3) + 3;

    var finalBarrel = [];
    var finalAmmo = [];
    var finalLaser = [];
    var finalMuzzle = [];
    var finalOptic = [];
    var finalPerk = [];
    var finalGrip = [];
    var finalStock = [];
    var finalUnderbarrel = [];
    var e = 0;

    for (var i = 0; i < randomAttachmentAmount; i++) {
        e++;
        if(e > 20){break};

        attachmentCategoryCount = Object.getOwnPropertyNames(primaryWeapons.primaryList[randomGun]).length;
        //+1 because "Name" is the fist category
        max = attachmentCategoryCount - 1;
        randomAttachment = Math.floor(Math.random() * max) + 1;
        // BROKE => randomAttachment = Math.floor(Math.random() * ((attachmentCategoryCount-1) - 1) + 1) + 1;
        //randomAttachment = randomAttachmentCategory[Math.floor(Math.random() * (max-min + 1)) + min];

        randomAttachmentCategory = primaryWeapons.primaryList[randomGun][Object.keys(primaryWeapons.primaryList[0])[randomAttachment]];
        randomAttachmentCategoryName = Object.getOwnPropertyNames(primaryWeapons.primaryList[0])[randomAttachment];

        if(randomAttachmentCategory.length > 0){
            randomAttachment = randomAttachmentCategory[Math.floor(Math.random() * randomAttachmentCategory.length + 1) -1];
        } else{
            i -= 1;
            randomAttachment = null;
        }

        if(randomAttachmentCategoryName === "Muzzle"){
            if(finalMuzzle.length === 0 ){
                finalMuzzle.push(randomAttachment);
            } else{
                i -=1;
            }
        }
        if(randomAttachmentCategoryName === "Barrel"){
            if(finalBarrel.length === 0 ){
                finalBarrel.push(randomAttachment);
            } else{
                i -=1;
            }
        }
        if(randomAttachmentCategoryName === "Laser"){
            if(finalLaser.length === 0 ){
                finalLaser.push(randomAttachment);
            } else{
                i -=1;
            }
        }
        if(randomAttachmentCategoryName === "Optic"){
            if(finalOptic.length === 0 ){
                finalOptic.push(randomAttachment);
            } else{
                i -=1;
            }
        }
        if(randomAttachmentCategoryName === "Stock"){
            if(finalStock.length === 0 ){
                finalStock.push(randomAttachment);
            } else{
                i -=1;
            }
        }
        if(randomAttachmentCategoryName === "Underbarrel"){
            if(finalUnderbarrel.length === 0 ){
                finalUnderbarrel.push(randomAttachment);
            } else{
                i -=1;
            }
        }
        if(randomAttachmentCategoryName === "Ammunition"){
            if(finalAmmo.length === 0 ){
                finalAmmo.push(randomAttachment);
            } else{
                i -=1;
            }
        }
        if(randomAttachmentCategoryName === "Rear Grip"){
            if(finalGrip.length === 0 ){
                finalGrip.push(randomAttachment);
            } else{
                i -=1;
            }
        }
        if(randomAttachmentCategoryName === "Perk"){
            if(finalPerk.length === 0 ){
                finalPerk.push(randomAttachment);
            } else{
                i -=1;
            }
        }
    }

    document.getElementById("muzzle-primary").innerHTML = finalMuzzle;
    document.getElementById("barrel-primary").innerHTML = finalBarrel;
    document.getElementById("laser-primary").innerHTML = finalLaser;
    document.getElementById("optic-primary").innerHTML = finalOptic;
    document.getElementById("stock-primary").innerHTML = finalStock;
    document.getElementById("underbarrel-primary").innerHTML = finalUnderbarrel;
    document.getElementById("ammo-primary").innerHTML = finalAmmo;
    document.getElementById("reargrip-primary").innerHTML = finalGrip;
    document.getElementById("perk-primary").innerHTML = finalPerk;

    document.getElementById("attachmentAmount-primary").innerHTML = randomAttachmentAmount;
    document.getElementById("gunName-primary").innerHTML = primaryWeapons.primaryList[randomGun].Name;
}

//
//
//	RANDOM Secondary Weapon
//
//

function randomSecondaryGunAndAttachemnts(){
    

    var randomGun = Math.floor(Math.random() * secondaryWeapons.pistolList.length);

    //between 3 and 5 attachments
    var randomAttachmentAmount = Math.floor(Math.random() * 3) + 3;

    var finalBarrel = [];
    var finalAmmo = [];
    var finalLaser = [];
    var finalMuzzle = [];
    var finalOptic = [];
    var finalPerk = [];
    var finalGrip = [];
    var finalStock = [];
    var finalTrigger = [];
    var e = 0;

    for (var i = 0; i < randomAttachmentAmount; i++) {
        e++;
        if(e > 20){break};

        attachmentCategoryCount = Object.getOwnPropertyNames(secondaryWeapons.pistolList[randomGun]).length;
        //+1 because "Name" is the fist category
        max = attachmentCategoryCount - 1;
        randomAttachment = Math.floor(Math.random() * max) + 1;
        // BROKE => randomAttachment = Math.floor(Math.random() * ((attachmentCategoryCount-1) - 1) + 1) + 1;
        //randomAttachment = randomAttachmentCategory[Math.floor(Math.random() * (max-min + 1)) + min];

        randomAttachmentCategory = secondaryWeapons.pistolList[randomGun][Object.keys(secondaryWeapons.pistolList[0])[randomAttachment]];
        randomAttachmentCategoryName = Object.getOwnPropertyNames(secondaryWeapons.pistolList[0])[randomAttachment];

        if(randomAttachmentCategory.length > 0){
            randomAttachment = randomAttachmentCategory[Math.floor(Math.random() * randomAttachmentCategory.length + 1) -1];
        } else{
            i -= 1;
            randomAttachment = null;
        }

        if(randomAttachmentCategoryName === "Muzzle"){
            if(finalMuzzle.length === 0 ){
                finalMuzzle.push(randomAttachment);
            } else{
                i -=1;
            }
        }
        if(randomAttachmentCategoryName === "Barrel"){
            if(finalBarrel.length === 0 ){
                finalBarrel.push(randomAttachment);
            } else{
                i -=1;
            }
        }
        if(randomAttachmentCategoryName === "Laser"){
            if(finalLaser.length === 0 ){
                finalLaser.push(randomAttachment);
            } else{
                i -=1;
            }
        }
        if(randomAttachmentCategoryName === "Optic"){
            if(finalOptic.length === 0 ){
                finalOptic.push(randomAttachment);
            } else{
                i -=1;
            }
        }
        if(randomAttachmentCategoryName === "Stock"){
            if(finalStock.length === 0 ){
                finalStock.push(randomAttachment);
            } else{
                i -=1;
            }
        }
        if(randomAttachmentCategoryName === "Trigger Action"){
            if(finalTrigger.length === 0 ){
                finalTrigger.push(randomAttachment);
            } else{
                i -=1;
            }
        }
        if(randomAttachmentCategoryName === "Ammunition"){
            if(finalAmmo.length === 0 ){
                finalAmmo.push(randomAttachment);
            } else{
                i -=1;
            }
        }
        if(randomAttachmentCategoryName === "Rear Grip"){
            if(finalGrip.length === 0 ){
                finalGrip.push(randomAttachment);
            } else{
                i -=1;
            }
        }
        if(randomAttachmentCategoryName === "Perk"){
            if(finalPerk.length === 0 ){
                finalPerk.push(randomAttachment);
            } else{
                i -=1;
            }
        }
    }

    document.getElementById("muzzle-secondary").innerHTML = finalMuzzle;
    document.getElementById("barrel-secondary").innerHTML = finalBarrel;
    document.getElementById("laser-secondary").innerHTML = finalLaser;
    document.getElementById("optic-secondary").innerHTML = finalOptic;
    document.getElementById("stock-secondary").innerHTML = finalStock;
    document.getElementById("trigger-secondary").innerHTML = finalTrigger;
    document.getElementById("ammo-secondary").innerHTML = finalAmmo;
    document.getElementById("reargrip-secondary").innerHTML = finalGrip;
    document.getElementById("perk-secondary").innerHTML = finalPerk;

    document.getElementById("attachmentAmount-secondary").innerHTML = randomAttachmentAmount;
    document.getElementById("gunName-secondary").innerHTML = secondaryWeapons.pistolList[randomGun].Name;
}

//
//
//	RANDOM PERK
//
//
function randomPerk(){

    var perkCategory;
    var finalPerk1 = [];
    var finalPerk2 = [];
    var finalPerk3 = [];
    for (var i = 0; i <= 2; i++) {
        var perkCategory = i;

        var randomPerkCategory = perks.perkList[perkCategory][Object.keys(perks.perkList[0])[1]];
        var randomPerkCategoryName = perks.perkList[perkCategory].Name;


        var randomPerkFinal = randomPerkCategory[Math.floor(Math.random() * randomPerkCategory.length + 1) -1];

        if(randomPerkCategoryName === "Perk 1"){
            finalPerk1.push(randomPerkFinal);

        }
        if(randomPerkCategoryName === "Perk 2"){
            finalPerk2.push(randomPerkFinal);
        }
        if(randomPerkCategoryName === "Perk 3"){
            finalPerk3.push(randomPerkFinal);
        }
    }

    document.getElementById("perk1").innerHTML = finalPerk1;
    document.getElementById("perk2").innerHTML = finalPerk2;
    document.getElementById("perk3").innerHTML = finalPerk3;
}

function randomEquipment(){
    var equipmentCategory;
    var finalLethal = [];
    var finalTactical = [];

    for (var i = 0; i <= 1; i++) {
        var equipmentCategory = i;
        console.log("equipmentCategory: " + equipmentCategory);

        var randomEquipmentCategory = equipment.equipmentList[equipmentCategory][Object.keys(equipment.equipmentList[0])[1]];
        console.log("randomEquipmentCategory: " + randomEquipmentCategory);
        var randomEquipmentCategoryName = equipment.equipmentList[equipmentCategory].Name;
        console.log("randomEquipmentCategoryName: " + randomEquipmentCategoryName);

        var randomEquipmentFinal = randomEquipmentCategory[Math.floor(Math.random() * randomEquipmentCategory.length + 1) -1];

        if(randomEquipmentCategoryName === "Lethal"){
            finalLethal.push(randomEquipmentFinal);

        }
        if(randomEquipmentCategoryName === "Tactical"){
            finalTactical.push(randomEquipmentFinal);
        }
    }

    console.log("finalLethal: " + finalLethal)
    console.log("finalTactical: " + finalTactical)

    document.getElementById("lethal").innerHTML = finalLethal;
    document.getElementById("tactical").innerHTML = finalTactical;
}
