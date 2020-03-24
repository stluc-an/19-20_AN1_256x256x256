/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:40:30
\*----------------------------------------*/

//let oldScrollPos = 0;

AppManager.ready(function(){
	InteractionHelper.onMouseEnter("#Duck_File", first);
});

function first(event){
    
    InteractionHelper.onKeyDown(second);
}

function second(event){
    
    if(event.keyCode == "13") {
        console.log(event);
        var audio = new Audio('../Image/Duck_Sound.mp3');
        audio.play();
        setTimeout(theEnd, 2000);
    }
}

function theEnd() {
    AppManager.levelComplete();
}