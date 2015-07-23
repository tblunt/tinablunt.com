function calculate_max(timeObject,visits,avg_month_visits,avg_day_visits,blog_posts){
							timeObject.max_visits = Math.max.apply(Math, avg_day_visits);
							timeObject.max_visits_day = Math.max.apply(Math, avg_day_visits);
							timeObject.max_visits_month = Math.max.apply(Math, avg_day_visits);
							
							for(i=0;i<timeObject.nrOfItems;i++){
								//år
								if(i<timeObject.nrOfYears){
									//tot besök
									if(visits[i]>timeObject.max_tot_vis_y){
										timeObject.max_tot_vis_y = visits[i];
										timeObject.ind_tot_vis_y = i;
									}//tot inlägg
									if(blog_posts[i].postSum > timeObject.max_tot_bp_y){
										timeObject.max_tot_bp_y = (blog_posts[i].postSum);
										timeObject.ind_tot_bp_y = i;
									}//avg besök per inlägg
									if((visits[i]/blog_posts[i].postSum) > timeObject.max_avg_vpb_y){
										timeObject.max_avg_vpb_y = (visits[i]/blog_posts[i].postSum);
										timeObject.ind_avg_vpb_y = i;
									}//avg besök i månaden
									if(avg_month_visits[i] > timeObject.max_avg_monthVisits_y){
										timeObject.max_avg_monthVisits_y = avg_month_visits[i];
										timeObject.ind_avg_monthVisits_y = i;
									}//avg poster i månaden
									if(blog_posts[i].postSum/12 > timeObject.max_avg_monthPosts_y){
										timeObject.max_avg_monthPosts_y = blog_posts[i].postSum/12;
										timeObject.ind_avg_monthPosts_y = i;
									}
								}//månad
								else if(i>timeObject.nrOfYears-1 && i<timeObject.nrOfItems-timeObject.showDays){
									//tot besök
									if(visits[i]>timeObject.max_tot_vis_m){
										timeObject.max_tot_vis_m = visits[i];
										timeObject.ind_tot_vis_m = i;
									}//tot inlägg
									if(blog_posts[i].postSum > timeObject.max_tot_bp_m){
										timeObject.max_tot_bp_m = (blog_posts[i].postSum);
										timeObject.ind_tot_bp_m = i;
									}//avg besök per inlägg
									if((visits[i]/blog_posts[i].postSum) > timeObject.max_avg_vpb_m){
										timeObject.max_avg_vpb_m = (visits[i]/blog_posts[i].postSum);
										timeObject.ind_avg_vpb_m = i;
									}//avg besök i månaden
									if(avg_day_visits[i] > timeObject.max_avg_dayVisits_m){
										timeObject.max_avg_dayVisits_m = avg_day_visits[i];
										timeObject.ind_avg_dayVisits_m = i;
									}//avg poster i månaden
									if(blog_posts[i].postSum/30 > timeObject.max_avg_dayPosts_m){
										timeObject.max_avg_dayPosts_m = blog_posts[i].postSum/30;
										timeObject.ind_avg_dayPosts_m = i;
									}
								}//dag
								else{
									//tot besök
									if(visits[i]>timeObject.max_tot_vis_d){
										timeObject.max_tot_vis_d = visits[i];
										timeObject.ind_tot_vis_d = i;
									}//tot inlägg
									if(blog_posts[i].postSum > timeObject.max_tot_bp_d){
										timeObject.max_tot_bp_d = (blog_posts[i].postSum);
										timeObject.ind_tot_bp_d = i;
									}//avg besök per inlägg
									if((visits[i]/blog_posts[i].postSum) > timeObject.max_avg_vpb_d){
										timeObject.max_avg_vpb_d = (visits[i]/blog_posts[i].postSum);
										timeObject.ind_avg_vpb_d = i;
									}
								}
							}
			return timeObject;
								
}