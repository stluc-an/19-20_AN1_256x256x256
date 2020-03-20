/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:24
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onSound( micon);
});

function micon(event){
	//console.log(event);
	//AppManager.levelComplete();
    document.querySelector("#mic").classList.add("hide"); 
    document.querySelector("#rec").classList.add("hide");
    document.querySelector("#son").classList.remove("hide");
    document.querySelector("#print").classList.remove("hide");
    InteractionHelper.onBeforePrint( end);
    
}

function end(event){
	//console.log(event);
	AppManager.levelComplete();
}