//ritar ut en ring men det datat man skickar in till funktionen
function timeCircle(data, intervalLbl, timeObject,year){	
	d3.select("#otherInfo").selectAll("#infoText")
			.remove();
			
	var c = new colorValues();
	var m = new measureObject2();
	var infoRect;
	var mousePos = [];
	
	var temp = [];
	for(i = 0;i<data.length;i++){
			temp.push(data[i]);
		}
	temp.sort(function(a,b){return b-a;});
	var max = temp[0];//jsondata.items[0].inlinks;
	var min = temp[data.length-1]; //jsondata.items[(length-1)].inlinks;	

	var hooverIndex;
	
		var width = m.infoSvg_h*0.9,
			height = width,
			radius = Math.min(width, height) / 2.2,
			color = d3.scale.linear().domain([0,1]).range(["hsl(150, 71%, 50%)", "hsl(154, 71%, 50%)"]).interpolate(d3.interpolateHsl),
			color_lighter = d3.scale.linear().domain([0,1]).range(["hsl(150, 71%, 70%)", "hsl(154, 71%, 70%)"]).interpolate(d3.interpolateHsl),
		   // color = d3.scale.category20(),
			arc,
			radiusMultiplier = radius/max,
			donut = d3.layout.pie()
			tartbit = 6.28/data.length;

			updateArc(radius);
		
		var boxHeight = height*0.22;
		var boxWidth = width*0.7;
		
		var vis = d3.select("#otherInfo")
					.append("svg")
					.attr("id","circleCont")
					.style("position", "absolute")
					.attr("x", (m.infoSvg_w*0.4-width)*0.35)
					.attr("y",m.infoSvg_h*0.2)
					.data([data])
					.attr("width", width*2)
					.attr("height", height);
					
			var infoVis = d3.select("#otherInfo")
							.append("svg")
							.attr("id", "infoText")
							.attr("y", boxHeight*0.7)
							.attr("x", m.infoSvg_w*0.38-boxWidth)
							.style("width", boxWidth)
							.style("height", boxHeight);
			horisontalDash(0,boxWidth,20);
					
				d3.select("#chart5")
						.on("mousemove", getMouse);
			
					
			/*var infoRect = d3.select("#otherInfo")
								.append("rect")
								.attr("id", "infoText")
								.attr("y", boxHeight)
								.attr("x",m.infoSvg_w*0.38-boxWidth)
								.attr("fill", "none")
								.attr("stroke", c.stroke)
								.attr("stroke-width", 1)
								.attr("width", boxWidth)
								.attr("height", boxHeight*0.99)
								.attr("visibility", "hidden");*/


		var arcs = vis.selectAll("g.arc")
						.data(donut)
						.enter().append("g")
						.attr("class", "arc")
						.attr("transform", "translate(" + radius + "," + radius + ")");

		var paths = arcs.append("path")
						.attr("id", "hej")
						.attr("fill", function(d, i) {return color(i);})
						.attr("stroke", "white")
						.attr("stroke-width", 2)
						.on("mouseover", mouseOverEvent)
						.on("mousedown", mouseDownEvent)
						.on("mouseout", mouseOutEvent);

		paths.transition()
			//.ease("elastic")
			.delay(0)
			.duration(500)
			.attrTween("d", function(d,i){
											var index = i;
											return tweenPie(d,index)});

											
		vis
			.selectAll("g")
			.append("text")
			.attr("id", "hej")
			.attr("class", "no-select")
			.style("font-size", function(){return 8+"pt";})
			.on("mouseover", mouseOverEvent)
			.on("mousedown", mouseDownEvent)
			.on("mouseout", mouseOutEvent)
			.attr("text-anchor", function(d,i){
												if(i < data.length/2+data.length/6 && i > data.length/2-data.length/6){
													return "middle";
												}
												else{
													return "middle";
												}
												})
			.attr("fill", "gray")
			.attr("x", function(d,i){return (radius*0.9*Math.cos(tartbit*i-1.3));})
			.attr("y", function(d,i){return (radius*0.9*Math.sin(tartbit*i-1.3));})
			.text(function(d,i){return intervalLbl[i].substring(0,3);});
			

		var infoCircle =  vis
								.append("circle")
								.attr("id", "hej")
								.attr("cy", window.innerHeight*0.38-height*0.5-height*0.1)
								.attr("cx", 0)
								.attr("r", 12+"pt")
								.attr("fill", "none")
								.attr("stroke", c.stroke)
								.attr("stroke-width", 2)
								.attr("visibility", "hidden");		

		//----------------------------------------------------		
	function getMouse(){
		mousePos = d3.mouse(this); 
	};
	
	function horisontalDash(x1,x2,nrOfDashes){
				var dash = (x2-x1)/nrOfDashes;
				
				for(i=0;i<nrOfDashes;i=i+2){
					infoRect = infoVis
								.append("svg:line")
								.attr("id", "infoText")
								.attr("x1",x1+dash*i)
								.attr("x2",x1+dash*(i+1))
								.attr("y1",boxHeight*0.98)
								.attr("y2",boxHeight*0.98)
								.attr("opacity", 1)
								.attr("stroke-width",1)
								.attr("stroke", "#8eb8dc");
				}
	
	};
	
	function writeInfoText(i){
			infoRect.attr("visibility", "visible");
			
					/*	infoLine
								.attr("y2", function(){
														if(i>2 && i<9){
															return radius-10+(radius*0.9*Math.sin(tartbit*i-1.3));
														}
														else{
															return radius+10+(radius*0.9*Math.sin(tartbit*i-1.3));
														}
														})
								.attr("x2", radius-10+(radius*0.9*Math.cos(tartbit*i-1.3)))
								.attr("visibility", "visible");*/
								
						infoCircle
								.attr("cy", radius+(radius*0.9*Math.sin(tartbit*i-1.3)))
								.attr("cx",  radius+(radius*0.9*Math.cos(tartbit*i-1.3)))
								.attr("visibility", "visible");
			
			infoVis
					.append("text")
					.attr("y",20)
					.attr("x", 3)
					.attr("id", "infoText")
					.style("font-size", function(){return 14+"pt";})
					.attr("fill", color(i))
					.text(function(){
							return timeObject.months[i];
						});
		
			infoVis
					.append("text")
					.attr("y", 35)
					.attr("x", 3)
					.attr("id", "infoText")
					.style("font-size", function(){return 9+"pt";})
					.attr("fill", c.stroke)
					.text(function(){
							return "Antal inlägg: "+ Math.round(data[i]);
						});
						
	};
		function tweenPie(b,index) {
		  b.startAngle = tartbit*index;
		  b.endAngle = (index+1 )* tartbit;
		  b.innerRadius = 0;
		  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
		  return function(t) {
			updateArc((b.value * radiusMultiplier *t));
			return arc(i(t));
		  };
		};
	
		function updateArc(radius){
			arc = d3.svg.arc().outerRadius(radius);
		};

	function mouseOverEvent(d,i){
		document.body.style.cursor = 'pointer';
			var ind = i; 
			
			infoRect.attr("visibility", "hidden");
			//infoLine.attr("visibility", "hidden");
				infoCircle.attr("visibility", "hidden");
			infoVis.selectAll("text")
				.remove();
				
				d3.select(paths[0][ind])
					.attr("fill", function(d,i){return color_lighter(ind);});
				
			infoVis.selectAll("text")
				.attr("visibility", "visible");

			writeInfoText(i);
	};
	

	
	function mouseOutEvent(d,i){
			document.body.style.cursor = 'default';
			var ind = i; 
			d3.select(paths[0][ind])
				.attr("fill", function(d,i){return color(ind);});
	};
	
	function mouseDownEvent(d,i){
			timeObject.selectedMonth = i;
				
			yearMonth(timeObject.selectedMonth,year,data, intervalLbl, timeObject,year);
	};
	


};//function