function slider(timeDiagram, timeObject, visits){

	//privata varabler
	var c = new colorValues(); 
	var m = new measureObject2();
	
	var width = m.slider_w;
	var height = m.height*0.12;
	
	var sliderRectWidth;
	var x1Pos;
	var x2Pos;
	var endPos;
	var globalPos;
	
	var showInt = 8;
	var halfShowInt = 4;
	
	var plotWidth = width*0.8;
	var plotHeight = height*0.55;
	
	var plotIndent = (width - plotWidth)/2;
	//this.plotIndent = plotIndent;
	
	var xScale = d3.scale.linear()
                     .domain([0,timeObject.nrOfItems-1])
                     .range([plotIndent, plotWidth]);
					 
	this.xScale = xScale;
					 
	var yScale = d3.scale.linear()
                    .domain([Math.max.apply(Math, visits),0])
					.range([0, plotHeight]);
	
	var sliderD = d3.select("#sliderDiv");
	
	//div för alla grafiska grejer
	var sliderDiv = sliderD
						.append("div")
						.attr("id","sliderDiven")
						.style("width", "100%")
						.style("height", "100%")
						.style("z-index", "1")
						.style("bottom", 0)
						.style("left",0);
						
	//div ovanpå alla grafiska grejer för att hålla koll på museventet
	//används i eventHandlern
	var mouseOverDiv = sliderD
							.append("div")
							.attr("id", "mouseDiv")
							.style("position","absolute")
							.style("width", xScale(timeObject.nrOfItems-1)-xScale(0))
							.style("height",plotHeight)	
							.style("top","0%")
							.style("z-index", "100")
							.style("left", xScale(0));
							
	//används av eventHandlern för att kolla muspekaren				
	this.mouseOverDiv = mouseOverDiv;
	
	//svg för alla grafiska grejer
	var sliderContainer = sliderDiv
							.append("svg")
							.attr("id", "sliderContainer")
							.attr("width", width)
							.attr("height", height*0.9);

	var g = sliderContainer.append("svg:g")
					.attr("width", plotWidth)
					.attr("height", plotHeight);
					//.attr("fill", c.lineColor)
					//.attr("transform", "translate("+plotIndent+"," + 0+ ")");
					//.attr("x", plotIndent);
			
			
	createSubPath(0, timeObject.nrOfYears,c.backRect1);
	createSubPath(timeObject.nrOfYears,timeObject.nrOfYears+12,c.backRect2);
	createSubPath(timeObject.nrOfYears+12,timeObject.nrOfItems-1,c.backRect3);
	
	
	//ritar text och bakgrund
	drawBackgroundRects();	
	//kollar om man är i ändarna av grafen
	checkSelectedIndex();
	//ritar slidern
	drawSliderRect();
	
//***************************************************publika funktioner***********************************************************************	
	this.getMiddleIndex = function(){
		return timeObject.middleIndex;
	};
	
	this.updateMiddleIndex = function(index){
		timeObject.middleIndex = index;
		checkSelectedIndex();
		changeSliderRect(timeObject.middleIndex);
	};
	
	this.updateMiddleIndexSlower = function(index){
		timeObject.middleIndex = index;
		checkSelectedIndex();
		changeSliderRectSlower(timeObject.middleIndex);
		
	};
	
//***************************************************privata funktioner***********************************************************************			
	function createSubPath(startInd, stopInd, col){
		var temp = [];
		for(i=startInd;i<stopInd+1;i++){
			temp.push(visits[i]);
		}
		
		var line = d3.svg.line()
						.x(function(d,i) {return xScale(i+startInd);})
						.y(function(d,i) {return yScale(d);});
		
		var areaEnd = " L "+xScale(stopInd)+" "+ (yScale(0))+" L "+xScale(startInd)+" "+(yScale(0))+" Z";

		g.append("path")
			.style("fill", col)
			.style("opacity", 0.8)
			.attr("d", line(temp) + areaEnd);
	
	};
	
	function drawSliderRect(){
		sliderRectWidth = xScale(showInt)-xScale(0);
		x1Pos = xScale(timeObject.middleIndex-halfShowInt);
		x2Pos = x1Pos+sliderRectWidth;
		
		endPos =  xScale(timeObject.nrOfItems-1);
		startPos = plotIndent;
		var hack = xScale(2)-xScale(1);
		var imageHeight = (sliderRectWidth*1.1)/1.492;
		var imageYpos = (imageHeight-plotHeight)*0.5;
	
	
					
	sliderContainer.append("rect")
					.attr("id","sliderRectLeft")
					.attr("width", x1Pos-xScale(0))
					.attr("height",plotHeight)		
					.attr("fill","white")
					.style("opacity", 0.6)
					.attr("x", startPos)
					.on("mouseover", overSliderRect)
					.on("mouseout", outSliderRect);
					
	sliderContainer.append("rect")
					.attr("id","sliderRectRight")
					.attr("width",  endPos-x2Pos)
					.attr("height",plotHeight)		
					.attr("fill","white")
					.style("opacity", 0.6)
					.attr("x", x2Pos)
					.on("mouseover", overSliderRect)
					.on("mouseout", outSliderRect);
				
	sliderContainer
					.append("svg:image")
					.attr("xlink:href", "Images/slider.png")
					.attr("id", "sliderImage")
					.attr("width", sliderRectWidth*1.1)		
					.attr("height",imageHeight)
					.style("opacity", 1)
					.attr("x", x1Pos-hack*0.5)
					.attr("y", -imageYpos)
					.on("mouseover", overSliderRect)
					.on("mouseout", outSliderRect);
	
	};
	
	function changeSliderRect(){
		
		sliderRectWidth = xScale(showInt)-xScale(0);
		x1Pos = xScale(timeObject.middleIndex-halfShowInt);
		x2Pos = x1Pos+sliderRectWidth;
		
		endPos =  xScale(timeObject.nrOfItems-1);
		startPos = xScale(0);
		
		var hack = xScale(2)-xScale(1);
		
		d3.select("#sliderImage")	
						.attr("x", x1Pos-hack*0.5);
						
		d3.select("#sliderRectLeft")
						.attr("width", x1Pos-xScale(0))
						.attr("x",startPos);
						
		d3.select("#sliderRectRight")
						.attr("width", endPos-x2Pos)	
						.attr("x", x2Pos);
		
	
	};
	
	function changeSliderRectSlower(){
		
		sliderRectWidth = xScale(showInt)-xScale(0);
		x1Pos = xScale(timeObject.middleIndex-halfShowInt);
		x2Pos = x1Pos+sliderRectWidth;
		
		endPos =  xScale(timeObject.nrOfItems-1);
		startPos = xScale(0);
	
		var hack = xScale(2)-xScale(1);
		
		d3.select("#sliderImage")
						.transition()
						.delay(0)
						.duration(1000)
						.attr("x", x1Pos-hack*0.5);
		d3.select("#sliderRectLeft")
						.transition()
						.delay(0)
						.duration(1000)
						.attr("width", x1Pos-xScale(0))
						.attr("x", startPos);
						
		d3.select("#sliderRectRight")
						.transition()
						.delay(0)
						.duration(1000)
						.attr("width", endPos-x2Pos)	
						.attr("x", x2Pos);
	
	};
	
	function overSliderRect(){
		document.body.style.cursor = 'e-resize';
	};
	
	function outSliderRect(){
		document.body.style.cursor = 'default';
	};
	
	
	//kollar om man är i ändarna av grafen
	function checkSelectedIndex(){
		//längst ut till höger
		if(timeObject.middleIndex > timeObject.nrOfItems-1-(halfShowInt)){
				timeObject.middleIndex = timeObject.nrOfItems-1-(halfShowInt);
		}//längst ut till vänster
		else if(timeObject.middleIndex < halfShowInt){
				timeObject.middleIndex = halfShowInt;
		}
	};
	
	
	function drawBackgroundRects(){
		/*sliderContainer.append("rect")
					.attr("width", xScale(timeObject.nrOfYears))
					.attr("height",plotHeight)		
					//.style("stroke", "white")
					//.style("stroke-width", 2)
					.attr("fill", c.backRect1)
					.style("opacity", 0.7)
					.attr("x", plotIndent);
					
		sliderContainer.append("rect")
					.attr("width",  xScale(12+timeObject.nrOfYears)-xScale(timeObject.nrOfYears))
					.attr("height",plotHeight)		
					//.style("stroke", "white")
					//.style("stroke-width", 2)
					.attr("fill", c.backRect2)
					.style("opacity",  0.7)
					.attr("x", plotIndent+xScale(timeObject.nrOfYears));
					
		sliderContainer.append("rect")
					.attr("width",  xScale(timeObject.showDays-1))
					.attr("height",plotHeight)		
					//.style("stroke", "")
					//.style("stroke-width", 2)
					.attr("fill", c.backRect3)
					.style("opacity",  0.7)
					.attr("x", plotIndent+xScale(timeObject.nrOfYears)+xScale(12+timeObject.nrOfYears)-xScale(timeObject.nrOfYears));*/
			
			//skriver texten ovanför slidern
			var nr = Math.round(timeObject.nrOfYears*0.5);
			var nr2 = Math.round(timeObject.showDays*0.5);
			drawText(xScale(nr),15,"Visar år",c.onDarkBackground);
			drawText(xScale(timeObject.nrOfYears+6),15,"Visar månader",c.onDarkBackground);
			drawText(xScale(timeObject.nrOfYears+12+nr2),15,"Visar Dagar",c.onDarkBackground);
				
				//ritar infon under själva slidern
				//drawLine(xScale(0),plotHeight+height*0.15,xScale(timeObject.nrOfItems-1),plotHeight+height*0.15);
				drawArrowAndText(xScale(0), "Bloggens födelse");
				drawArrowAndText(xScale(timeObject.nrOfItems-1), "Igår");
					
		sliderContainer.append("text")
				.attr("class", "no-select")
				.attr("x",function(d,i){
										return xScale(timeObject.nrOfYears+6);
									})
				.attr("y", function(d,i){
										return plotHeight+15;
									})
				.style("font-size", function(){return 8+"pt";})
				.attr("text-anchor", "middle")
				.text(function(){return "Senaste 12 månaderna"})
				.attr("fill", c.backRect2)
				.attr("opacity",1);
				

		sliderContainer.append("text")
				.attr("class", "no-select")
				.attr("x",function(d,i){
										return xScale(timeObject.nrOfYears+12+(timeObject.showDays/2));
									})
				.attr("y", function(d,i){
										return plotHeight+15;
									})
				.style("font-size", function(){return 8+"pt";})
				.attr("text-anchor", "middle")
				.text(function(){return "Senaste 30 dagarna"})
				.attr("fill",c.backRect3)
				.attr("opacity",1);
		
	};
	
	function drawText(x,y,text,color){
		sliderContainer.append("text")
				.attr("class", "no-select")
				.attr("x",function(d,i){
										return x;
									})
				.attr("y", function(d,i){
										return y;
									})
				.style("font-size", function(){return 9+"pt";})
				.attr("text-anchor", "middle")
				.text(text)
				.attr("fill", color)
				.attr("opacity",0.8);
	
	};
	
	function drawArrowAndText(x,text){
		var lineLength = height*0.2;
			
			sliderContainer.append("line")
							.attr("x1", function(d,i){return x;})
							.attr("y1", function(d,i){return plotHeight;})
							.attr("x2", function(d,i){return x;})
							.attr("y2", function(d,i){return plotHeight+lineLength;})
							.attr("opacity",1)
							.attr("stroke", c.lineColor)
							.attr("stroke-width", 1);
							
							var x1 = x;
							var y1 = plotHeight;
							var x2 = x1-5;
							var y2 = y1+7;
							var x3 = x1+5;
							var y3 = y1+7;
									
			sliderContainer
					.append("path")
					.attr("d", "M " +x1+ " " + y1 + " L " + x2 +" "+ y2 +" L" +x3 +" "+y3 +" Z")
					.attr("opacity",1)
					.attr("fill", c.lineColor);
					
			sliderContainer.append("text")
				.attr("class", "no-select")
				.attr("x",function(d,i){
										return x;
									})
				.attr("y", function(d,i){
										return plotHeight+lineLength+10;
									})
				.style("font-size", function(){return 7+"pt";})
				.attr("text-anchor", "middle")
				.text(text)
				.attr("fill", c.textColor)
				.attr("opacity",0.8);
	};
	
	function drawLine(x1,y1,x2,y2){
			sliderContainer
							.append("line")
							.attr("x1",x1)
							.attr("y1", y1)
							.attr("x2", x2)
							.attr("y2", y2)
							.attr("opacity",1)
							.attr("stroke", c.lineColor)
							.attr("stroke-width", 1);
	};
	


}