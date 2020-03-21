/*----------------------------------------*\
  19-20_AN1_256x256x256 - ball.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-03-21 02:12:17
  @Last Modified time: 2020-03-21 03:58:15
\*----------------------------------------*/

class Ball{
	constructor(){
		this.element = document.querySelector(".ball");

		this.area = {
			x1 : this.element.offsetLeft,
			y1 : this.element.offsetTop,
			x2 : this.element.offsetLeft + this.element.offsetWidth,
			y2 : this.element.offsetTop + this.element.offsetHeight
		}
		this.initPos = {
			x : this.area.x1,
			y : this.area.y1,
		}
		this.isRunning = false;
		InteractionHelper.onKeyDown(event=>{
			if(	event.keyCode == 32 &&
				!this.isRunning
			){
				this.isRunning = true;
				this.start();
			}
		});
		this.moveX = 0;
		this.moveY = 0;
		this.limitX = [2, document.body.offsetWidth - this.element.offsetWidth - 2];
		this.wrapper = document.querySelector(".wrapper");
	}
	start(){
		this.moveX = Math.random()-0.5 * 1.5;
		this.moveY = 0.25 + Math.random();
	}
	isVisible() {
		const rPos = this.area.y1 - this.wrapper.scrollTop;
		return !(rPos<0 || rPos>256);
	}
	getOffScreenPosition() {
		const rPos = this.area.y1 - this.wrapper.scrollTop;

		return {
			x : (this.area.x1 + this.area.x2)>>1,
			y : rPos<0 ? "UP": (rPos>256?"DOWN" : ""),
		}
	}
	update(deltaTime, player, lines){
		if(this.moveX != 0 || this.moveY != 0){
			let mX = this.moveX * 200 * deltaTime;
			let mY = this.moveY * 200 * deltaTime;
			let vArea = {
				x1 : this.area.x1 + mX,
				y1 : this.area.y1 + mY,
				x2 : this.area.x2 + mX,
				y2 : this.area.y2 + mY
			};
			if(	this.area.x1 + mX < this.limitX[0] ||
				this.area.x1 + mX > this.limitX[1]
			){
				mX = this.moveX *= -1;
			}else if(intersectArea(vArea, player.area)){
				const alpha = centerArea(vArea).sub(centerArea(player.area)).angle();
				mX = this.moveX *= Math.sign(Math.cos(alpha));
				mY = this.moveY *= Math.sign(Math.sin(alpha));
			}else if(vArea.y2 > player.area.y2){
				this.area = {
					x1 : this.initPos.x,
					y1 : this.initPos.y,
					x2 : this.initPos.x + this.element.offsetWidth,
					y2 : this.initPos.y + this.element.offsetHeight
				}
				mX = this.moveX = 0;
				mY = this.moveY = 0;
				setTimeout(()=>this.start(), 500);
			}else{
				loop1:
				for(const line of lines){
					if(intersectArea(vArea, line.area)){
						loop2:
						for(const char of line.chars){
							if(intersectArea(vArea, char.area)){
								
								char.kill();
								
								mX = this.moveX *= 1;
								mY = this.moveY *= -1;
								break loop1;
							}
						}
					}
				}
			}

			this.area.x1 += mX;
			this.area.x2 = this.area.x1 + this.element.offsetWidth;
			
			this.area.y1 += mY;
			this.area.y2 = this.area.y1 + this.element.offsetHeight;
			this.element.style.left = this.area.x1 + "px";	
			this.element.style.top = this.area.y1 + "px";
		}
	}
}