/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:24
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onSound(eventHandler);
});

function eventHandler(event){
    console.log(event);
	if(event.intensity>20){
        document.querySelector("#Sleep2").classList.remove("hide");
        
    setTimeout( theEnd , 2000);
        
    }
}

function theEnd(){
    AppManager.levelComplete();
}
