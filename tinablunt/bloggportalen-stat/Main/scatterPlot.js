function updateSelIndex(jsonObject){	

	d3.select("#chart3")
		.selectAll("svg")
			.remove();

	scatterPlot(jsonObject);
};



function scatterPlot(jsonObject) {
    console.log(jsonObject);
	var c = new colorValues();
	var m = new measureObject();
	
	jsonObject.setMaxValues();
	
	var numberOfElements = jsonObject.jsondata.length;
	//variabler f�r att h�lla koll p� om axlarna �ndrats. 
	//diff �r f�rflyttningen cirklarna gjort fr�n utg�ngspositionen som f�r y �r ranking, och x visitors
	var yDiff = 0;
	var xDiff = 0;
	//var months = ["j" ,"f","m","a","m","j","j","a","s","o","n","d"];
	var hooverIndex;
	var checkHooverPos;
	var lastSelected;
	var checkSelectedPos
	var lastSelectedIndex;
	
	//F�rger
	var color = c.color;
	var hooverColor = c.hooverColor;
	var userColor = c.userColor;
	var selectedColor = c.selectedColor;
	var labelColor= c.labelColor;
	var lineColor = c.lineColor;
	var textColor = c.textColor;
	var backgroundColor = c.backgroundColor;
	
	//sorterar och plockar ut max f�r b�de x-ochy-axeln
	var temp = [];
	var temp2 = [];

				for(j = 0; j < jsonObject.jsondata.length;j++)
				{	//tempArray f�r att sortera fram maxVisitors
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
	 

	
	//s�tter var axlarna ska ligga
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
	var radiusMulti = graphHeight*0.00000001;
	
	
	//ritar ut knapparna och skapar svg'n f�r scatterplotten- l�ggs i variablen svg
	var svg = d3.select("#chart3")
				.append("svg")
				.attr("id", "scatter")
				.attr("x", 0)
				.attr("y", 0)
				.style("width", graphWidth)
				.style("height", graphHeight);
	
	
	
	drawAxisButtons();

    	if(jsonObject.logScale == 0){
			d3.selectAll("#isy")
				.remove();
		}
		else{
			//makeCross("y",y1ButtonPos[0],y1ButtonPos[1]);
		}              
	
	var xScale,yScale;
	
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
										.text("Just nu visas linj�r skala");
				
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
									.text("F�r logartimisk skala, klicka h�r");

	setScales();
	drawAxis();
	
	var items = jsonObject.jsondata;
		//items.push(jsonObject.userItem);
		var dataEnter = svg.selectAll("circle").data(items).enter();	

	
	//ritar ut cirklarna
	var circles = dataEnter
			.append("circle")
			.attr("id", function(d,i){
									if(i == jsonObject.selectedIndex){
											return "selected";
									  }
									  else{
											return "unselected";
									  }
						})
			.attr("fill", function(d,i){if(i == jsonObject.selectedIndex){
												
												selectedLabel();
												return selectedColor;
										}
										else if(jsonObject.userItem == d){
												return userColor;
										}
										else{
												return color(i/numberOfElements);
											}})
			.on("mouseover", mouseOverEvent)
			.on("mouseout", mouseOutEvent)
			.on("mousedown", mouseDownEvent)
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
		
		//ritar userTexten	
		userLabel();
	
		//ritar axelTexterna
	addButtonText(xStartPos,yStopPos-16,"Antal",10);
	addButtonText(xStartPos,yStopPos-1,"bes�kare",10);
	
	addButtonText(graphWidth*0.94,yStartPos-10,"Inkommande",10);
	addButtonText(graphWidth*0.94,yStartPos+10,"bloggl�nkar",10);
	
					
			
							

				
	
			
 //******************************************************************************************************
 //***********************        funktioner       ******************************************************
 //******************************************************************************************************

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
	
	function drawLogButton(){
		d3.select("#logButtonText").remove();
		d3.select("#logButtonInfo").remove();

		//linj�r
		if(jsonObject.logScale == 0){
		//l�gger till logaritmgrejen
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
										.text("Just nu visas linj�r skala");
								
									
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
									.text("F�r logartimisk skala, klicka h�r");
		}
		else{
			//l�gger till logaritmgrejen
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
									.text("F�r linj�r skala, klicka h�r");
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
								else if(jsonObject.userItem == d){
									return userColor;
								}
								else{
									return color(getIndex(d)/numberOfElements);
								}
							});
			
				svg.selectAll("#dotLabel")
					.remove();	
	};
		
	function mouseDownEvent(d,i){	
			var ind = i;
			//kollar om det finns n�gra selected fr�n tableLensen och g�r dom till unselected
			d3.select("#chart3")
				.selectAll("#selected")
				.attr("fill", function(d){	
											lastSelectedIndex = getIndex(d);
											if(jsonObject.jsondata[lastSelectedIndex] != jsonObject.userItem){
												return color(lastSelectedIndex/numberOfElements);
											}
											else{
												return userColor;
											}})
				.attr("id", "unselected");							  
		
				
			//s�tter den man klickat p� till selected
			d3.select(this)
				.attr("id", "selected")
				.attr("class", function(d,i){	lastSelectedIndex = jsonObject.selectedIndex;
												//s�tter nytt v�rde p� globala variabeln selectedIndex
												jsonObject.selectedIndex = ind;
												jsonObject.selectedItem = d;
												jsonObject.selectedTitle = jsonObject.selectedItem.name;
												selectedLabel();
												if(lastSelectedIndex != jsonObject.selectedIndex){
												    setSelectedParameters(jsonObject.selectedIndex);
														
														//h�r h�nder n�got m�rkligt n�r ranking �r selected
														updateSelIndexTable(jsonObject);
												}
													return "hej";
												})
				.attr("fill", selectedColor);
				
				lastSelected = this;

	};
	
	  var fail = [0,0,0,0,0];

	
	//triggas f�re success
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

		
	function getIndex(d){
			for(j = 0; j < numberOfElements;j++)
			{
				if((d == jsonObject.jsondata[j]))
				{
					return j;
				}
			}
	};
	
	function userLabel(){
		svg.selectAll("#userDotLabel")
					.remove();

		
		svg.append("a")
				.attr("xlink:href",jsonObject.userItem.url)
				//.style("height", "12pt")
				.attr("target", "_blank")
				.append("text")
				.attr("id", "userDotLabel")
				.style("font-size", 12+"pt")
				.style("font-family", "Museo500")
				.style("text-decoration", "underline")
				.on("mouseover", mouseOverText)
				.on("mouseout", mouseOutText)
				.attr("fill", userColor)
				.attr("text-anchor", function(){
										if(jsonObject.xSelected == 1){checkHooverPos = jsonObject.jsondata[jsonObject.userIndex].ranking > maxranking*0.8;}
										else{checkHooverPos = jsonObject.jsondata[jsonObject.userIndex].inlinks > maxInlinks*0.8;}
									
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
								return xScale(jsonObject.jsondata[jsonObject.userIndex].ranking)-10;
							}
							else{
								return xScale(jsonObject.jsondata[jsonObject.userIndex].inlinks)-10;
							}
						
						}
						
					  else{
							if(jsonObject.xSelected == 1){
								var v = jsonObject.jsondata[jsonObject.userIndex].ranking;
								if(v == 0){
										return xScale(0.9)+startRadius+jsonObject.jsondata[jsonObject.userIndex].ranking*radiusMulti;
									}else{
										return xScale(v)+startRadius+jsonObject.jsondata[jsonObject.userIndex].ranking*radiusMulti;
									}
							}
							else{
								var v = jsonObject.jsondata[jsonObject.userIndex].inlinks;
								if(v == 0){
										return xScale(0.9)+startRadius+jsonObject.jsondata[jsonObject.userIndex].inlinks*radiusMulti;
									}else{
										return xScale(v)+startRadius+jsonObject.jsondata[jsonObject.userIndex].inlinks*radiusMulti;
									}
							}
					
					  }
					  })
				.attr("y", function()
					{
						return yScale(jsonObject.jsondata[jsonObject.userIndex].visitors);
					})
				.text(function(){return jsonObject.jsondata[jsonObject.userIndex].name});
	
	};
		
	function selectedLabel(){
			svg.selectAll("#selectedDotLabel")
					.remove();
					
			if(jsonObject.selectedIndex != null){		
			var temp = svg.append("a")
				.attr("xlink:href",jsonObject.selectedItem.url)
				//.style("height", "12pt")
				.attr("target", "_blank")
				.append("text")
				.attr("id", "userDotLabel")
				.style("font-size", 12+"pt")
				.style("font-family", "Museo500")
				.style("text-decoration", "underline")
				.on("mouseover", mouseOverText)
				.on("mouseout", mouseOutText)
				.attr("id", "selectedDotLabel")
				.attr("fill", selectedColor)
				.attr("text-anchor", function(){
										if(jsonObject.xSelected == 1){checkHooverPos = jsonObject.jsondata[jsonObject.selectedIndex].ranking > maxranking*0.8;}
										else{checkHooverPos = jsonObject.jsondata[jsonObject.selectedIndex].inlinks > maxInlinks*0.8;}
									
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
								return xScale(jsonObject.jsondata[jsonObject.selectedIndex].ranking)-10;
							}
							else{
								return xScale(jsonObject.jsondata[jsonObject.selectedIndex].inlinks)-10;
							}
						
						}
						
					  else{
							if(jsonObject.xSelected == 1){
								var v = jsonObject.jsondata[jsonObject.selectedIndex].ranking;
								if(v == 0){
										return xScale(0.9)+startRadius+jsonObject.jsondata[jsonObject.selectedIndex].ranking*radiusMulti;
									}else{
										return xScale(v)+startRadius+jsonObject.jsondata[jsonObject.selectedIndex].ranking*radiusMulti;
									}
							}
							else{
								var v = jsonObject.jsondata[jsonObject.selectedIndex].inlinks;
								if(v == 0){
										return xScale(0.9)+startRadius+jsonObject.jsondata[jsonObject.selectedIndex].inlinks*radiusMulti;
									}else{
										return xScale(v)+startRadius+jsonObject.jsondata[jsonObject.selectedIndex].inlinks*radiusMulti;
									}
							}
					
					  }
					  })
				.attr("y", function()
					{
						return yScale(jsonObject.jsondata[jsonObject.selectedIndex].visitors);
					})
				.text(function(){return jsonObject.jsondata[jsonObject.selectedIndex].name});
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
											return "begin"
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
		selectedLabel();
		userLabel();
				
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
				
			//addButtonText(y1ButtonPos[0]-5,y1ButtonPos[1]+7,"Logaritmisk",7);
			//addButtonText(y1ButtonPos[0]-5,y1ButtonPos[1]+17,"skala",7);

			
		/*	//ritar x-knapparna
			drawOneAxisButton(x1ButtonPos[0],x1ButtonPos[1],"xButton",setX2Inlinks);
			drawOneAxisButton(x2ButtonPos[0],x2ButtonPos[1],"xButton",setX2ranking);
			
			addButtonText(x1ButtonPos[0],x1ButtonPos[1]+10,"L�nkad inom Twingly",8);
			addButtonText(x2ButtonPos[0],x2ButtonPos[1]+10,"Ranking",8);
			//addButtonText(x2ButtonPos[0],x2ButtonPos[1]+10,"Antal inl�gg");*/

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
		
		
};

