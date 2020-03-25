/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:43:17
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onTimeout(4000, time);
});

function time(event){
	console.log(event);

    document.querySelector("#Image1").classList.add ("hide");
    document.querySelector("#Image2").classList.remove("hide");


InteractionHelper.onDropFile("#Image2", dfile);
	
}


function dfile(event){
	console.log(event);
	AppManager.levelComplete();

}