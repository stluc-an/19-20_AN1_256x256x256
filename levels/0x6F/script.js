/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:41:27
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onMouseLeave("#LeaveBox", MakeSomeNoise);
});

function MakeSomeNoise(event){
    document.getElementById("LeaveBox").style.display = "none";
    document.getElementById("LeaveBox").style.opacity = "0";
    
    document.getElementById("MicroPhone").style.display = "block";
    document.getElementById("MicroPhone").style.opacity = "100";
	InteractionHelper.onSound(YouWon);
}

function YouWon(event){
    document.getElementById("MicroPhone").style.display = "none";
    document.getElementById("MicroPhone").style.opacity = 0;
    document.getElementById("Success").style.display = "block";
    document.getElementById("Success").style.opacity = 100;
    console.log(event);
    AppManager.levelComplete();
}