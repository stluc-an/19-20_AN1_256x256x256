/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:04
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTap(".tapme", Tap);
});

function Tap(event){
	console.log(event);
    event.target.classList.add("hide");
    document.querySelector(".cache").classList.remove("hide");
    InteractionHelper.onHide(Hide);
    
}

function Hide(event){
    console.log(event);
    AppManager.levelComplete();
}