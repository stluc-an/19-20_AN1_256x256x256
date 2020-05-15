/*----------------------------------------*\
  256^3 - main.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-02-06 23:16:10
  @Last Modified time: 2020-05-15 12:23:02
\*----------------------------------------*/
import InteractionHelper from "./InteractionHelper.js";
import AppManager from "./AppManager.js";
import Animator from "./Animator.js";

AppManager.ready(() => {
	InteractionHelper.onDropFile("body", ()=>false);
})
window.Animator = Animator;
window.AppManager = AppManager;
window.InteractionHelper = InteractionHelper;