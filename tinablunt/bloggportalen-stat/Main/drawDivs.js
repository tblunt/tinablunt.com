function drawDivs(m,c){
			//lägger till stora svg där alla bakgrundsrutor ska ligga
			d3.select("#visBody")
				.style("width", m.width)
				.style("height", m.height)
				.style("top", m.top)
				.append("div")
				.attr("id","background")
				.style("width", m.width)
				.style("height", m.height)
				.append("svg")
				.attr("id", "backSvg")
				.style("width", m.width)
				.style("height", m.height);
				
			//lägger till div för TableLensen
			d3.select("#visBody")
				.append("div")
				.attr("id","chart1")
				.style("width", m.tableLens_w)
				.style("height", m.tableLens_h)
				.style("top", m.tableLens_top);
				
			//lägger till div för barChart
			var chart2 = d3.select("#visBody")
				.append("div")
				.attr("id","chart2")
				.style("width", m.barChart_w)
				.style("height", m.barChart_h)
				.style("top", m.barChart_top)
				.style("right", m.barChart_right);
			
			//div för filterrutorna
			d3.select("#visBody")
				.append("div")
				.attr("id","filterHolder")
				.style("width", m.filterHolder_w)
				.style("height", m.filterHolder_h)
				.style("top", m.filterHolder_top)
				.style("left", m.filterHolder_left);		
			
			//div för top100-switchen
			d3.select("#visBody")
				.append("div")
				.attr("id","switchHolder")
				.style("width", m.switchHolder_w)
				.style("height", m.switchHolder_h)
				.style("top", m.switchHolder_top)
				.style("left", m.switchHolder_left);	
						
			
			//div för scatterplotten
			d3.select("#visBody")
				.append("div")
				.attr("id","chart3")
				.style("width", m.scatterPlot_w)
				.style("height", m.scatterPlot_h)
				.style("bottom", m.scatterPlot_bottom)
				.style("right", m.scatterPlot_right);	
				
			
		   //skapar ett suddfilter för att användas bakom bakgrundsfyrkanterna
			d3.select("#backSvg").append("svg:defs")
							.append("svg:filter")
							.attr("id", "blur2")
							.append("svg:feGaussianBlur")
							.attr("stdDeviation", 5);
			//ritar bakgrundsrektanglarna
			c.drawBackgroundMain();
};	

function disableSwitch(){
	var m = new measureObject();
	 d3.select("#visBody")
				.append("svg")
				.attr("id","disable")
				.style("width", m.filterHolder_w)
				.style("height", m.filterHolder_h)
				.style("top", m.filterHolder_top)
				.style("left", m.filterHolder_left);	

};	

function enableSwitch(){
	d3.select("#disable")
		.remove();
};