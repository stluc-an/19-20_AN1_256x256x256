/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:49
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onBeforePrint(printed);
});

function printed(event){
	console.log(event);
      
    document.querySelector("#Image1").classList.add ("hide");
    document.querySelector("#Image2").classList.remove("hide");



InteractionHelper.onKeyDown(keypressed);
	
}


function keypressed(event){
	console.log(event);
    if(event.key == "Enter")
	AppManager.levelComplete();

}