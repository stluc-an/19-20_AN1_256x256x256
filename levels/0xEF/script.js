/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:17
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTimeout(3000,  MakeSomeNoise);
});

function MakeSomeNoise(event){
    document.getElementById("Time").style.display = "none";
    document.getElementById("Time").style.opacity = "0";
    
    document.getElementById("MicroPhone").style.display = "block";
    document.getElementById("MicroPhone").style.opacity = "100";
    InteractionHelper.onSound ( YouWon);
}

function YouWon(event){
    document.getElementById("MicroPhone").style.display = "none";
    document.getElementById("MicroPhone").style.opacity = 0;
    document.getElementById("Success").style.display = "block";
    document.getElementById("Success").style.opacity = 100;
    console.log(event);
    AppManager.levelComplete();
}