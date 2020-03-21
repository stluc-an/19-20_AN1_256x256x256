/*----------------------------------------*\
  19-20_AN1_256x256x256 - line.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-03-21 02:11:17
  @Last Modified time: 2020-03-21 03:52:59
\*----------------------------------------*/


class Line{
	constructor(content, id){
		this.id = id;
		this.isAlive = true;
		this.element = document.createElement("div");
		this.chars = content.split("").map((char, k) => new Letter(char, this.element, k));
		document.querySelector(".container").append(this.element);
		this.wrapper = document.querySelector(".wrapper");
	}
	update(deltaTime){
		const y = this.element.offsetTop-this.wrapper.scrollTop;
		if(!this.isAlive || y<0 || y + this.element.offsetHeight > 256)return false;
		this.area = {
			x1 : this.element.offsetLeft,
			y1 : this.element.offsetTop,
			x2 : this.element.offsetLeft + this.element.offsetWidth,
			y2 : this.element.offsetTop + this.element.offsetHeight
		}
		let alive = false;
		let cChars = [];
		for(const char of this.chars){
			if(char.update(deltaTime, this)){
				cChars.push(char);
			}
			alive |= char.isAlive;
		}
		this.chars = cChars;
		this.isAlive = alive;
		return true;
	}
}