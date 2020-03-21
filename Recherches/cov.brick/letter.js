/*----------------------------------------*\
  19-20_AN1_256x256x256 - letter.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2020-03-21 02:11:50
  @Last Modified time: 2020-03-21 03:05:35
\*----------------------------------------*/

class Letter{
	constructor(char, parentElement, id){
		this.id = id;
		this.element = document.createElement("span");
		this.element.innerText = char;
		this.element.classList.add("letter");
		this.isAlive = true;
		parentElement.append(this.element);
	}
	update(deltaTime, parent){
		if(!this.isAlive)return false;
		this.isAlive = this.element.innerText != " ";
		this.area = {
			x1 : this.element.offsetLeft,
			y1 : this.element.offsetTop,
			x2 : this.element.offsetLeft + this.element.offsetWidth,
			y2 : this.element.offsetTop + this.element.offsetHeight
		}
		return this.isAlive;
	}
	kill(){
		this.isAlive = false;
		this.element.innerText = " ";
	}
}