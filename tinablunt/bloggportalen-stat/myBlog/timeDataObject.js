function timeDataObject(startYear){
    this.startYear = startYear;
	this.ratio = window.innerHeight/window.innerWidth;

	//--------------------------------------max -----------------------------------------------------
	this.max_visits = null;
	this.max_visits_day = null;
	this.max_visits_month = null;
	
	//år
	this.max_tot_vis_y = 0;
	this.max_tot_bp_y = 0;
	this.max_avg_vpb_y = 0;
	this.max_avg_monthVisits_y = 0;
	this.max_avg_monthPosts_y = 0;
	this.ind_tot_vis_y = 0;
	this.ind_tot_bp_y = 0;
	this.ind_avg_vpb_y = 0;
	this.ind_avg_monthVisits_y = 0;
	this.ind_avg_monthPosts_y = 0;
	
	//månad
	this.max_tot_vis_m = 0;
	this.max_tot_bp_m = 0;
	this.max_avg_vpb_m = 0;
	this.max_avg_dayVisits_m = 0;
	this.max_avg_dayPosts_m = 0;
	this.ind_tot_vis_m = 0;
	this.ind_tot_bp_m = 0;
	this.ind_avg_vpb_m = 0;
	this.ind_avg_dayVisits_m = 0;
	this.ind_avg_dayPosts_m = 0;
	
	//dag
	this.max_tot_vis_d = 0;
	this.max_tot_bp_d = 0;
	this.max_avg_vpb_d = 0;
	this.ind_tot_vis_d = 0;
	this.ind_tot_bp_d = 0;
	this.ind_avg_vpb_d = 0;

	
	var currentTime = new Date(2014,12,04);
	this.month = 12;
	this.day = 10;
	if(currentTime.getDate() < 1){
		this.day = 1;
	}
	else{
		this.day = currentTime.getDate();
	}
	this.year = 2012;//currentTime.getFullYear();
	this.lastYear = this.year-1;
	this.shortYear = this.year-2000;
	this.shortLastYear = this.lastYear-2000;
	
	//kollar skottår
	var jamn_delbar = this.year%4;
	if(jamn_delbar == 0){
		var daysPerMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
	}
	else{
		var daysPerMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
	}
	this.daysPerMonth = daysPerMonth;
	this.nrOfYears = this.year-this.startYear+1;
	
	this.showDays = 30;//this.day;
	this.nrOfItems = 12 + this.nrOfYears+this.showDays;
	
	this.months = ["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"];

	this.monthDays = [];
	
	this.selectedIndex = this.nrOfItems-1;
	this.middleIndex = this.selectedIndex;

	
	this.selectedInlinks = null;
	this.selectedVisitors = null;
	this.selectedBlogCount = null;
	
	
	this.getLabelArray = function(){
		var temp = [];
		var j = 0;
		var d = this.day+1 - this.showDays;
		for(i = 0; i<this.nrOfItems;i++){
			//lägger till år
			if(i<this.nrOfYears-1){
				temp[i] = this.year+1-(this.nrOfYears-i);
			}
			else if(i==this.nrOfYears-1){
				temp[i] = "Hittills "+this.year;
			}
			//lägger till måndad för förra året
			else if((i > this.nrOfYears-1) && (i < this.nrOfYears+11-this.month)){
				temp[i] = this.months[i-this.nrOfYears+this.month]+ " " + this.lastYear;
				this.monthDays[i-this.nrOfYears] =  daysPerMonth[i-this.nrOfYears+this.month];
			}
			//lägger till månad för detta år
			else if((i > this.nrOfYears-1) && (i < this.nrOfItems-1-this.showDays)){
					temp[i] = this.months[j] + " " + this.year;
					this.monthDays[i-this.nrOfYears] =  daysPerMonth[j];
					j++;
			}
			else if(i == this.nrOfItems-1-this.showDays){
				temp[i] = "Hittills " + this.months[j];
				this.monthDays[i-this.nrOfYears] =  daysPerMonth[j];
			}
			//lägger till dagar
			else{
				if(d==this.day){
					temp[i] = "Hittills idag"
					d++;
				}
				else if(d==this.day-1){
					temp[i] = "Igår"
					d++;
				}
				else if(d < 1){
					temp[i] = daysPerMonth[j-1] + d + " " + this.months[j-1];
					d++;
				}
				else{
					temp[i] = d + " " + this.months[j];
					d++;
				}
			}
		}
		return temp;
	};
	
	this.getShortMonths = function(){
		var temp = [];
		var j = 0;
		var d =  this.day+1 - this.showDays;
		for(i = 0; i<this.nrOfItems;i++){
			//lägger till år
			if(i<this.nrOfYears){
				temp[i] = this.year-(this.nrOfYears-i);
			}
			//lägger till måndad för förra året
			else if((i > this.nrOfYears-1) && (i < this.nrOfYears+12-this.month)){
				temp[i] = this.months[i-this.nrOfYears+this.month].substring(0,3)+ "-" + this.shortLastYear;
			}
			//lägger till månad för detta år
			else if((i > this.nrOfYears-1) && (i < this.nrOfItems-this.showDays)){
					temp[i] = this.months[j].substring(0,3) + "-" + this.shortYear;
					j++;
			}
			//lägger till dagar
			else{
				if(d==this.day){
					temp[i] = "Idag"
					d++;
				}
				else if(d==this.day-1){
					temp[i] = "Igår"
					d++;
				}
				else if(d < 1){
					temp[i] = daysPerMonth[j-1] + d + " " + this.months[j-1].substring(0,3);
					d++;
				}
				else{
					temp[i] = d + " " + this.months[j].substring(0,3);
					d++;
				}

			}
		}
		return temp;	
	};
};

function observer(){
		

};


