 function updateSelIndexTable(jsonObject){
	d3.select("#chart1")
		.selectAll("svg")
			.remove();
			
	tableLens(jsonObject);

 };
 
 
 
 function tableLens(jsonObject){
		var c = new colorValues();
		var m = new measureObject();
 
 //******************************************************************************************************
 //***********************         variabler       ******************************************************
  //******************************************************************************************************
  
 //---------------------colors---------------------------------------------------------------------------
 var color = c.color;
 var color2 = c.color_lighter;
 var color3 = c.color_darker;

 var hooverColor = c.hooverColor;
 var userColor = c.userColor;
 var selectedColor = c.selectedColor;
 var labelColor= c.labelColor;
 var lineColor = c.lineColor;
 var textColor = c.textColor;
 var backgroundColor = c.backgroundColor;
 

 
//används i mousedowneventet
var lastSelected = null;
var lastSelected_ranking;
var hooverIndex;

var arrow;

var boolen;	
  
  var numberOfElements = jsonObject.jsondata.length;
  
//The height of the graph.
  var graphHeight =  m.tableLens_h;
  var graphWidth = m.tableLens_w;
  var startWidth = 2;//(graphWidth*0.1);
  var barSeparation = window.innerWidth*0.001;
  var indent = window.innerWidth*0.005;
  //The width of each bar.
  var barHeight = ((graphHeight-graphHeight*0.04)-numberOfElements*barSeparation)/(numberOfElements+6);
  
  //hoover Values
  var hooverHeight = barHeight * 3 + 2/jsonObject.ratio; 
  
  var hooverSeparation = 0;//barSeparation*2;
  var hooverDistance = hooverHeight + hooverSeparation;
  var yTrans = 0;
  var yDir;
  var hooverContHeight = hooverHeight + (hooverHeight-hooverHeight*-2*0.3)+(hooverHeight-hooverHeight*-1*0.3)+(hooverHeight-hooverHeight*2*0.3)+(hooverHeight-hooverHeight*1*0.3);
  var mouseIn = 0;
  var firstIn = false;
  var globalPos;
  var hooverRectHeight = hooverContHeight*0.5;
  
  var maxValue = jsonObject.jsondata[0].visitors;
  
  //The maximum value of the data.
  var maxData = 100;

  var verticalBarDistance = barHeight + barSeparation;
   
   //
  var barHeightMultiplier = (graphHeight-graphHeight*0.04) / maxData;
  var barWidthMultiplier = (graphWidth*0.95-startWidth) / maxValue;
   
  var textXPosition = 10 + jsonObject.jsondata[0].visitors * barHeightMultiplier;
 
  var arrowWidth = graphWidth*0.07;
  var selectedIndent = graphWidth*0.2; 
  var selectedLength = graphWidth-selectedIndent-arrowWidth;//jsonObject.jsondata[0].visitors * barWidthMultiplier;
  var selectedHeight = graphHeight*0.052;

  

 //******************************************************************************************************
 //***********************         main       ******************************************************
  //******************************************************************************************************

    //var color = d3.scale.category20c();
  //Create the SVG graph.
  var svg = d3.select("#chart1")
			.append("svg")
			.attr("width", graphWidth)
			.style("height", graphHeight-graphHeight*0.04);
	
	svg.append("text")
			.attr("id","tableLensLabel")
			.attr("text-anchor", "middle")
			.style("font-size", 12+"pt")
			.style("font-family", "Museo100")
			.attr("x", graphWidth*0.5)
			.attr("y", 12)
			.attr("fill", "#878787")
			.text(jsonObject.TableLensTitle);
			
	//lägger till labeln nere vid golvet		
	var svgAxis = d3.select("#chart1")
			.append("svg")
			.attr("width", graphWidth)
			.attr("height", graphHeight*0.04);	
			
	svgAxis.append("text")
		.attr("id","tableLensLabel")
		.style("font-size",function(d,i){return 8+"pt";})
		.style("font-size", 12+"pt")
		.style("font-family", "Museo100")
		.attr("x", graphWidth*0.4)
		.attr("y", graphHeight*0.02)
		.attr("fill", "#878787")
		.text("Antal besökare");
		

	
	svgAxis.append("svg:line")
				.attr("x1", indent)
				.attr("y1", graphHeight*0.03)
				.attr("x2", graphWidth)
				.attr("y2", graphHeight*0.03)
				.style("stroke", "#878787")
				.style("stroke-width", 1);	
					
	svgAxis.append("svg:line")
				.attr("x1", indent)
				.attr("y1", graphHeight*0.02)
				.attr("x2", indent)
				.attr("y2", graphHeight*0.04)
				.style("stroke", "#878787")
				.style("stroke-width", 1);
				
	svgAxis.append("svg:line")
				.attr("x1", graphWidth-1)
				.attr("y1", graphHeight*0.02)
				.attr("x2", graphWidth-1)
				.attr("y2", graphHeight*0.04)
				.style("stroke", "#878787")
				.style("stroke-width", 1);
	

  //Add data to the graph and call enter.
  var dataEnter = svg.selectAll("rect").data(jsonObject.jsondata).enter();
  //Draw the bars.
 	var bars = dataEnter.append("rect")
		  .attr("id", function(d,i){if(i == jsonObject.selectedIndex){
										jsonObject.selectedItem = d;
								  }
								  else{
										return "unselected";
								  }
					})
		  .attr("fill", function(d,i) {	
										//kollar om elementet är det som tillhör användaren
										if(d == jsonObject.userItem){
											return userColor;
										}
										else if(i == jsonObject.selectedIndex){

											return selectedColor;
										}
										else{
											return color(i/numberOfElements);
										}								
									})
		  .on("mousedown", mouseDownEvent)
		  .attr("y", function(d, i)
				{
				  //lägger till en bar på rätt höjd beroende på vilket index den har
				   return verticalBarDistance*4+i*verticalBarDistance;
				 })
		  .attr("x", function(d)
			  {
			   return indent;
			  })
		  .attr("rx", 3)
		  .attr("ry", 3)	 
		  .attr("height", function(d)
			  {
			   return barHeight;
			  })
		  .attr("width", function(d)
			  {
			   return startWidth+d.visitors * barWidthMultiplier;
			  });
		 if(jsonObject.selectedIndex != null){
				drawSelected(jsonObject.selectedItem,jsonObject.selectedIndex);
		}
			  var rects = drawHooverItems();
			  
			  
			 //sätter en lyssnare på hela charten så att hooverrektanglarna kan följa muspekaren
			d3.select("#chart1")
				.on("mouseover", hooverOver)
				.on("mouseout", hooverOut)
				.on("mousemove", setGlobal);
  

	filt();
 //******************************************************************************************************
 //***********************        funktioner       ******************************************************
  //******************************************************************************************************
  function hooverBars(d,i){
	var ind = i;
	jsonObject.hooverBar = this;
	
	d3.select(this)
		.attr("fill", function(d,i){ 	if(ind!=jsonObject.selectedIndex){
											return hooverColor;
										}
										else{
											return c.selectedColor;
										}
									});
									

  };
  
  function hooverOutBars(d,i){
	var ind = i;
	d3.select(this)
		.attr("fill", function(){
									if(jsonObject.hooverIndex != jsonObject.userIndex)
									{
										return color(jsonObject.hooverIndex/numberOfElements);
									}
									else if(ind==jsonObject.selectedIndex){
										return c.selectedColor;
									}
									else{
										return userColor;
									}
								});
  };

   function mouseDownEvent(d,i){
		var ind = jsonObject.hooverIndex;
		//tar bort om det finns en vit selected-ruta utritad redan
		d3.selectAll("#selected_bar")
			.remove();
			
		doingSometing = 0;
		
		if(jsonObject.selectedIndex != ind){
		//färgar tillbaka den som varit nedtryckt innan
			d3.select(bars[0][jsonObject.selectedIndex])
				.attr("fill", function(){
									if(jsonObject.selectedIndex == jsonObject.userIndex){	
										return c.userColor;
									}
									else{
										return color(jsonObject.selectedIndex/numberOfElements);
									}
								
								})
		};
	
		//sätter object-värdena
		jsonObject.selectedIndex = jsonObject.hooverIndex;
		jsonObject.selectedItem = jsonObject.hooverItem;
		jsonObject.selectedTitle = jsonObject.hooverItem.name;
		jsonObject.clickedObject.title = jsonObject.selectedTitle;
		
		//hämtar data. blog-count och inlinks
		setSelectedParameters(jsonObject.selectedIndex);
		//ritar den vita rutan
		drawSelected(jsonObject.selectedItem,jsonObject.selectedIndex);
		//ritar om tableLensen
		updateSelIndex(jsonObject);
	};
	
		
	function filt(){
		
		var filter = svg.append("svg:defs")
			.append("svg:filter")
			.attr("id", "blur")
			.append("svg:feGaussianBlur")
			.attr("stdDeviation", 10);

		/*d3.select("body")
			.append("input")
			.attr("type", "range")
			.attr("min", 0)
			.attr("max", 100)
			.attr("value", 50);*/

	};
  
  function drawSelected(d,i){
	if(jsonObject.selectedIndex != i){
		//färgar den man klickat på
			d3.select(bars[0][jsonObject.selectedIndex])
				.attr("fill", c.selectedColor);
	};
				
	//ritat ut den vita rutan som markerar att man tryckt på nåt.
	  svg.append("rect")
				.attr("id", "selected_bar")
				.attr("transform", function(d){		drawText();		
													return "translate(0,0)";
												})
				.attr("y", (jsonObject.selectedIndex+4) * verticalBarDistance -selectedHeight*0.45)
				.attr("x" , selectedIndent+arrowWidth-15)
				.attr("rx", 15)
				.attr("ry", 15)
				.attr("height", selectedHeight)
				.style("fill", c.selectedColor)
				.transition()                                                                                                                            
				.delay(0)
				.duration(1000)
				.attr("width",selectedLength);
				
		//ritar triangelpunkterna
		var x1 = selectedIndent;
		var y1 = (jsonObject.selectedIndex+4) * verticalBarDistance -selectedHeight*0.45+ selectedHeight*0.5;
		
		var x2 = selectedIndent+arrowWidth;
		var y2 = (jsonObject.selectedIndex+4) * verticalBarDistance -selectedHeight*0.45;
		
		var x3 = selectedIndent+arrowWidth;
		var y3 = (jsonObject.selectedIndex+4) * verticalBarDistance -selectedHeight*0.45+ selectedHeight;
		
		//dragpoints för kurvan
		var e = x1+arrowWidth*0.1+", "+(y1+1)+" ";
		var f = x1+arrowWidth*0.65+", "+y2+" ";
		var g = x1+arrowWidth*0.65+"," + y3+" ";
		var h = x1+arrowWidth*0.1+"," + (y1-1)+" ";


		svg.append("path")
				.attr("id", "selected_bar")
				.attr("d",  "M " +x1+", "+y1+ 
							" C "+ e + f + x2+", "+y2+ 
							" L "+x3+", "+y3+ 
							" C "+ g + h +x1+", "+y1+
							" Z")
				.attr("fill",c.selectedColor);	

  };
  
  var fail = [0,0,0,0,0];

	
	//triggas före success
	function onDone(){
		
	};
		
	function setSelectedParameters(u){
			boolen = 0;
			fail = 0;
        
			jsonObject.clickedObject.blogCount = Math.round(Math.random() * 40);
			jsonObject.clickedObject.inlinks = jsonObject.jsondata[u].inlinks;
			fail = [1, 1, 1, 1, 1];

			jsonObject.clickedObject.visitors = jsonObject.selectedItem.visitors;
			jsonObject.clickedObject.ranking = jsonObject.selectedItem.ranking;
			jsonObject.clickedObject.title = jsonObject.selectedTitle;

			circleDiagrams(jsonObject.userObject, jsonObject.clickedObject, fail);
	};

	function removeText(){
		svg.selectAll("#blogglabel")
			.remove();
	};
	

	function drawText()
	{
		removeText();
		svg.append("text")
			.attr("id", "blogglabel")
			.attr("text-anchor", "end")
			.style("font-size", 11+"pt")
			.style("font-family", "Museo500")
			.attr("y", (jsonObject.selectedIndex+4) * verticalBarDistance + verticalBarDistance*0.7+verticalBarDistance*0.5)
			.attr("x", selectedIndent+arrowWidth+selectedLength-35)
			.attr("fill", "white")
			.transition()
			.delay(1000)
			.duration(1000)
			.attr("opacity", 100)
			.text(function(){	if(jsonObject.selectedItem != null){
									if(jsonObject.selectedItem.name.length < 25){
										return jsonObject.selectedItem.name;
										}
									else{
										return jsonObject.selectedItem.name.substring(0, 26) + "...";
									}
								}
								else{
									return "Unknown";
								}
							});
	};

	
	
	//ritar ut hooverRektanglarna i en svg men 
	function drawHooverItems(){
		
		jsonObject.hooverIndex = jsonObject.userIndex;

		
		var counter  = 0;
		var innerIndex;
		
		
		var hooverIndent = selectedIndent*1.2;
		var hooverArrow_w = hooverRectHeight*0.5;
		var hooverArrow_h = hooverRectHeight;
		var hooverArrow_Ybegin = hooverRectHeight*0.1;

			//skapar en svg-kontainer för alla rektanglar
			var svg2 = svg.append("svg")
						.attr("id", "hooverContainer")
						.attr("height", hooverContHeight)
						.attr("width", graphWidth);
						
		//ritar triangelpunkterna
		var x1 = selectedIndent-10; 
		var y1 = hooverArrow_Ybegin+hooverArrow_h*0.5;
		
		var x2 = hooverIndent+hooverArrow_w;
		var y2 = hooverArrow_Ybegin;
		
		var x3 = hooverIndent+hooverArrow_w;
		var y3 = hooverArrow_Ybegin+hooverArrow_h;
		
		//dragpoints för kurvan
		var e = x1+hooverArrow_w *0.5+", "+(y1-hooverArrow_h *0.1)+" ";
		var f = x1+hooverArrow_w *1+", "+(y2+hooverArrow_h *0)+" ";
		var g = x1+hooverArrow_w *1+"," + (y3-hooverArrow_h *0)+" ";
		var h = x1+hooverArrow_w *0.5+"," + (y1+hooverArrow_h *0.1)+" ";

			
			arrow = svg2.append("svg:path")
				.attr("d",  "M " +x1+", "+y1+ 
							" C "+ e + f + x2+", "+y2+ 
							" L "+x3+", "+y3+ 
							" C "+ g + h +x1+", "+y1+
							" Z")
				.style("opacity", 1)
				.attr("visibility", "hidden")
				.attr("fill", "#1882A5")
				.on("mousedown", mouseDownEvent);
			
		
						
				//lägger till rektanglarna i en container
				var rects = svg2.append("rect")
						.attr("id", function(d){return "hooverRect";}
									)
						.attr("y", function(d, i)
						{	
							return hooverArrow_Ybegin;
					
						 })
					 .attr("x", function(d)
						  {
						   return selectedIndent+arrowWidth-15;
						  })
					 .attr("rx", 25)
					 .attr("ry", 25)
						  .attr("width", selectedLength)
					.attr("height", function(d)
					  {
					   return hooverRectHeight;
					  })
					.attr("fill", "#1882A5")
					.style("opacity", 1)
					.attr("visibility","hidden")
					.on("mousedown", mouseDownEvent);
							
					
			return rects;		
									
	};
	
	function hooverOver(){
		if(mouseIn == 0){
			firstIn = true;	
		}
		
		if(mouseIn == 2)
		{
			firstIn = false;	
		}
		
		mouseIn = 2;
	};
	
	function hooverOut(){
		document.body.style.cursor = 'default';
		firstIn = false;	
	};
	
	function setHooverIndex(pos){
		jsonObject.hooverIndex = Math.round((pos[1]-graphHeight*0.001)/verticalBarDistance)-4;
	};
	
	function setHooverItem(index){
		jsonObject.hooverItem =  jsonObject.jsondata[jsonObject.hooverIndex];
	};
	
	function setGlobal(){
		document.body.style.cursor = 'pointer';
		//hämtar positionen för muspekaren
			globalPos = d3.mouse(this); 
			
			//färgar tillbaka den som varit hoovrad över
			d3.select(bars[0][jsonObject.hooverIndex])
				.attr("fill", function(d){
										if(jsonObject.hooverIndex == jsonObject.userIndex){
											return userColor;
										}
										else if(jsonObject.hooverIndex==jsonObject.selectedIndex){
											return c.selectedColor;
										}
										else{
											return color(jsonObject.hooverIndex/numberOfElements);
										}
								});
								
			arrow
				.attr("fill", function(d){
										if(jsonObject.hooverIndex == jsonObject.userIndex){
											return userColor;
										}
										else{
											return color(jsonObject.hooverIndex/numberOfElements);
										}
								});
			
			//uppdaterar objekt-värdena
			setHooverIndex(globalPos);
			setHooverItem(jsonObject.hooverIndex);
			
			//färgar den baren pilen pekar på
			d3.select(bars[0][jsonObject.hooverIndex])
				.attr("fill", c.hooverColor);
			
			//kollar första gången muspekaren går in i chart1
			if(firstIn == true){
				rects
					.attr("visibility","visible");
				
				arrow
					.attr("visibility", "visible");
				
				//sätter positionen på pilen till där muspekaren är.
				d3.select("#hooverContainer")
					.attr("y", function(){
											if(jsonObject.hooverIndex < 3){
												//return (100 - hooverContHeight*0.1);
											}
											else{
												return globalPos[1]- hooverContHeight*0.3;
											}
										});
			}
			else
			{
				d3.select("#hooverContainer")
					.attr("y", function(){ if(jsonObject.hooverIndex < 1){
												return globalPos[1] - hooverContHeight*0.3;
												
											}
											else{
													
												return globalPos[1] - hooverContHeight*0.3;
												}
											});
											drawText2();
					
				rects
					.attr("fill", function(d,i){	
													if(jsonObject.hooverIndex == jsonObject.userIndex){
															return userColor;
													}
													
													else{
														return color((jsonObject.hooverIndex+i)/numberOfElements);
													}
												});
				arrow
					.attr("fill", function(d){
											if(jsonObject.hooverIndex == jsonObject.userIndex){
												return userColor;
											}
											else{
												return color((jsonObject.hooverIndex)/numberOfElements);
											}
									});
													
				
			}
			
			
	};
	

	function drawText2()
	{
		svg.selectAll("#blogglabel2")
			.remove();
			
		svg.selectAll("#blogglabel3")
			.remove();
			
		svg.append("text")
			.attr("id", "blogglabel3")
			.attr("text-anchor", "end")
			.style("font-size", 9+"pt")
			.style("font-family", "Museo100")
			.attr("y", function(){
										return globalPos[1] - hooverRectHeight *0.6;
								})
			.attr("x", selectedIndent+arrowWidth+selectedLength-35)
			.attr("fill", "#878787")
			.text(function(){	if(jsonObject.hooverIndex > 0){
									if(jsonObject.jsondata[jsonObject.hooverIndex-1].name.length < 30){
										return jsonObject.jsondata[jsonObject.hooverIndex-1].name;
									}
									else{
										return jsonObject.jsondata[jsonObject.hooverIndex-1].name.substring(0, 31) + "...";
									}
								}
								else{
									return jsonObject.jsondata[jsonObject.hooverIndex].name;
								}
							});
			
		svg.append("text")
			.attr("id", "blogglabel2")
			.attr("text-anchor", "end")
			.style("font-size", 12+"pt")
			.style("font-family", "Museo500")
			.attr("fill", "white")
			//.on("mousedown", mouseDownEvent)
			.attr("y",function(){
									if(jsonObject.hooverIndex < 1){
											return globalPos[1]+ hooverRectHeight *0.1;
										//return (window.innerHeight * 0.000001 + hooverContHeight*0.12);
									}
									else{
										return globalPos[1]+ hooverRectHeight *0.1;
									}
								})//+hooverHeight*0.1)
			.attr("x", selectedIndent+arrowWidth+selectedLength-35)
			.text(function(){	if(jsonObject.hooverItem.name.length < 25){
									return jsonObject.hooverItem.name;
									}
								else{
									return jsonObject.hooverItem.name.substring(0, 26) + "...";
								}
							})
			.on("mousedown", mouseDownEvent);
							

							
							
		svg.append("text")
			.attr("id", "blogglabel3")
			.style("font-size", 9+"pt")
			.style("font-family", "Museo100")
			.attr("text-anchor", "end")
				.attr("y", function(){
										if(jsonObject.hooverIndex < 1){
											return globalPos[1]+ hooverRectHeight *0.8;
											//return (window.innerHeight * 0.000001 + hooverContHeight*0.25);
											
										}
										else{
											return globalPos[1]+ hooverRectHeight *0.8;
										}
									})
			.attr("x", selectedIndent+arrowWidth+selectedLength-35)
			.attr("fill", "#878787")
			.text(function(){	//här måste du kolla om det är för liten index. alltså om index är noll.
								if(jsonObject.jsondata[jsonObject.hooverIndex+1].name.length < 30){
									return jsonObject.jsondata[jsonObject.hooverIndex+1].name;
									}
								else{
									return jsonObject.jsondata[jsonObject.hooverIndex+1].name.substring(0, 31) + "...";
								}
							});							
	};

};




