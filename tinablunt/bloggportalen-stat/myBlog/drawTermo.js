function drawTermo(type,visits,timeObject,avg_month_vis,avg_day_vis,blog_posts,w,h){
				d3.select("#geoDiv")
					.style("visibility", "hidden");
				d3.select("#mouseDiv")
					.style("visibility", "hidden");

	var m = new measureObject2();
	var monthLabels = timeObject.getLabelArray();
	max_visits = timeObject.max_visits;
	max_visits_day = timeObject.max_visits_day;
	max_visits_month = timeObject.max_visits_month;
	ind = timeObject.selectedIndex;
	
	var width = w;
	var height = h;
	var indent = m.infoSvg_left;
	
	//text positions
	var headlineXpos = width*0.5;
	var headlineYpos = 22;
	var textSepatation = 20;

	//termometerVariabler
	var termoColor = c.termoColor;
	var boxHeight = height*0.45;
	var boxWidth = width;
	var boxXpos = width-boxWidth;
	var boxYpos = (height-boxHeight)*0.6;
	var termoWidth = 15;
	
	var y1 = boxYpos+boxHeight*0.23;
	var y2 = boxYpos+boxHeight*0.9;
	var lineHeight = (y2)-y1;
	
	//positioner för första termometern
	var x2 = boxXpos+boxWidth*0.1;
	//positioner för andra termometern
	var x1 = boxXpos+boxWidth*0.25;
			
	var x3 = boxXpos+boxWidth*0.46;
	var x4 =  boxXpos+boxWidth*0.6;
	var x5 =  boxXpos+boxWidth*0.82;
			
	var termoTextXpos = width*0.5;
	var termoTextYpos = 0;
		
	var termoContainer = d3.select("#termoInfo");
	
	termoContainer.append("rect")
					.attr("fill", "#f3f9ff")
					.attr("x",0)
					.attr("y",0)
					.attr("width",w)
					.attr("height",h);
					
	//drawText(termoTextXpos,(headlineYpos),c.color_lighter(ind/c.divNumber),"Rekordtermometrar" ,16);

	if(type == 0){
		drawInternalTermo_year();
	}
	else if(type == 1){
		drawInternalTermo_month();
	}
	else{
		drawInternalTermo_day();
	}

//*************************************************************************************************************
	function drawText(x,y,color,text, fontSize){
				termoContainer
						.append("text")
						.attr("class", "no-select")
						.attr("text-anchor", "middle")
						.attr("x",x)
						.attr("y",y)
						.attr("opacity", 1)
						.attr("fill", function(d,i){return color;})
						.style("font-size", function(){return fontSize+"pt";})
						.text(text);
	};
	
	function drawTermometer(x,y1,y2,hm,data,text1,text2,termo_color){
		var lineHeight = (y2)-y1;
		
		//ritar fyllningen i termometrarna
		drawTermoRect(lineHeight,x,y2,hm,data,termo_color);
		
		//ritar röda siffrorna
		drawNumbers(x,y2,hm,data);
		
		//termoLabel
			addText(text1, x, y2*1.27,"middle",c.labelColor);
			addText(text2, x, y2*1.27+10,"middle",c.labelColor);
	};
	
	
	function drawNumbers(x,y,heightMulti,data){
			termoContainer
				.append("text")
				.attr("fill",termoColor)
				.attr("text-anchor", "begin")
				.attr("class", "no-select")
				.style("font-size",function(d,i){return 7+"pt";})
				.attr("id", "lbl")
				.attr("x", function(d,i){	
										return x+termoWidth*0.6;
							})
				.attr("y", function(d,i){	
										return y-2-data*heightMulti;})
				.text(function(d,i){return numberWithCommas(Math.round(data));});
			drawDataLineInRect(data,x,y,termoColor,heightMulti);
		
		};
		
		function drawTermoRect(lineHeight,x,y,heightMulti,data,termo_color){
				var termoHeight = lineHeight*1.75;
				var termoWidth = termoHeight/2.8;

				//termo-fyllningen
				termoContainer
					.append("rect")
					.attr("x", function(d,i){
											return x+termoWidth*0.33;
										})
					.attr("y", function(d,i){
											return y-data*heightMulti;
										})
					.attr("width", function(d,i){
											return termoWidth*0.33;
										})
					.attr("height", function(d,i){
											return data*heightMulti;
										})
					.attr("fill", function(d,i){ if(termo_color==1){
													return "#91084c";
												}
												else if(termo_color==2){
													return "#ee6d33";
												}
												else{
													return "#02baf0";
												}
											//return "#a8185d";
											//return "#f06e30";
											
										})
					.attr("opacity",1);
					
				termoContainer
							.append("svg:image")
							.attr("xlink:href", function(){ if(termo_color==1){
																return "Images/temp_purple.png";
															}
															else if(termo_color==2){
																return "Images/temp_orange.png";
															}
															else{
																return "Images/temp_blue.png";
															}})
							.attr("x",x)
							.attr("y", y-lineHeight*1.2)
							.attr("width", termoWidth)
							.attr("height", termoHeight)
							.attr("opacity",1);
		};
		

		function drawLineInRect(x1,y1,x2,y2,color){
			termoContainer
							.append("svg:line")
							.attr("x1",x1)
							.attr("y1", y1)
							.attr("x2", x2)
							.attr("y2", y2)
							.attr("opacity",0.5)
							.attr("stroke", color)
							.attr("stroke-width", 1);
		
		};
		
		function drawDataLineInRect(data,x,y,color,hm){
			termoContainer
							.append("svg:line")
							.attr("x1",x+boxWidth*0.07)
							.attr("y1",function(d,i){
											return  y-data*hm;
										})
							.attr("x2", x)
							.attr("y2", function(d,i){
											return  y-data*hm;
										})
							.attr("opacity",1)
							.attr("stroke", color)
							.attr("stroke-width", 2);
		
		};
		
		function addText(text,xPos,yPos, anchorPoint,color){
				termoContainer
							.append("text")
							.attr("fill",color)
							.attr("class", "no-select")
							.attr("text-anchor", anchorPoint)
							.style("font-size",function(d,i){return 7+"pt";})
							.attr("id", "lbl")
							.attr("x", function(d,i){	
														return xPos;
													})
							.attr("y", function(){return yPos;})
							.text(function(d){return text;});
		
		
		};
		
		function drawInternalTermo_year(){
		//tot besök, tot inlägg | besök/inlägg, besök/mån, inlägg/mån 
		boxXpos = boxXpos*0.9;
		string = "Jämför "+monthLabels[ind]+" med värdet från det bästa året sedan bloggens födelse";
		drawText(termoTextXpos,(headlineYpos+textSepatation),c.underTextColor,string, 9);
		
			var heightMulti1 = lineHeight/timeObject.max_tot_vis_y;
			var heightMulti2 = lineHeight/timeObject.max_tot_bp_y;
			var heightMulti3 = lineHeight/timeObject.max_avg_vpb_y;
			var heightMulti4 = lineHeight/timeObject.max_avg_monthVisits_y;
			var heightMulti5 = lineHeight/timeObject.max_avg_monthPosts_y;

			var textSeparation = boxHeight*0.09;
			var textPosition = boxHeight*0.6;
			
			/*//drawTermometer(x1,y1,y2,heightMulti1,visits,"Besökare", "totalt");
			//drawTermometer(x2,y1,y2,heightMulti2,inlinks,"Inlägg","totalt");*/
			
			//avskiljare för termometrarna
			for(i=0; i<8;i++){
				drawLineInRect(x1+((x3-x1)*0.5),boxYpos+i*(lineHeight/4),x1+((x3-x1)*0.5),boxYpos+10+i*(lineHeight/4),"gray");
			}
			termoContainer
						.append("text")
						.attr("class", "no-select")
						.attr("text-anchor", "end")
						.attr("x",x1+((x3-x1)*0.45))
						.attr("y",boxYpos)
						.attr("opacity", 0.4)
						.attr("fill", function(d,i){return "gray";})
						.style("font-size", function(){return 9+"pt";})
						.text("Totalt");
			
			termoContainer
						.append("text")
						.attr("class", "no-select")
						.attr("text-anchor", "begin")
						.attr("x",x1+((x3-x1)*0.55))
						.attr("y",boxYpos)
						.attr("opacity", 0.4)
						.attr("fill", function(d,i){return "gray";})
						.style("font-size", function(){return 9+"pt";})
						.text("Genomsnitt");
						

			drawTermometer(x2,y1,y2,heightMulti1,visits,"Besökare", "totalt",1);
			drawTermometer(x1,y1,y2,heightMulti2, blog_posts.postSum,"Inlägg", "totalt",2);
			drawTermometer(x3,y1,y2,heightMulti3,visits/blog_posts.postSum,"Besökare/", "inlägg",3);
			drawTermometer(x4,y1,y2,heightMulti4, avg_month_vis,"Besökare", "månad",3);
			drawTermometer(x5,y1,y2,heightMulti5, blog_posts.postSum/12,"Inlägg", "månad",3);
	};
	
	function rekordArrow(x,y){
			//RekordnivåLabel
			addText("Rekord-", x-80, y,"begin",c.labelColor);
			addText("nivå", x-80, y+10,"begin",c.labelColor);
			drawLineInRect(x-40,y,x-10,y,c.lineColor);
				
				//pilen
					termoContainer
						.append("path")
						.attr("d", "M " + (x-10) + " " + y + " L " + (x-15) +" "+ (y+5) +" L" +(x-15) +" "+(y-5) +" Z")
						.attr("opacity",1)
						.attr("fill", c.lineColor);	
		
	};
	
		function drawInternalTermo_month(){
			//tot besök, tot inlägg | besök/inlägg, besök/dag, inlägg/dag 
			string = "Jämför "+monthLabels[ind]+" med värdet från den bästa månaden senaste året";
			drawText(termoTextXpos,(headlineYpos+textSepatation),c.underTextColor,string, 9);
		
			var heightMulti1 = lineHeight/timeObject.max_tot_vis_m;
			var heightMulti2 = lineHeight/timeObject.max_tot_bp_m;
			var heightMulti3 = lineHeight/timeObject.max_avg_vpb_m;
			var heightMulti4 = lineHeight/timeObject.max_avg_dayVisits_m;
			var heightMulti5 = lineHeight/timeObject.max_avg_dayPosts_m;
			
			var textSeparation = boxHeight*0.09;
			var textPosition = boxHeight*0.6;

			//ritar fyllningen i termometrarna
			drawTermometer(x2,y1,y2,heightMulti1,visits,"Besökare", "totalt",1);
			drawTermometer(x1,y1,y2,heightMulti2, blog_posts.postSum,"Inlägg", "totalt",2);
			drawTermometer(x3,y1,y2,heightMulti3,visits/blog_posts.postSum,"Besökare/", "inlägg",3);
			drawTermometer(x4,y1,y2,heightMulti4, avg_day_vis,"Besökare", "dag",3);
			drawTermometer(x5,y1,y2,heightMulti5, blog_posts.postSum/30,"Inlägg", "dag",3);
			
				//avskiljare för termometrarna
			for(i=0; i<8;i++){
				drawLineInRect(x1+((x3-x1)*0.5),boxYpos+i*(lineHeight/4),x1+((x3-x1)*0.5),boxYpos+10+i*(lineHeight/4),"gray");
			}
			termoContainer
						.append("text")
						.attr("class", "no-select")
						.attr("text-anchor", "end")
						.attr("x",x1+((x3-x1)*0.45))
						.attr("y",boxYpos)
						.attr("opacity", 0.4)
						.attr("fill", function(d,i){return "gray";})
						.style("font-size", function(){return 9+"pt";})
						.text("Totalt");
			
			termoContainer
						.append("text")
						.attr("class", "no-select")
						.attr("text-anchor", "begin")
						.attr("x",x1+((x3-x1)*0.55))
						.attr("y",boxYpos)
						.attr("opacity", 0.4)
						.attr("fill", function(d,i){return "gray";})
						.style("font-size", function(){return 9+"pt";})
						.text("Genomsnitt");

			rekordArrow(x2,y1);
				
	};
	
		function drawInternalTermo_day(){
			//tot besök, tot inlägg | besök/inlägg, besök/dag, inlägg/dag 
			string = "Jämför "+monthLabels[ind]+" med värdet från den bästa dagen senaste 30 dagarna";
			drawText(termoTextXpos,(headlineYpos+textSepatation),c.underTextColor,string,9);
			
			var lineHeight = (y2)-y1;
			var heightMulti1 = lineHeight/timeObject.max_tot_vis_d;
			var heightMulti2 = lineHeight/timeObject.max_tot_bp_d;
			var heightMulti3 = lineHeight/timeObject.max_avg_vpb_d;
			timeObject.ind_tot_bp_d;

			var textSeparation = boxHeight*0.09;

			//ritar termometrarna
			drawTermometer(x1,y1,y2,heightMulti1,visits,"Besökare", "totalt",1);
			drawTermometer(x4,y1,y2,heightMulti2,blog_posts.postSum,"Inlägg", "totalt",2);
			//drawTermometer(x3,y1,y2,heightMulti3,visits/blog_posts.postSum,"Besökare/", "inlägg");
			
			rekordArrow(x1,y1);

	};
};