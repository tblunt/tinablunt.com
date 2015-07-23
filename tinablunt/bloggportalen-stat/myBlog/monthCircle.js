function monthCircle(timeObject,data, visits){	
	var month = timeObject.month + 1;
	var nrOfItems = timeObject.nrOfItems+1;
	
	var mlbl = ["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"];
	
	var color = d3.scale.linear().domain([0,1]).range(["hsl(100, 61%, 50%)", "hsl(250, 71%, 50%)"]).interpolate(d3.interpolateHsl);
	
	
		for(i = 0;i<nrOfItems;i++){
			data.push(Math.random()*25);
			boolArray.push(0);
		}
					
	var xScale = d3.scale.linear()
                     .domain([0, 13])
                     .range([0, window.innerWidth-(window.innerWidth*0.15)]);
					 
	var temp = [];
	for(i = 0;i<data.length;i++){
			temp.push(data[i]);
		}
	temp.sort(function(a,b){return b-a;});
	var max = temp[0];//jsondata.items[0].inlinks;
	var min = temp[data.length-1]; //jsondata.items[(length-1)].inlinks;	
	
	var width = window.innerWidth;
	var height = window.innerHeight;
	var topPos = height*0.55;
	var minRadius = 5;
	
	var boxWidth = window.innerWidth*0.1;
	var boxHeight = window.innerWidth*0.05;
	
	var vis = d3.select("#infoSvg")
			.append("svg:svg")
			.attr("width", width)
			.attr("height", height*0.85);
			
   nodes = data.map(Object);

		var force = 
					d3.layout.force()
						.nodes(nodes)
						.links([])
						.size([width*0.9, height*0.1])
						.gravity(0.7)
						.friction(0.4)
						.charge(function(d,i){return -20000;})
						.start();

			
		
			
		var dataEnter = vis.selectAll("circle")
						.data(data)
						.enter();
						
		var boxLines = vis		
							.selectAll("#hej")
							.data(data)
							.enter()
							.append("line")
							.attr("id", "hej")
							.attr("x1", function(){return 0;})
							.attr("y1", function(){return 0;})
							.attr("x2", function(){return 0;})
							.attr("y2", 0)
							.attr("opacity", 1)
							.attr("stroke", "white")
							.attr("stroke-width", 1)
							.attr("visibility","hidden");
							
		var circles = dataEnter.append("circle")
						.attr("class", "boll")
						.attr("cx", function(d,i){
												d3.select(boxLines[0][i])
													.attr("x2" , width*0.034+xScale(i+2));
													return width*0.034+xScale(i+2);
												})
						.attr("cy", function(d,i){
													d3.select(boxLines[0][i])
														.attr("y2" , d*(-height*0.01)+topPos);
													
													return d*(-height*0.01)+topPos;})
						.attr("r", function(d){return minRadius+d;})
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
				
		var lines = lineEnter
						.append("svg:line")
						.attr("id", "lines")
						.attr("x1", function(d,i){return width*0.034+xScale(i+2);})
						.attr("y1", function(d,i){return topPos+d+d*(-height*0.01);} )
						.attr("x2", function(d,i){return width*0.034+xScale(i+2);})
						.attr("y2", window.innerHeight*0.79)
						.attr("opacity", 0.3)
						.attr("stroke", "white")
						.attr("stroke-width", 1)
						.attr("strok-dasharray",0.5);

			
		var rectsEnter =  vis.selectAll("rect.node")
							.data(nodes)
							.enter();
				
		var rects =	rectsEnter.append("svg:rect")
						.attr("class", "node")
						.attr("width", boxWidth)
						.attr("height", boxHeight)
						.attr("x", function(d,i){		
														return 0;
													})
						.attr("y", function(d,i){return 100;})
						.attr("stroke", "white")
						.attr("stroke-width", 1)
						.attr("fill","black")
						.attr("visibility","hidden")
						.call(force.drag);
						
		var lblEnter = vis		
							.selectAll("#lbl")
							.data(data)
							.enter();
		
		var labels = 	lblEnter
							.append("text")
							.attr("fill", "white")
							.attr("id", "lbl")
							.attr("x", function(d,i){	
														return 0;
													})
							.attr("y", function(){return 0;})
							.text(function(d){return "Antal inlägg: " + Math.round(d);})
							.attr("visibility","hidden");
							
			var mlabels = 	lblEnter
								.append("text")
								.attr("fill", "white")
								.attr("id", "lbl")
								.attr("x", function(d,i){	
															return 0;
														})
								.attr("y", function(){return 0;})
								.text(function(d,i){return mlbl[i];})
								.attr("visibility","hidden");
		

		vis.style("opacity", 1e-6)
		  .transition()
			.duration(1000)
			.style("opacity", 1);
		
		force.on("tick", function(e) {		  
			  rects.attr("x", function(d,i) { 
												d3.select(boxLines[0][i])
													.attr("x1" , d.x+boxWidth);
													
												d3.select(labels[0][i])
													.attr("x" , d.x+boxWidth*0.01);
													
												d3.select(mlabels[0][i])
													.attr("x" , d.x+boxWidth*0.01);
													
												
													if(d.x > 0 && d.x < width-boxWidth)
														{
															d3.select(boxLines[0][i])
																.attr("x1" , d.x+boxWidth);
														
															d3.select(labels[0][i])
																.attr("x" , d.x+boxWidth*0.01);
																
															d3.select(mlabels[0][i])
																.attr("x" , d.x+boxWidth*0.01);
															return d.x;
														}
														else if(d.x > width-boxWidth){
															d3.select(boxLines[0][i])
																.attr("x1" , width-boxWidth+boxWidth);
														
															d3.select(labels[0][i])
																.attr("x" , width-boxWidth+boxWidth*0.01);
																
															d3.select(mlabels[0][i])
																.attr("x" , width-boxWidth+boxWidth*0.01);
															return width-boxWidth;
														}
														else{
															d3.select(boxLines[0][i])
																.attr("x1" , 0+boxWidth);
														
															d3.select(labels[0][i])
																.attr("x" , 0+boxWidth*0.01);
																
															d3.select(mlabels[0][i])
																.attr("x" ,0+boxWidth*0.01);
															return d.fixed = 1;
														}
													
																								
												
											})
				  .attr("y", function(d,i) { 
												
											if(d.y > 0 && d.y < height)
												{
													d3.select(boxLines[0][i])
														.attr("y1" , d.y+boxHeight);
														
													d3.select(labels[0][i])
														.attr("y" , d.y+boxHeight*0.5);
														
													d3.select(mlabels[0][i])
														.attr("y" , d.y+boxHeight*0.3);
													
													return d.y; 
												}
												else if(d.y > height){
													d3.select(boxLines[0][i])
														.attr("y1" , boxHeight);//height+boxHeight+boxHeight);
														
													d3.select(labels[0][i])
														.attr("y" , boxHeight*0.5);//height+boxHeight+boxHeight*0.3);
														
													d3.select(mlabels[0][i])
														.attr("y" , boxHeight*0.3)//height+boxHeight+boxHeight*0.3);
													return height+boxHeight*2;
												}
												else{
													//skriv här vad som händer om man är ovanför den streckade linjen
													return;
												}
												
												
											 });
											 

			});
		
	//***********************************************************************************************************/
	
			
	function mouseOverEvent(){
		d3.select(this)
			.attr("fill", "white");
	};
	
	function mouseOutEvent(d,i){
		var ind = i;
		
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
												d3.select(rects[0][clickedIndex])
													.attr("visibility","hidden");
												d3.select(labels[0][clickedIndex])
													.attr("visibility","hidden");
												d3.select(mlabels[0][clickedIndex])
													.attr("visibility","hidden");
													
												boolArray[clickedIndex] = 0;
												return color(clickedIndex/data.length);
											}
											else{
												d3.select(boxLines[0][clickedIndex])
													.attr("visibility","visible");
												d3.select(rects[0][clickedIndex])
													.attr("visibility","visible");
												d3.select(labels[0][clickedIndex])
													.attr("visibility","visible");
												d3.select(mlabels[0][clickedIndex])
													.attr("visibility","visible");
													
												boolArray[clickedIndex] = 1;
												return "white";
											}
										});
			

	};


	
	
	
};//function

