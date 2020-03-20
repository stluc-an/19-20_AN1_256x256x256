/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:17
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTimeout(1000,  wait);
});

function wait(event){
	//console.log(event);
	//AppManager.levelComplete();
    document.querySelector("#chargement").classList.add("hide");
    document.querySelector("#basket").classList.remove("hide");
    document.querySelector("#panier").classList.remove("hide");
    InteractionHelper.onDrag("#basket", dragimg);
}

function dragimg(event){
    console.log(event);
    
    event.mouseX = event.mouseX - (window.innerWidth / 2) - (256/2);
    event.mouseY = event.mouseY - (window.innerHeight / 2) - (256/2);
    
    document.querySelector("#basket").style.left = event.mouseX+"px";
    document.querySelector("#basket").style.top = event.mouseY+"px";    
    AppManager.levelComplete();
}