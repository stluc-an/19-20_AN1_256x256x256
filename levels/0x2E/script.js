/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:40
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onLongTap(".phase1", longTap);
});

function longTap(event){
	console.log(event);
     event.target.classList.add("hide");
     InteractionHelper.onTimeout(10000, timeOut);
    document.querySelector(".phase2").classList.add("up");
}

function timeOut(event){
	console.log(event);
    document.querySelector(".phase2").classList.add("hide");
	AppManager.levelComplete();
}