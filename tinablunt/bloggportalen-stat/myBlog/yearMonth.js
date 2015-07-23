function yearMonth(month,year,data, intervalLbl, timeObject,year){
	var m = new measureObject2();
	
	d3.select("#circleCont")
		.selectAll("text")
		.attr("visibility", "hidden");
		
	d3.select("#circleCont")
			.remove();
	

		
		display_month_blogposts(monthly_blog_posts);

	
	//tillbakaknappen
	d3.select("#otherInfo")
		.append("text")
		.attr("id", "back")
		.attr("fill", "gray")
		.attr("text-anchor", "end")
		.attr("x",  m.infoSvg_w*0.33)
		.attr("y", m.infoSvg_h-12)
		.text("Tillbaka")
		.on("mousedown", downEvent)
		.on("mouseover",mouseOverText)
		.on("mouseout",mouseOutText);
	
		d3.select("#otherInfo")
		.append("svg:image")
		.attr("xlink:href","Images/blog_circle.png")
		.attr("id", "back")
		.attr("width", m.infoSvg_w*0.04)
		.attr("height", m.infoSvg_w*0.04)
		.attr("x",  m.infoSvg_w*0.33)
		.attr("y", m.infoSvg_h-m.infoSvg_w*0.04)
		.attr("opacity", 0.5)
		.on("mousedown", downEvent)
		.on("mouseover",mouseOverText)
		.on("mouseout",mouseOutText);
		
	//tillbakaknappen
	function downEvent(){
		d3.select("#otherInfo")
			.selectAll("text")
			.attr("visibility", "visible");
			
		d3.select("#bloggCircleCont")
			.remove();
			
		d3.select("#otherInfo")
			.selectAll("#back")
			.remove();
		
		timeCircle(data, intervalLbl, timeObject,year);
	}; 	
	
};