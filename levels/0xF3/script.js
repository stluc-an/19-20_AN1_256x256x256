/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:24
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onSound( eventHandler);
});

function eventHandler(event){
    console.log(event);
	if(event.intensity>20){
        document.querySelector("#Magazine").classList.remove("hide");
            var audio = new Audio("2.mp3");
            audio.play();
    }
    InteractionHelper.onDrag("#Magazine", actionWhenDragMagazine)
}

function actionWhenDragMagazine(event){
    
    event.mouseX = event.mouseX - (window.innerWidth / 2) + 256 / 2 ;
    event.mouseY = event.mouseY - (window.innerHeight / 2) + 256 / 2 ;
    
    document.querySelector("#Magazine").style.left = event.mouseX+"px";
    document.querySelector("#Magazine").style.top = event.mouseY+"px";
    
    AppManager.levelComplete();
}