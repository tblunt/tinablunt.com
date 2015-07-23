function init_top100(URL,jsonObject, filterValues){
		var c = new colorValues();
		//ritar upp filterrutorna
		
		if(filterValues[1] == 0){
				json = list_stats_tot;
			}
			else if(filterValues[1] == 1){
				json = list_stats_sportOfritid;
			}
			else{
				json = list_stats_linkoping;
			}
			
			if(json.length > 101){
					jsonObject.jsondata = [];
					for(i=0;i<100;i++){
						jsonObject.jsondata.push(json[i]);
					}
			}
			else{
					jsonObject.jsondata = json;
			}

		
		loadInlinks(jsonObject);

	//***********************************************************************************************
	//***********************************
		function jsonLoaded(json){		
				
				jsonObject.jsondata = json;
				jsonObject.jsondata.sort(function(a,b){return b.visitors-a.visitors;});
				
				loadInlinks(jsonObject);
		};
		
		function loadInlinks(jsonObject){
				var successArray = [];
				var counter = 0;
				var counter2 = 0;
				//jsonObject.loadInlinks();
				var int1_start = 0;
				var int1_stop = (jsonObject.jsondata.length/2);
				
				var int2_start = int1_stop+1;
				var int2_stop = jsonObject.jsondata.length-1;

				//sätter URLen för bloggarna i json-filen för att hämta info i Twinglys-API.
				var hej = jsonObject.createURLString(int1_start,int1_stop);
				onSuccess();
				

				//denna triggas då jsonfilen är läst.
				function onSuccess(){
					var temp_url1, temp_url2;

					/*	$.each(data.items, function(i,v) {
							counter++;
							success = false;
							temp_url1 = jsonObject.cutUrl(jsonObject.normalizeUrl(v.url)).toLowerCase();*/
							
					$.each(jsonObject.jsondata, function (j, k) {
					    counter++;
						$.extend(jsonObject.jsondata[j],{inlinks:  Math.round(k.visitors *Math.random()*0.01)});
						successArray.push(j);
						return;
					});
							
						//});

				    if(counter==jsonObject.jsondata.length){
						start(jsonObject);
					};
					
				};

			};	

			function start(jsonObject){	
				
				//funktion objektet som sätter alla bar-värden
				//jsonObject.setUserValues(jsonObject.userName);
				
				
					
				//här ska det vara speciella funktioner för table lens och scatterplot, 
				//så att man kan trycka på två objekt

			d3.select("#chart1")
				.selectAll("svg")
				.remove();
				
			d3.select("#chart2")
				.selectAll("svg")
				.remove();
				
			d3.select("#chart3")
				.selectAll("svg")
				.remove();
				
			d3.select("#chart2")
				.selectAll("u1")
				.remove();
			
			d3.select("#chart1")
				.selectAll("p")
				.remove();
			enableSwitch();
				
				var tb = new tableLens2(jsonObject);
				var sp = new scatterPlot2(jsonObject);
				clickHandler(jsonObject,tb,sp);
			};

};
	
	
	function init_me(jsonObject,filterValues){
		var c = new colorValues();
		//filter(jsonObject,filterValues);

			if(filterValues[1] == 0){
				json = list_stats_tot_peter;
				jsonObject.TableLensTitle = "100 bloggar lika mig";
			}
			else if(filterValues[1] == 1){
				json = list_stats_sportOfritid_peter;
				jsonObject.TableLensTitle = "100 bloggar lika mig i sport och fritid";
			}
			else{
				json = list_stats_linkoping_peter;
				jsonObject.TableLensTitle = "100 bloggar lika mig i Linköping";
			}
			
			if(json.length > 101){
					jsonObject.jsondata = [];
					for(i=0;i<100;i++){
						jsonObject.jsondata.push(json[i]);
					}
			}
			else{
					jsonObject.jsondata = json;
			}
			
			//laddar den stora json-filen med alla 100 bloggar
			/*	$.ajax({
					url: URL, 
					dataType: 'jsonp',
					success: jsonLoaded
					})
					
			function jsonLoaded(json){		
					//skapar objekt där all data-info lagras
					jsonObject.jsondata = json;
					jsonObject.jsondata.sort(function(a,b){return b.visitors-a.visitors;});
					
					loadInlinks(jsonObject);
			};
			*/
			loadInlinks(jsonObject);
		
		};
		

		function loadInlinks(jsonObject){
				var successArray = [];
				var counter= 0;
				var counter2= 0;
				//jsonObject.loadInlinks();
				var int1_start = 0;
				var int1_stop = (jsonObject.jsondata.length/2);
				
				var int2_start = int1_stop+1;
				var int2_stop = jsonObject.jsondata.length-1;

				//sätter URLen för bloggarna i json-filen för att hämta info i Twinglys-API.
				var hej = jsonObject.createURLString(int1_start,int1_stop);
				onSuccess();
				

				//denna triggas då jsonfilen är läst.
				function onSuccess(){
					var temp_url1, temp_url2;

					$.each(jsonObject.jsondata, function (j, k) {
					    counter++;
					    $.extend(jsonObject.jsondata[j], { inlinks: Math.round(parseInt(k.visitors) * Math.random() * 0.01 )});
						successArray.push(j);
						return;
					});	
						
						if (counter == jsonObject.jsondata.length) {
							start(jsonObject);
						};
				};

			};	

			function start(jsonObject){	
			jsonObject.setUserValues(jsonObject.userId);
				
				//skapa nytt specialObjekt och öppna ajax här
				var url2 = "http://www.twingly.com/search.json?q=blog%3A"+ jsonObject.userObject.shortName +"+tspan%3am&tspan=m&sort=published";
				var url3 = 	"http://www.twingly.com/search.json?q=blog%3A"+ jsonObject.userObject.shortName +"+type%3awebsite";
				
				
				jsonObject.userObject.blogCount = Math.round(Math.random() * 40);
				jsonObject.userObject.inlinks = Math.round(jsonObject.userObject.visitors * Math.random()*0.01);

					
			d3.select("#chart1")
				.selectAll("svg")
				.remove();
				
			d3.select("#chart2")
				.selectAll("svg")
				.remove();
				
			d3.select("#chart2")
				.selectAll("u1")
				.remove();
				
			d3.select("#chart1")
				.selectAll("p")
				.remove();
				
			d3.select("#chart3")
						.selectAll("svg")
						.remove();

			enableSwitch();
				
				tableLens(jsonObject);
				scatterPlot(jsonObject);
				
			};
	
