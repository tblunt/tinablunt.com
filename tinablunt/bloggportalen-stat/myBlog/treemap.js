function treemap(data){
	var m = new measureObject2();
	
	index = 1;
	antal = 1;
	year = 2000;
	
	var c = new colorValues();

	var monthsLbl = ["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"];
	var height =  m.infoSvg_h;
	var width = height;//+(window.innerWidth*0.1/antal)*index;
	
	var donut = d3.layout.pie();
	var radius = 0.9*width*0.5;
	var area = (width*0.5)*(height*0.5); 
	var color = c.color;

	var hooverIndex;
	var xPos,yPos;
	var d;
	var dirVec;
	var dist;
	
	var posArray = [[],[]];

	var minRadius = width*0.02;
	var maxRadius = width*0.09;
	//sorterar och plockar ut max för både x-ochy-axeln

	var areaSum = 0;
	for(i = 0;i<data.length;i++){
		
		areaSum += (data[i]*data[i])-(minRadius*minRadius);
	}
	var max = Math.max.apply(Math, data);
	
	var multiplier = (maxRadius - minRadius)/max;
	
	var ratio = area/(areaSum*2);

	var chartPosX = window.innerWidth*0.65-radius*2;
	
	var vis = d3.select("#infoSvg")
				.append("svg:svg")
				.attr("id", "bloggCircleCont")
				.attr("y", 0)
				.attr("x", chartPosX)
				.attr("width", width)
				.attr("height", height);
				


	var textSvg = drawHooverInfo();
	
	 nodes = data.map(Object);

		var force = d3.layout.force()
						.nodes(nodes)
						.links([])
						.size([width, height])
						.gravity(0.9)
						.friction(0.9)
						.charge(function(d,i){return -15*d*(multiplier*3);})
						.start();
			
	var dataEnter = vis.selectAll("circle.node").data(nodes).enter();
	
	var circles = dataEnter
					.append("svg:circle")
					.attr("class", "node")
					.attr("fill", function(d,i){return color(i/data.length);})
					.attr("r", function(d,i){	
												return minRadius+d*multiplier;}
											)
					.attr("cy", function(d,i){													
												return posArray[1][i];})
					.attr("cx", function(d,i){	
												return posArray[0][i];})
					.on("mouseover", mouseOverEvent)
					.on("mouseout", mouseOutEvent)
					.call(force.drag);
					
	
		
		force.on("tick", function() {		  
			  circles.attr("cx", function(d,i) { 
												return d.x;	
											})
					.attr("cy", function(d,i){
												return d.y;	
								});
		});

	
		//*******************************************************************************************************************
		//************ funktioner
		
		function drawHooverInfo(){
			var w = window.innerWidth*0.15;
			var h = w*0.4;
			var x = window.innerWidth*0.8-w;
			var y = 100;
			
				var textSvg = d3.select("#infoSvg")
					.append("svg:svg")
					.attr("id", "textSvg")
					.attr("y", y)
					.attr("x", x)
					.attr("width", w)
					.attr("height", h);
				
				var filter = textSvg.append("svg:defs")
					.append("svg:filter")
					.attr("id", "blur3")
					.append("svg:feGaussianBlur")
					.attr("stdDeviation", 10);

				textSvg.append("rect")
					.attr("y", h*0.1)
					.attr("x", w*0.1)
					.attr("width", w-28)
					.attr("height", h-28)
					.attr("opacity", 0.9)
					.attr("filter", "url(#blur3)")
					.attr("fill", c.stroke);
				
				textSvg.append("rect")
					.attr("y",  h*0.1)
					.attr("x",  w*0.1)
					.attr("width", w-28)
					.attr("height", h-28)
					.attr("stroke", c.stroke)
					.attr("stroke-width", 1)
					.attr("fill", c.backgroundColor);
			
				d3.select("#textSvg")
					.append("line")
					.attr("x1", w*0.1)
					.attr("y1", h*0.1)
					.attr("x2", 0)
					.attr("y2",0)
					.attr("opacity",1)
					.attr("stroke", c.stroke)
					.attr("stroke-width",2);		
					
			textSvg
				.selectAll("rect")
				.attr("visibility", "hidden");	
			
			textSvg
				.selectAll("line")
				.attr("visibility", "hidden");	
				
			return textSvg;
		
		};
		
		
		function mouseOverEvent(d,i){
			var w = window.innerWidth*0.2;
			var h =  window.innerHeight*0.1;
			var x = window.innerWidth*0.8-w+10;
			var y = 100+10;
			
			var xpos;
			var ypos;
			
			//hooverIndex = i;
			
			textSvg
				.selectAll("rect")
				.attr("visibility", "visible");	
			textSvg
				.selectAll("line")
				.attr("visibility", "visible");	
				
			d3
				.select(this)
				.style("fill", function(){
									xpos = chartPosX+d.x;
									ypos = d.y;
									return c.hooverColor;
							   });
			textSvg
				.attr("x", xpos)
				.attr("y", ypos);
			
			textSvg.append("text")
				.attr("id", "label")
				.attr("fill", c.labelColor)
				.style("font-size",function(d,i){return 9+"pt";})
				.attr("x", w*0.15)
				.attr("y", 30)
				.text(function(){return "Trol lol loooo "+i+"an"});
				
			textSvg.append("text")
				.attr("id", "label")
				.attr("fill", c.textColor)
				.style("font-size",function(d,i){return 8+"pt";})
				.attr("x", w*0.15)
				.attr("y", 40)
				.text(function(){return "Datum: "+i+""});
			
			textSvg.append("text")
				.attr("id", "label")
				.attr("fill", c.textColor)
				.style("font-size",function(d,i){return 7+"pt";})
				.attr("x", w*0.15)
				.attr("y", 50)
				.text(function(){return "Ca antal besökare: "+Math.round(d)+"000"});
				
			
		};
		
		function mouseOutEvent(d,i){
			d3.selectAll("#label")
				.remove();
			
			textSvg
				.selectAll("rect")
				.attr("visibility", "hidden");			
			textSvg
				.selectAll("line")
				.attr("visibility", "hidden");		
				
			d3
				.select(this)
				.style("fill", function(){return c.color(i/data.length);});
		};
		
		function drawLabel(d,i){
			dataEnter
				.select(this)
				.attr("fill",function(d,i){return color(i);});
		};

	

		
};//function



