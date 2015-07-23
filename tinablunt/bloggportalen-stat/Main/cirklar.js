
//ritar ut en ring men det datat man skickar in till funktionen
function circleDiagram(userItemData, circleName, selectedItemData, index){		
		var C = new colorValues(); 
		
		var width = window.innerHeight*0.21,
			height = window.innerHeight*0.21,
			radius = Math.min(width, height) / 2,
		   // data = d3.range(10).map(Math.random).sort(d3.descending),
			data = [selectedItemData, userItemData],
			//color = d3.scale.linear().domain([0,1]).range(["rgb(0, 0, 1)", "rgb(1,0, 0)"]).interpolate(d3.interpolateRgb),
			//color = d3.scale.linear().domain([0,1]).range(["hsl(150, 70%, 50%)", "hsl(150, 70%, 50%)"]),
			color = d3.scale.linear().domain([0,1]).range([C.selectedColor, C.userColor]),//.interpolate(d3.interpolateHsl),
		   // color = d3.scale.category20(),
			arc = d3.svg.arc().outerRadius(radius),
			donut = d3.layout.pie();

		var vis = d3.select("#chart2")
			.append("svg")
			.attr("id", "svg2")
			.data([data])
			.attr("width", width)
			.attr("height", height);

		var arcs = vis.selectAll("g.arc")
			.data(donut)
			.enter().append("g")
			.attr("class", "arc")
			.attr("transform", "translate(" + radius + "," + radius + ")");

		var paths = arcs.append("path")
			.attr("fill", function(d, i) { return color(i); });

		paths.transition()
			.ease("bounce")
			.delay(10 * index)
			.duration(1000 + (200 * index))
			//.duration(500 + (200 * index))
			.attrTween("d", tweenPie);

		/*paths.transition()
			.ease("elastic")
			.delay(function(d, i) { return (1000+ (200 * index)) + i* 100; })
			.duration(750)
			.attrTween("d", tweenDonut);*/

			
			vis.append("text")
				.attr("id", "circleLabel")
				.attr("text-anchor", "middle")
				.attr("y", 100)
				.attr("x", 100)
				.attr("fill", C.labelColor)
				.transition()
				.delay(1000+(200*index))
				.duration(100)
				.attr("opacity", 100)
				.text(function(){return circleName});
				
			vis.append("text")
				.attr("id", "userNr")
				.attr("y", 30)
				.attr("x", 90)
				.attr("fill", C.labelColor)
				.attr("text-anchor", "end")
				.attr("font-size", 9)
				.transition()
				.delay(1200+(200*index))
				.duration(100)
				.attr("opacity", 100)
				.text(function(){return selectedItemData});
				
			vis.append("text")
				.attr("id", "selectedNr")
				.attr("y", 30)
				.attr("x", 110)
				.attr("fill",C.labelColor)
				.attr("font-size", 9)
				.transition()
				.delay(1200+(200*index))
				.duration(100)
				.attr("opacity", 100)
				.text(function(){return userItemData });
				

				

		//----------------------------------------------------		
		function tweenPie(b) {
		  b.innerRadius = radius * .6;
		 // b.innerRadius = 0;
		  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
		  return function(t) {
			return arc(i(t));
		  };
		};

		function tweenDonut(b) {
		  b.innerRadius = radius * .6;
		  var i = d3.interpolate({innerRadius: 0}, b);
		  return function(t) {
			return arc(i(t));
		  };
		  
		};
