/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:50
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDrag("#basket", dragimg);
});

    function dragimg(event){
    
    
    event.mouseX = event.mouseX - (window.innerWidth / 2) - (256/2);
    event.mouseY = event.mouseY - (window.innerHeight / 2) - (256/2);
    
    document.querySelector("#basket").style.left = event.mouseX+"px";
    document.querySelector("#basket").style.top = event.mouseY+"px"; 
    document.querySelector("#basket").classList.add("hide");
    document.querySelector("#panier").classList.add("hide"); 
    document.querySelector("#entername").classList.remove("hide");
    InteractionHelper.onKeyDown(enter);    
   
}

function enter(event){
	//console.log(event);
	AppManager.levelComplete();
}
