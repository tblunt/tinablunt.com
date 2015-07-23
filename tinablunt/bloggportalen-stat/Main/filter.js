function filter(jsonObject,filterValues){
	var C = new colorValues(); 
	var m = new measureObject();
	
	var width = m.filterHolder_w;
	var height = m.filterHolder_h;
	var color = C.color;
	
	var firstTextPos = height*0.45;
	var indent = m.filterHolder_w*0.5;
	var textSeparation = height*0.15;
	
	var buttonXpos = m.filterHolder_w*0.1;
	var button_w = height*0.08;
	
	var svg = d3.select("#filterHolder")
					.append("svg")
					.attr("width", width+"px")
					.attr("height", height+"px");
					
		svg.append("text")
			.attr("text-anchor", "middle")
			.style("font-size", 14+"pt")
			.style("font-family", "Museo700")
			.attr("x", indent)
			.attr("y",height*0.12)
			.attr("fill", "#595959")
			.text("Visa");
		
		var button1 = drawRect(buttonXpos,firstTextPos+textSeparation,"Totalt",0.3,downEvent);
		var button2 = drawRect(buttonXpos,firstTextPos+textSeparation*2,"Bara min kategori",0.4,downEvent1);
		var button3 = drawRect(buttonXpos,firstTextPos+textSeparation*3,"Bara i mitt område",0.5,downEvent2);
		

		
		
		/***************************************************************************************/
		function drawRect(x,y,text,c,downE){
			var button = svg.append("svg:image")
							.on("mousedown", downE)
							.attr("y", y)
							.attr("x",x)
							.on("mouseover", mouseOverText)
							.on("mouseout", mouseOutText)
							.attr("width", button_w)
							.attr("height", button_w);
					
			if(text == "Totalt"){
				button.attr("xlink:href", "../bilder/radio_on.png")
			}
			else{
				button.attr("xlink:href", "../bilder/radio_off.png")
			}
				
			svg.append("text")
				.attr("text-anchor", "begin")
				.style("font-family", "Museo500")
				.style("font-size",function(d,i){return 10+"pt";})
				.attr("fill", function(){
									return "#2ebae9";
								})
				
				.attr("y", y+button_w*0.7)
				.attr("x", x+button_w*1.3)
				.text(text);
				
			return button;	
		};
		
		
		function downEvent(d,i){
		
			button2
				.attr("xlink:href", "../bilder/radio_off.png");
			button3
				.attr("xlink:href", "../bilder/radio_off.png");
			
			d3.select(this)
				.attr("xlink:href", "../bilder/radio_on.png");
				
			filterValues[1] = 0;
			jsonObject.selectedIndex2 = null;
			setFilterURL_and_init(jsonObject,filterValues);
		
		};
		
		function downEvent1(d,i){
			button1
				.attr("xlink:href", "../bilder/radio_off.png");
			button3
				.attr("xlink:href", "../bilder/radio_off.png");
			
			d3.select(this)
				.attr("xlink:href", "../bilder/radio_on.png");
				
			filterValues[1] = 1;
			
			jsonObject.userIndex = null;
			jsonObject.userItem = null;
			jsonObject.selectedIndex2 = null;
			setFilterURL_and_init(jsonObject,filterValues);
		
		};
		
		function downEvent2(d,i){
			button2
				.attr("xlink:href", "../bilder/radio_off.png");
			button1
				.attr("xlink:href", "../bilder/radio_off.png");
			
			d3.select(this)
				.attr("xlink:href", "../bilder/radio_on.png");
				
			filterValues[1] = 2;	
			
			jsonObject.userIndex = null;
			jsonObject.userItem = null;
			jsonObject.selectedIndex2 = null;
			setFilterURL_and_init(jsonObject,filterValues);
		};
		
	};	
 
 //bestämmer med vilken data plottarna ska ritas
 //även om user ska visas eller om man ska klicka på två
 function setFilterURL_and_init(jsonObject,filterValues){
			var URL;
			
			//sätter uservärdena till null
			jsonObject.userItem = null;
			jsonObject.userIndex = null;
			jsonObject.selectedItem = null;
			jsonObject.selectedIndex = null;
			jsonObject.hooverItem = null;
			jsonObject.hooverIndex = null;
			
			//topp 100
			if(filterValues[0] == 1){
				deleteAll();
				
				d3.select("#chart1")
					.append("p")
					.attr("id", "introText")
					.style("color", "gray")
					.text(function(){return "laddar data...";});
				
				disableSwitch();
				
				d3.select("#chart2")
					.append("p")
					.attr("id", "introText")
					.attr("fill", "black")
					.text(function(){return "Klicka på två objekt du vill jämföra";});
					
				//totalt
				if(filterValues[1] == 0){
					URL = "http://localhost:8888/list_stats";
					jsonObject.TableLensTitle = "Topp hundra totalt";
					init_top100(URL,jsonObject,filterValues);
				}//kategori
				else if(filterValues[1] == 1){
					URL = "http://localhost:8888/list_stats?category_id=18";
					jsonObject.TableLensTitle = "Topp hundra i sport och fritid";
					init_top100(URL,jsonObject,filterValues);
				}//område
				else{
					URL = "http://localhost:8888/list_stats?region_id=1";
					jsonObject.TableLensTitle = "Topp hundra i Linköping";
					init_top100(URL,jsonObject,filterValues);
				}
				
			}
			//lika mig
			else{
				deleteAll();
				d3.select("#chart2")
					.append("h1")
					.style("font-size", 12+"pt")
					.style("font-family", "Museo300")
					.attr("id", "introText")
					.style("color", "#f06f31")
					.text(function(){return "Din blogg är markerad med orange.";});
					
				d3.select("#chart2")
					.append("p")
					.attr("id", "introText")
					.attr("fill", "black")
					.text(function(){return "Klicka på ett objekt du vill jämföra med din blogg";});
					
				d3.select("#chart1")
					.append("p")
					.attr("id", "introText")
					.style("color", "gray")
					.text(function(){return "laddar data...";});
				
				
					
					init_me(jsonObject,filterValues);

			}

 
 };