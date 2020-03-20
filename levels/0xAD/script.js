/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:16
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onShow(actionWhenShowed);
	console.log(event);
});

function actionWhenShowed(event){
	console.log(event);
	let scroll= document.querySelector("body");
	scroll.classList.add("scrollBar");
	let eye2 = document.querySelector("#eye2");
	let eye1 = document.querySelector("#eye1");
	eye2.classList.remove("hide");
	eye1.classList.add("hide");
	InteractionHelper.onScroll(done);
}

function done(event){

	console.log(4);
}

	
