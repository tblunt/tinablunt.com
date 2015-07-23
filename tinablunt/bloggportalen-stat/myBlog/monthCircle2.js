function monthCircle2(timeObject, d1, d2){

	var nrOfItems = timeObject.nrOfItems;
	var nrOfYears = timeObject.nrOfYears;
	var mlbl = timeObject.getLabelArray();
	var short_mlbl = timeObject.getShortMonths();
	var monthDays = timeObject.monthDays;
	
	var boolArray = [];
	var posArray = [[],[]];
	var data = [];
	var data2 = [];
	var vPd = [];
	var iPd = [];
	var vPi = [];
	var mousePos;
	var isMouseDown = false;
	
	var color = d3.scale.linear().domain([0,1]).range(["hsl(100, 61%, 50%)", "hsl(240, 71%, 50%)"]).interpolate(d3.interpolateHsl);
	var color2 = d3.scale.linear().domain([0,1]).range(["hsl(100, 61%, 30%)", "hsl(240, 71%, 30%)"]).interpolate(d3.interpolateHsl);
	/*var termoColor = "#35E341";
	var termoColor2 = "#86E335";*/
	var termoColor = "#E00000";
	var termoColor2 = "#E00000";
	
	
	var xScale = d3.scale.linear()
                     .domain([0, nrOfItems-1])
                     .range([0, window.innerWidth*0.85]);
					 
	for(i = 0;i<d1.length;i++){
			//tar bort de första platserna(åren) i arrayen för att månaderna bara ska ha bollar
			if(i > nrOfYears-1){
				data.push(d1[i]);
				data2.push(d2[i]);
				vPd.push(d1[i]/monthDays[i-nrOfYears]);
				iPd.push(d2[i]/monthDays[i-nrOfYears]);
				vPi.push(d1[i]/d2[i-nrOfYears]);
			}
		}
	
	var max = Math.max.apply(Math, data);//temp[0];//jsondata.items[0].inlinks;
	var max2 = Math.max.apply(Math, data2);//jsondata.items[0].inlinks;
	var max_vPd = Math.max.apply(Math, vPd);
	var max_iPd = Math.max.apply(Math, iPd);
	var max_vPi = Math.max.apply(Math, vPi);
	
	
	var width = window.innerWidth;
	var height = window.innerHeight;
	var topPos = height*0.535;
	var minRadius = height*0.008;
	var maxRadius = 30;
	var yPosMulti = -((width*0.18)/max);
	var radiusMulti = maxRadius/max;
	
	var boxWidth = window.innerWidth*0.22;
	var boxHeight = window.innerWidth*0.09;
	
	var boxXPlacement = window.innerWidth/(nrOfItems-1);
	var boxYPlacement = window.innerHeight*0.03;
	var boxStartXPlacement = boxXPlacement*0.2;

	
	
	var circleStartPos = width*0.058;
	var innerRects;
	var meter =[];
	var vis = d3.select("#chart5")
			.append("svg:svg")
			.attr("id","monthCircCont")
			.attr("width", width)
			.attr("height", height*0.85)
			.on("mousemove", setMousePos);

			
		var dataEnter = vis.selectAll("circle")
						.data(data)
						.enter();
						
		var boxLines = vis		
						.selectAll("#hej")
						.data(data)
						.enter()
						.append("line")
						.attr("id", "hej")
						.attr("x1", function(d,i){return 0;})
						.attr("y1", function(d,i){return 0;})
						.attr("x2", function(d,i){return circleStartPos+xScale(i+nrOfYears);})
						.attr("y2", function(d,i){return d*yPosMulti+topPos;})
						.attr("opacity", 1)
						.attr("stroke", "white")
						.attr("stroke-width", 1)
						.attr("visibility","hidden");	

		
						
		//skapar svg-container till alla inforektanglar
		var rectSvg = dataEnter
							.append("svg")
							.attr("id", "monthRect")
							.attr("width", boxWidth)
							.attr("height", boxHeight)
							.attr("x", function(d,i){ 
											posArray[0][i] = boxStartXPlacement+i*boxXPlacement;
											
											d3.select(boxLines[0][i])
												.attr("x1", function(){return posArray[0][i];});
												
											return posArray[0][i];
										})
							.attr("y", function(d,i){
											if(i<5){
												posArray[1][i] = height*0.01 - ((i-5)*boxYPlacement);
											}
											else{
												posArray[1][i] = height*0.01 + ((i-5)*boxYPlacement);
											}
											d3.select(boxLines[0][i])
												.attr("y1", function(){return posArray[1][i]+boxHeight;});
												
											return posArray[1][i];
										})
							.on("mousedown", moveDownEvent)
							.on("mouseup", moveUpEvent)
							.on("mousemove", MoveEvent)
							.on("mouseout", moveOutEvent);
							
		var mlabels = 	rectSvg
							.append("text")
							.attr("text-anchor", "end")
							.attr("class", "no-select")
							.style("font-size",function(d,i){return 13+"pt";})
							.attr("fill", function(d,i){return color(i/data.length);})
							.attr("id", "lbl")
							.attr("x", function(d,i){	
															return boxWidth-5;
														})
							.attr("y", function(){return boxHeight*0.15;})
							.text(function(d,i){
													return mlbl[nrOfYears+i];})
							.on("mousedown", moveDownEvent)
							.on("mouseup", moveUpEvent)
							.on("mouseover", moveOverEvent)
							.on("mousemove", specialMove)
							.attr("visibility","hidden");
		
		
		
		
		drawInternalTermo();
		
		//lägger till en rektangle i varje svg-container	
		var rects =	rectSvg.append("svg:rect")
						.attr("class", "node")
						.attr("width", boxWidth)
						.attr("height", boxHeight)
						.attr("x", function(d,i){		
														return 0;
													})
						.attr("y", function(d,i){return 0;})
						.attr("stroke", "white")
						.attr("stroke-width", 2)
						.attr("fill",function(d,i){ 
										return "black";
									})
						.attr("opacity", 0.2)
						.attr("visibility","hidden");
						
		
						
		var circles = dataEnter.append("circle")
						.attr("class", "boll")
						.attr("cx", function(d,i){
													return circleStartPos+xScale(i+nrOfYears);
												})
						.attr("cy", function(d,i){
													return d*(yPosMulti)+topPos;})
						.attr("r", function(d){return minRadius+d*radiusMulti;})
						.attr("fill", function(d,i){
											return color(i/data.length);
									})
						.on("mouseover", mouseOverEvent)
						.on("mouseout", mouseOutEvent)
						.on("mousedown", mouseDownEvent);
		
		
		var lineEnter = vis
							.selectAll("#lines")
							.data(data)
							.enter();
				
		var cirlceLines = lineEnter
						.append("svg:line")
						.attr("id", "lines")
						.attr("x1", function(d,i){return circleStartPos+xScale(i+nrOfYears);})
						.attr("y1", function(d,i){return d*(yPosMulti)+topPos+d*radiusMulti;})
						.attr("x2", function(d,i){return circleStartPos+xScale(i+nrOfYears);})
						.attr("y2", function(d,i){return window.innerHeight*0.8;})
						.attr("opacity", 0.3)
						.attr("stroke", "white")
						.attr("stroke-width", 1)
						.attr("strok-dasharray",0.5);
			
		drawRightLabel();
				
		

		vis.style("opacity", 1e-6)
		  .transition()
			.duration(1000)
			.style("opacity", 1);
		

											 

		
	//***********************************************************************************************************/
	
			
	function mouseOverEvent(d,i){
		var ind = i;
		var D = d;
		document.body.style.cursor = 'pointer';
		d3.select(this)
			.attr("fill", "white");
		
		vis.append("text")
			.attr("id", "hooverLabel")
			.attr("class", "no-select")
			.attr("text-anchor", "end")
			.attr("x",function(){return circleStartPos+xScale(ind+nrOfYears)-(minRadius+D*radiusMulti);})
			.attr("y",function(){return D*(yPosMulti)+topPos;})
			.attr("fill", color2(ind/data.length))
			.text(function(d,i){return mlbl[ind+nrOfYears];});
	};
	
	function mouseOutEvent(d,i){
		document.body.style.cursor = 'default';
		var ind = i;
		
		d3.select("#hooverLabel")
			.remove();
			
		d3.select(this)
			.attr("fill",function(d,i){
									if(boolArray[ind]==1){
										return "white";	
									}
									else{
										return color(ind/data.length);
									}
									});
	};
		
	function mouseDownEvent(d,i){

		var clickedIndex = i;
		var clickedData = d;
		
		d3.select(this)
			.attr("fill", function(d,i){
											if(boolArray[clickedIndex] == 1){
												d3.select(boxLines[0][clickedIndex])
													.attr("visibility","hidden");
						
												d3.select(rectSvg[0][clickedIndex])
													.selectAll("rect")
													.attr("visibility","hidden");	
												
												d3.select(rectSvg[0][clickedIndex])
													.selectAll("path")
													.attr("visibility","hidden");	
												
												d3.select(rectSvg[0][clickedIndex])
													.selectAll("text")
													.attr("visibility","hidden");	
													
												d3.select(rectSvg[0][clickedIndex])
													.selectAll("line")
													.attr("visibility","hidden");	
												boolArray[clickedIndex] = 0;
												return color(clickedIndex/data.length);
											}
											else{
												d3.select(boxLines[0][clickedIndex])
													.attr("visibility","visible");
												
												d3.select(rectSvg[0][clickedIndex])
													.selectAll("rect")
													.attr("visibility","visible");
													
												d3.select(rectSvg[0][clickedIndex])
													.selectAll("text")
													.attr("visibility","visible");	
												
												d3.select(rectSvg[0][clickedIndex])
													.selectAll("path")
													.attr("visibility","visible");												

												d3.select(rectSvg[0][clickedIndex])
													.selectAll("line")
													.attr("visibility","visible");	
													
												boolArray[clickedIndex] = 1;
												return "white";
											}
										});
			

	};
	

	var index;
	var moveRectPos = [];
	//-*****************************************************************************************************//
		function setMousePos(){
			mousePos = d3.mouse(this);
		
		};
		
		function moveOutEvent(d,i){
			document.body.style.cursor = 'default';
			if(isMouseDown == true){
				isMouseDown = false;
			}
		};
		
		function moveOverEvent(){
			document.body.style.cursor = 'move';
		};
		
		function moveDownEvent(d,i){	
			index = i;
			isMouseDown = true;
		};
		
		function moveUpEvent(d,i){
			document.body.style.cursor = 'default';
			isMouseDown = false;
		};
		
		function MoveEvent(d,i){
			document.body.style.cursor = 'move';
			if(isMouseDown == true)
			{	
				
				setMoveRectPos();

				d3.select(this)
					.attr("x", mousePos[0]-boxWidth/2)
					.attr("y", mousePos[1]-boxHeight/2);
				
				d3.select(boxLines[0][index])
					.attr("x1", function(){return posArray[0][index];})
					.attr("y1", function(){return posArray[1][index]+boxHeight/2;})
			}
		
		};
		
		function specialMove(){
			document.body.style.cursor = 'move';
		};
		
		function setMoveRectPos(){

			if(checkCollision() == false){
				/*for(i=0;i<data.length,i++){
					
				
				}*/
			}
			else{
					posArray[0][index] = mousePos[0]-boxWidth/2;
					posArray[1][index] = mousePos[1];
			}
		};
		
		function checkCollision(){
				return true;
		};

		function drawRightLabel(){
					//den vertikala linjen som markerar ballongernas början
					vis.append("svg:line")
									.attr("x1", function(d,i){return window.innerWidth*0.03;})
									.attr("y1", function(d,i){return window.innerHeight*0.54;} )
									.attr("x2", function(d,i){return width*0.96;})
									.attr("y2", window.innerHeight*0.54)
									.attr("opacity", 0.5)
									.attr("stroke", "gray")
									.attr("stroke-width", 1)
									.attr("strok-dasharray",0.5);
					
					vis.append("text")
							.attr("class", "no-select")
							.attr("x", function(d,i){return width*0.995;})
							.attr("y", window.innerHeight*0.285)
							.style("font-size", function(){return 8+"pt";})
							.attr("text-anchor", "end")
							.text("BloggAktivitet")
							.attr("fill", "gray");

					vis.append("line")
								.attr("x1", function(d,i){return window.innerWidth*0.95;})
								.attr("y1", function(d,i){return window.innerHeight*0.3;})
								.attr("x2", function(d,i){return window.innerWidth*0.95;})
								.attr("y2", function(d,i){return window.innerHeight*0.54;})
								.attr("opacity",0.4)
								.attr("stroke", "white")
								.attr("stroke-width", 1);
					
					var x1 = window.innerWidth*0.95;
					var y1 = window.innerHeight*0.29;
					var x2 = x1-5;
					var y2 = y1+10;
					var x3 = x1+5;
					var y3 = y1+10;
							
					vis
						.append("path")
							.attr("d", "M " +x1+ " " + y1 + " L " + x2 +" "+ y2 +" L" +x3 +" "+y3 +" Z")
							.attr("opacity",0.4)
							.attr("fill", "white");	

		};
		
		function drawInternalTermo(){

			var y1 = boxHeight*0.23;
			var y2 = boxHeight*0.8;
			var tickSize = boxWidth*0.035;
			
	
			//positioner för första termometern
			var x2 = boxWidth*0.1;
			//positioner för andra termometern
			var x1 = boxWidth*0.28;
			var x3 = boxWidth*0.46;
			var x4 = boxWidth*0.64;
			var x5 = boxWidth*0.82;
			
			
			var lineHeight = (y2)-y1;
			var heightMulti1 = lineHeight/max;
			var heightMulti2 = lineHeight/max2;
			var heightMulti_vPd = lineHeight/max_vPd;
			var heightMulti_iPd = lineHeight/max_iPd;
			var heightMulti_vPi = lineHeight/max_vPi;
			
			var textSeparation = boxHeight*0.09;
			
			//ritar fyllningen i termometrarna
			drawTermoRect(x1-4,y2,heightMulti1,data);
			drawTermoRect(x2-4,y2,heightMulti2,data2);
			drawTermoRect(x3-4,y2,heightMulti_vPd,vPd);
			drawTermoRect(x4-4,y2,heightMulti_iPd,iPd);
			drawTermoRect(x5-4,y2,heightMulti_vPi,vPi);
			
					
			//ritar termometerLinjerna
			drawLineInRect(x1,y1,x1,y2,"white");
			drawLineInRect(x2,y1,x2,y2,"white");
			drawLineInRect(x3,y1,x3,y2,"white");
			drawLineInRect(x4,y1,x4,y2,"white");
			drawLineInRect(x5,y1,x5,y2,"white");
			
			//ritar ticksen(uppe)
			drawLineInRect(x2-tickSize*0.5,y1,x2+tickSize*0.5,y1,"white");
			drawLineInRect(x1-tickSize*0.5,y1,x1+tickSize*0.5,y1,"white");
			drawLineInRect(x3-tickSize*0.5,y1,x3+tickSize*0.5,y1,"white");
			drawLineInRect(x4-tickSize*0.5,y1,x4+tickSize*0.5,y1,"white");
			drawLineInRect(x5-tickSize*0.5,y1,x5+tickSize*0.5,y1,"white");
			
			//ritar ticksen(nere)
			drawLineInRect(x2-tickSize*0.5,y2,x2+tickSize*0.5,y2,"white");
			drawLineInRect(x1-tickSize*0.5,y2,x1+tickSize*0.5,y2,"white");
			drawLineInRect(x3-tickSize*0.5,y2,x3+tickSize*0.5,y2,"white");
			drawLineInRect(x4-tickSize*0.5,y2,x4+tickSize*0.5,y2,"white");
			drawLineInRect(x5-tickSize*0.5,y2,x5+tickSize*0.5,y2,"white");
			

			//ritar alla småticks
			for(i=0; i<4;i++){
				drawLineInRect(x1-tickSize*0.2,y1+i*(lineHeight/4),x1+tickSize*0.2,y1+i*(lineHeight/4),"white");
				drawLineInRect(x2-tickSize*0.2,y1+i*(lineHeight/4),x2+tickSize*0.2,y1+i*(lineHeight/4),"white");
				drawLineInRect(x3-tickSize*0.2,y1+i*(lineHeight/4),x3+tickSize*0.2,y1+i*(lineHeight/4),"white");
				drawLineInRect(x4-tickSize*0.2,y1+i*(lineHeight/4),x4+tickSize*0.2,y1+i*(lineHeight/4),"white");
				drawLineInRect(x5-tickSize*0.2,y1+i*(lineHeight/4),x5+tickSize*0.2,y1+i*(lineHeight/4),"white");
			}
			

			

			//termoLabel
			addText("Inlägg", x2, y2+10,"middle","white");
			addText("totalt", x2, y2+20,"middle","white");
			
			addText("Besökare", x1, y2+10,"middle","white");
			addText("totalt", x1, y2+20,"middle","white");
			
			addText("Besökare/", x3, y2+10,"middle","white");
			addText("dag", x3, y2+20,"middle","white");
			
			addText("Inlägg/", x4, y2+10,"middle","white");
			addText("dag", x4, y2+20,"middle","white");
			
			addText("Besökare/", x5, y2+10,"middle","white");
			addText("inlägg", x5, y2+20,"middle","white");
			
			//RekordnivåLabel
			addText("Rekord-", 2, textSeparation,"begin","gray");
			addText("nivå", 2, textSeparation*2,"begin","gray");
			drawLineInRect(2,y1,x2-10,y1,"white");
				//pilen
					rectSvg
						.append("path")
						.attr("d", "M " + (x2-10) + " " + y1 + " L " + (x2-15) +" "+ (y1+5) +" L" +(x2-15) +" "+(y1-5) +" Z")
						.attr("opacity",1)
						.attr("visibility","hidden")
						.attr("fill", "gray");	
				
			//ritar röda siffrorna
			drawNumbers(x1,y2,heightMulti1,data);
			drawNumbers(x2,y2,heightMulti2,data2);
			drawNumbers(x3,y2,heightMulti_vPd,vPd);
			drawNumbers(x4,y2,heightMulti_iPd,iPd);
			drawNumbers(x5,y2,heightMulti_vPi,vPi);



			
			
			//Mer infoText
		/*				rectSvg
							.append("text")
							.attr("fill",function(d,i){
														return color(i/data.length);
														})
							.attr("class", "no-select")
							.attr("text-anchor", "end")
							.style("font-size",function(d,i){return 8+"pt";})
							.attr("id", "lbl")
							.attr("x", function(d,i){	
														return boxWidth-10;
													})
							.attr("y", function(){return boxHeight-textSeparation*4;})
							.text(function(d,i){return "Genomsnitt för "+ short_mlbl[nrOfYears+i]+":";})
							.attr("visibility","visible")
							.on("mousedown", moveDownEvent)
							.on("mouseup", moveUpEvent)
							.on("mouseover", moveOverEvent)
							.on("mousemove", specialMove)
							.attr("visibility","hidden");
						
			addTextAndData("Besökare / dag", data, boxWidth-10, boxHeight-textSeparation*3);
			addTextAndData("Inlägg / dag", data2, boxWidth-10, boxHeight-textSeparation*2);
			addTextAndDoubleData("Läsare / blogginlägg", data, data2, boxWidth-10, boxHeight-textSeparation);*/
			
			
		};
		
		function drawNumbers(x,y,heightMulti,data){
			rectSvg
				.append("text")
				.attr("fill",termoColor)
				.attr("text-anchor", "begin")
				.attr("class", "no-select")
				.style("font-size",function(d,i){return 7+"pt";})
				.attr("id", "lbl")
				.attr("x", function(d,i){	
										return x+6;
							})
				.attr("y", function(d,i){	
										return y-2-data[i]*heightMulti;})
				.text(function(d,i){return Math.round(data[i]);})
				.attr("visibility","visible")
				.on("mousedown", moveDownEvent)
				.on("mouseup", moveUpEvent)
				.on("mouseover", moveOverEvent)
				.on("mousemove", specialMove)
				.attr("visibility","hidden");
			drawDataLineInRect(data,x,y,termoColor,heightMulti);
		
		};
		
		function drawTermoRect(x,y,heightMulti,data){
				rectSvg
					.append("rect")
					.attr("x", function(d,i){
											return x;
										})
					.attr("y", function(d,i){
											return y-data[i]*heightMulti;
										})
					.attr("width", function(d,i){
											return 8;
										})
					.attr("height", function(d,i){
											return data[i]*heightMulti;
										})
					.attr("fill", function(d,i){
											return color(i/data.length);
										})
					.attr("visibility","hidden")
					.attr("opacity",1);
		};
		
		
		function drawLineInRect(x1,y1,x2,y2,color){
			vis.selectAll("#monthRect")
							.append("svg:line")
							.attr("x1",x1)
							.attr("y1", y1)
							.attr("x2", x2)
							.attr("y2", y2)
							.attr("opacity",1)
							.attr("stroke", color)
							.attr("stroke-width", 0.7)
							.attr("visibility","hidden");
		
		};
		
		function drawDataLineInRect(data,x,y,color,hm){
			vis.selectAll("#monthRect")
							.append("svg:line")
							.attr("x1",x+boxWidth*0.07)
							.attr("y1",function(d,i){
											return  y-data[i]*hm;
										})
							.attr("x2", x)
							.attr("y2", function(d,i){
											return  y-data[i]*hm;
										})
							.attr("opacity",1)
							.attr("stroke", color)
							.attr("stroke-width", 2)
							.attr("visibility","hidden");
		
		};
		
		function addText(text,xPos,yPos, anchorPoint,color){
				rectSvg
							.append("text")
							.attr("fill",color)
							.attr("class", "no-select")
							.attr("text-anchor", anchorPoint)
							.style("font-size",function(d,i){return 7+"pt";})
							.attr("id", "lbl")
							.attr("x", function(d,i){	
														return xPos;
													})
							.attr("y", function(){return yPos;})
							.text(function(d){return text;})
							.attr("visibility","visible")
							.on("mousedown", moveDownEvent)
							.on("mouseup", moveUpEvent)
							.on("mouseover", moveOverEvent)
							.on("mousemove", specialMove)
							.attr("visibility","hidden");
		
		
		};
		
		function addTextAndData(text,data,xPos,yPos){
					rectSvg
						.append("text")
						.attr("fill", "white")
						.attr("class", "no-select")
						.style("font-size",function(d,i){return 7+"pt";})
						.attr("text-anchor", "end")
						.attr("id", "lbl")
						.attr("x", function(d,i){	
																	return xPos;
																})
						.attr("y", function(){return yPos;})// textSeparation*0.7;})
						.text(function(d,i){	
											var value = Math.round(data[i]/monthDays[i]);
											if(value == 0){
												value = data[i]/monthDays[i];
												value = value.toFixed(1);
											}
											
											return text +": "+ value;
							})// + Math.round(d);})
						.on("mousedown", moveDownEvent)
						.on("mouseup", moveUpEvent)
						.on("mouseover", moveOverEvent)
						.on("mousemove", specialMove)
						.attr("visibility","hidden");	
		
		};
		
		
			function addTextAndDoubleData(text,data,data2,xPos,yPos){
					rectSvg
						.append("text")
						.attr("fill", "white")
						.attr("class", "no-select")
						.style("font-size",function(d,i){return 7+"pt";})
						.attr("text-anchor", "end")
						.attr("id", "lbl")
						.attr("x", function(d,i){	
																	return xPos;
																})
						.attr("y", function(){return yPos;})// textSeparation*0.7;})
						.text(function(d,i){return text +": "+ Math.round(data[i]/data2[i]);})// + Math.round(d);})
						.on("mousedown", moveDownEvent)
						.on("mouseup", moveUpEvent)
						.on("mouseover", moveOverEvent)
						.on("mousemove", specialMove)
						.attr("visibility","hidden");	
		
		};
	
		
		

		

	
};//function

