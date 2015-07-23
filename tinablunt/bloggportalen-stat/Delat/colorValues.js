
function colorValues(){
	var m = new measureObject();
	var m2 = new measureObject2();
	//----------till alla-----------------------------------------
	this.backgroundColor = "white";

	this.color = d3.scale.linear().domain([0,1]).range(["hsl(195, 81%, 55%)", "hsl(196, 98%, 17%)"]).interpolate(d3.interpolateHsl);
	this.color_lighter = d3.scale.linear().domain([0,1]).range(["hsl(147, 60%, 70%)", "hsl(250, 70%,70%)"]).interpolate(d3.interpolateHsl);
	this.color_darker = d3.scale.linear().domain([0,1]).range(["hsl(147, 60%, 20%)", "hsl(250, 70%,20%)"]).interpolate(d3.interpolateHsl);
	
	this.labelColor= "gray";
	this.lineColor = "gray";
	this.axisColor = "gray";
	this.underTextColor = "gray";
	this.textColor = "black";
	//-----------------------------------------------------
	
	
	//-----------tableLens--------------------------------------------
	this.filterBackColor = "#F0F4F4";
	this.hooverColor = "#BAE6F2";
	this.userColor = "#f06f31";
	this.selectedColor = "#930a4c";
	this.barTextColor = "#C3D5D2";
	//--------------------------------------------------------
	
	//-----------barChart--------------------------------------------
	this.errorTextColor = "red";
	//--------------------------------------------------------
	
	//---------------slider-----------------------------------
	this.onDarkBackground = "black";
	
	this.backRect1 = "#6085ee";
	this.backRect2 = "#58c4e8";
	this.backRect3 = "#7feceb";
	
	//--------------------------------------------------------
	
	
	//------------timeDiagram--------------------------------------------	
	this.startColor = "hsl(216,71%,50%)";
	this.stopColor = "hsl(216, 63%, 75%)";
	this.infoRectColor = "#3192b3";
	this.infoRectSelectedColor = "#9e225e";
	this.infoRectStroke = "black";
	this.selectedLineColor = "black";
	
	//-----------displayInfo---------------------------------------------
	this.termoColor = "gray";
	
	this.arrowColor = "gray";
	this.arrowHooverColor = "black";
	this.divNumber = 60;
	this.stroke = "#B7CACC";
	this.shadow = "#799CA0";
	
	this.buttonSelectedColor = this.backgroundColor;
	this.buttonUnSelectedColor = this.stroke;//"hsl(187, 18%, 83%)";
	//--------------------------------------------------------
	
	this.drawBackgroundMyblog = function(){
	/*
		d3.select("#backSvg")
			.selectAll("rect")
			.remove();
			
		//bakom timeDiagram
		d3.select("#backSvg")
			.append("rect")
			.attr("width", m2.timeDiagram_w)
			.attr("height",m2.timeDiagram_h)
			.attr("x", 0)
			.attr("y",m2.timeDiagram_top)
			.attr("fill", "white");//"#F0F4F4");

	
					
			//----------------------bakom infoDisplay-------------------------------------
			var xpos = m2.infoDisplay_left;
			var ypos = m2.infoDisplay_top;
			var w = m2.infoDisplay_w;
			var h = m2.infoDisplay_top;
			
			
				
			//skuggan
			d3.select("#backSvg")
				.append("rect")
				.attr("id", "backgroundInfo")
				.attr("width",w )
				.attr("height", h)
				.attr("x", xpos+10)
				.attr("y", ypos+10)
				.attr("opacity", 0.5)
				.attr("filter", "url(#blur1)")
				.attr("fill", this.shadow);
			//
			d3.select("#backgroundSvg")
				.append("rect")
				.attr("id", "backgroundInfo")
				.attr("width", w)
				.attr("height", h)
				.attr("x", xpos)
				.attr("y", ypos)
				.attr("fill", this.backgroundColor)
				.style("stroke", this.stroke)
				.style("stroke-width", 2);*/
	};
	
	this.drawBackgroundMain = function(){
			//----------------------bakom filter-------------------------------------
			d3.select("#backSvg")
				.selectAll("rect")
				.remove();

			d3.select("#backSvg")
				.append("rect")
			//	.attr("id", "backgroundInfo")
				.attr("width", m.filterHolder_w)
				.attr("height", m.filterHolder_h)
				.attr("x",m.filterHolder_left)
				.attr("y", m.filterHolder_top)
				.attr("rx",5)
				.attr("ry",5)
				.attr("fill", "#f3f9ff");
				
				
				//----------------------bakom bararna-------------------------------------

			//skuggan
			d3.select("#backSvg")
				.append("rect")
				//.attr("id", "backgroundInfo")
				.attr("width", m.barChart_w)
				.attr("height", m.barChart_h)
				.attr("x", m.width*0.98-m.barChart_w)
				.attr("y", m.barChart_top)
				.attr("opacity", 0.6)
				.attr("filter", "url(#blur2)")
				.attr("fill", "#799CA0");
			
			
			d3.select("#backSvg")
				.append("rect")
			//	.attr("id", "backgroundInfo")
				.attr("width", m.barChart_w)
				.attr("height", m.barChart_h)
				.attr("x", m.width*0.98-m.barChart_w)
				.attr("y", m.barChart_top)
				.attr("rx",5)
				.attr("ry",5)
				.attr("fill", "#f3f9ff");
				
				//----------------------bakom scatterPlotten-------------------------------------


			d3.select("#backSvg")
				.append("rect")
			//	.attr("id", "backgroundInfo")
				.attr("width", m.scatterPlot_w)
				.attr("height", m.scatterPlot_h)
				.attr("x", m.width*0.98-m.scatterPlot_w)
				.attr("y", m.height - m.scatterPlot_h - m.scatterPlot_bottom)
				.attr("rx",5)
				.attr("ry",5)
				.attr("fill", "#f3f9ff");
		};
 };
