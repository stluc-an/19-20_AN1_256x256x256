/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:53
\*----------------------------------------*/

let idOfShownPicture = 0;

let cursorAnim1 = 0
let cursorAnim2 = 0
let cursorAnim3 = 0

let anim3;
let anim2;
let anim1;

AppManager.ready(function(){

	anim3 = setInterval(monAnimation3, 50);
	InteractionHelper.onKeyDown(first);
	console.log(event);
});


function first (event){

if (event.key == "p") {
		anim2 = setInterval(monAnimation2, 10);
		InteractionHelper.onKeyDown(second);
		console.log(event);
 	}
 	
}

function second (event){


 	if (event.key == "w") {
		anim1 = setInterval(monAnimation, 250);
		AppManager.levelComplete();
		
 	}
}



function monAnimation(){
	console.log(3);
	let allpict = document.querySelectorAll(".anima");
	
	if(cursorAnim1<allpict.length -1){
		allpict[cursorAnim1].classList.add("hide");
		cursorAnim1 = cursorAnim1 + 1;
		allpict[cursorAnim1].classList.remove("hide");	
	} else{
		clearInterval(anim1);
	}

}

function monAnimation2(){
	console.log(4);

	let allpict = document.querySelectorAll(".anima2");
	
	if(cursorAnim2<allpict.length -1){
		allpict[cursorAnim2].classList.add("hide");
		cursorAnim2 = cursorAnim2 + 1;
		allpict[cursorAnim2].classList.remove("hide");	
	}else{
		clearInterval(anim2);
	}

	}

	function monAnimation3(){
	console.log(5);

	let allpict = document.querySelectorAll(".anima3");
	
	if(cursorAnim3 < allpict.length -1){
		allpict[cursorAnim3].classList.add("hide");
		cursorAnim3 = cursorAnim3 + 1;
		allpict[cursorAnim3].classList.remove("hide");	
	}else{
		clearInterval(anim3);
	}

}