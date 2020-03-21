/*----------------------------------------*\
  19-20_AN1_256x256x256 - player.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-03-21 02:10:41
  @Last Modified time: 2020-03-21 04:29:54
\*----------------------------------------*/

class Player{
	constructor(){
		this.element = document.querySelector(".player");
		this.element.style.top = (document.querySelector(".container").offsetHeight - 18) + "px"
		this.area = {
			x1 : this.element.offsetLeft,
			y1 : this.element.offsetTop,
			x2 : this.element.offsetLeft + this.element.offsetWidth,
			y2 : this.element.offsetTop + this.element.offsetHeight
		}
		this.move = 0;
		this.limit = [2, document.body.offsetWidth - this.element.offsetWidth - 2];
		InteractionHelper.onKeyDown(event=>{
			if(	event.keyCode == 37 || 	/* LeftArrow */  
				event.keyCode == 39		/* RightArrow */  
			){
				this.move = event.keyCode-38;
			}
		});
		InteractionHelper.onKeyUp(event=>{
			this.move = 0;
		});
	}

	update(deltaTime, other){
		if(this.move != 0){
			this.area.x1 += this.move * 100 * deltaTime;
			this.area.x1 = Math.max(this.limit[0], this.area.x1);
			this.area.x1 = Math.min(this.limit[1], this.area.x1)
			this.area.x2 = this.area.x1 + this.element.offsetWidth;
			this.element.style.left = this.area.x1 + "px";	
		}
	}
}