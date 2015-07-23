function switchen(){
	var c = new colorValues(); 
	var m = new measureObject();
	
	//mått på svgn
	this.width = m.switchHolder_w;
	var height = m.switchHolder_h;
	
	//mått på stora rektangeln
	this.switchContWidth = this.width*0.7;
	var switchContHeight = height*0.45;
	var xPos = (this.width-this.switchContWidth)*0.5;
	
	this.theSwitchLeft = 1;
	
	var color = c.color;
	
	var firstTextPos = height*0.09;
	var indent = this.width*0.04;
	var textSeparation = height*0.1;
	

	var svg = d3.select("#switchHolder")
					.append("svg")
					.attr("width", this.width +"px")
					.attr("height", height+"px");
	
	var rect = svg
					.append("svg:image")
					.attr("xlink:href", "../bilder/nub_bg.png")
					.attr("width", this.switchContWidth)
					.attr("height", switchContHeight)
					.on("mouseover", mouseOverText)
					.on("mouseout", mouseOutText)
					.attr("x", xPos)
					.attr("y", height-switchContHeight);
					
					

	var theSwitch = svg
						.append("svg:image")
						.attr("xlink:href", "../bilder/nub.png")
						.attr("width", this.switchContWidth*0.6)
						.attr("height", switchContHeight*0.93)
						.on("mouseover", mouseOverText)
						.on("mouseout", mouseOutText)
						.attr("x", this.width*0.2 + this.switchContWidth*0.25)
						.attr("y", height-switchContHeight*0.93);
					
					
	var text1 = svg.append("text")
					.attr("text-anchor", "end")
					.style("font-size",function(d,i){return 8+"pt";})
					.style("font-family", "Museo500")
					.attr("x", this.width*0.1 + this.switchContWidth*0.45)
					.attr("y", height-switchContHeight-8)
					.attr("fill", c.color(0.6))
					.text("Topp100");
					
	var text2 = svg.append("text")
					.attr("text-anchor", "begin")
					.style("font-family", "Museo500")
					.style("font-size",function(d,i){return 8+"pt";})
					.attr("x", this.width*0.1 + this.switchContWidth*0.55)
					.attr("y", height-switchContHeight-8)
					.attr("fill", c.color(0.1))
					.text("Runt mig");
	
	this.r = rect;
	this.sw = theSwitch;
	this.text1 = text1;
	this.text2 = text2;
	
};