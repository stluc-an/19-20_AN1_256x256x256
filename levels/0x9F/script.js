/*----------------------------------------*\
  256^3 - script.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:31:08
  @Last Modified time: 2020-02-06 23:42:04
\*----------------------------------------*/

AppManager.ready(function(){
	InteractionHelper.onHide(hide);
});

function hide(event){
	console.log(event);
    document.querySelector(".cache").classList.add("hide");
    document.querySelector(".sound").classList.remove("hide");
    InteractionHelper.onSound(sound);

}

function sound(event){
    console.log(event);
    AppManager.levelComplete();
}