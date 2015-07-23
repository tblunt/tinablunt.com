function eventHandler(timeObject,timeDiagram,slider,displayer,blog_posts){
	var c = new colorValues();
	var m = new measureObject2();
	
	var w = m.width*0.1;
	var h = m.height*0.03;
		
	var lastSelected = timeObject.selectedIndex;
	var keepSelected = timeObject.selectedIndex;
	var diff;
	//0=year, 1=month, 2=day 
	var type = 2;
	
	var a = [];
	
	//----------------------------menyn-----------------------------------------------------
	//0=övergriplig, 1=blogginlägg,
	var menuChoice = 0;
	var buttons = new displayMenu();
	
	//0=termometrar, 1=geo,
	var menuChoice2 = 0;
	var buttons2 = new displayMenu2();

	var buttons = d3.selectAll("#infoButton")
						.on("mousedown", buttonDown)
						.on("mouseover", buttonOver)
						.on("mouseout", buttonOut);
						
	var buttonText = d3.selectAll("#infoButtonText")
						.on("mousedown", buttonDown)
						.on("mouseover", buttonOver)
						.on("mouseout", buttonOut);
			
				
	setSelected(0);	
	setUnSelected(1);
	
	function setSelected(ind){
		if(ind==0){
			d3.select(buttons[0][ind])
				.attr("xlink:href", "Images/leftbutton_off.png");
		
			d3.select(buttonText[0][ind])
				.attr("fill", "#1cafe1");
		}
		else{
			d3.select(buttons[0][ind])
				.attr("xlink:href", "Images/rightbutton_off.png");
		
			d3.select(buttonText[0][ind])
				.attr("fill", "#1cafe1");
		}
		//set selected
		
	};
	
	function setUnSelected(i1){
		if(i1==0){
			d3.select(buttons[0][i1])
				.attr("xlink:href", "Images/leftbutton_on.png");
		
			d3.select(buttonText[0][i1])
				.attr("fill", "#59595b");
		}
		else{
			d3.select(buttons[0][i1])
				.attr("xlink:href", "Images/rightbutton_on.png");
		
			d3.select(buttonText[0][i1])
				.attr("fill", "#59595b");
		}
	};

	function buttonDown(d,i){
		//vänster button nedtryckt
		if(i==0){
			
				
			setSelected(0);
			setUnSelected(1);
			menuChoice = 0;
			displayer.updateOtherInfo(timeObject,timeDiagram.visits[timeObject.selectedIndex],timeDiagram.month_visits[timeObject.selectedIndex],timeDiagram.day_visits[timeObject.selectedIndex],blog_posts[timeObject.selectedIndex],monthly_blog_posts,0,type,menuChoice,menuChoice2);
		}
		//höger nedtryckt
		else{

				
			setSelected(1);
			setUnSelected(0);
			menuChoice = 1;
			displayer.updateOtherInfo(timeObject,timeDiagram.visits[timeObject.selectedIndex],timeDiagram.month_visits[timeObject.selectedIndex],timeDiagram.day_visits[timeObject.selectedIndex],blog_posts[timeObject.selectedIndex],monthly_blog_posts,0,type,menuChoice,menuChoice2);
		}
		
	};
	

	
	function buttonOver(){
		document.body.style.cursor = 'pointer';
	};
	
	function buttonOut(){
		document.body.style.cursor = 'default';
	};
	
	//----------------------------menyn 2-----------------------------------------------------
	
	
	var buttons2 = d3.selectAll("#infoButton2")
						.on("mousedown", buttonDown2)
						.on("mouseover", buttonOver)
						.on("mouseout", buttonOut);
						
	var buttonText2 = d3.selectAll("#infoButtonText2")
						.on("mousedown", buttonDown2)
						.on("mouseover", buttonOver)
						.on("mouseout", buttonOut);
	
				
	setSelected2(0);	
	setUnSelected2(1);
	
	function setSelected2(ind){
		if(ind==0){
			d3.select(buttons2[0][ind])
				.attr("xlink:href", "Images/leftbutton_off.png");
		
			d3.select(buttonText2[0][ind])
				.attr("fill", "#1cafe1");
		}
		else{
			d3.select(buttons2[0][ind])
				.attr("xlink:href", "Images/rightbutton_off.png");
		
			d3.select(buttonText2[0][ind])
				.attr("fill", "#1cafe1");
		}
		//set selected
		
	};
	
	function setUnSelected2(i1){
		if(i1==0){
			d3.select(buttons2[0][i1])
				.attr("xlink:href", "Images/leftbutton_on.png");
		
			d3.select(buttonText2[0][i1])
				.attr("fill", "#59595b");
		}
		else{
			d3.select(buttons2[0][i1])
				.attr("xlink:href", "Images/rightbutton_on.png");
		
			d3.select(buttonText2[0][i1])
				.attr("fill", "#59595b");
		}
	};

	function buttonDown2(d,i){
		//vänster button nedtryckt
		if(i==0){
			
				
			setSelected2(0);
			setUnSelected2(1);
			menuChoice2 = 0;
			displayer.updateTermoInfo(timeObject,timeDiagram.visits[timeObject.selectedIndex],timeDiagram.month_visits[timeObject.selectedIndex],timeDiagram.day_visits[timeObject.selectedIndex],blog_posts[timeObject.selectedIndex],monthly_blog_posts,0,type,menuChoice,menuChoice2);
		}
		//höger nedtryckt
		else{
			
				
			setSelected2(1);
			setUnSelected2(0);
			menuChoice2 = 1;
			displayer.updateTermoInfo(timeObject,timeDiagram.visits[timeObject.selectedIndex],timeDiagram.month_visits[timeObject.selectedIndex],timeDiagram.day_visits[timeObject.selectedIndex],blog_posts[timeObject.selectedIndex],monthly_blog_posts,0,type,menuChoice,menuChoice2);
		}
		
	};
	//-------------------------------------------------------------------------------------------
	
	//anger om det är år, månad eller dag
	function setType(){
		if(timeObject.selectedIndex < timeObject.nrOfYears){
			type = 0;
		}
		else if(timeObject.selectedIndex > timeObject.nrOfItems-timeObject.showDays-1){
			type = 2;
		}
		else{
			type = 1;
		}
	};
	
	//*****************************************************************************************************************************************
	//********************************************************infoDisplayern
	var lArrow = displayer.getLeftArrow();
	var rArrow = displayer.getRightArrow();
	
	lArrow.on("mousedown", lDownEvent)
			.on("mouseover", lArrowOver)	
			.on("mouseout", lArrowOut);
			
	rArrow.on("mousedown", rDownEvent)
			.on("mouseover", rArrowOver)	
			.on("mouseout", rArrowOut)
			.attr("visibility", "hidden");
	
	

	function lArrowOver(){
				document.body.style.cursor = 'pointer';
				
				d3.select(this)
					.attr("fill", c.arrowHooverColor);
				d3.select("#leftSvg")
					.selectAll("text")
					.attr("fill",c.arrowHooverColor);
	};
			
	function lArrowOut(){
				document.body.style.cursor = 'default';
				d3.select(this)
					.attr("fill", "gray");
				d3.select("#leftSvg")
					.selectAll("text")
					.attr("fill",c.arrowColor);
	};
	
	function lDownEvent(d,i){
		var temp = timeObject.selectedIndex;
		if(diff == 0){
			if(timeObject.selectedIndex > 0){
				timeObject.selectedIndex += -1;
			}
			else{
				d3.select("#leftSvg")
					.selectAll("text")
					.remove();
			}
		}
		else{
			timeObject.selectedIndex = keepSelected - 1;
		}
		
			if(timeObject.selectedIndex == 0){
				lArrow.attr("visibility", "hidden");
			}
			else{
				lArrow.attr("visibility", "visible");
				rArrow.attr("visibility", "visible");
			}
		displayer.drawArrowText(timeObject.selectedIndex);
		d3.select("#leftSvg")
					.selectAll("text")
					.attr("fill",c.arrowHooverColor);
	
		
		
			slider.updateMiddleIndexSlower(timeObject.selectedIndex);
			
			a = timeDiagram.redraw(lastSelected,timeObject.selectedIndex);
			timeDiagram.infoRects = a[0];
			timeDiagram.infoRectText = a[1]; 
			timeDiagram.infoRectText2 = a[2]; 
			timeDiagram.drawSelect(temp,4,timeDiagram.visits[timeObject.selectedIndex]);
			timeDiagram.setDiff(0);
			diff = 0;
			timeDiagram.infoRects.on("mousedown", mouseDownEvent);
			timeDiagram.infoRectText.on("mousedown", mouseDownEvent);
			timeDiagram.infoRectText2.on("mousedown", mouseDownEvent);
			
			setType();
				displayer = new displayInfo(timeObject,timeDiagram.visits[timeObject.selectedIndex],timeDiagram.month_visits[timeObject.selectedIndex],timeDiagram.day_visits[timeObject.selectedIndex],blog_posts[timeObject.selectedIndex],monthly_blog_posts,0,type,menuChoice,menuChoice2);


		lastSelected = timeObject.selectedIndex;
		keepSelected = timeObject.selectedIndex;
		
		
	};
	
	function rArrowOver(){
				document.body.style.cursor = 'pointer';
				d3.select(this)
					.attr("fill", c.arrowHooverColor);
				d3.select("#rightSvg")
					.selectAll("text")
					.attr("fill",c.arrowHooverColor);
	};
			
	function rArrowOut(){
				document.body.style.cursor = 'default';
				d3.select(this)
					.attr("fill", c.arrowColor);
				d3.select("#rightSvg")
					.selectAll("text")
					.attr("fill",c.arrowColor);
	};
	
	function rDownEvent(){
		
		if(diff == 0){
			if(timeObject.selectedIndex < timeObject.nrOfItems-1){
				timeObject.selectedIndex += 1;
			}
			else{
				d3.select("#rightSvg")
					.selectAll("text")
					.remove();
			}
		}
		else{
			timeObject.selectedIndex = keepSelected + 1;
		}
		//gömmer pilen om man är ute i ändarna
		if(timeObject.selectedIndex == timeObject.nrOfItems-1){
				rArrow.attr("visibility", "hidden");
			}
			else{
				lArrow.attr("visibility", "visible");
				rArrow.attr("visibility", "visible");
			}
		displayer.drawArrowText(timeObject.selectedIndex);
		d3.select("#rightSvg")
					.selectAll("text")
					.attr("fill",c.arrowHooverColor);
					
		//timeObject.selectedIndex = timeObject.selectedIndex-1;
		slider.updateMiddleIndexSlower(timeObject.selectedIndex);
		
		a = timeDiagram.redraw(lastSelected,timeObject.selectedIndex);
		timeDiagram.infoRects = a[0];
		timeDiagram.infoRectText = a[1]; 
		timeDiagram.infoRectText2 = a[2]; 
		timeDiagram.infoRects.on("mousedown", mouseDownEvent);
		timeDiagram.infoRectText.on("mousedown", mouseDownEvent);
		timeDiagram.infoRectText2.on("mousedown", mouseDownEvent);
		timeDiagram.drawSelect(lastSelected,4,timeDiagram.visits[timeObject.selectedIndex]);
		timeDiagram.setDiff(0);
		diff = 0;
		
		setType();
		displayer = new displayInfo(timeObject,timeDiagram.visits[timeObject.selectedIndex],timeDiagram.month_visits[timeObject.selectedIndex],timeDiagram.day_visits[timeObject.selectedIndex],blog_posts[timeObject.selectedIndex],monthly_blog_posts,1,type ,menuChoice,menuChoice2);
		
		lastSelected = timeObject.selectedIndex;
		keepSelected = timeObject.selectedIndex;
	};
	
	//*****************************************************************************************************************************************
	//********************************************************tidsdiagrammet
	//färgar seleced vit
	timeDiagram.drawSelect(0,4,timeDiagram.visits[timeObject.selectedIndex]);
	
	timeDiagram.infoRects.on("mousedown", mouseDownEvent);
	timeDiagram.infoRectText.on("mousedown", mouseDownEvent);
	timeDiagram.infoRectText2.on("mousedown", mouseDownEvent);
	
	d3.select("#timeDiagramCont").on("mouseover", hej);
	
	function hej(){
		mouseDown = false;
	};
	
	//triggas när man trycker på en infoRektangel
	function mouseDownEvent(d,i){
		var data = d;
		var ind = i;
		
		timeDiagram.drawSelect(0,4,d);
		
		var dir = 1;
		var temp = timeObject.selectedIndex;
		timeObject.selectedIndex = timeObject.selectedIndex + (ind-4);
		
		if(timeObject.selectedIndex == 0){
			rArrow.attr("visibility", "visible");
			lArrow.attr("visibility", "hidden");
		}
		else if(timeObject.selectedIndex == timeObject.nrOfItems-1){
			lArrow.attr("visibility", "visible");
			rArrow.attr("visibility", "hidden");
		}
		else{
			lArrow.attr("visibility", "visible");
			rArrow.attr("visibility", "visible");
		}
		
	/*	//färgar tillbaka den som va selcted innan
		timeDiagram.setOpacityOnInfoRect(0.5,timeObject.selectedIndex);
		//färgar seleced vit
		timeDiagram.setOpacityOnInfoRect(1,ind);*/
		
		if(timeObject.selectedIndex < temp){
			dir = 0;
		}
		
	//	timeObject.selectedIndex = timeObject.selectedIndex-1;
		slider.updateMiddleIndexSlower(timeObject.selectedIndex);

		a = timeDiagram.redraw(lastSelected,timeObject.selectedIndex);
		timeDiagram.infoRects = a[0];
		timeDiagram.infoRectText = a[1]; 
		timeDiagram.infoRectText2 = a[2]; 
		timeDiagram.infoRects.on("mousedown", mouseDownEvent);
		timeDiagram.infoRectText.on("mousedown", mouseDownEvent);
		timeDiagram.infoRectText2.on("mousedown", mouseDownEvent);

		timeDiagram.drawSelect(ind,4,timeDiagram.visits[timeObject.selectedIndex]);

		timeDiagram.setDiff(0);
		diff = 0;
		
		displayer.drawArrowText(timeObject.selectedIndex);
		setType();
		displayer = new displayInfo(timeObject,timeDiagram.visits[timeObject.selectedIndex],timeDiagram.month_visits[timeObject.selectedIndex],timeDiagram.day_visits[timeObject.selectedIndex],blog_posts[timeObject.selectedIndex],monthly_blog_posts,dir,type,menuChoice,menuChoice2);
		
		lastSelected = timeObject.selectedIndex;
		keepSelected = timeObject.selectedIndex;
	};
	
	//*****************************************************************************************************************************************
	//********************************************************slidern
	slider.mouseOverDiv.on("mousemove", setGlobal)
					.on("mousedown", sliderRectDown)
					.on("mouseup", sliderRectUp)
					.on("mouseout", mouseOut);
	
	var xScale = slider.xScale;
					
	/*d3.select("#sliderRectLeft")
						.on("mouseover", mouseOverOffset);
						
	d3.select("#sliderRectRight")
						.on("mouseover", mouseOverOffset);*/
						
	var globalPos;
	var mouseDown = false;
	//håller koll på om musen är över slidern
	var mouseKoll = true;
	
	var showInt = 8;
	var halfShowInt = 4;
	
	
	function setGlobal(){
		mouseKoll = true;
		document.body.style.cursor = 'e-resize';
			//hämtar positionen för muspekaren
			globalPos = d3.mouse(this); 
			if(mouseDown == true && mouseKoll == true){
				moveRect();
			}
	};

	function mouseOverOffset(){
		if(mouseDown == true){
			mouseKoll = true;
		}
		document.body.style.cursor = 'default';
	};
	
	function sliderRectDown(d,i){	
		mouseDown = true;
		moveRect();
	};
	
	function sliderRectUp(){
		mouseDown = false;
		mouseKoll = false;
	};
	
	function mouseOut(){
	
		document.body.style.cursor = 'default';
	};
	
	function moveRect(){
			var hack = slider.xScale(1)-slider.xScale(0);
			//avrundar positionen på musen uttryckt i x-axel-hack-storlek
			var temp =  Math.round(globalPos[0]/hack);
			
			//om musen är på ett nytt hack sätts selectedIndex till ett nytt värde
			if(temp != timeObject.selectedIndex){
				
				timeDiagram.setDiff(diff);
				
				if(temp < halfShowInt){	
					diff = keepSelected - temp + halfShowInt;
					timeObject.selectedIndex = halfShowInt;
				}
				else if(temp > timeObject.nrOfItems-halfShowInt-1){
					timeObject.selectedIndex = timeObject.nrOfItems-halfShowInt-1;
				}
				else{
					diff = keepSelected - temp + halfShowInt;
					timeObject.selectedIndex = temp;
				}
				
				slider.updateMiddleIndex(timeObject.selectedIndex);
				
				a = timeDiagram.redraw(lastSelected,timeObject.selectedIndex);
				timeDiagram.infoRects = a[0];
				timeDiagram.infoRectText = a[1]; 
				timeDiagram.infoRectText2 = a[2]; 
				timeDiagram.infoRects.on("mousedown", mouseDownEvent);
				timeDiagram.infoRectText.on("mousedown", mouseDownEvent);
				timeDiagram.infoRectText2.on("mousedown", mouseDownEvent);
				
				//kollar vilken som varit selected och låter den rektanglen fortsätta vara färgad vit.
					if(temp < halfShowInt){
						//temp=lastSelected, diff=selected
						diff = keepSelected;
						timeDiagram.moveSelect(temp-1,diff,timeDiagram.visits[timeObject.selectedIndex]);
					}
					else if(temp > timeObject.nrOfItems-halfShowInt-1){
						timeDiagram.moveSelect(8,diff,timeDiagram.visits[timeObject.selectedIndex]);
					}
					else{
						timeDiagram.moveSelect(temp,diff,timeDiagram.visits[timeObject.selectedIndex]);
					}
				lastSelected = timeObject.selectedIndex;
			};
	};
	
	
};//function

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};



