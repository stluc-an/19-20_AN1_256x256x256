/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:16
\*----------------------------------------*/

let animationFissure = [];
let idOfShownPicture = 0;



AppManager.ready(function(){

	
	InteractionHelper.onMouseEnter("#setAnima", OnDropFile);

				});


function OnDropFile(event){
	console.log(event);
	

	setInterval(monAnimation, 150);
	InteractionHelper.onDropFile("#setAnima", done);
}


function done(){
	if(event.type == "drop"){

     document.querySelector(".poster").classList.remove("hide");
	AppManager.levelComplete();
    }
}



function monAnimation(){
	let allpict = document.querySelectorAll(".animA");
	
	if(idOfShownPicture<allpict.length -1){
		allpict[idOfShownPicture].classList.add("hide");
		idOfShownPicture = idOfShownPicture + 1;
		allpict[idOfShownPicture].classList.remove("hide");	
	}
	
}