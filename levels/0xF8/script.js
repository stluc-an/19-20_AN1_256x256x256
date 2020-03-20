/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:24
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onSound( PressTheKey);
});

function PressTheKey(event){
    document.getElementById("MicroPhone").style.display = "none";
    document.getElementById("MicroPhone").style.opacity = "0";
    
    document.getElementById("KeyDown").style.display = "block";
    document.getElementById("KeyDown").style.opacity = "100";
    InteractionHelper.onKeyDown (YouWon);
}

function YouWon (event){
    console.log(event);
    document.getElementById("KeyDown").style.display = "none";
    document.getElementById("KeyDown").style.opacity = 0;
    document.getElementById("Success").style.display = "block";
    document.getElementById("Success").style.opacity = 100;
    AppManager.levelComplete();
}