/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:24
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTap(".button", buttonpressed);
});

function buttonpressed(event){
 console.log(event);
 event.target.classList.add("hide");
 document.querySelector("#play").classList.add("hide");    
 document.querySelector("#mic").classList.remove("hide"); 
 document.querySelector("#rec").classList.remove("hide");
 InteractionHelper.onSound(micon);    
}


function micon(event){
	//console.log(event);
	
    document.querySelector("#micon").classList.remove("hide"); 
    document.querySelector("#mic").classList.add("hide");
    AppManager.levelComplete();
}