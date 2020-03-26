/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:16
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onMouseEnter(".vert", mouseEnter);
});

function mouseEnter(event){
	console.log(event);
    event.target.classList.add("hide");
    InteractionHelper.onDoubleTap(".mamoth", doubleTap);
    document.querySelector(".mamoth").classList.remove("hide");
}

function doubleTap(event){
    console.log(event);
    document.querySelector(".mamoth").classList.add("hide");
    document.querySelector(".mamoth2").classList.remove("hide");
    setTimeout(lvlComplete, 700);

}


function lvlComplete(){
        AppManager.levelComplete();
}