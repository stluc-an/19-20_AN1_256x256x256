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
        document.querySelector("#Police").classList.remove("hide");
    }
    InteractionHelper.onShow( action_hide);
}

function action_hide(event){
    document.querySelector("#Police").classList.add("hide");
    var audio = new Audio("2.mp3");
        audio.play();
    document.querySelector("#Thug").classList.remove("hide");
    
    setTimeout (pause, 2000);
}

function pause(){
    AppManager.levelComplete();
        
}