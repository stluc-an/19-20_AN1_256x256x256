/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:53
\*----------------------------------------*/

let idOfShownPicture = 0;

AppManager.ready(function(){

	setInterval(monAnimation3, 50);
	InteractionHelper.onKeyDown(first);
	console.log(event);
});


function first (event){

if (event.key == "p") {
		setInterval(monAnimation2, 10);
		InteractionHelper.onKeyDown(second);
		console.log(event);
 	}
 	
}

function second (event){


 	if (event.key == "w") {
		setInterval(monAnimation, 250);
		InteractionHelper.onKeyDown(done);
 	}
}

function done (event){
	console.log(event);
	AppManager.levelComplete();
}



function monAnimation(){
	console.log(3);
	let allpict = document.querySelectorAll(".anima");
	
	if(idOfShownPicture<allpict.length -1){
		allpict[idOfShownPicture].classList.add("hide");
		idOfShownPicture = idOfShownPicture + 1;
		allpict[idOfShownPicture].classList.remove("hide");	
	}

}

function monAnimation2(){
	console.log(4);

	let allpict = document.querySelectorAll(".anima2");
	
	if(idOfShownPicture<allpict.length -1){
		allpict[idOfShownPicture].classList.add("hide");
		idOfShownPicture = idOfShownPicture + 1;
		allpict[idOfShownPicture].classList.remove("hide");	
	}

	}

	function monAnimation3(){
	console.log(5);

	let allpict = document.querySelectorAll(".anima3");
	
	if(idOfShownPicture<allpict.length -1){
		allpict[idOfShownPicture].classList.add("hide");
		idOfShownPicture = idOfShownPicture + 1;
		allpict[idOfShownPicture].classList.remove("hide");	
	}

}