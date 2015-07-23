function display_month_blogposts(monthly_blog_posts){
	
	var m = new measureObject2();
	var c = new colorValues();
	var height = m.infoSvg_h*0.9;
	var width = m.infoSvg_w*0.4;
	var xPos = 0;
	
	var arrowWidth = width*0.08;
	var arrowHeight = arrowWidth*0.5;
	var arrowXpos = width-70;
	var y1 = height*0.4;
	var y2 = height*0.6;
	
	var middleIndex = monthly_blog_posts.length-4;

	var vis = d3.select("#otherInfo")
				.append("svg:svg")
				.attr("id", "bloggCircleCont")
				.attr("y", m.infoSvg_top*0.5)
				.attr("x", xPos)
				.attr("width", width)
				.attr("height", height);
	
	vis.append("path")
		.attr("id", "upArrow")
		.attr("d", "M " + arrowXpos + " " + y1 + " L " +(arrowXpos+arrowWidth*0.5) +" "+ (y1-arrowHeight) +" L " +(arrowXpos+arrowWidth) +" "+ y1 + " Z ")
		.attr("fill", "gray")
		.on("mouseup", upArrowUp)
		.on("mousedown", upArrowDown)
		.on("mouseover", upArrowOver)
		.on("mouseout", upArrowOut)
		.attr("opacity", 1);
		
	vis.append("path")
		.attr("id", "downArrow")
		.attr("d", "M " + arrowXpos + " " + y2 + " L " +(arrowXpos+arrowWidth*0.5) +" "+ (y2+arrowHeight) +" L " +(arrowXpos+arrowWidth) +" "+ y2 + " Z ")
		.attr("fill", "#B8B8B8")
		.on("mouseup", downArrowUp)
		.on("mousedown", downArrowDown)
		.on("mouseover", downArrowOver)
		.on("mouseout", downArrowOut)
		.attr("opacity", 1);
		drawSliderLine();
		
		var data = cut_data(middleIndex);
			draw_pb_first(data,0);
			
//------------------------------------------------------------------------------------------------------------------		
		function drawSliderLine(){
			vis.append("line")
				.attr("id", "linen")
				.attr("stroke", "gray")
				.attr("stroke-width", arrowWidth*0.3)
				.attr("x1", arrowXpos+arrowWidth*0.5)
				.attr("y1", y1)
				.attr("x2", arrowXpos+arrowWidth*0.5)
				.attr("y2", y2)
				.attr("opacity",0.4);
			drawSlider();
		};
		function drawSlider(){
			var pathLength = y2-y1;
			var tick = pathLength/monthly_blog_posts.length;
			
			vis.append("line")
				.attr("id", "slider")
				.attr("stroke", "hsl(195, 81%, 55%)")
				.attr("stroke-width", arrowWidth*0.3)
				.attr("x1", arrowXpos+arrowWidth*0.5)
				.attr("y1", y1+tick*(middleIndex-4))
				.attr("x2", arrowXpos+arrowWidth*0.5)
				.attr("y2", y1+tick*(middleIndex+4))
				.attr("opacity",1);
		};
		
		function updateSlider(){
			var pathLength = y2-y1;
			var tick = pathLength/monthly_blog_posts.length;
			
			d3.select("#slider")
				.attr("x1", arrowXpos+arrowWidth*0.5)
				.attr("y1", y1+tick*(middleIndex-4))
				.attr("x2", arrowXpos+arrowWidth*0.5)
				.attr("y2", y1+tick*(middleIndex+4));
		};

		function upArrowOver(){
			if(middleIndex!=4){
				d3.select(this)
					.attr("fill", "black");
			}
		};
		function upArrowOut(){
			if(middleIndex!=4){
				d3.select(this)
					.attr("fill", "gray");
			}		
		};
		function downArrowOver(){
			if(middleIndex!=monthly_blog_posts.length-4){
				d3.select(this)
					.attr("fill", "black");
			}
		};
		function downArrowOut(){
			if(middleIndex!=monthly_blog_posts.length-4){
				d3.select(this)
					.attr("fill", "gray");
			}
		};
		function upArrowUp(){
			if(middleIndex<5){
			d3.select(this)
					.attr("fill", "#B8B8B8");
			}
		};
		function downArrowUp(){
			if(middleIndex>monthly_blog_posts.length-5){
			d3.select(this)
					.attr("fill", "#B8B8B8");
			}
		};
		
		function upArrowDown(){
			var dir;
			if(middleIndex>4){
				d3.select(this)
					.attr("fill", "gray");
				d3.select("#downArrow")
					.attr("fill", "gray");
				middleIndex--;
				dir = 1;
			}
			else{
				dir = 0;
				d3.select("#downArrow")
					.attr("fill", "gray");
				d3.select(this)
					.attr("fill", "#B8B8B8");
			}
			var d1 = cut_data(middleIndex);
			draw_pb(d1,dir);
		};
		
		function downArrowDown(){
			var dir;
			if(middleIndex<monthly_blog_posts.length-4){
				d3.select(this)
					.attr("fill", "gray");
				d3.select("#upArrow")
					.attr("fill", "gray");
				middleIndex++;
				dir = (-1);
			}
			else{
				dir = 0;
				
				d3.select(this)
					.attr("fill", "#B8B8B8");
			}
			var data = cut_data(middleIndex);
			draw_pb(data,dir);
		};
		
		function cut_data(middleIndex){
			if(monthly_blog_posts.length>7){
				var d = [];
				for(i=middleIndex-4;i<middleIndex+4;i++){
					d.push(monthly_blog_posts[i]);
				}
				return d;
			}
			else{
				d3.select("#downArrow")
					.remove();
				d3.select("#upArrow")
					.remove();
				d3.select("#slider")
					.attr("visibility","hidden");
				d3.select("#linen")
					.attr("visibility","hidden");
				return monthly_blog_posts;
			}
		};
		
		function draw_pb(data,dir){
			vis.selectAll("a").remove();
			updateSlider();
			
			if(data.length > 7){
				var deg = Math.PI*0.9;
				var multi = deg/data.length;
				var radius = height*0.4;
				var startAngle = Math.PI*1.6;
			}
			else{
				var len = data.length;
				var deg = Math.PI*len*0.1;
				var multi = deg/data.length;
				var radius = height*0.4;
				var startAngle = Math.PI*1.9;
			}
			
			vis.selectAll("a").data(data).enter()
				.append("a")
				.attr("xlink:href",function(d,i){return d.url;})
				//.style("height", "12pt")
				.attr("target", "_blank")
				.style("font-size", function(d,i){
										if(i==0 || i==7){
											return 9+"pt";
										}
										else{
											return 11+"pt";
										}
									})
				.style("text-decoration", "underline")
				.append("text")
				.attr("id","blogText")
				.text(function(d,i){return  d.postTitle;})
				.on("mouseover",mouseOverText)
				.on("mouseout",mouseOutText)
				.attr("fill", function(d,i){
									return c.color(i/data.length);
								})
				.attr("x", function(d,i){
											return radius*Math.cos(startAngle+(i-dir)*multi);
										})
				.attr("y", function(d,i){
											return height*0.5+radius*Math.sin(startAngle+(i-dir)*multi);
										})
				.transition()
				.delay(0)
				.duration(1000)
				.attr("x", function(d,i){
											return radius*Math.cos(Math.PI*1.6+i*multi);
										})
				.attr("y", function(d,i){
											return height*0.5+radius*Math.sin(Math.PI*1.6+i*multi);
										});
		};
	
		function draw_pb_first(data,dir){
			vis.selectAll("a").remove();
			
			if(data.length > 7){
				var deg = Math.PI*0.9;
				var multi = deg/data.length;
				var radius = height*0.4;
				var startAngle = Math.PI*1.6;
			}
			else{
				var len = data.length;
				var deg = Math.PI*len*0.1;
				var multi = deg/data.length;
				var radius = height*0.4;
				var startAngle = Math.PI*(1.7);
			}
			
			
			vis.selectAll("a").data(data).enter()
				.append("a")
				.attr("xlink:href",function(d,i){return d.url;})
				//.style("height", "12pt")
				.attr("target", "_blank")
				.style("font-size", function(d,i){
										if(i==0 || i==7){
											return 9+"pt";
										}
										else{
											return 11+"pt";
										}
									})
				.style("text-decoration", "underline")
				.append("text")
				.text(function(d,i){return d.postTitle;})
				.attr("href", function(d,i){return d.url;})
				.attr("fill", function(d,i){
									return c.color(i/data.length);
								})
				.attr("x", function(d,i){
											return radius*Math.cos(startAngle+i*multi);
										})
				.attr("y", function(d,i){
											return height*0.5+radius*Math.sin(startAngle+i*multi);
										})
				.on("mouseover",mouseOverText)
				.on("mouseout",mouseOutText)
				.attr("opacity", 1);
		};
		
	function mouseOverText(){
			document.body.style.cursor = 'pointer';
	};
	
	function mouseOutText(){
			document.body.style.cursor = 'default';
	};		
	
}