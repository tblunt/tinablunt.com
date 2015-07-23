function menyBar(nr){		
	var m = new measureObject();
	var buttonSeparation = 10;
	
	var button_h = m.menu_h;
	
	//positioner och bredder
	//ratio fås fram av riktiga bildstorleken för att anpassas efter skärmen
	var b1_ratio = 274/41;
	var b1_w = b1_ratio*button_h;
	var b1_x = m.menu_w*0.01;
	
	var b2_ratio = 266/41;
	var b2_w = b2_ratio*button_h;
	var b2_x = b1_x+b1_w+buttonSeparation;
	
	var b3_ratio = 273/41;
	var b3_w = b3_ratio*button_h;
	var b3_x = b1_x+b1_w+b2_w+buttonSeparation*2;
	
	var b4_ratio = 68/41;
	var b4_w = b4_ratio*button_h;
	var b4_x = b1_x+b1_w+b2_w+b3_w+buttonSeparation*3;
	
	var fntSize = 12;
	
	//länkobjekt
	var b1,b2,b3,b4;
	
	//länkar 
	var link1,link2,link3,link4;
	
	//bildlänkar
	var img1,img2,img3,img4;
	
	//textfärg
	var c1,c2,c3,c4;
	var textYPos = m.menu_h*0.66;
	
	//lägger till div för menyn
		var meny = 	d3.select("#visBody")
				.append("div")
				.attr("id","menuBar")
				.style("position", "absolute")
				.style("width", m.menu_w)
				.style("height", m.menu_h)
				.style("top", m.menu_top);
				
		//lägger till svg för menyn	
		var svg = meny
				.append("svg")
				.style("width", m.menu_w)
				.style("height", m.menu_h)
				.style("top", m.menu_top);
		
		setLinkValues(nr);
		addHyperLinks();
		addImages();
		addText();
		
		var buttons = [b1,b2,b3,b4];
		
	//******************************** funktioner *****************************************************
	function setLinkValues(nr){
		link1 = "../Main/main.html"
		link2 = "../myBlog/myBlog.html";
		link3 = "../Help/help.html";
		link4 = "../About/about.html";
		
		//bildlänkar
		img1 = "../bilder/jamfor_out.png";
		img2 = "../bilder/statistik_out.png";
		img3 = "../bilder/tolkar_out.png";
		img4 = "../bilder/om_ut.png";
		
		//textfärger
		c1 = "#2ebae9";
		c2 = "#2ebae9";
		c3 = "#2ebae9";
		c4 = "#2ebae9";
		
		if(nr==1){
			link1 = "";
			img1 = "../bilder/jamfor_in.png";
			c1 = "#595959";
		}
		else if(nr==2){
			link2 = "";
			img2 = "../bilder/statistik_in.png";
			c2 = "#595959";
		}
		else if(nr==3){
			link3 = "";
			img3 = "../bilder/tolkar_in.png";
			c3 = "#595959";
		}
	/*	else{
			link4 = "";
			img4 = "../bilder/om_in.png";
			c4 = "#595959";
		}*/
	};
	
	function addHyperLinks(){
		//lägger till alla hyperlänkar
		b1 = svg.append("svg:a")
				.attr("xlink:href", function(){return link1;})
				.attr("y",0)
				.attr("x",b1_x)
				.attr("width", b1_w)
				.attr("height",m.menu_h);
				
		b2 = svg.append("svg:a")
				.attr("xlink:href", function(){return link2;})
				.attr("y",0)
				.attr("x",b2_x)
				.attr("width", b2_w)
				.attr("height",m.menu_h);
				
	b3 =  svg.append("svg:a")	
					.attr("xlink:href", function(){return link3;})
					.attr("y",0)
					.attr("x",b3_x)
					.attr("width", b3_w)
					.attr("height",m.menu_h);
		/*				
		b4 =  svg.append("svg:a")	
					.attr("xlink:href", function(){return link4;})
					.attr("y",0)
					.attr("x",b4_x)
					.attr("width", b4_w)
					.attr("height",m.menu_h);*/
	};
	
	function addImages(){
		//lägger till alla bilder i hyperlänkarna
		b1.append("svg:image")
					.attr("xlink:href", img1)
					.attr("y",0)
					.attr("x",b1_x)
					.attr("width", b1_w)
					.attr("height",button_h)
					.on("mouseover", mouseOverText)
					.on("mouseout", mouseOutText);
			

		b2.append("svg:image")
					.attr("xlink:href", img2)
					.attr("y",0)
					.attr("x",b2_x)
					.attr("width", b2_w)
					.attr("height",button_h)
					.on("mouseover", mouseOverText)
					.on("mouseout", mouseOutText);
			
	 b3.append("svg:image")
					.attr("xlink:href", img3)
					.attr("y",0)
					.attr("x",b3_x)
					.attr("width", b3_w)
					.attr("height",button_h)
					.on("mouseover", mouseOverText)
					.on("mouseout", mouseOutText);
			
/*	
		b4.append("svg:image")
					.attr("xlink:href", img4)
					.attr("y",0)
					.attr("x",b4_x)
					.attr("width", b4_w)
					.attr("height",button_h)
					.on("mouseover", mouseOverText)
					.on("mouseout", mouseOutText);*/
					
	};
	
	function addText(){
		b1.append("text")
			.text("Jämför med alla bloggar")
			.attr("text-anchor", "middle")
			.style("font-size",function(d,i){return fntSize+"pt";})
			.attr("fill",c1)
			.attr("y",textYPos)
			.attr("x",b1_x+(b1_w*0.5))
			.on("mouseover", mouseOverText)
			.on("mouseout", mouseOutText);
			
		b2.append("text")
			.text("Statistik över min blogg")
			.style("font-size",function(d,i){return fntSize+"pt";})
			.attr("text-anchor", "middle")
			.attr("fill",c2)
			.attr("y",textYPos)
			.attr("x",b2_x+(b2_w*0.5))
			.on("mouseover", mouseOverText)
			.on("mouseout", mouseOutText);
			
		b3.append("text")
			.text("Lite information")
			.style("font-size",function(d,i){return fntSize+"pt";})
			.attr("text-anchor", "middle")
			.attr("fill",c3)
			.attr("y",textYPos)
			.attr("x",b3_x+(b3_w*0.5))
			.on("mouseover", mouseOverText)
			.on("mouseout", mouseOutText);
	/*		
		b4.append("text")
			.text("Om")
			.attr("text-anchor", "middle")
			.style("font-size",function(d,i){return fntSize+"pt";})
			.attr("fill",c4)
			.attr("y",textYPos)
			.attr("x",b4_x+(b4_w*0.5))
			.on("mouseover", mouseOverText)
			.on("mouseout", mouseOutText);*/
	};
		
}