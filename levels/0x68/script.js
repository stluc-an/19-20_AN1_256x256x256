/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:27
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onMouseLeave("div", mouseLeave);
});

function mouseLeave(event){
	console.log(event);
    document.querySelector(".mouseleave").classList.add("hide");
    document.querySelector(".keydown").classList.remove("hide");
    InteractionHelper.onKeyDown(keyDown);
}

function keyDown(event){
    if(event.key == "o"){
        event.target.classList.add("hide");
    }
    console.log(event);
    AppManager.levelComplete();
}