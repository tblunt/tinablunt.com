function dataObject(){
		this.ratio = window.innerHeight/window.innerWidth;
	
		this.stringArray = [];
		
		//den data som används nu
		this.jsondata = null;
		
		//lagringsgrejer när man hämtat datat en gång
		this.jsondata_t100_tot = null;
		this.jsondata_t100_category = null;
		this.jsondata_t100_area = null;
		
		this.jsondata_me_tot = null;
		this.jsondata_me_category = null;
		this.jsondata_me_area = null;
		
		//temporär lagring för den man klickat på
		this.selectedItem = null;
		this.selectedIndex = null;
		this.selectedTitle = null;
		
		this.selectedItem2 = null;
		this.selectedIndex2 = null;
		this.selectedTitle2 = null;
		
		//används för att kolla hur många man har klickat, tableLens2 scatterplot2
		//man ska ju kunna trycka på två där
		this.selectCounter = 0;
		
		this.userItem = null;
		this.userIndex = null;
		this.userName = null;
		this.userTitle = null;
		
		this.hooverItem = null;
		this.hooverIndex = null;

		this.TableLensTitle = null;
		
		//lagring för maxvärdena
		this.maxVisitors = null;
		this.minVisitors = null;
		this.maxInlinks = null;
		this.maxInlinks = null;
		
		this.maxRanking = null;
		this.maxblogCount = null;
		
		//0=inlinks, 1=ranking
		this.xSelected = 0;
		this.logScale = 0;
		
		//skapar egna objekt för den man klickat på/usern. 
		//skapas i tableLens,scatterplot men används i barCharten
		this.userObject = new specifiedObject();
		this.clickedObject = new specifiedObject();
		this.clickedObject2 = new specifiedObject();

		this.setUserValues = function(userId){
				var temp = [];
				var found = 0;
				
				for(j = 0; j < this.jsondata.length;j++)
				{	//tempArray för att sortera fram maxVisitors
					temp.push(this.jsondata[j]);
					var id2 = this.jsondata[j].blogId;
					
					if(userId == id2)
					{	
						this.userItem = this.jsondata[j];
						this.userIndex = j;
						found = 1;
					}
				}
				
				if(found==0){
					alert("Din användare hittades inte i databasen. var god försök igen!");
				}
				
				temp.sort(function(a,b){return b.ranking-a.ranking;});
				this.maxRanking = temp[0].ranking;
				this.maxVisitors = this.jsondata[0].visitors;
				this.minVisitors = this.jsondata[this.jsondata.length-1].visitors;
				
				
				this.userObject.shortName = this.userObject.setshortUserUrl(this.userItem.url);
				this.userTitle = this.userItem.name;
				this.userObject.visitors = this.userItem.visitors;
				this.userObject.ranking = this.userItem.ranking;
				this.userObject.title = this.userItem.name;
				
				//return bool;
		};
		
		this.setMaxValues = function(){
			var temp = [];
				
				for(j = 0; j < this.jsondata.length;j++)
				{	//tempArray för att sortera fram maxVisitors
					temp.push(this.jsondata[j]);
				}
				
				temp.sort(function(a,b){return b.ranking-a.ranking;});
				this.maxRanking = temp[0].ranking;
				this.maxVisitors = this.jsondata[0].visitors;
				this.minVisitors = this.jsondata[this.jsondata.length-1].visitors;
		
		};
		
	this.createURLString = function(interval_start, interval_stop){
			var string = "http://www.twingly.com/search.json?q=blog%3a";
			var temp;
			for(i=interval_start;i<interval_stop;i++){
				temp = (this.jsondata[i].url).toLowerCase();
				if(hasWhiteSpace(temp)){
					temp = temp.substring(0,temp.length-1);
					temp = temp.replace(' ','')
				}
				temp = (this.cutUrl(this.normalizeUrl(temp)) + "|");
				string += temp;
				this.stringArray.push(this.cutUrl(this.normalizeUrl(this.jsondata[i].url)).toLowerCase());
			}
			string += "+type%3awebsite+page-size%3A70";
			if(hasWhiteSpace(string)){
					alert(string);
			}
			
			return string;
	};
	
	this.cutUrl = function(u){
		this.Url = u;
			
		//var shortUserUrl;
			if(u.substring(0,3) == "www."){
				shortUserUrl = u.substring(4,u.length);
			}
			else if(u.substring(0,6) == "http://")
			{
				shortUserUrl = u.substring(7,u.length);
			}
			else if(u.substring(0,10) == 'http://www.'){
				shortUserUrl = u.substring(11,u.length);
			}
			else{
				shortUserUrl = u;
			}
			
			//shortUserUrl = shortUserUrl.replace(/\s+$/g,' ');
			
		this.shortName = shortUserUrl;
		return shortUserUrl;
	};
	
	function hasWhiteSpace(s) {
		return s.indexOf(' ') >= 0;
	};
	
					
				
		
	/*Code from Twingly. Not written by me*/ 
	this.normalizeUrl = function(url){
		//remove everything after hash
		url = url.split("#")[0];
		var regex = /^(https?:\/\/)?(www\.)?([^\.\/]+\.)?((?!co\.)[^\/]+?(?:\.co)?\.[^\.\/]{2,4})(\/((?!index\.\w{2,5})(?!default\.\w{2,5}).+?(?!index\.\w{2,5})(?!default\.\w{2,5}))?(\/?(index|default)\.\w{2,5})?(#.*)?)?$/i;

		var result = url.match(regex);
		if (result) {
			if (!result[3] || result[3].length == 0) {
				if ((!result[2] || result[2].length == 0) && (!result[1] || result[1].length == 0)) {
					 url = "http://www." + url;
				} else if (result[2] && result[2].length > 0 && (!result[1] || result[1].length == 0)) {
					url = "http://" + url;
				} else if ((!result[2] || result[2].length == 0) &&  (result[1] && result[1].length>0)) {
					url = url.replace(/^https?:\/\//,"http://www.");
				}
			}
			else {
				if (!result[1] || result[1].length == 0) {
					url = "http://" + url;
				}
			}


			if (result[7]) {
				var str = result[7];
				url = url.slice(0,url.indexOf(str));
			}

		}

		if (url.charAt(url.length-1)=="/" && url.search(/^http:\/\/[^\/]+\/$/) == -1) {url = url.slice(0,-1)};

		if (url.search(/^http:\/\/[^\/]+$/) != -1) {url+="/"};

		return url;
	};
	
		this.jsondata2 = [
					{
					visitors: 1066884,
					position: 1,
					name: "KENZA",
					url: "http://KENZAS.se",
					image: "",
					ranking: 2
					},
					{
					visitors: 239854,
					position: 2,
					name: "Tyra Sjöstedt",
					url: "http://tyras.se",
					image: "",
					ranking: 5
					},
					{
					visitors: 221505,
					position: 3,
					name: "Angelica Blick",
					url: "http://nyheter24.se/modette/angelicablick/",
					image: "",
					ranking: 4
					},
					{
					visitors: 218714,
					position: 4,
					name: "Funny Pictures Blog - Roligaste bilderna på nätet",
					url: "http://funny-pictures-blog.com/",
					image: "",
					ranking: 0
					},
					{
					visitors: 209020,
					position: 5,
					name: "Desiree Nilsson",
					url: "http://www.desireenilsson.se/",
					image: "",
					ranking: 0
					},
					{
					visitors: 186061,
					position: 6,
					name: "Foki",
					url: "http://fokis.se",
					image: "",
					ranking: 0
					},
					{
					visitors: 164272,
					position: 7,
					name: "Carolina Gynning",
					url: "http://gynning.net/",
					image: "",
					ranking: 4
					},
					{
					visitors: 163707,
					position: 8,
					name: "Hugo Rosas The Challenge Boy",
				url: "http://www.hugorosas.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 149398,
				position: 9,
				name: "ISABELLE STRÖMBERG",
				url: "http://isabelles.nu/",
				image: "",
				ranking: 4
				},
				{
				visitors: 128033,
				position: 10,
				name: "Widerstedt",
				url: "http://www.widerstedt.com",
				image: "",
				ranking: 4
				},
				{
				visitors: 126783,
				position: 11,
				name: "Hotgossips.se - Sveriges största skvallerblogg",
				url: "http://Hotgossips.se",
				image: "",
				ranking: 2
				},
				{
				visitors: 124343,
				position: 12,
				name: "UNDERBARACLARA",
				url: "http://underbaraclaras.com",
				image: "",
				ranking: 2
				},
				{
				visitors: 120301,
				position: 13,
				name: "Egoinas Värld",
				url: "http://egoinas.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 105798,
				position: 14,
				name: "niotillfem",
				url: "http://rodeo.net/niotillfem/",
				image: "",
				ranking: 11
				},
				{
				visitors: 101859,
				position: 15,
				name: "HOUSE of PHILIA",
				url: "http://houseofphilia.blogspot.com",
				image: "",
				ranking: 0
				},
				{
				visitors: 95592,
				position: 16,
				name: "Tyra Sjöstedt och Darios Blogg",
				url: "http://darios.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 94283,
				position: 17,
				name: "Victoria Törnegren",
				url: "http://victoriatornegren.devote.se",
				image: "",
				ranking: 3
				},
				{
				visitors: 93018,
				position: 18,
				name: "Kostdoktorn",
				url: "http://www.kostdoktorn.se",
				image: "",
				ranking: 3
				},
				{
				visitors: 88747,
				position: 19,
				name: "MATPLATSEN",
				url: "http://www.bloggfamiljen.se/matplatsen",
				image: "",
				ranking: 8
				},
				{
				visitors: 82729,
				position: 20,
				name: "Camilla Gervide - Sveriges bästa musikblogg",
				url: "www.camillagervide.com",
				image: "",
				ranking: 2
				},
				{
				visitors: 76577,
				position: 21,
				name: "Engla´s Showroom",
				url: "http://englasshowroom.com",
				image: "",
				ranking: 0
				},
				{
				visitors: 71646,
				position: 22,
				name: "Theclassyissue",
				url: "http://theclassyissue.com/",
				image: "",
				ranking: 0
				},
				{
				visitors: 70009,
				position: 23,
				name: "shapemeup.se",
				url: "http://shapemeup.se",
				image: "",
				ranking: 2
				},
				{
				visitors: 65379,
				position: 24,
				name: "HanaPee",
				url: "http://hanapee.com",
				image: "",
				ranking: 2
				},
				{
				visitors: 60928,
				position: 25,
				name: "SKVALLERBLOGGENS.SE - Skvaller om storbloggarna",
				url: "http://skvallerbloggens.se",
				image: "",
				ranking: 2
				},
				{
				visitors: 53728,
				position: 26,
				name: "MMAnytt",
				url: "http://mmanytt.se",
				image: "",
				ranking: 6
				},
				{
				visitors: 53195,
				position: 27,
				name: "Passion 4 baking",
				url: "http://www.passionforbaking.com",
				image: "",
				ranking: 0
				},
				{
				visitors: 51752,
				position: 28,
				name: "Elvabarnsmamman...och hennes smått kaotiska liv",
				url: "http://blogg.loppi.se/elvabarnsmamman/",
				image: "",
				ranking: 0
				},
				{
				visitors: 50620,
				position: 29,
				name: "Skolarbete",
				url: "http://skolarbete.nu",
				image: "",
				ranking: 0
				},
				{
				visitors: 49865,
				position: 30,
				name: "LADY DAHMER | postpatriarkal feministfitta",
				url: "http://ladydahmer.se/",
				image: "",
				ranking: 13
				},
				{
				visitors: 49201,
				position: 31,
				name: "Bloggkommentatorerna",
				url: "http://stureplan.se/bloggar/bloggkommentatorerna",
				image: "",
				ranking: 2
				},
				{
				visitors: 48320,
				position: 32,
				name: "Utsidan räknas, insidan avgör",
				url: "http://annicas.spotlife.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 47906,
				position: 33,
				name: "Spiderchick",
				url: "http://spiderchick.nu",
				image: "",
				ranking: 28
				},
				{
				visitors: 47526,
				position: 34,
				name: "Fashion Squad",
				url: "http://www.fashionsquad.com",
				image: "",
				ranking: 0
				},
				{
				visitors: 44329,
				position: 35,
				name: "Jennys Matblogg",
				url: "http://minbebis.com/blogg/jennysmatblogg/",
				image: "",
				ranking: 0
				},
				{
				visitors: 42939,
				position: 36,
				name: "Elaine Eksvärd - Snacka Snyggt!",
				url: "http://www.elaineeksvard.se/blog",
				image: "",
				ranking: 6
				},
				{
				visitors: 42228,
				position: 37,
				name: "Rebecca Simonsson",
				url: "http://stureplan.se/bloggar/rebecca",
				image: "",
				ranking: 0
				},
				{
				visitors: 40728,
				position: 38,
				name: "dressyrmupparna",
				url: "http://dressyrmupparna.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 39637,
				position: 39,
				name: "Sarah Tjulander",
				url: "http://sarahtjulander.myshowroom.se/",
				image: "",
				ranking: 0
				},
				{
				visitors: 38922,
				position: 40,
				name: "hdbrainstorm",
				url: "http://hdbrainstorm.blogg.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 38795,
				position: 41,
				name: "MAKE REAL MONEY",
				url: "http://makerealmoney.blogg.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 37956,
				position: 42,
				name: "Hanna Johansson",
				url: "http://www.finest.se/hanna",
				image: "",
				ranking: 0
				},
				{
				visitors: 36143,
				position: 43,
				name: "Ponnysanning",
				url: "http://ponnysanning.se",
				image: "",
				ranking: 2
				},
				{
				visitors: 35495,
				position: 44,
				name: "Lilio - En galen blondins blogg.",
				url: "http://littledolly.blogg.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 35181,
				position: 45,
				name: "En liten del av mitt liv av Gia-Angelina",
				url: "http://gia-angelina.blogspot.se/",
				image: "",
				ranking: 2
				},
				{
				visitors: 33857,
				position: 46,
				name: "56kilo.se",
				url: "http://www.alltforforaldrar.se/56kilo/",
				image: "",
				ranking: 5
				},
				{
				visitors: 33754,
				position: 47,
				name: "Falkvinge & Co. on Infopolicy",
				url: "http://falkvinge.net/",
				image: "",
				ranking: 0
				},
				{
				visitors: 33220,
				position: 48,
				name: "It's me your Danu",
				url: "http://itsmeyourdani.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 33092,
				position: 49,
				name: "Shopping and fashion",
				url: "http://shoppingandfashion.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 33062,
				position: 50,
				name: "BarbaMamman",
				url: "http://minbebis.com/blogg/barbamamman/",
				image: "",
				ranking: 0
				},
				{
				visitors: 32285,
				position: 51,
				name: "Mogi by Malin Richardson",
				url: "http://www.mogis.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 30302,
				position: 52,
				name: "Colorelle.se",
				url: "http://colorelle.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 30252,
				position: 53,
				name: "Tinkerbella - foto, stil & personligt",
				url: "http://tinkerbella.blogg.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 29766,
				position: 54,
				name: "CHEZ LARSSON",
				url: "http://www.chezlarsson.com",
				image: "",
				ranking: 0
				},
				{
				visitors: 29136,
				position: 55,
				name: "GRAHNSFASHION",
				url: "http://blogg.veckorevyn.com/fridagrahn/",
				image: "",
				ranking: 0
				},
				{
				visitors: 29053,
				position: 56,
				name: "SvenskaBloggare",
				url: "http://www.nattstad.se/SvenskaBloggare",
				image: "",
				ranking: 2
				},
				{
				visitors: 28530,
				position: 57,
				name: "beatas.se",
				url: "http://beatas.se",
				image: "",
				ranking: 4
				},
				{
				visitors: 27497,
				position: 58,
				name: "Svenska Lyrics",
				url: "http://svenskalyrics.se/",
				image: "",
				ranking: 0
				},
				{
				visitors: 26615,
				position: 59,
				name: "Why So Serious av Marcelo ",
				url: "http://Marcelo.spotlife.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 25899,
				position: 60,
				name: "Caty",
				url: "http://caty.nu",
				image: "",
				ranking: 0
				},
				{
				visitors: 25766,
				position: 61,
				name: "Fototips",
				url: "http://kameratrollet.se/blogg",
				image: "",
				ranking: 0
				},
				{
				visitors: 25095,
				position: 62,
				name: "Sara Jönsson",
				url: "http://sassys.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 25071,
				position: 63,
				name: "Linda (fd Rosing) Thelenius - Alla Mina Jag",
				url: "http://lindathelenius.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 23576,
				position: 64,
				name: "Kryddburken",
				url: "http://kryddburken.se",
				image: "",
				ranking: 7
				},
				{
				visitors: 23151,
				position: 65,
				name: "Fanny Staaf",
				url: "http://fannystaaf.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 21753,
				position: 66,
				name: "Söta saker",
				url: "http://sotasaker.com",
				image: "",
				ranking: 34
				},
				{
				visitors: 21464,
				position: 67,
				name: "This Is Not Porn",
				url: "http://www.thisisnotporn.net/",
				image: "",
				ranking: 0
				},
				{
				visitors: 21394,
				position: 68,
				name: "Gizmolinas",
				url: "http://gizmolina.com",
				image: "",
				ranking: 0
				},
				{
				visitors: 20772,
				position: 69,
				name: "Viras",
				url: "http://www.werun.se/viras",
				image: "",
				ranking: 0
				},
				{
				visitors: 20306,
				position: 70,
				name: "Classes blogg",
				url: "http://classe-kinzakenza.blogspot.com/",
				image: "",
				ranking: 0
				},
				{
				visitors: 20106,
				position: 71,
				name: "Arga Klara - En annorlunda syn på världen",
				url: "http://argaklara.com/",
				image: "",
				ranking: 4
				},
				{
				visitors: 19591,
				position: 72,
				name: "MALENAMI.COM",
				url: "http://www.malenami.com",
				image: "",
				ranking: 0
				},
				{
				visitors: 18596,
				position: 73,
				name: "Sharps.se",
				url: "http://www.sharps.se/blog",
				image: "",
				ranking: 0
				},
				{
				visitors: 17374,
				position: 74,
				name: "Happily Ever After",
				url: "http://www.happilyeverafter.se/",
				image: "",
				ranking: 0
				},
				{
				visitors: 17077,
				position: 75,
				name: "Mama´s got the magic",
				url: "http://linnjung.com",
				image: "",
				ranking: 9
				},
				{
				visitors: 17043,
				position: 76,
				name: "Smaljeansen!",
				url: "http://smaljeansen.blogspot.com",
				image: "",
				ranking: 0
				},
				{
				visitors: 16950,
				position: 77,
				name: "Helt Enkelt",
				url: "http://www.heltenkelthosmig.blogspot.com",
				image: "",
				ranking: 0
				},
				{
				visitors: 16774,
				position: 78,
				name: "Johannaeo - mode, skönhet och träning",
				url: "http://johannaeo.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 16172,
				position: 79,
				name: "Shop-a-holic mom on a sugar rush",
				url: "http://bambi.alltforforaldrar.se/",
				image: "",
				ranking: 15
				},
				{
				visitors: 16105,
				position: 80,
				name: "Bara ben på Glenn Hysén",
				url: "http://www.baraben.com",
				image: "",
				ranking: 0
				},
				{
				visitors: 15952,
				position: 81,
				name: "Sonjas Erotik",
				url: "http://sonjabengtsson.se/orgasm/",
				image: "",
				ranking: 0
				},
				{
				visitors: 15678,
				position: 82,
				name: "Decadent Lifestyle",
				url: "http://www.decadentlifestyle.net/",
				image: "",
				ranking: 0
				},
				{
				visitors: 15201,
				position: 83,
				name: "Madeleine - Mamma - Foto - Oslo",
				url: "http://madeleines.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 14411,
				position: 84,
				name: "Summer Öppen om sex och porr",
				url: "http://www.summerglamourmodell.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 13728,
				position: 85,
				name: "IDA WARG - BÄSTA TRÄNINGSBLOGGEN!",
				url: "http://idawargs.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 13651,
				position: 86,
				name: "Träningslära",
				url: "http://traningslara.se/blogg",
				image: "",
				ranking: 0
				},
				{
				visitors: 13351,
				position: 87,
				name: "Dragskott.nu",
				url: "http://www.dragskott.blogspot.com",
				image: "",
				ranking: 0
				},
				{
				visitors: 13203,
				position: 88,
				name: "Murderotic's blog",
				url: "http://www.murderotic.com/",
				image: "",
				ranking: 4
				},
				{
				visitors: 13184,
				position: 89,
				name: "Knivlisa",
				url: "http://knivlisa.devote.se",
				image: "",
				ranking: 2
				},
				{
				visitors: 12989,
				position: 90,
				name: "JUENNIFER",
				url: "http://juennifer.com",
				image: "",
				ranking: 0
				},
				{
				visitors: 12792,
				position: 91,
				name: "Dumles Dagbok",
				url: "http://dumlesdagbok.blogg.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 12517,
				position: 92,
				name: "Wiseman's Wisdoms",
				url: "http://wisemanswisdoms.blogspot.com",
				image: "",
				ranking: 4
				},
				{
				visitors: 12494,
				position: 93,
				name: "Viktor Frisk - En modeblogg",
				url: "http://www.viktorfrisk.com",
				image: "",
				ranking: 0
				},
				{
				visitors: 12427,
				position: 94,
				name: "Fyra årstider - mitt liv på landet",
				url: "http://www.mittlivplandet.blogspot.com",
				image: "",
				ranking: 0
				},
				{
				visitors: 12402,
				position: 95,
				name: "KAKKAKAFFE",
				url: "http://kakkakaffe.com",
				image: "",
				ranking: 9
				},
				{
				visitors: 12284,
				position: 96,
				name: "Denize - Ensam morsa till E&E i Spanien - Foto",
				url: "http://dempaz.blogg.se",
				image: "",
				ranking: 0
				},
				{
				visitors: 12015,
				position: 97,
				name: "Doktor Dahlqvists blogg",
				url: "http://annikadahlqvist.com/",
				image: "",
				ranking: 4
				},
				{
				visitors: 11838,
				position: 98,
				name: "Byfia - fashion, photos, life and dreams",
				url: "http://byfia.com",
				image: "",
				ranking: 0
				},
				{
				visitors: 11648,
				position: 99,
				name: "MITT VITA HUS",
				url: "http://mittvitahus.blogspot.com",
				image: "",
				ranking: 0
				},
				{
				visitors: 11606,
				position: 100,
				name: "- It's a house -",
				url: "http://www.itsahouse.blogspot.com",
				image: "",
				ranking: 2
				}
	];
};


function specifiedObject(){
		//värden som används i plottarna
		this.ranking = null;
		this.visitors = null;
		this.blogCount = null;
		this.inlinks = null;
		
		//anävds som label
		this.Url = null;
		this.title = null;
		
		this.jsonUrl = null;
		this.shortName = null;		
		
		this.url1 = null;
		this.url2 = null;
		
		//this.jsonUrl = "http://www.twingly.com/search.json?q=blog%3A"+ this.shortName +"+type%3Awebsite";

	this.setshortUserUrl = function(u){
		this.Url = u;
		//var shortUserUrl;
			if(u.substring(0,3) == "www."){
				shortUserUrl = u.substring(4,u.length);
			}
			else if(u.substring(0,7) == "http://")
			{
				shortUserUrl = u.substring(7,u.length);
			}
			else if(u.substring(0,10) == 'http://www.'){
				shortUserUrl = u.substring(11,u.length);
			}
			else{
				shortUserUrl = u;
			}
		this.shortName = shortUserUrl;
		return shortUserUrl;
	};
	
	
	
};


		






