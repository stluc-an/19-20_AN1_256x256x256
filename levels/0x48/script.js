/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:17
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onDropFile("#Image1", dfile);
});

function dfile(event){
	console.log(event);
  if(event.type=="drop")
    document.querySelector("#Image1").classList.add ("hide");
    document.querySelector("#Image2").classList.remove("hide");

InteractionHelper.onKeyDown(keypressed);
	
}


function keypressed(event){
	console.log(event);
    if(event.key == "Delete")
	AppManager.levelComplete();

}