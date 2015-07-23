function timeDiagram(timeObject, day_visits, month_visits, tot_visits){
	var c = new colorValues(); 
	var m = new measureObject2();
	
	d3.select("#backgroundSvg").append("svg:defs")
					.append("svg:filter")
					.attr("id", "blur1")
					.append("svg:feGaussianBlur")
					.attr("stdDeviation", 5);
					
	d3.select("#backgroundSvg").append("svg:defs")
					.append("svg:filter")
					.attr("id", "blur2")
					.append("svg:feGaussianBlur")
					.attr("stdDeviation", 2);
					
	//c.drawBackgroundMyblog();

	this.visits = tot_visits;
	this.day_visits = day_visits;
	this.month_visits = month_visits;
	

	var startColor = c.startColor;
	var stopColor = c.stopColor;
	
	var monthLabels = timeObject.getLabelArray();
	var nrOfItems = timeObject.nrOfItems;
	//sorterar och plockar ut max för både x-ochy-axeln
	var visitsYear = [];
	var rects;
	//var nrOfItems = inlinks.length;
	
	var axisTicks = 8;
	var axisTicksData = [];
	for(i=0;i<axisTicks;i++){
		axisTicksData[i] = i;
	}
	
	var slideGraphWidth = graphWidth;
	
	var data = [];

	var max2 = timeObject.max_inlinks*2;//jsondata.items[0].inlinks;
	
	var max = Math.max.apply(Math, day_visits);
	var min2 = timeObject.min_inlinks;
	
	var graphWidth = m.timeDiagram_w;
	var graphHeight = m.timeDiagram_h;
		
	var xStartPos = m.height*0.1;
	var xStopPos = graphWidth*0.95;
	
	var yStartPos = graphHeight*0.15;
	var yStopPos = graphHeight*0.86;
	
	var minHeight = (m.height*0.018);
	
	var xScale = d3.scale.linear()
                     .domain([0, axisTicks])
                     .range([xStartPos, xStopPos]);
					 
	var yScale = d3.scale.linear()
                    .domain([0,max])
					.range([yStopPos,yStartPos]);
					
	var innerSelected;
	var infoRects;
	var infoRectLines;
	var infoRectText;
	var infoRectText2;
	
	var infoRectWidth = (xScale(2)-xScale(1))*0.7;
	var infoRectHeight = graphHeight*0.15;
	var infoRectXIndent = m.height*0.03; 
	var infoRectYIndent = m.height*0.01+infoRectHeight; 
				
		
	var container = d3.select("#chart4")
						.append("svg")
						.attr("id", "timeDiagramCont")
						.attr("witdh", graphWidth-yStartPos)
						.attr("height", graphHeight);
						//.style("top", 10 +"%");
						
	var intContainer = d3.select("#chart4")
						.append("svg")
						.attr("id", "intervallSvg")
						.attr("witdh", graphWidth)
						.attr("height",graphHeight)
						.style("top", 0 +"%");

	
		var gradient = container.append("svg:defs").append("svg:linearGradient")
					.attr("id", "gradient")
					.attr("x2", "0%")
					.attr("y2", "100%");

				gradient.append("svg:stop")
					.attr("offset", "0%")
					.attr("stop-color", startColor)
					.attr("stop-opacity", 1);

				gradient.append("svg:stop")
					.attr("offset", "100%")
					.attr("stop-color", stopColor)
					.attr("stop-opacity", 1);
					

		drawAxisLines();	
		var bajs = [];
		//det är trubbel i draw!!
		bajs = draw(timeObject.nrOfItems+3,timeObject.selectedIndex);	
		this.infoRects = bajs[0];
		this.infoRectText = bajs[1]; 
		this.infoRectText2 = bajs[2];
		
		

 
 //******************************************************************************************************
 //***********************      publika  funktioner       ******************************************************
 //******************************************************************************************************	
	var diff =0;
	this.setDiff = function(d){
		diff = d;
	};
	
	this.drawSelect = function(lastSelected,selected,d){
		drawSelected(lastSelected, selected);
		innerSelected = selected;
	};
	
	this.moveSelect = function(lastSelected,selected,d){
		drawSelected(lastSelected, selected);
		innerSelected = selected;
	};
	
	this.redraw = function(li,si,ti){
		var a = [];
		 a = draw(li,si);
		 return a;
	};
  //******************************************************************************************************
 //***********************      privata  funktioner       ******************************************************
 //******************************************************************************************************
	function drawSelected(lastSel, sel){
		d3.select(infoRects[0][lastSel])
			.attr("fill", c.infoRectColor);
		d3.select(infoArrows[0][lastSel])
			.attr("fill", c.infoRectColor);
		d3.select(infoRectText[0][lastSel])
			.attr("opacity", 0.5);
			
		d3.select(infoRects[0][sel])
			.attr("fill", c.infoRectSelectedColor);
		d3.select(infoArrows[0][sel])
			.attr("fill", c.infoRectSelectedColor);
		d3.select(infoRectText[0][sel])
			.attr("opacity", 1);
	
	};
	
	function mouseOverEvent(d,i){
		document.body.style.cursor = 'pointer';
		var ind = i;

		//kollar så att den inte är selected
		if(ind != innerSelected){
			d3.select(infoRects[0][ind])
				.attr("fill", "#57B2D1");
			d3.select(infoArrows[0][ind])
				.attr("fill", "#57B2D1");
			d3.select(infoRectText[0][ind])
				.attr("opacity", 1);
		}
		
	};
	
	function mouseOutEvent(d,i){
		document.body.style.cursor = 'default';
		var ind = i;
		
		//kollar så att den inte är selected
		if(ind!=innerSelected){
			d3.select(infoRects[0][ind])
				.attr("fill", c.infoRectColor);
			d3.select(infoArrows[0][ind])
				.attr("fill", c.infoRectColor);
			d3.select(infoRectText[0][ind])
				.attr("opacity", 0.5);
		}
	};
	


	function setOpacityOnInfoRect(op,ind){
		if(op < 1){
			
		}
		else{
			d3.select(infoRects[0][ind])
				.attr("opacity",1)
				.attr("fill", c.infoRectSelectedColor);
				
			d3.select(infoRectText[0][ind])
				.attr("opacity",1);

		}
	/*
		d3.select(infoRects[0][ind])
			.attr("opacity", 0.3);
			
		d3.select(infoRectLines[0][ind])
			.attr("opacity",op);
			
		d3.select(infoRectText[0][ind])
			.attr("opacity", op);*/
	};
	
	

	
	function drawAxis(){
		d3.select("#timeDiagramCont")
			.selectAll("text")
			.remove();
			
		d3.select("#timeDiagramCont")
			.selectAll("g.axis")
			.remove();
			
		container.append("text")
				.attr("class", "no-select")
				.attr("x",  10)
				.attr("y", function(){
										/*if(yScale(inlinks[nrOfItems]) == yScale(0)){
												return yScale(inlinks[nrOfItems-1]+1);
											}
										return yScale(inlinks[nrOfItems-1]);*/
										return 30;
									})
				.style("font-size", function(){return 8+"pt";})
				.attr("text-anchor", "begin")
				.text("Besökare/dag")
				.attr("fill", c.labelColor);
		container.append("text")
				.attr("class", "no-select")
				.attr("x",  10)
				.attr("y", function(){
										/*if(yScale(inlinks[nrOfItems]) == yScale(0)){
												return yScale(inlinks[nrOfItems-1]+1);
											}
										return yScale(inlinks[nrOfItems-1]);*/
										return 10;
									})
				.style("font-size", function(){return 8+"pt";})
				.attr("text-anchor", "begin")
				.text("Genomsnitt")
				.attr("fill", c.labelColor);
			
			var tickValues = timeObject.getShortMonths();
			 
			var xAxis = d3.svg.axis()
						  .scale(xScale)
						  .orient("bottom")
						  .ticks(8)
						  .tickFormat(function(d,i){return tickValues[timeObject.selectedIndex-4+i];});

			container.append("g")
						.attr("class", "axis")
						.attr("id", "xaxis")
						.attr("transform", "translate("+(0)+"," + yStopPos + ")")
						.call(xAxis);
				
				
			var yAxis = d3.svg.axis()
						  .scale(yScale)
						  .orient("left")
						  .ticks(5);
						  
			container.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(" + (xStartPos) + ","+0+")")
					.call(yAxis);			  
			
		d3.select("#timeDiagramCont")
			.selectAll("text")
			.attr("class", "no-select");		


		d3.select("#timeDiagramCont	")
			.selectAll("text")
			.attr("class", "no-select");			
	
	};
	
	
	function updateData(ind){
				data = [];
				for(i=ind-4;i<ind+5;i++){
					if(i>timeObject.nrOfItems-1){
						data.push(0);
					}
					else if(i<0){
						data.push(0);
					}
					else{
						data.push(day_visits[i]);
					}
				};	
				return data;
		};
		
		
	function removeAll(){
		d3.select("#timeDiagramCont")
			.selectAll("path")
			.remove();
			
		d3.select("#timeDiagramCont")
			.selectAll("#rectLines")
			.remove();
			
		d3.select("#timeDiagramCont")
			.selectAll("rect")
			.remove();
			
		d3.select("#timeDiagramCont")
			.selectAll("text")
			.remove();
	
	};
	

	function draw(lastSelectedIndex,selectedIndex){
			removeAll();
			var indexDiff = selectedIndex-lastSelectedIndex;
				
				data = updateData(selectedIndex);
				var shortData = [];
				for(i = selectedIndex-4; i < timeObject.nrOfItems;i++){
							shortData.push(day_visits[i]);
				};	

			var sel_val = new intervalValues(selectedIndex);
			var lastsel_val = new intervalValues(lastSelectedIndex);
		
			//här är det fel!!!
			drawIntervallRect(sel_val,lastsel_val,selectedIndex,lastSelectedIndex);
			//ritar staplarna i timeDiagrammet
				//drawRects(data);
				drawAxis();
			
			
			var line = d3.svg.line()
				.x(function(d,i) {return xScale(i+indexDiff);})
				.y(function(d,i) {return yScale(d);});
				
			var line2 = d3.svg.line()
				.x(function(d,i) {return xScale(i);})
				.y(function(d,i) {return yScale(d);});

					
		//***************** ritar grafen ************************************************************************
			//kollar om man befinner sig i högra ändan
			if(selectedIndex > timeObject.nrOfItems-5){
				var endIndex = shortData.length-1;
				
				var areaEnd1 = setAreaEnd(endIndex+indexDiff,indexDiff);
				var areaEnd2 = setAreaEnd(endIndex,0);
				
				drawGraph(line,line2,areaEnd1,areaEnd2,shortData,c.backRect3);			
			}
			//kollar omm man befinner sig i vänstra ändan
			else if(selectedIndex < 4){
				var startIndex = 4-selectedIndex;
				var shortData2 = [];
				
				for(i = startIndex; i < data.length;i++){
						shortData2.push(data[i]);
				};	
				
				var line = d3.svg.line()
					.x(function(d,i) {return xScale(startIndex+i+indexDiff);})
					.y(function(d,i) {return yScale(d);});
				
				var line2 = d3.svg.line()
					.x(function(d,i){
											return xScale(startIndex+i);
									})
					.y(function(d,i){
											return yScale(d);
									});
			
				var areaEnd1 = setAreaEnd(axisTicks+indexDiff,startIndex+indexDiff);
				var areaEnd2 = setAreaEnd(axisTicks,startIndex);
				
				drawGraph(line,line2,areaEnd1,areaEnd2,shortData2,c.backRect1);
			}
			//ritar graf utan ändpunkter
			else{
				//kollar om det är en tvåfärgad graf i området
				if(sel_val.break1Visible == true){
					nr = timeObject.nrOfYears-timeObject.selectedIndex+4;
					
					drawSubGraphs(nr,indexDiff,data,c.backRect1,c.backRect2);
				}
				else if(sel_val.break2Visible == true){
					nr = timeObject.nrOfYears+12- selectedIndex+4;
					
					drawSubGraphs(nr,indexDiff,data,c.backRect2,c.backRect3);
				}
				else{
					var areaEnd1 = setAreaEnd(axisTicks+indexDiff,indexDiff);
					var areaEnd2 = setAreaEnd(axisTicks,0);
					
					var col = c.backRect2;
					//kollar vilken färg grafen ska fyllas med
					if(timeObject.selectedIndex<timeObject.nrOfYears){
						col = c.backRect1;
					}
					else if(timeObject.selectedIndex > timeObject.nrOfYears+12){
						col = c.backRect3;
					}
					
					drawGraph(line,line2,areaEnd1,areaEnd2,data,col);
				}
				
				
			}
		
			//***************** ritar fyrkanterna ************************************************************************	
				infoArrows = container.selectAll("#info_arrow") 
								.data(function(d,i){	
															if(selectedIndex > timeObject.nrOfItems-5){
																		return shortData;
																}
															return data;
														})
								.enter()
								.append("path")
								.attr("id", "info_arrow")
								.attr("opacity", function(d,i){	return 1;})
								.attr("d",  function(d,i){
												return getPathD(d,(i+indexDiff));
												
												})
								.attr("fill",c.infoRectColor);
				
				infoRects = container.selectAll("#infoRect") 
									.data(function(d,i){	
															if(selectedIndex > timeObject.nrOfItems-5){
																		return shortData;
																}
															return data;
														})
									.enter()
									.append("rect")
									.attr("id","infoRect")
									.attr("x",function(d,i){return xScale(i+indexDiff)+infoRectXIndent;})
									.attr("y", function(d,i){	if(yScale(d) < infoRectHeight){
																	return 0;
																}
																	return yScale(d)-infoRectHeight;})
									.attr("ry", 20)
									.attr("rx", 20)
									.attr("width", infoRectWidth)
									.attr("height",infoRectHeight)
									.attr("opacity", function(d,i){	return 1;})
									.attr("fill", function(d,i){ 	
																return c.infoRectColor;
												})
									.on("mouseover", mouseOverEvent)
									.on("mouseout", mouseOutEvent);
									
									
				infoRectText = container.selectAll("#infolabel")
									.data(function(d,i){	
															if(selectedIndex > timeObject.nrOfItems-5){
																	return shortData;
																}
															return data;
														})
									.enter()
									.append("text")
									.attr("id", "infolabel")
									.style("font-size", 9+"pt")
									.style("font-family", "Museo100")
									.style("font-weight", "bold")
									.attr("class", "no-select")
									.attr("x",function(d,i){return xScale(i+indexDiff)+infoRectXIndent;})
									.attr("y", function(d,i){	if(yScale(d) < infoRectHeight){
																	return infoRectHeight*0.35;
																}
																/*else if(yScale(d) < infoRectHeight+infoRectYIndent){
																	yScale(d)-infoRectYIndent+10;
																}*/
																else{
																	return yScale(d)-infoRectHeight*0.55;
																}
															})
									.attr("opacity", 0.5)
									.attr("fill", "white")
									.text(function(d,i){return monthLabels[selectedIndex-4+i];})
									.on("mouseover", mouseOverEvent)
									.on("mouseout", mouseOutEvent);
									
				infoRectText2 = 	container.selectAll("#infotext")
									.data(function(d,i){	
															if(selectedIndex > timeObject.nrOfItems-5){
																	return shortData;
																}
															return data;
														})
									.enter()
									.append("text")
									.attr("class", "no-select")
									.style("font-size", 7.5+"pt")
									.style("font-family", "Museo100")
									.attr("id", "infotext")
									.attr("x",function(d,i){return xScale(i+indexDiff)+infoRectXIndent;})
									.attr("y", function(d,i){	if(yScale(d) < infoRectHeight){
																	return infoRectHeight*0.7;
																}
																/*else if(yScale(d) < infoRectHeight+infoRectYIndent){
																	yScale(d)-infoRectYIndent+10;
																}*/
																else{
																	return yScale(d)-infoRectHeight*0.3;
																}
															})
									.attr("opacity", 0.5)
									.attr("fill", "white")
									.text(function(d,i){return "Besökare: "+numberWithCommas(Math.round(tot_visits[selectedIndex-4+i]));})
									.on("mouseover", mouseOverEvent)
									.on("mouseout", mouseOutEvent);
									
				
							
				//tar bort änd-fyrkanter 					
				if(selectedIndex < 4){
					for(i=0;i<4-selectedIndex;i++){
								d3.select(infoRects[0][i])
									.remove();
								d3.select(infoArrows[0][i])
									.remove();
								d3.select(infoRectText2[0][i])
									.remove();
									
									
					};
				}						

					infoRects
						 .transition()
						 .duration(1000)
						 .attr("x", function(d, i) { return xScale(i)+infoRectXIndent;});
					 
					infoRectText
						 .transition()
						 .duration(1000)
						 .attr("x", function(d, i) { return xScale(i)+infoRectXIndent; });
					
					infoRectText2
						 .transition()
						 .duration(1000)
						 .attr("x", function(d, i) { return xScale(i)+infoRectXIndent; });
					infoArrows	 
						 .transition()
						.duration(1000)
						.attr("d", function(d,i) { return getPathD(d,(i));});
						 
 
					 
				return [infoRects,infoRectText,infoRectText2];
				
	};
	
	function getPathD(data,ind){
					var arrowWidth = infoRectXIndent*1.77;
					//ritar triangelpunkterna
					var x1 = xScale(ind);
					var y1 = yScale(data)-infoRectHeight*0.5;
													
					var x2 = x1+arrowWidth;
					var y2 = yScale(data)-infoRectHeight*0.98;
													
					var x3 = x1+arrowWidth;
					var y3 = yScale(data)*0.98;
													
					//dragpoints för kurvan
					var e = x1+arrowWidth*0.1+", "+(y1+1)+" ";
					var f = x1+arrowWidth*0.65+", "+y2+" ";
					var g = x1+arrowWidth*0.65+"," + y3+" ";
					var h = x1+arrowWidth*0.1+"," + (y1-1)+" ";
											
					return "M " +x1+", "+y1+ 
							" C "+ e + f + x2+", "+y2+ 
							" L "+x3+", "+y3+ 
							" C "+ g + h +x1+", "+y1+
							" Z";
	};				
	
	function drawGraph(line,line2,areaEnd1,areaEnd2,d,color){
				var	graf = container.append("path")
									.attr("class", "area")
									.style("fill",color)
									.style("opacity", 0.8)
									.attr("d", line(d) + areaEnd1)
										.transition()
										.duration(1000)
										.attr("d", line2(d) + areaEnd2);
	};
	
	//nr är indexgränsen mellan de olikfärgade graferna
	function drawSubGraphs(nr,iDiff,d,c1,c2){
			//delar dataArrayen
			var temp1 = [];
			var temp2 = [];
					for(i=0;i<d.length;i++){
						if(i<nr+1){
							temp1.push(d[i]);
						}
						if(i>nr-1){
							temp2.push(d[i]);
						}
					}
					
		//************************** vänstra grafen	**************************		
			var line = d3.svg.line()
				.x(function(d,i) {return xScale(i+iDiff);})
				.y(function(d,i) {return yScale(d);});
				
			var line2 = d3.svg.line()
				.x(function(d,i) {return xScale(i);})
				.y(function(d,i) {return yScale(d);});
				
			var areaEnd1 = setAreaEnd(nr+iDiff,iDiff);
			var areaEnd2 = setAreaEnd(nr,0);

					var	graf1 = container.append("path")
									.attr("class", "area")
									.style("fill", c1)
									.style("opacity", 0.8)
									.attr("d", line(temp1) + areaEnd1)
										.transition()
										.duration(1000)
										.attr("d", line2(temp1) + areaEnd2);
										
			//************************** högra grafen	**************************													
			var l = d3.svg.line()
				.x(function(d,i) {return xScale(nr+i+iDiff);})
				.y(function(d,i) {return yScale(d);});
				
			var l2 = d3.svg.line()
				.x(function(d,i) {return xScale(nr+i);})
				.y(function(d,i) {return yScale(d);});
				
			var aE1 = setAreaEnd(d.length-1+iDiff,nr+iDiff);
			var aE2 = setAreaEnd(d.length-1,nr);
			
			var	graf2 = container.append("path")
									.attr("class", "area")
									.style("fill", c2)
									.style("opacity", 0.8)
									.attr("d", l(temp2) + aE1)
										.transition()
										.duration(1000)
										.attr("d", l2(temp2) + aE2);
				
	};
	
	function setAreaEnd(end,start){
		var areaEnd = " L "+xScale(end)+" "+ (yScale(0))+" L "+xScale(start)+" "+(yScale(0))+" Z";
		return areaEnd;
	};

	function intervalValues(selectedIndex){
			this.x1 = xStartPos;//xScale(1);
			this.x2;
			this.x3;
			
			this.h = m.height*0.03;
			this.y = yStopPos;
			
			this.w1;
			this.w2;
			this.w3;
			
			this.c1 = c.backRect1;
			this.c2 = c.backRect2;
			this.c3  = c.backRect3;
			
			this.vis = "hidden";
			var nr;
			
			this.break1Visible = false;
			this.break2Visible = false;
			
			//endast årsintervall
			if(selectedIndex+4 < timeObject.nrOfYears+1){
					this.break1Visible = false;
					this.break2Visible = false;
					
					this.x2 = xScale(8);
					this.x3 = 0;
					
					this.w2 = 0;
					this.w3 = 0;
					this.w1 =  xScale(8);
					this.vis = "hidden";
			}
			//både års och månad är synlig
			else if(selectedIndex-4 < timeObject.nrOfYears+1 && selectedIndex+4 > timeObject.nrOfYears){
				this.break1Visible = true;
				this.break2Visible = false;
				
				nr = timeObject.nrOfYears- selectedIndex+4;
				this.w1 = xScale(nr);
				this.w2 = xScale(8)+xStartPos-this.w1;
				this.w3 = 0;
				this.vis = "visible";
				
				this.x2 = this.w1;
				this.x3 = 0;
			}
			//endast månadsintervall
			else if(selectedIndex-4 > timeObject.nrOfYears && selectedIndex+4 < timeObject.nrOfYears+12){
					this.break1Visible = false;
					this.break2Visible = false;
					
					this.x2 = this.x1;
					this.w1 = 0;
					this.w3 = 0;
					this.x3 = xScale(8);
					this.w2 =  xScale(8);

					this.vis = "hidden";
			}
			//både månad och dag
			else if(selectedIndex-4 < timeObject.nrOfYears+13 && selectedIndex+4 > timeObject.nrOfYears+11){	
				this.break1Visible = false;
				this.break2Visible = true;
				
				nr = timeObject.nrOfYears+12- selectedIndex+4;
				this.w2 = xScale(nr);
				this.w3 = xScale(8)-this.w2+xStartPos;
				
				this.vis = "visible";
				this.w1 = 0;
				this.x3 = this.w2;
				
				this.x2 = this.x1;
			}
			else{
					this.break1Visible = false;
					this.break2Visible = false;
					
					this.w3 =  xScale(8);
					this.w1 = 0;
					this.w2 = 0;
					
					this.vis = "hidden";
					
					this.x2 = this.x1;
					this.x3 = this.x1;
			}
			
			
			
	
	};
	
	function drawIntervallRect(val,lval,selIndex,lSelIndex){
	
		//kollar om man förflyttar i vänster eller höger riktning. anpassar värdena
		//var lval = changeValues(lval,val,selIndex,lSelIndex);
			
			//intervall-rektanglarna
			/*	container.append("rect")
						.attr("id", "leftIntervalRect")
						.attr("x",lval.x1)
						.attr("y", val.y)
						.attr("width", lval.w1-xStartPos)
						.attr("height",val.h)
						.attr("opacity", function(d,i){	return 0.3;})
						.attr("fill", function(d,i){ 	
													return val.c1;
										})
						.transition()
						.duration(1000)
						//.attr("x",val.x1)
						.attr("width", val.w1-xStartPos);
										
				container.append("rect")
						.attr("id", "rightIntervalRect")
						.attr("x",lval.x2)
						.attr("y", val.y)
						.attr("width", lval.w2-xStartPos)
						.attr("height",val.h)
						.attr("opacity", function(d,i){	return 0.3;})
						.attr("fill", function(d,i){ 	
													return val.c2;
										})
						.transition()
						.duration(1000)
						.attr("x",val.x2)
						.attr("width", val.w2-xStartPos);
						
				container.append("rect")
						.attr("id", "rightIntervalRect")
						.attr("x",lval.x3)
						.attr("y", val.y)
						.attr("width", lval.w3-xStartPos)
						.attr("height",val.h)
						.attr("opacity", function(d,i){	return 0.3;})
						.attr("fill", function(d,i){ 	
													return val.c3;
										})
						.transition()
						.duration(1000)
						.attr("x",val.x3)
						.attr("width", val.w3-xStartPos);*/

	//********************uppe-rektanglarna************************************************************
		d3.select("#intervallSvg")
					.selectAll("text")
					.remove();
					
				var h = yStopPos*1.2-yStartPos;
				var w = 10;
	
	/*			d3.select("#intervallSvg")
					.selectAll("rect")
					.remove();*/
					
				
				
		

				//kollar om år och mån är synlig
				if(val.break1Visible == true){
				/*	var grad1 = intContainer.append("svg:defs").append("svg:linearGradient")
						.attr("id", "grad1")
						.attr("x1", "100%")
						.attr("y1", "0%")
						.attr("x2", "0%")
						.attr("y2", "0%");

					grad1.append("svg:stop")
						.attr("offset", "0%")
						.attr("stop-color", val.c1)
						.attr("stop-opacity", 1);

					grad1.append("svg:stop")
						.attr("offset", "100%")
						.attr("stop-opacity", 0);
						
					var grad2 = intContainer.append("svg:defs").append("svg:linearGradient")
						.attr("id", "grad2")
						.attr("x1", "0%")
						.attr("y1", "0%")
						.attr("x2", "100%")
						.attr("y2", "0%");

					grad2.append("svg:stop")
						.attr("offset", "0%")
						.attr("stop-color", val.c2)
						.attr("stop-opacity", 1);

					grad2.append("svg:stop")
						.attr("offset", "100%")
						.attr("stop-opacity", 0);
						
						
					intContainer.append("rect")
							.attr("id", "intervalRect2")
							.attr("x",lval.x2-w)
							.attr("y", 0)
							.attr("width", w)
							.attr("height",h)
							.attr("opacity", function(d,i){	return 0.5;})
							.attr("fill", function(d,i){ 	
														return "url(#grad1)";
											})
							.attr("opacity", 0.5)
							.attr("visibility", val.vis)
							.transition()
							.duration(1000)
							.attr("x",val.x2-w);
							
					intContainer.append("rect")
							.attr("id", "intervalRect1")
							.attr("x",lval.x2)
							.attr("y", 0)
							.attr("width", w)
							.attr("height",h)
							.attr("fill", function(d,i){ 	
														return "url(#grad2)";
											})
							.attr("opacity", 0.5)
							.attr("visibility", val.vis)
							.transition()
							.duration(1000)
							.attr("x",val.x2);*/
							
					intContainer.append("text")
						.text("Visar år")
						.attr("class", "no-select")
						.attr("text-anchor", "end")
						.attr("opacity", 0.5)
						.style("font-size", function(){return 10+"pt";})
						.attr("x", lval.x2-10)
						.attr("y", yStopPos+12)
						.attr("fill", val.c1)
						.attr("visibility", val.vis)
						.transition()
						.duration(1000)
						.attr("x",val.x2-10);
						
					intContainer.append("text")
						.text("Visar månader")
						.attr("class", "no-select")
						.attr("text-anchor", "begin")
						.style("font-size", function(){return 10+"pt";})
						.attr("opacity", 0.5)
						.attr("x", lval.x2+10)
						.attr("y", yStopPos+12)
						.attr("fill", val.c2)
						.attr("visibility", val.vis)
						.transition()
						.duration(1000)
						.attr("x",val.x2+10);

				}
				else{	/*
					var grad1 = intContainer.append("svg:defs").append("svg:linearGradient")
						.attr("id", "grad1")
						.attr("x1", "100%")
						.attr("y1", "0%")
						.attr("x2", "0%")
						.attr("y2", "0%");

					grad1.append("svg:stop")
						.attr("offset", "0%")
						.attr("stop-color", val.c2)
						.attr("stop-opacity", 1);

					grad1.append("svg:stop")
						.attr("offset", "100%")
						.attr("stop-opacity", 0);
						
					var grad2 = intContainer.append("svg:defs").append("svg:linearGradient")
						.attr("id", "grad2")
						.attr("x1", "0%")
						.attr("y1", "0%")
						.attr("x2", "100%")
						.attr("y2", "0%");

					grad2.append("svg:stop")
						.attr("offset", "0%")
						.attr("stop-color", val.c3)
						.attr("stop-opacity", 1);

					grad2.append("svg:stop")
						.attr("offset", "100%")
						.attr("stop-opacity", 0);
						
				intContainer.append("rect")
						.attr("id", "intervalRect2")
						.attr("x",lval.x3-w)
						.attr("y", 0)
						.attr("width", w)
						.attr("height",h)
						.attr("opacity", function(d,i){	return 0.5;})
						.attr("fill", function(d,i){ 	
													return  "url(#grad1)";
										})
						.attr("opacity", 0.4)
						.attr("visibility", val.vis)
						.transition()
						.duration(1000)
						.attr("x",val.x3-w);
						
					intContainer.append("rect")
						.attr("id", "intervalRect1")
						.attr("x",lval.x3)
						.attr("y", 0)
						.attr("width", w)
						.attr("height",h)
						.attr("fill", function(d,i){ 	
													return  "url(#grad2)";
										})
						.attr("opacity", 0.4)
						.attr("visibility", val.vis)
						.transition()
						.duration(1000)
						.attr("x",val.x3);*/
						
					intContainer.append("text")
						.text("Visar månader")
						.attr("class", "no-select")
						.attr("text-anchor", "end")
						.attr("opacity", 0.5)
						.style("font-size", function(){return 10+"pt";})
						.attr("x", lval.x3-10)
						.attr("y", yStopPos+12)
						.attr("fill", val.c2)
						.attr("visibility", val.vis)
						.transition()
						.duration(1000)
						.attr("x",val.x3-10);
						
					intContainer.append("text")
						.text("Visar dagar")
						.attr("class", "no-select")
						.attr("text-anchor", "begin")
						.style("font-size", function(){return 10+"pt";})
						.attr("opacity", 0.5)
						.attr("x", lval.x3+10)
						.attr("y", yStopPos+12)
						.attr("fill", val.c3)
						.attr("visibility", val.vis)
						.transition()
						.duration(1000)
						.attr("x",val.x3+10);
				}
					
	};
	
	function changeValues(lval,val,selectedIndex,lastSelectedIndex){
		//förflyttning till höger
		if(selectedIndex > lastSelectedIndex){
			lval.w2 = val.w2;
			lval.w1 = 0;
		}
		
		return lval;

	};
	
	
	function drawAxisLines(){
		var lineEnter = container
							.selectAll("#lines")
							.data(axisTicksData)
							.enter();
	
		var lines = lineEnter
								.append("svg:line")
								.attr("id", "lines")
								.attr("x1", function(d,i){return xScale(i+1);})
								.attr("y1", function(d,i){return yStartPos;})
								.attr("x2", function(d,i){return xScale(i+1);})
								.attr("y2", function(d,i){return yStopPos;})
								.attr("opacity", function(d,i){ 
																if(i==3){
																		return 1;
																}
																else{
																		return 0.6;
																}
												
												})
								.attr("stroke", function(d,i){ 
																if(i==3){
																		return c.selectedLineColor;
																}
																else{
																		return c.lineColor;
																}
												
												})
								.attr("stroke-width", function(d,i){ 
																if(i==3){
																		return 3;
																}
																else{
																		return 1;
																}
												
												});
	};	

};//timeDiagram

