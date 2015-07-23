function clickHandler(jsonObject,tl,sp){
	var c = new colorValues();
	
	var bar, rect, arro, hooverLabe, circles;

  //för datainhämtningen vid klick
  var url2;
  var url3;
  //fail är array med bool för att se hur inmatningen gått
  //plats: 0=obj1.inlinks, 1=obj1.blogCount, 2=obj2.inlinks, 3=obj2.blogCount.
  var fail = [];
  var doingSomething = 0;

	setMouseEventVars_tl();
	setMouseEventVars_sp();	
	
	
	function getLabel(){
		hooverLabe = tl.gethooverLabel();
		
		if(hooverLabe != null){
			hooverLabe.on("mousedown", mouseDownEvent);
		}
	};
	
	function setMouseEventVars_tl(){
		bar = tl.getBars();
		bar.on("mousedown", mouseDownEvent);
		
		rect = tl.getRects();	
		rect.on("mousedown", mouseDownEvent);
		
		arro = tl.getArrow();
		arro.on("mousedown", mouseDownEvent);
	};
	
	function setMouseEventVars_sp(){
			circles = sp.getCircles();
			circles.on("mousedown", mouseDownEventCirc);
	};
	
	function mouseDownEventCirc(d,i){			  
		//trycker första gången
		if(jsonObject.selectCounter == 0){
			doingSomething = 0;
			 fail = [0,0,0,0,1];
			 
			 //tar bort pricktexten
			 d3.selectAll("#selectedDotLabel")
					.remove();
					
				recolorAll();
								
			//sätter nytt värde på globala variabeln selectedIndex
			jsonObject.selectedIndex2 = null;
			jsonObject.selectedItem2 = null;
			jsonObject.selectedTitle2 = null;					
			
			//sätter nytt värde på globala variabeln selectedIndex
			jsonObject.selectedIndex = i;
			jsonObject.selectedItem = d;
			jsonObject.selectedTitle = jsonObject.selectedItem.name;
			
					//börjar med att ta bort den gamla cirkeln
								d3.selectAll("#svg2")
									.remove();

								d3.select("#errorSVG")
									.remove();
								
								d3.select("#hide")
									.remove();
									
								d3.select("#colorsLabel")
									.selectAll("svg")
									.remove();
									
								d3.selectAll("#introText")
									.remove();
								d3.selectAll("#compareGraph")
									.remove();
									
								d3.select("#lblText")
									.selectAll("text")
									.remove();
									
								d3.select("#chart2")
									.append("p")
									.style("font-size", 12+"pt")
									.style("right", "35%")
									.style("top",25+"%")
									.attr("id", "compareGraph")
									.attr("fill", c.textColor)
									.text(function(){return "Klicka på ytteligare en blogg för att jämföra den med: ";});		
								
								var t = d3.select("#chart2")
											.append("p")
											.style("font-size", 14+"pt")
											.style("top",40+"%")
											.style("right", "20%")
											.attr("id", "compareGraph")
											.style("color", c.selectedColor);
											
										t.append("a")
											.attr("href", function(){return jsonObject.selectedItem.url;})
											.style("height", "12pt")
											.attr("target", "_blank")
											//.text()
											.style("text-decoration", "underline")
											.text(function(){return jsonObject.selectedItem.name;});	
			
			jsonObject.selectCounter = 1;
			
			//färgar den man tryckt på till lila
			d3.select(circles[0][jsonObject.selectedIndex])
				.attr("fill", c.selectedColor);	
			
			jsonObject.clickedObject.title = jsonObject.selectedTitle;
			
			d3.selectAll("#selected_bar")
				.remove();
				
			//ritar in färg i teblelensen
			d3.select(bar[0][jsonObject.selectedIndex])
				.attr("fill", c.selectedColor);
			tl.drawSelected(jsonObject.selectedItem, jsonObject.selectedIndex, c.selectedColor);					
			
			sp.selectedLabel(jsonObject.selectedIndex,c.selectedColor);
			//hämtar data. blog-count och inlinks
			setSelectedParameters(jsonObject.selectedIndex, jsonObject.clickedObject);
		}	
		//trycker andra gången
		else{
			jsonObject.selectCounter = 0;
				
			//sätter nytt värde på globala variabeln selectedIndex
			jsonObject.selectedIndex2 = i;
			jsonObject.selectedItem2 = d;
			jsonObject.selectedTitle2 = jsonObject.selectedItem2.name;
			
				//färgar den man tryckt på till svart
				d3.select(circles[0][jsonObject.selectedIndex2])
					.attr("fill", c.userColor);	
					
			jsonObject.clickedObject2.title = jsonObject.selectedTitle2;
			//ritar in färg i teblelensen
			d3.select(bar[0][jsonObject.selectedIndex2])
				.attr("fill", c.userColor);
			tl.drawSelected(jsonObject.selectedItem2, jsonObject.selectedIndex2,  c.userColor);	
			
			sp.selectedLabel(jsonObject.selectedIndex2,c.userColor);
			//hämtar data. blog-count och inlinks
			setSelectedParameters(jsonObject.selectedIndex2, jsonObject.clickedObject2);
		}
		//hämtar alla objekt som ska vara klickbara
		setMouseEventVars_tl();
	};
	
	
	function mouseDownEvent(d,i){
			//trycker första gången
		if(jsonObject.selectCounter == 0){
			doingSomething = 0;
			 fail = [0,0,0,0,1];
					
					//börjar med att ta bort den gamla cirkeln
								d3.selectAll("#svg2")
									.remove();

								d3.select("#errorSVG")
									.remove();
								
								d3.select("#hide")
									.remove();
									
								d3.select("#colorsLabel")
									.selectAll("svg")
									.remove();
									
								d3.selectAll("#introText")
									.remove();
								d3.selectAll("#compareGraph")
									.remove();
									
								d3.select("#lblText")
									.selectAll("text")
									.remove();
									
								d3.select("#chart2")
									.append("p")
									.style("font-size", 12+"pt")
									.style("right", "35%")
									.style("top",25+"%")
									.attr("id", "compareGraph")
									.attr("fill", c.textColor)
									.text(function(){return "Klicka på ytteligare en blogg för att jämföra den med: ";});		
								
									
			
			jsonObject.selectCounter = 1;
			
				d3.selectAll("#selected_bar")
					.remove();
					
				 //tar bort pricktexten
			 d3.selectAll("#selectedDotLabel")
					.remove();
					
				recolorAll();
					
				//sätter object-värdena
				jsonObject.selectedIndex = jsonObject.hooverIndex;
				jsonObject.selectedItem = jsonObject.hooverItem;
				jsonObject.selectedTitle = jsonObject.hooverItem.name;
				jsonObject.clickedObject.title = jsonObject.selectedTitle;
				
				var t = d3.select("#chart2")
											.append("p")
											.style("font-size", 14+"pt")
											.style("top",40+"%")
											.style("right", "20%")
											.attr("id", "compareGraph")
											.style("color", c.selectedColor);
											
										t.append("a")
											.attr("href", function(){return jsonObject.selectedItem.url;})
											.style("height", "12pt")
											.attr("target", "_blank")
											//.text()
											.style("text-decoration", "underline")
											.text(function(){return jsonObject.selectedItem.name;});	
				
				//hämtar data. blog-count och inlinks
										setSelectedParameters(jsonObject.selectedIndex, jsonObject.clickedObject);
				
				//ritar in färg i teblelensen
				d3.select(bar[0][jsonObject.selectedIndex])
					.attr("fill", c.selectedColor);
					
				tl.setJson(jsonObject);	
				
				//ritar den vita rutan
				tl.drawSelected(jsonObject.selectedItem,jsonObject.selectedIndex,c.selectedColor);	
				
			//färgar den man tryckt på till lila
			d3.select(circles[0][jsonObject.selectedIndex])
				.attr("fill", c.selectedColor);	
			sp.selectedLabel(jsonObject.selectedIndex,c.selectedColor);
		}
		//trycker andra gången
		else{
			jsonObject.selectCounter = 0;
			//sätter object-värdena
			jsonObject.selectedIndex2 = jsonObject.hooverIndex;
			jsonObject.selectedItem2 = jsonObject.hooverItem;
			jsonObject.selectedTitle2 = jsonObject.selectedItem2.name;
			jsonObject.clickedObject2.title = jsonObject.selectedTitle2;
			
			//hämtar data. blog-count och inlinks
			setSelectedParameters(jsonObject.selectedIndex2, jsonObject.clickedObject2);
			//ritar in färg i teblelensen
			d3.select(bar[0][jsonObject.selectedIndex2])
				.attr("fill", c.userColor);
			tl.setJson(jsonObject);	
			//ritar den vita rutan
			tl.drawSelected(jsonObject.selectedItem2,jsonObject.selectedIndex2,c.userColor);
			
			//färgar den man tryckt på till lila
			d3.select(circles[0][jsonObject.selectedIndex2])
				.attr("fill", c.userColor);	
			sp.selectedLabel(jsonObject.selectedIndex2,c.userColor);
		}
			
		//ritar om scatterplotten
		//sp.drawCircles(jsonObject);
		//hämtar alla objekt som ska vara klickbara
		setMouseEventVars_sp();
	};

	function setSelectedParameters(u,d){
	    d.blogCount = Math.round(Math.random() * 40);
	    d.inlinks = jsonObject.jsondata[u].inlinks;
	    fail = [1, 1, 1, 1, 1];

	    d.visitors = jsonObject.jsondata[u].visitors;
	    d.ranking = jsonObject.jsondata[u].ranking;
	    d.title = jsonObject.jsondata[u].name;
	    drawBarChart();
	};
	
	
	function recolorAll(){
		//färgar tillbaka de gamla man hade selected
				d3.select(circles[0][jsonObject.selectedIndex])
					.attr("fill", function(){ 
										return c.color(jsonObject.selectedIndex/jsonObject.jsondata.length);
											});
				d3.select(circles[0][jsonObject.selectedIndex2])
					.attr("fill", function(){ 
										return c.color(jsonObject.selectedIndex2/jsonObject.jsondata.length);
								});
				d3.select(bar[0][jsonObject.selectedIndex])
					.attr("fill", c.color(jsonObject.selectedIndex/jsonObject.jsondata.length));
				d3.select(bar[0][jsonObject.selectedIndex2])
					.attr("fill", c.color(jsonObject.selectedIndex2/jsonObject.jsondata.length));
	};


	function failSum(){
			var sum = 0;
			for(i=0;i<fail.length;i++){
				sum += fail[i];
			}
			return sum;
	};
  
	
	function drawBarChart(){
		var sum = failSum();
		if(jsonObject.selectCounter == 0){
			//om båda läsningar har lyckats
				circleDiagrams(jsonObject.clickedObject2, jsonObject.clickedObject,fail);
		}
	};
			


}