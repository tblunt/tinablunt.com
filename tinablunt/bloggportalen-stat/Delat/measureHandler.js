function measureObject(){
	this.ratio = setRatio();
	this.width =(window.innerWidth)*0.97;
	this.height = this.width/this.ratio;
	this.top = this.height*0.1;

	//menyn
	this.menu_w = this.width;
	this.menu_h = this.height*0.05;
	this.menu_top = 0+"%";
	
	//tableLens
	this.tableLens_w = this.width*0.3;
	this.tableLens_h = this.height*0.92;
	this.tableLens_top = this.height*0.07;
	
	//scatterPlot
	this.scatterPlot_w = this.width*0.67;
	this.scatterPlot_h = this.height*0.55;
	this.scatterPlot_bottom = 0;
	this.scatterPlot_right = 2+"%";

	//filterHolder
	this.filterHolder_w = this.width*0.13;
	this.filterHolder_h = this.height*0.33;
	this.filterHolder_top = this.height*0.1;
	this.filterHolder_left = this.width*0.31;
		
	//switchHolder
	this.switchHolder_w = this.filterHolder_w;
	this.switchHolder_h = this.filterHolder_h*0.5;
	this.switchHolder_top = this.filterHolder_h*0.35;
	this.switchHolder_left = this.width*0.31;
	
	//barChart
	this.barChart_w = this.width - this.tableLens_w - this.filterHolder_w- this.width*0.04;
	this.barChart_h = this.filterHolder_h;
	this.barChart_top = this.height*0.1;
	this.barChart_right = 2 +"%";
	
	function setRatio(){
		var ratio = (window.innerWidth)*0.97/(window.innerHeight*0.9);
		if(ratio<1.79){
			r = 1.77;
		}
		else if(ratio>1.79){
			r = ratio;
		}
		return r;
		
	};
}

function measureObject2(){
	
	this.ratio = setRatio();
	
	this.width = window.innerWidth*0.99;
	this.height = this.width/this.ratio;
	this.top = this.height*0.1;

	//menyn
	this.menu_w = this.width;
	this.menu_h = this.height*0.05;
	this.menu_top = 0;
	
	//infoDisplat, chart5
	this.chart5_w = this.width;
	this.chart5_h = this.height*0.5;
	this.chart5_left = 0;
	this.chart5_top =  this.height*0.05;
	
	//informationsrutan med termometrar och blogginlägg
	this.infoSvg_w = this.chart5_w*0.8;
	this.infoSvg_h = this.height*0.36;
	this.infoSvg_left = this.width*0.1;
	this.infoSvg_top =  this.height*0.1;
	
	
	//globen
	this.geoDiv_w = this.infoSvg_w*0.60;
	this.geoDiv_h = this.height*0.36;
	this.geoDiv_top =  this.height*0.06;
	this.geoDiv_left = this.width*0.40;
	
	//för museventet över globen
	this.mouseDiv_w = this.width*0.40;
	this.mouseDiv_h = this.height*0.37;
	this.mouseDiv_top =  this.height*0.05;
	this.mouseDiv_left = this.width*0.40;	

	
	//slidern, längst ner
	this.slider_w = this.width*0.5;
	this.slider_h = this.height*0.12;
	this.slider_left = this.width*0.25;
	this.slider_bottom = 0;	

	//timeDiagram, chart4
	this.timeDiagram_w = this.width*0.99;
	this.timeDiagram_h = this.height*0.38;
	this.timeDiagram_bottom =  this.slider_h;
	this.timeDiagram_left =  0;
	

	

	
	
	function setRatio(){
		var ratio = (window.innerWidth*0.99)/(window.innerHeight*0.9);
		if(ratio<1.79){
			r = 1.77;
		}
		else if(ratio>1.79){
			r = ratio;
		}
		return r;
		
	};
}

