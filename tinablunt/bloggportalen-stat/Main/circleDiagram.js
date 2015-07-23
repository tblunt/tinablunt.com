//bygger upp charten som har tre ringar eller staplar
function circleDiagrams(obj1, obj2,fail){
	var C = new colorValues(); 
	var ob = new dataObject();
	var m = new measureObject();
	
	//börjar med att ta bort den gamla circeln
	d3.selectAll("#svg2")
		.remove();
		
	d3.select("#chart2")
				.selectAll("u1")
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
		
	
		var list = d3.select("#chart2")
					.append("u1")
					.style("position", "absolute")
					.style("width", m.barChart_w-m.barChart_w*0.1)
					.style("height", "12pt")
					.style("float", "left")
					.style("list-style", "none")
					.style("top",3+"%")
					.style("left",m.barChart_w*0.1);
					
		var li1 = list
						.append("li")
						.style("position", "relative")
						.style("float","left")
						.style("margin", 0+"%")
						.style("margin-right", 5+"pt")
						.style("width", "auto")
						.style("color", C.selectedColor)
						.attr("id", "compareGraph");
		
			li1.append("a")
					//LÄGG TILL EN FUNKTION SOM LÄGGER PÅ HTTP OM URL INTE BÖRJAR MED DET
					.attr("href", function(){return obj2.Url;})
					.style("height", "12pt")
					.text(	function(){		if(obj2.title.length < 20){
										return obj2.title;
									}
									else{
										return obj2.title.substring(0, 21) + "...";
									}
							})
					.style("text-decoration", "underline")
					.style("font-size", 12+"pt")
					.style("font-family", "Museo500")
					.attr("target", "_blank");
					

			list
					.append("li")
					.style("position", "relative")
					.style("float","left")
					.style("margin", 0+"%")
					.style("margin-right", 5+"pt")
					.style("width", "auto")
					.style("color", "#878787")
					.attr("id", "compareGraph")
					.style("font-size", 12+"pt")
					.style("font-family", "Museo100")
					.text("  jämfört med  ");
					
			var li2 = list
						.append("li")
						.style("position", "relative")
						.style("float","left")
						.style("margin", 0+"%")
						.style("margin-right", 5+"pt")
						.style("width","auto")
						.style("color", C.userColor)
						.attr("id", "compareGraph");
						
				li2.append("a")
										//LÄGG TILL EN FUNKTION SOM LÄGGER PÅ HTTP OM URL INTE BÖRJAR MED DET
					.attr("href", function(){return obj1.Url;})
					.style("height", "12pt")
					.attr("target", "_blank")
					.style("font-size", 12+"pt")
					.style("font-family", "Museo500")
					.text(function(){		if(obj1.title.length < 20){
										return obj1.title;
									}
									else{
										return obj1.title.substring(0, 21) + "...";
									}
							})
					.style("text-decoration", "underline");
				
				
			
			var sum = 0;
			for(i=0;i<fail.length;i++){
				sum += fail[i];
			}

			//kollar om det blivit fel i Twinglysökningen
			if((sum > 1) && (fail[0] == 0 && fail[1] == 0)){
				showErrorMsg(obj2.Url + " hittades inte i Twinglys indexering. Vissa värden är därför noll");
			}
			else if((sum > 1) && (fail[2] == 0 && fail[3] == 0)){
				showErrorMsg(obj1.Url + " hittades inte i Twinglys indexering. Vissa värden är därför noll");
			}
			else if((sum > 0) && ((fail[0]+fail[1]+fail[2]+fail[3]) == 0)){
			
				showErrorMsg( "Varken " + obj1.Url + " eller "+ obj2.Url +" hittades i Twinglys indexering.");
			}
			else if(sum == 0){
				showErrorMsg(obj2.Url + " hittades inte i Twinglys indexering. Vissa värden är därför noll");
			};
				barChart(obj1, "Antal besökare", obj2,fail);
		
			
	/*		var temp = d3.select("#colorsLabel")
				.append("svg")
				.attr("id","textHolder");*/
				
			//colorLabel(C.selectedColor,  ob.cutUrl(ob.normalizeUrl(obj2.Url)));
			//colorLabel(C.userColor, ob.cutUrl(ob.normalizeUrl(obj1.Url)));
		function showErrorMsg(text){
			var errorSVG = d3.select("#chart2")
								.append("svg")
								.attr("id", "errorSvg")
								.style("width", m.barChart_w*0.8)
								.style("height", m.barChart_h*0.15)
								.style("left", m.barChart_w*0.05)
								.style("bottom", 1+"%");
				errorSVG
					.append("text")
					.attr("id", "errorText")
					.style("font-size", 7+"pt")
					.style("font-family", "Helvetica")
					.attr("y", window.innerWidth*0.03-14)
					.attr("fill", C.errorTextColor)
					.text(function(){return text;})
					.attr("opacity", 0.0001)
					.transition()
					.delay(500)
					.duration(500)
					.attr("opacity", 1);
				
				errorSVG
					.append("text")
					.attr("id", "errorText")
					.attr("y", window.innerWidth*0.03-2)
					.style("font-size", 7+"pt")
					.style("font-family", "Helvetica")
					.attr("fill", C.errorTextColor)
					.text(function(){return "Läs mer under Om-fliken";})
					.attr("opacity", 0.0001)
					.transition()
					.delay(500)
					.duration(500)
					.attr("opacity", 1);
		
		};
			
			
		return null;
		
};



function barChart(userItem, circleName, selectedItem,success){
	var C = new colorValues(); 
	var m = new measureObject();
	
	var ratio = window.innerHeight/window.innerWidth;
	var color = d3.scale.linear().domain([0,1]).range([C.selectedColor, C.userColor]);
	
	var chartWidth = m.barChart_w*0.8;
    var chartHeight = m.barChart_h*0.9; 
	
	
	
	var temp = [selectedItem.inlinks, userItem.inlinks];
	var temp2 = [selectedItem.visitors, userItem.visitors];
	var temp3 = [selectedItem.blogCount, userItem.blogCount];
	
	var max = Math.max.apply(Math, temp);
	var max2 = Math.max.apply(Math, temp2);
	var max3 = Math.max.apply(Math, temp3);
	
	if(max == 0){
		max = 10;
	}
	if(max3 == 0){
		max3 = 10;
	}
	
	var barWidth = chartWidth*0.07;
	var barHeightMultiVisitors = (chartHeight/max2)*0.6;
	var barHeightMultiinlinks = (chartHeight/max)*0.6;
	var barHeightMultiBlogCount = (chartHeight/max3)*0.6;
	var barYStartPos = chartHeight*0.27;
	var barXStartPos = (m.barChart_w - chartWidth)*0.5;
	
	var barSeparation = (barWidth+10);
	var twoBarWidth = barWidth*2+10;
	
	var tickName = ["Antal Inlägg", "Antal Besökare", "Inkommande Blogglänkar"];
	var data = [selectedItem, userItem];
	
	
	var xScale = d3.scale.linear()
                     .domain([0, 2])
                     .range([0, chartWidth-chartWidth*0.35]);


	var vis = d3.select("#chart2")
			.append("svg")
			.attr("id", "svg2")
			.style("width", chartWidth)
			.style("height", chartHeight)
			.style("left",barXStartPos)
			.style("top", chartHeight*0.15);
		//.attr("height", chartHeight);
		
		dataEnter = vis.selectAll("rect")
			.data(data)
			.enter();
		
		//ritar bararna
		dataEnter
			.append("rect")			
			.attr("x", function(d,i){return xScale(0)+barSeparation*0.5+i*barSeparation;})
			.attr("y", function(d,i){return  chartHeight-barYStartPos-d.blogCount*barHeightMultiBlogCount;})
			.attr("rx", 4)
			.attr("ry", 4)
			.attr("width", barWidth)
			.attr("fill", function(d,i){return color(i);})
			.transition()
			.delay(0)
			.duration(700)
			.attr("height", function(d,i){ var k;
											if(i==0){	
												k = C.selectedColor;
											}
											else{
												k = C.userColor;
											}
											addNr(i,0,d.blogCount,barHeightMultiBlogCount,k);
											return d.blogCount*barHeightMultiBlogCount;
										});
						
		dataEnter
			.append("rect")
			.attr("x", function(d,i){return xScale(1)+barSeparation*0.5+i*barSeparation;})
			.attr("y", function(d,i){return  chartHeight-barYStartPos-d.visitors*barHeightMultiVisitors;})
			.attr("rx", 4)
			.attr("ry", 4)
			.attr("width", barWidth)
			.attr("fill", function(d,i){return color(i);})
			.transition()
			.delay(0)
			.duration(700)
			.attr("height", function(d,i){ 	var k;
											if(i==0){	
												k = C.selectedColor;
											}
											else{
												k = C.userColor;
											}
											addNr(i,1,d.visitors,barHeightMultiVisitors,k);
											return d.visitors*barHeightMultiVisitors;
										});

		dataEnter
			.append("rect")
			.attr("x", function(d,i){return xScale(2)+barSeparation*0.5+i*barSeparation;})
			.attr("y", function(d,i){return  chartHeight-barYStartPos-d.inlinks*barHeightMultiinlinks;})
			.attr("rx", 4)
			.attr("ry", 4)
			.attr("width", barWidth)
			.attr("fill", function(d,i){return color(i);})
			.transition()
			.delay(0)
			.duration(700)
			.attr("height", function(d,i){ 	var k;
											if(i==0){	
												k = C.selectedColor;
											}
											else{
												k = C.userColor;
											}
											addNr(i,2,d.inlinks,barHeightMultiinlinks,k);
											return d.inlinks*barHeightMultiinlinks;
										});
			

	drawAxis();
	
	
	
	//**********************************funktioner***********************************************************************
	
	function drawAxis(){
		var xAxis = d3.svg.axis()
					  .scale(xScale)
					  .orient("bottom")
					  .ticks(2)
					  .tickFormat(function(d,i){return tickName[i];});

		vis.append("g")
					.attr("class", "barAxis")
					.attr("transform", "translate(70," + (chartHeight-barYStartPos) + ")")
					.call(xAxis);
			
  
	};
	
	function addNr(y,x,nr,barHeightMulti,c){
				vis
					.append("text")
					.attr("id", "barLabel")
					.text(numberWithCommas(nr))
					.attr("fill", c)
					.style("font-size", 12+"pt")
					.style("font-family", "OpenSans_bold")
					.attr("text-anchor", "middle")
					.attr("x", function(){return xScale(x)+barSeparation*0.5+barWidth*0.5+y*barSeparation;})
					.attr("y", function(){	
												return chartHeight-barYStartPos-6-nr*barHeightMulti;
										
					});
			};

};
