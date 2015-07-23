function updateSelIndex2(jsonObject){	

	d3.select("#chart3")
		.selectAll("svg")
			.remove();

	scatterPlot2(jsonObject);
};



function scatterPlot2(jsonObject){
	var c = new colorValues();
	var m = new measureObject();
	
	jsonObject.setMaxValues();
	
	var numberOfElements = jsonObject.jsondata.length;
	//variabler för att hålla koll på om axlarna ändrats. 
	//diff är förflyttningen cirklarna gjort från utgångspositionen som för y är ranking, och x visitors
	var yDiff = 0;
	var xDiff = 0;
	//var months = ["j" ,"f","m","a","m","j","j","a","s","o","n","d"];
	var hooverIndex;
	var checkHooverPos;
	var lastSelected;
	var checkSelectedPos
	var lastSelectedIndex;
	
	//Färger
	var color = c.color;
	var hooverColor = c.hooverColor;
	var userColor = c.userColor;
	var selectedColor = c.selectedColor;
	var labelColor= c.labelColor;
	var lineColor = c.lineColor;
	var textColor = c.textColor;
	var backgroundColor = c.backgroundColor;
	
	//sorterar och plockar ut max för både x-ochy-axeln
	var temp = [];
	var temp2 = [];

				for(j = 0; j < jsonObject.jsondata.length;j++)
				{	//tempArray för att sortera fram maxVisitors
					temp.push(jsonObject.jsondata[j].ranking);
					temp2.push(jsonObject.jsondata[j].inlinks);
				}

				
				jsonObject.maxRanking = Math.max.apply(Math, temp);
				jsonObject.maxInlinks = Math.max.apply(Math, temp2);
				jsonObject.maxVisitors = jsonObject.jsondata[0].visitors;
				
				
				
	
	var maxranking = jsonObject.maxRanking;
	var maxVisitors = jsonObject.maxVisitors;
	var maxInlinks = jsonObject.maxInlinks;

	var graphHeight = m.scatterPlot_h;
	var graphWidth = m.scatterPlot_w;
	 
	//variabler för att muliplicera elementvärdet för att få rätt avstånd
	var xStart = window.innerHeight * 0.01;
	var yStart = window.innerHeight * 0.01;
	
	//sätter var axlarna ska ligga
	var xStartPos = graphWidth*0.15;
	var yStartPos = graphHeight*0.85;
	var xStopPos = graphWidth*0.88;
	var yStopPos = graphHeight*0.1;
	

	var x1ButtonPos = [graphWidth-20,graphHeight*0.87];
	var x2ButtonPos = [graphWidth-20,graphHeight*0.87+20];
	var y1ButtonPos = [xStartPos-30,yStartPos-20];
	
	var area = graphHeight * graphWidth;
	var valueArea = maxranking * maxVisitors;
	var startRadius = graphHeight*0.015;
	var maxRadius = graphHeight*0.03;
	var radiusMulti = (maxRadius-startRadius)/maxVisitors;
	
	//för datainhämtningen vid klick
	 var url2;
	 var url3;
	 var lastSelectedIndex1;
	 var lastSelectedIndex2;
	 //fail är array med bool för att se hur inmatningen gått
	 //plats: 0=obj1.inlinks, 1=obj1.blogCount, 2=obj2.inlinks, 3=obj2.blogCount.
	 var fail = [];
	 var doingSomething = 0;
	 
	 var circles;
	
	
	//ritar ut knapparna och skapar svg'n för scatterplotten- läggs i variablen svg
	var svg = d3.select("#chart3")
				.append("svg")
				.attr("id", "scatter")
				.attr("x", 0)
				.attr("y", 0)
				.attr("width", graphWidth)
				.attr("height", graphHeight);
				
	drawAxisButtons();
             
	
	var xScale,yScale;
	
	//lägger till logaritmgrejen
			var logButtonInfo = svg
										.append("text")
										.attr("class", "no-select")
										.attr("id", "logButtonInfo")
										.attr("text-anchor", "end")
										.style("font-size", 14+"pt")
										.style("font-family", "Museo100")
										.attr("x", graphWidth*0.5)
										.attr("y",  graphHeight-12)
										.attr("fill", "#878787")
										.text("Just nu visas linjär skala");
				
				var logButton = svg
									.append("svg:image")
									.attr("xlink:href", "../bilder/graftoggle_out.png")
									.on("mousedown", setScalesToLog)
									.on("mouseover", mouseOverText)
									.on("mouseout", mouseOutText)
									.attr("y",  graphHeight-graphHeight*0.1)
									.attr("x", graphWidth*0.5+10)
									.attr("width", graphWidth*0.33)
									.attr("height", graphHeight*0.1);				
									
				var logButtonText = svg
									.append("text")
									.attr("text-anchor", "middle")
									.attr("id", "logButtonText")
									.style("font-size", 12+"pt")
									.style("font-family", "Museo500")
									.attr("fill", "#2ebae9")
									.on("mousedown", setScalesToLog)
									.on("mouseover", mouseOverText)
									.on("mouseout", mouseOutText)
									.attr("y",  graphHeight-12)
									.attr("x", graphWidth*0.5+10+graphWidth*0.33*0.5)
									.text("För logartimisk skala, klicka här");
	
	setScales();
	drawAxis();
	
	var items = jsonObject.jsondata;
		//items.push(jsonObject.userItem);
		var dataEnter = svg.selectAll("circle").data(items).enter();	
	
		drawCircles();
		
	addButtonText(xStartPos,yStopPos-16,"Antal",10);
	addButtonText(xStartPos,yStopPos-1,"besökare",10);
	
	addButtonText(graphWidth*0.94,yStartPos-10,"Inkommande",10);
	addButtonText(graphWidth*0.94,yStartPos+10,"blogglänkar",10);
	
			
									
							
			
			

//******************************************************************************************************
 //***********************       publika funktioner       ******************************************************
 //******************************************************************************************************
	this.setCircles = function(circ){
		circles = circ;
	};	

	this.getCircles = function(){
		return circles;
	};	
	
	this.selectedLabel = function(i,col){
		selectedLabel(i,col);
	};
	
	this.drawCircles = function(jo){
		jsonObject = jo;
		circles.remove();
		 //tar bort pricktexten
			 d3.selectAll("#selectedDotLabel")
					.remove();
		drawCircles();
	};
			
 //******************************************************************************************************
 //***********************        funktioner       ******************************************************
 //******************************************************************************************************
	function drawCircles(){
		//ritar ut cirklarna
		circles = dataEnter
				.append("circle")
				.attr("fill", function(d,i){if(i == jsonObject.selectedIndex){
													selectedLabel(i,selectedColor);
													return selectedColor;
											}
											else if(i == jsonObject.selectedIndex2 && jsonObject.selectCounter == 0){
													selectedLabel(i,userColor);
													return userColor;
											}
											else{
													return color(i/numberOfElements);
												}})
				.on("mouseover", mouseOverEvent)
				.on("mouseout", mouseOutEvent)
				//.on("mousedown", mouseDownEvent)
				.attr("cy", function(d,i)
							{		
							   return yScale(d.visitors);
							 })
				.attr("cx", function(d){	
								setScales();
								if(jsonObject.xSelected==0){
									//makeCross("x",x1ButtonPos[0],x1ButtonPos[1]);
									if(d.inlinks == 0){
										return xScale(0.9);
									}else{
										return xScale(d.inlinks);
									}
								}
								else{
									//makeCross("x",x2ButtonPos[0],x2ButtonPos[1]);
									if(d.ranking == 0){
										return xScale(0.9);
									}else{
										return xScale(d.ranking);
									}
									
								}
							 })
				.attr("r", function(d){return startRadius+d.visitors*radiusMulti;});
				
		
	};	
	
	function drawLogButton(){
		d3.select("#logButtonText").remove();
		d3.select("#logButtonInfo").remove();

		//linjär
		if(jsonObject.logScale == 0){
		//lägger till logaritmgrejen
			var logButtonInfo = 	svg
										.append("text")
										.attr("class", "no-select")
										.attr("id", "logButtonInfo")
										.attr("text-anchor", "end")
										.style("font-size", 14+"pt")
										.style("font-family", "Museo100")
										.attr("x", graphWidth*0.5)
										.attr("y",  graphHeight-12)
										.attr("fill", "#878787")
										.text("Just nu visas linjär skala");
								
									
				var logButtonText = svg
									.append("text")
									.attr("text-anchor", "middle")
									.attr("id", "logButtonText")
									.style("font-size", 12+"pt")
									.style("font-family", "Museo500")
									.attr("fill", "#2ebae9")
									.on("mousedown", setScalesToLog)
									.on("mouseover", mouseOverText)
									.on("mouseout", mouseOutText)
									.attr("y",  graphHeight-12)
									.attr("x", graphWidth*0.5+10+graphWidth*0.33*0.5)
									.text("För logartimisk skala, klicka här");
		}
		else{
			//lägger till logaritmgrejen
				var logButtonInfo = 	svg
										.append("text")
										.attr("class", "no-select")
										.attr("id", "logButtonInfo")
										.attr("text-anchor", "end")
										.style("font-size", 14+"pt")
										.style("font-family", "Museo100")
										.attr("x", graphWidth*0.5)
										.attr("y",  graphHeight-12)
										.attr("fill", "#878787")
										.text("Just nu visas logaritmisk skala");
								
									
				var logButtonText = svg
									.append("text")
									.attr("text-anchor", "middle")
									.attr("id", "logButtonText")
									.style("font-size", 12+"pt")
									.style("font-family", "Museo500")
									.attr("fill", "#2ebae9")
									.on("mousedown", setScalesToLog)
									.on("mouseover", mouseOverText)
									.on("mouseout", mouseOutText)
									.attr("y",  graphHeight-12)
									.attr("x", graphWidth*0.5+10+graphWidth*0.33*0.5)
									.text("För linjär skala, klicka här");
		}
	};

	
	function setScales(){
		//0=inlinks, 1=ranking
		if(jsonObject.xSelected == 1){
			xMax = maxranking;
		}
		else{
			xMax = maxInlinks;
		}
		
		if(jsonObject.logScale == 0){
			xScale = d3.scale.linear()
					   .domain([0.9, xMax])
					   .range([xStartPos, xStopPos]);	
					   
			yScale = d3.scale.linear()
                  .domain([maxVisitors,jsonObject.minVisitors])
				  .range([yStopPos, yStartPos]);
			drawLogButton();
		}
		else{
			yScale = d3.scale.log()
                  .domain([maxVisitors,jsonObject.minVisitors])
				  .range([yStopPos, yStartPos]);
				  
			xScale = d3.scale.log()
					   .domain([0.9, xMax])
					   .range([xStartPos, xStopPos]);	
			drawLogButton();
		}
	};
	
	function drawAxis(){
		var formatNumber = d3.format(",f"), // for formatting integers
		formatCurrency = function(d) { return "$" + formatNumber(d);};
		
		d3.select("#chart3")
			.selectAll("g")
			.remove();

		var xAxis = d3.svg.axis()
					  .scale(xScale)
					  .orient("bottom")
					  .ticks(5,formatNumber);

		svg.append("g")
					.attr("class", "axis")
					.style("font-size", 14+"pt")
					.style("font-family", "OpenSans_light")
					.attr("transform", "translate("+0+"," + yStartPos + ")")
					.call(xAxis);

		var yAxis = d3.svg.axis()
					  .scale(yScale)
					  .orient("left")
					  .ticks(5,formatNumber);
					  
		svg.append("g")
				.attr("class", "axis")
				.style("font-size", 14+"pt")
				.style("font-family", "OpenSans_light")
				.attr("transform", "translate(" + xStartPos + ","+ 0 +")")
				.call(yAxis);	
	};
	
	
	
	function mouseOverEvent(d,i){	
		document.body.style.cursor = 'pointer';
			d3.select(this)
				.attr("fill", function(d){
								if(i == jsonObject.selectedIndex){
									return selectedColor;
								}
								else if(i == jsonObject.selectedIndex2){
									return userColor;
								}
								else{
									return hooverColor;
								}
							})
				.attr("transform", function(d){
												hooverIndex = getIndex(d);
												return "translate(0,0)"
												})
				.call(hooverLabel);	  
	};
		
	function mouseOutEvent(d,i){
		document.body.style.cursor = 'default';
			d3.select(this)
				.attr("fill",function(d){
								if(i == jsonObject.selectedIndex){
									return selectedColor;
								}
								else if(i == jsonObject.selectedIndex2){
									return userColor;
								}
								else{
									return color(getIndex(d)/numberOfElements);
								}
							});
			
				svg.selectAll("#dotLabel")
					.remove();	
	};
	

		
	

		
	function getIndex(d){
			for(j = 0; j < numberOfElements;j++)
			{
				if((d == jsonObject.jsondata[j]))
				{
					return j;
				}
			}
	};
		
	function selectedLabel(ind,col){

			if(jsonObject.selectedIndex != null){		
			var temp = svg.append("a")
				.attr("xlink:href",jsonObject.jsondata[ind].url)
				//.style("height", "12pt")
				.attr("target", "_blank")
				.append("text")
				.attr("id", "userDotLabel")
				.style("text-decoration", "underline")
				.style("font-size", 12+"pt")
				.style("font-family", "Museo500")
				.on("mouseover", mouseOverText)
				.on("mouseout", mouseOutText)
				.attr("id", "selectedDotLabel")
				.attr("fill", col)
				.attr("text-anchor", function(){
										if(jsonObject.xSelected == 1){checkHooverPos = jsonObject.jsondata[ind].ranking > maxranking*0.8;}
										else{checkHooverPos = jsonObject.jsondata[ind].inlinks > maxInlinks*0.8;}
									
										if(checkHooverPos == true ){
											return "end";
										}
										else{
											return "begin"
										}
									})
				.attr("x", function()
					  {
					  if(checkHooverPos == true){
							if(jsonObject.xSelected == 1){
								return xScale(jsonObject.jsondata[ind].ranking)-10;
							}
							else{
								return xScale(jsonObject.jsondata[ind].inlinks)-10;
							}
						
						}
						
					  else{
							if(jsonObject.xSelected == 1){
								var v = jsonObject.jsondata[ind].ranking;
								if(v == 0){
										return xScale(0.9)+startRadius+jsonObject.jsondata[ind].ranking*radiusMulti;
									}else{
										return xScale(v)+startRadius+jsonObject.jsondata[ind].ranking*radiusMulti;
									}
							}
							else{
								var v = jsonObject.jsondata[ind].inlinks;
								if(v == 0){
										return xScale(0.9)+startRadius+jsonObject.jsondata[ind].inlinks*radiusMulti;
									}else{
										return xScale(v)+startRadius+jsonObject.jsondata[ind].inlinks*radiusMulti;
									}
							}
					
					  }
					  })
				.attr("y", function()
					{
						return yScale(jsonObject.jsondata[ind].visitors);
					})
				.text(function(){return jsonObject.jsondata[ind].name});
		}
	};
		
		
	function hooverLabel(){
			var temp = svg.append("text")
				.attr("id", "dotLabel")
				.attr("fill", labelColor)
				.style("font-size", 12+"pt")
				.style("font-family", "Museo500")
				.attr("text-anchor", function(){
										if(jsonObject.xSelected == 1){checkHooverPos = jsonObject.jsondata[hooverIndex].ranking > maxranking*0.8;}
										else{checkHooverPos = jsonObject.jsondata[hooverIndex].inlinks > maxInlinks*0.8;}
									
										if(checkHooverPos == true ){
											return "end";
										}
										else{
											return "begin";
										}
									})
				.attr("x", function()
					  {
					  if(checkHooverPos == true){
							if(jsonObject.xSelected == 1){
								return xScale(jsonObject.jsondata[hooverIndex].ranking)-10;
							}
							else{
								return xScale(jsonObject.jsondata[hooverIndex].inlinks)-10;
							}
						
						}
						
					  else{
							if(jsonObject.xSelected == 1){
								var v = jsonObject.jsondata[hooverIndex].ranking;
								if(v == 0){
										return xScale(0.9)+startRadius+jsonObject.jsondata[hooverIndex].ranking*radiusMulti;
									}else{
										return xScale(v)+startRadius+jsonObject.jsondata[hooverIndex].ranking*radiusMulti;
									}
							}
							else{
								var v = jsonObject.jsondata[hooverIndex].inlinks;
								if(v == 0){
										return xScale(0.9)+startRadius+jsonObject.jsondata[hooverIndex].inlinks*radiusMulti;
									}else{
										return xScale(v)+startRadius+jsonObject.jsondata[hooverIndex].inlinks*radiusMulti;
									}
							}
					
					  }
					  })
				.attr("y", function()
					{
							return yScale(jsonObject.jsondata[hooverIndex].visitors);
					})
				.text(function(){return jsonObject.jsondata[hooverIndex].name});
		
	};
		
		
	
	function makeCross(type,x1,y1){
		var typeStr = "#is" + type;
		
		d3.selectAll(typeStr)
				.remove();
		
		svg
			.append("svg:line")
			.attr("id", function(){
									return "is"+type;
			})
			.attr("x1", x1)
			.attr("y1", y1+7)
			.attr("x2", x1+5)
			.attr("y2", y1+15)
			.style("stroke", c.lineColor)
			.style("stroke-width", 2);
		
		svg
			.append("svg:line")
			.attr("id", function(){
									return "is"+type;
			})
			.attr("x1", x1+15)
			.attr("y1", y1)
			.attr("x2", x1+5)
			.attr("y2", y1+15)
			.style("stroke", c.lineColor)
			.style("stroke-width", 2);
	
	}
	
		
		

	//--------------------------------------------------------------------------------------		

	//funktioner till Xaxeln--------------------------------------------------------------------------------------

	function setX2Inlinks(){
			jsonObject.xSelected = 0;
			xMax = maxInlinks;

			d3.select("#xAxisHolder")
				.selectAll("line")
				.remove();
				
			setScales();
			drawAxis();
			selectedLabel();
				circles
					.transition()
					.delay(0)
					.duration(1000)
					.attr("cx", function(d)
								{	if(d.inlinks == 0){
										return xScale(0.9);
									}else{
										return xScale(d.inlinks);
									}
								});
								
			makeCross("x",x1ButtonPos[0],x1ButtonPos[1]);

					
	};
		
	function setX2ranking(){
			jsonObject.xSelected = 1;
			
			xMax = maxranking;
			setScales();
			drawAxis();
			selectedLabel();
				circles
					.transition()
					.delay(0)
					.duration(1000)
					.attr("cx", function(d)
								{	
									if(d.ranking == 0){
										return xScale(0.9);
									}else{
										return xScale(d.ranking);
									}
								});
								
						makeCross("x",x2ButtonPos[0],x2ButtonPos[1]);	

	};
	
	function setScalesToLog(){
		if(jsonObject.logScale == 0){
			jsonObject.logScale = 1;
			//makeCross("y",y1ButtonPos[0],y1ButtonPos[1]);
		}
		else{
			jsonObject.logScale = 0;
			d3.selectAll("#isy")
				.remove();
		}
		setScales();
		drawAxis();
		
		//tar bort pricktexten
			 d3.selectAll("#selectedDotLabel")
					.remove();
					
		if(jsonObject.selectedIndex2 != null && jsonObject.selectCounter == 0){
								selectedLabel(jsonObject.selectedIndex2,userColor);
		}
		selectedLabel(jsonObject.selectedIndex, c.selectedColor);
				
				circles
					.transition()
					.delay(0)
					.duration(1000)
					.attr("cx", function(d)
								{	
									if(jsonObject.xSelected==0){
										if(d.inlinks == 0){
											return xScale(0.9);
										}else{
											return xScale(d.inlinks);
										}
									}
									else{
										if(d.ranking == 0){
											return xScale(0.9);
										}else{
											return xScale(d.ranking);
										}
									}
								})
					.attr("cy", function(d)
								{	if(d.visitors == 0){
										return yScale(0.9);
									}else{
										return yScale(d.visitors);
									}
					});

		
	};
		

	function drawAxisButtons(){
			
			//ritar y-knapparna
			//drawOneAxisButton(y1ButtonPos[0],y1ButtonPos[1],"yButton",setScalesToLog);			
			//addButtonText(y1ButtonPos[0]-5,y1ButtonPos[1]+7,"Logaritmisk",7);
			//addButtonText(y1ButtonPos[0]-5,y1ButtonPos[1]+17,"skala",7);

			
			//ritar x-knapparna
		/*	drawOneAxisButton(x1ButtonPos[0],x1ButtonPos[1],"xButton",setX2Inlinks);
			drawOneAxisButton(x2ButtonPos[0],x2ButtonPos[1],"xButton",setX2ranking);
			
			addButtonText(x1ButtonPos[0],x1ButtonPos[1]+10,"Länkad inom Twingly",8);
			addButtonText(x2ButtonPos[0],x2ButtonPos[1]+10,"Ranking",8);
			//addButtonText(x2ButtonPos[0],x2ButtonPos[1]+10,"Antal inlägg");*/

	};
	
		function drawOneAxisButton(x,y,id,downEvent){
		svg
				.append("rect")
				.attr("id", id)
				.attr("fill", function(){
									return backgroundColor;
								})
				.attr("stroke", "gray")
				.attr("stroke-width", 3)
				.on("mousedown", downEvent)
				.attr("y", y)
				.attr("x", x)
				.attr("width", 15)
				.attr("height", 15);
	
	};
	
	function addButtonText(x,y,text,pt){
			svg
				.append("text")
				.attr("class", "no-select")
				.style("font-size", 12+"pt")
				.style("font-family", "Museo100")
				.style("font-size",function(d,i){return pt+"pt";})
				.attr("text-anchor", "middle")
				.attr("x", x)
				.attr("y", y)
				.attr("fill", "#878787")
				.text(text);

	};
		
		
}

