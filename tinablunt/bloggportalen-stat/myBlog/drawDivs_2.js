function drawDivs_2(m,c){

			//lägger till stora svg där alla bakgrundsrutor ska ligga
			var div = d3.select("#visBody")
						.style("width", m.width)
						.style("height", m.height)
						.style("top", m.top);
				
				div.append("div")
					.attr("id","background")
					.style("width", m.width)
					.style("height", m.height)
					.append("svg")
					.attr("id", "backSvg")
					.style("width", m.width)
					.style("height", m.height);
			
			//infoDisplayen
			var k = d3.select("#visBody")
						.append("div")
						.attr("id","chart5")
						.style("width", m.chart5_w)
						.style("height", m.chart5_h)
						.style("top", m.chart5_top);
						
						
						k.append("div")
								.attr("id","geoDiv")
								.style("width", m.geoDiv_w)
								.style("height", m.geoDiv_h)
								.style("top", m.geoDiv_top)
								.style("left", m.geoDiv_left)
								.style("z-index", 10);

						k.append("div")
								.attr("id","mouseDiv")
								.style("width", m.mouseDiv_w)
								.style("height", m.mouseDiv_h)
								.style("top", m.mouseDiv_top)
								.style("left", m.mouseDiv_left)
								.style("z-index", 100);
			
			//timeDiagram
			d3.select("#visBody")
				.append("div")
				.attr("id","chart4")
				.style("width", m.timeDiagram_w)
				.style("height", m.timeDiagram_h)
				.style("bottom", m.timeDiagram_bottom)
				.style("left", m.timeDiagram_left);
			
			//slidern
			d3.select("#visBody")
				.append("div")
				.attr("id","sliderDiv")
				.style("width", m.slider_w)
				.style("height", m.slider_h)
				.style("bottom", m.slider_bottom)
				.style("left", m.slider_left);
				
			
			
					
			//ritar bakgrundsrektanglarna
			//c.drawBackgroundMyblog();
};	