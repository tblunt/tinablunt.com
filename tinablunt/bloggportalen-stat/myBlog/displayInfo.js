function displayMenu(){
	var c = new colorValues();
	var m = new measureObject2();
	
	var otherSvg_w = m.infoSvg_w*0.4;
	var otherSvg_h = m.infoSvg_h;
	var otherSvg_left = 0;
	
	var buttonSvg_h = m.height*0.04;
	var buttonSvg_w = buttonSvg_h*9.161;
	var pxl_w = buttonSvg_w/284;
	
	var buttonSvg_left = buttonSvg_w*0.1;
	
	var buttonDiv = d3.select("#visBody")
						.append("div")
						.style("position", "absolute")
						.style("z-index", 1000)
						.style("width", buttonSvg_w)
						.style("height", buttonSvg_h)
						.style("top", m.infoSvg_top*1.1)
						.style("left",m.infoSvg_left+otherSvg_w*0.5-buttonSvg_w*0.5);
						
	var buttonSvg = buttonDiv
						.append("svg")
						.style("position", "absolute")
						.style("width", buttonSvg_w)
						.style("height", buttonSvg_h);
	
		buttonSvg.append("svg:image")
							.attr("xlink:href", "Images/leftbutton_on.png")
							.attr("id", "infoButton")
							.attr("width", pxl_w*168)
							.attr("height", buttonSvg_h);

		buttonSvg.append("svg:image")
							.attr("xlink:href", "Images/rightbutton_off.png")
							.attr("x",pxl_w*168)
							.attr("id", "infoButton")
							.attr("width", pxl_w*116)
							.attr("height", buttonSvg_h);
							
		buttonSvg.append("text")
							.attr("y",pxl_w*18)
							.attr("x",pxl_w*168*0.5)
							.attr("text-anchor", "middle")
							.attr("id", "infoButtonText")
							.style("font-size", 8+"pt")
							.text("Övergriplig statistik")
							.attr("fill", "#1cafe1");
		buttonSvg.append("text")
							.attr("y",pxl_w*18)
							.attr("x",pxl_w*168+pxl_w*58)
							.attr("text-anchor", "middle")
							.style("font-size", 8+"pt")
							.attr("id", "infoButtonText")
							.text("Blogginlägg");
	
};

function displayMenu2(){
	var c = new colorValues();
	var m = new measureObject2();
	
	var termoSvg_w = m.infoSvg_w*0.6;
	var termoSvg_h = m.infoSvg_h;
	var termoSvg_left = m.infoSvg_w*0.45;
	
	var buttonSvg_h = m.height*0.04;
	var buttonSvg_w = buttonSvg_h*9.161;
	var pxl_w = buttonSvg_w/284;
	
	var buttonSvg_left = buttonSvg_w*0.1;
	
	var buttonDiv = d3.select("#visBody")
						.append("div")
						.style("position", "absolute")
						.style("z-index", 1000)
						.style("width", buttonSvg_w)
						.style("height", buttonSvg_h)
						.style("top", m.infoSvg_top*1.1)
						.style("left",m.infoSvg_left+m.infoSvg_w*0.4+termoSvg_w*0.5-buttonSvg_w*0.5);
						
	var buttonSvg = buttonDiv
						.append("svg")
						.style("position", "absolute")
						.style("width", buttonSvg_w)
						.style("height", buttonSvg_h);
	
		buttonSvg.append("svg:image")
							.attr("xlink:href", "Images/leftbutton_on.png")
							.attr("id", "infoButton2")
							.attr("width", pxl_w*168)
							.attr("height", buttonSvg_h);

		buttonSvg.append("svg:image")
							.attr("xlink:href", "Images/rightbutton_off.png")
							.attr("x",pxl_w*168)
							.attr("id", "infoButton2")
							.attr("width", pxl_w*116)
							.attr("height", buttonSvg_h);
							
		buttonSvg.append("text")
							.attr("y",pxl_w*18)
							.attr("x",pxl_w*168*0.5)
							.attr("text-anchor", "middle")
							.attr("id", "infoButtonText2")
							.style("font-size", 8+"pt")
							.text("Rekordtermometrar")
							.attr("fill", "#1cafe1");
		buttonSvg.append("text")
							.attr("y",pxl_w*18)
							.attr("x",pxl_w*168+pxl_w*58)
							.attr("text-anchor", "middle")
							.style("font-size", 8+"pt")
							.attr("id", "infoButtonText2")
							.text("Geografiskt");
	
};


function displayInfo(timeObject,visits,avg_month_vis,avg_day_vis,blog_posts,monthly_blog_posts,dir,type,menuChoice,menuChoice2){	
	var c = new colorValues();
	var m = new measureObject2();
	
	d3.select("#infoSvg")
		.remove();
		
	d3.select("#geoSvg")
		.remove();

	max_visits = timeObject.max_visits;
	max_visits_day = timeObject.max_visits_day;
	max_visits_month = timeObject.max_visits_month;
	ind = timeObject.selectedIndex;
	
	var monthLabels = timeObject.getLabelArray();
	var width = m.infoSvg_w;
	var height = m.infoSvg_h;
	var indent = m.infoSvg_left;
	
	//infoVariabler
	var otherSvg_w = width*0.4;
	var otherSvg_h = height;
	var otherSvg_left = 0;
	
	//text positions
	var headlineXpos = otherSvg_w*0.5;
	var headlineYpos = m.infoSvg_h*0.3;
	var textSepatation = 20;
	
	var numberOfItems = 7;
	
	var la = null;
	var ra = null;
	
	//termometerVariabler
	var termoSvg_w = width*0.6;
	var termoSvg_h = height;
	var termoSvg_left = width-termoSvg_w;
	
	var termoColor = c.termoColor;
	var boxHeight = height*0.4;
	var boxWidth = width*0.5;
	var boxXpos = width-boxWidth;
	var boxYpos = (height-boxHeight)*0.6;
	var termoWidth = 15;
	
	var y1 = boxYpos+boxHeight*0.23;
	var y2 = boxYpos+boxHeight*0.9;
	var lineHeight = (y2)-y1;
	
	var termoTextXpos = width*0.4;
	var termoTextYpos = 0;
	
	var vis = d3.select("#chart5")
				.append("svg:svg")
				.attr("id","infoSvg")
				.style("left", m.infoSvg_left)
				.attr("width", width)
				.attr("height", height);
		
	var infoContainer =  d3.select("#infoSvg")
							.append("svg")
							.attr("id", "otherInfo")
							.attr("x", 0)
							.attr("width", otherSvg_w)
							.attr("height", otherSvg_h);
							
					infoContainer
							.append("rect")
							.attr("fill", "#f3f9ff")
							.attr("x", 0)
							.attr("y", 0)
							.attr("width", otherSvg_w*0.95)
							.attr("height", otherSvg_h);
						
	var termoContainer =  d3.select("#infoSvg")
							.append("svg")
							.attr("id", "termoInfo")
							//.style("stroke", "white")
							//.style("stroke-width", 2)
							.style("width", termoSvg_w)
							.style("height", termoSvg_h)
							.attr("x",termoSvg_left);
						/*
						.attr("x", boxXpos)
						.attr("y",boxYpos);*/
				 
	
		//ritar rätt info beroned på menyval och typ(år,månad,dag)
		display(type,menuChoice);
		
		if(dir == 1){
			swoopLeft();
		}
		else if(dir == 0){
			swoopRight();
		}

	
//******************************************************************************************************
 //***********************      publika  funktioner       ******************************************************
 //******************************************************************************************************
	
	this.getRightArrow = function(){
			return ra;
	};
	
	this.getLeftArrow = function(){
			return la;
	};
	
	this.updateOtherInfo = function(tO,vis,m_visits,d_visits,blog_pos,monthly_blog_pos,di,typ,menuC,m){
		timeObject = tO;
		menuChoice = menuC;
		visits = vis;
		avg_month_vis = m_visits;
		avg_day_vis = d_visits;
		blog_posts = blog_pos;
		monthly_blog_posts = monthly_blog_pos;
		type = typ;
		ind = timeObject.selectedIndex;
		
		updateOtherInfo();
	};
	
	this.updateTermoInfo = function(tO,vis,m_visits,d_visits,blog_pos,monthly_blog_pos,di,typ,m,menuC){
		timeObject = tO;
		menuChoice2 = menuC;
		visits = vis;
		avg_month_vis = m_visits;
		avg_day_vis = d_visits;
		blog_posts = blog_pos;
		monthly_blog_posts = monthly_blog_pos;
		type = typ;
		ind = timeObject.selectedIndex;
		
		updateTermoInfo();
	};
	
//******************************************************************************************************
 //***********************      privata  funktioner       ******************************************************
 //******************************************************************************************************
	function updateTermoInfo(){
		
		d3.select("#termoInfo").selectAll("svg")
				.remove();
		d3.select("#termoInfo").selectAll("text")
				.remove();
		d3.select("#termoInfo").selectAll("line")
				.remove();
		d3.select("#termoInfo").selectAll("path")
				.remove();
		d3.select("#termoInfo").selectAll("image")
				.remove();
		d3.select("#termoInfo").selectAll("rect")
				.remove();
				
		if(menuChoice2 == 0){
			drawTermo(type,visits,timeObject,avg_month_vis,avg_day_vis,blog_posts,termoSvg_w,termoSvg_h);	
		}	
		else{
			if(type==0){
				d3.select("#geoDiv")
					.style("visibility", "visible");
				d3.select("#mouseDiv")
					.style("visibility", "visible");
			
				//ritar globen
				var dotList = getDotList_Random(100);
				var geo = new geoMap(dotList,termoSvg_w,termoSvg_h);
			}
			//1=månad
			else if(type==1){
				d3.select("#geoDiv")
					.style("visibility", "visible");
				d3.select("#mouseDiv")
					.style("visibility", "visible");
			
				//ritar globen
				var dotList = getDotList_Random(50);
				var geo = new geoMap(dotList,termoSvg_w,termoSvg_h);
			}
			//2=dag
			else if(type==2){
				d3.select("#geoDiv")
					.style("visibility", "visible");
				d3.select("#mouseDiv")
					.style("visibility", "visible");
			
				//ritar globen
				var dotList = getDotList();
				var geo = new geoMap(dotList,termoSvg_w,termoSvg_h);
			}
		}
	};
	
	function updateOtherInfo(){
		d3.select("#bloggCircleCont")
				.remove();
		d3.select("#otherInfo").selectAll("svg")
				.remove();
		d3.select("#otherInfo").selectAll("text")
				.remove();
		d3.select("#otherInfo").selectAll("line")
				.remove();
				
		if(menuChoice == 0){
				if(type==0){
					drawOtherInfo_year();
				}
				//1=månad
				else if(type==1){
					drawOtherInfo();
				}
				//2=dag
				else if(type==2){
					drawOtherInfo();
			}	
		}
		else{
			if(type==0){
				
				drawBlogPosts_year();
			}
			//1=månad
			else if(type==1){
				
					
				drawBlogPosts_month();
			}
			//2=dag
			else if(type==2){
				
				drawBlogPosts_day();
			}
		}
	};
	
	function display(){
		updateTermoInfo();
		updateOtherInfo();
		};
		
	function drawOtherInfo(){
			var x1 = 0;
			var x2 = otherSvg_w*0.95;
			
			var headLine = infoContainer
								.append("text")
								.attr("class", "no-select")
								.attr("text-anchor","middle")
								.attr("x",headlineXpos)
								.attr("y",headlineYpos)
								.attr("opacity", 1)
								.attr("fill", function(d,i){return c.color(ind/c.divNumber);})
								.style("font-size", function(){return 18+"pt";})
								.text(function(){
													return monthLabels[ind];
									});
				
				horisontalDash(x1,x2,60);
				
									
				infoContainer
								.append("text")
								.attr("class", "no-select")
								.attr("text-anchor","middle")
								.attr("x",headlineXpos)
								.attr("y",height*0.55)
								.attr("opacity", 1)
								.attr("fill", function(d,i){return c.color(ind/c.divNumber);})
								.style("font-size", function(){return 12+"pt";})
								.text(function(){
													return "Antal besökare totalt: "+numberWithCommas(visits);
									});
									
				infoContainer
								.append("text")
								.attr("class", "no-select")
								.attr("text-anchor","middle")
								.attr("x",headlineXpos)
								.attr("y",height*0.75)
								.attr("opacity", 1)
								.attr("fill", function(d,i){return c.color(ind/c.divNumber);})
								.style("font-size", function(){return 12+"pt";})
								.text(function(){
													return "Antal inlägg totalt: "+ numberWithCommas(blog_posts.postTitles.length);
									});
	
	};
	
	function drawOtherInfo_year(){
			d3.selectAll("#back")
				.remove();
			var x1 = 0;
			var x2 = otherSvg_w*0.95;
			
			var headLine = infoContainer
								.append("text")
								.attr("class", "no-select")
								.attr("text-anchor","middle")
								.attr("x",headlineXpos)
								.attr("y",headlineYpos)
								.attr("opacity", 1)
								.attr("fill", function(d,i){return c.color(ind/c.divNumber);})
								.style("font-size", function(){return 18+"pt";})
								.text(function(){
													return monthLabels[ind];
									});
				
				horisontalDash(x1,x2,60);
				
									
				infoContainer
								.append("text")
								.attr("class", "no-select")
								.attr("text-anchor","middle")
								.attr("x",headlineXpos)
								.attr("y",height*0.55)
								.attr("opacity", 1)
								.attr("fill", function(d,i){return c.color(ind/c.divNumber);})
								.style("font-size", function(){return 12+"pt";})
								.text(function(){
													return "Antal besökare totalt: "+numberWithCommas(visits);
									});
									
				infoContainer
								.append("text")
								.attr("class", "no-select")
								.attr("text-anchor","middle")
								.attr("x",headlineXpos)
								.attr("y",height*0.75)
								.attr("opacity", 1)
								.attr("fill", function(d,i){return c.color(ind/c.divNumber);})
								.style("font-size", function(){return 12+"pt";})
								.text(function(){
													return "Antal inlägg totalt: "+"100";
									});
	};
	
	function horisontalDash(x1,x2,nrOfDashes){
				var dash = (x2-x1)/nrOfDashes;
				
				for(i=0;i<nrOfDashes;i=i+2){
					infoContainer
								.append("svg:line")
								.attr("x1",x1+dash*i)
								.attr("x2",x1+dash*(i+1))
								.attr("y1",height*0.4)
								.attr("y2",height*0.4)
								.attr("opacity", 1)
								.attr("stroke-width",1)
								.attr("stroke", "#8eb8dc");
				}
	
	};
	
	function drawText(x,y,color,text, fontSize){
				infoContainer
						.append("text")
						.attr("class", "no-select")
						.attr("x",x)
						.attr("y",y)
						.attr("opacity", 1)
						.attr("fill", function(d,i){return color;})
						.style("font-size", function(){return fontSize+"pt";})
						.text(text);
	};
	

		function addText(text,xPos,yPos, anchorPoint,color){
				infoContainer
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
	
	function drawBlogPosts_year(){
	
		var temp = [];
		for(i=0;i<12;i++){
		 temp.push(Math.random()*12);
		}
		timeCircle(blog_posts.monthSums, timeObject.months, timeObject, monthLabels[ind]);
	};
	

	function drawBlogPosts_month(){		
	
		display_month_blogposts(monthly_blog_posts);
	};
	

	
	function drawBlogPosts_day(){
		var antal = blog_posts.postTitles.length;
		var firstPos = height*0.2;
		var lastPos = height*0.9;
		var diff;
		
		if(antal == 0){						
			infoContainer.append("text")
					.attr("text-anchor", "middle")
					.attr("x", otherSvg_w*0.5)
					.attr("y", otherSvg_h*0.5)
					.attr("fill", c.labelColor)
					.text("Den finns inga inlägg denna dag");
		}
		else{
			display_month_blogposts(blog_posts.postTitles);
		}
		
		
	};
	
	function drawBlogPost(title,index, x, y,Xsep){
		infoContainer.append("text")
						//.attr("r", window.innerWidth*0.005)
						.attr("fill", c.color(0.2*index))
						.style("font-size",function(d,i){return 15+"pt";})
						.attr("opacity", 0.8)
						.attr("x", x)
						.attr("y", y)
						.text(index);
						
		infoContainer.append("text")
					.attr("x", x+window.innerWidth*0.02+Xsep)
					.attr("y", y)
					.attr("fill", c.labelColor)
					.text(title);
	};
	

		function addTextAndData(text,data,xPos,yPos){
					infoContainer
						.append("text")
						.attr("fill", c.labelColor)
						.attr("class", "no-select")
						.style("font-size",function(d,i){return 9+"pt";})
						.attr("text-anchor", "begin")
						.attr("id", "lbl")
						.attr("x", function(d,i){	
																	return xPos;
																})
						.attr("y", function(){return yPos;})// textSeparation*0.7;})
						.text(function(d,i){	
											var value = numberWithCommas(Math.round(data));
											if(value == 0){
												//value = data[i]/monthDays[i];
												value = value.toFixed(1);
											}
											
											return text +": "+ value;
							});	
		
		};
		
		
			function addTextAndDoubleData(text,data,data2,xPos,yPos){
					infoContainer
						.append("text")
						.attr("fill", "white")
						.attr("class", "no-select")
						.style("font-size",function(d,i){return 12+"pt";})
						.attr("text-anchor", "end")
						.attr("id", "lbl")
						.attr("x", function(d,i){	
																	return xPos;
																})
						.attr("y", function(){return yPos;})// textSeparation*0.7;})
						.text(function(d,i){return text +": "+ Math.round(data[i]/data2[i]);})// + Math.round(d);})
						.on("mousedown", moveDownEvent)
						.on("mouseup", moveUpEvent)
						.on("mouseover", moveOverEvent)
						.on("mousemove", specialMove);	
		
		};
		
	
	function swoopLeft(){
		infoContainer
				.attr("x", width)
				.transition()
				.delay(0)
				.duration(700)
				.attr("x",0);
		termoContainer
				.attr("x", termoSvg_w+termoSvg_left)
				.transition()
				.delay(0)
				.duration(700)
				.attr("x",termoSvg_left);
		};
		
	function swoopRight(){
		infoContainer
				.attr("x",-width)
				.transition()
				.delay(0)
				.duration(700)
				.attr("x",0);
				
		termoContainer
				.attr("x", -termoSvg_w)
				.transition()
				.delay(0)
				.duration(700)
				.attr("x",termoSvg_left);

			
		};
	

	this.drawInfoArrows = function(){
			var m = new measureObject2();
			
			var width = m.chart5_w*0.1;
			var height = m.chart5_h;
			var indent = 20;
			
			var leftSvg = d3.select("#chart5")
						.append("svg")
						.attr("id","leftSvg")
						.style("position","absolute")
						.style("left", "0%")
						.attr("width", width)
						.attr("height", height);
						
			var rightSvg = d3.select("#chart5")
						.append("svg")
						.attr("id","rightSvg")
						.style("position","absolute")
						.style("right", "0%")
						.attr("width", width)
						.attr("height", height);
			
			 la = drawLeftArrow(indent,height*0.5-width*0.2,width*0.4);
			 ra = drawRightArrow((width-width*0.4-indent),height*0.5-width*0.2,width*0.4);
			
			
			function drawLeftArrow(x,y,bredd){
				
				lArrow = leftSvg.append("svg:image")
					.attr("xlink:href", "Images/arrow_left.png")
					.attr("width", bredd)
					.attr("height", bredd)
					.attr("x", x)
					.attr("y", y);
				
				return lArrow;
			};
			

			
			function drawRightArrow(x,y,bredd){
				rArrow = rightSvg.append("svg:image")
					.attr("xlink:href", "Images/arrow_right.png")
					.attr("width", bredd)
					.attr("height", bredd)
					.attr("x", x)
					.attr("y", y);
					
				return rArrow;
			};

	};
	
	this.drawArrowText = function(index){
			d3.select("#leftSvg")
				.selectAll("text")
				.remove();
				
			d3.select("#rightSvg")
				.selectAll("text")
				.remove();
				
		var leftXPos = window.innerWidth*0.04;
		var rightXPos = window.innerWidth*0.06;
		var yPos = m.chart5_h*0.5+height*0.15;
		
		d3.select("#leftSvg")
						.append("text")
						.attr("fill", "#878787")
						.attr("class", "no-select")
						.style("font-size",function(d,i){return 9+"pt";})
						.attr("text-anchor", "middle")
						.attr("id", "lbl")
						.attr("x", function(d,i){	
																	return leftXPos;
																})
						.attr("y", function(){return yPos;})// textSeparation*0.7;})
						.text(function(d,i){return monthLabels[index-1];});

		d3.select("#rightSvg")
						.append("text")
						.attr("fill", "#878787")
						.attr("class", "no-select")
						.style("font-size",function(d,i){return 9+"pt";})
						.attr("text-anchor", "middle")
						.attr("x", function(d,i){	
																	return rightXPos;
																})
						.attr("y", function(){return yPos;})// textSeparation*0.7;})
						.text(function(d,i){return monthLabels[index+1];});
	};

};//function





