function getTimeData(){
	var timeData = [
					{ "accessDate": "2006", "visitors": 1189882, "avgDayVisitors": 3259, "avgMonthVisitors": 99156.833333333328 },
					{ "accessDate": "2007", "visitors": 1189882, "avgDayVisitors": 3259, "avgMonthVisitors": 99156.833333333328 },
					{"accessDate": "2008", "visitors": 13847197, "avgDayVisitors": 37937, "avgMonthVisitors": 1153933.0833333333},
					{"accessDate": "2009", "visitors": 30851277, "avgDayVisitors": 84524, "avgMonthVisitors": 2570939.75},
					{"accessDate": "2010", "visitors": 51612998, "avgDayVisitors": 141405, "avgMonthVisitors": 4301083.166666667},
					{"accessDate": "2011", "visitors": 61538639, "avgDayVisitors": 168599, "avgMonthVisitors": 5128219.916666667},
					{"accessDate": "2012", "visitors": 53013866, "avgDayVisitors": 145243, "avgMonthVisitors": 4417822.166666667},
					{"accessDate": "201201", "visitors": 5175703, "avgDayVisitors": 166958, "avgMonthVisitors": 5175703.0},
					{"accessDate": "201202", "visitors": 4927842, "avgDayVisitors": 169925, "avgMonthVisitors": 4927842.0},
					{"accessDate": "201203", "visitors": 5757011, "avgDayVisitors": 185710, "avgMonthVisitors": 5757011.0},
					{"accessDate": "201204", "visitors": 5535291, "avgDayVisitors": 184509, "avgMonthVisitors": 5535291.0},
					{"accessDate": "201205", "visitors": 5703677, "avgDayVisitors": 183989, "avgMonthVisitors": 5703677.0},
					{"accessDate": "201206", "visitors": 5313628, "avgDayVisitors": 177120, "avgMonthVisitors": 5313628.0},
					{"accessDate": "201207", "visitors": 4836920, "avgDayVisitors": 156029, "avgMonthVisitors": 4836920.0},
					{"accessDate": "201208", "visitors": 4970823, "avgDayVisitors": 160349, "avgMonthVisitors": 4970823.0},
					{"accessDate": "201209", "visitors": 5235426, "avgDayVisitors": 174514, "avgMonthVisitors": 5235426.0},
					{"accessDate": "201210", "visitors": 5383378, "avgDayVisitors": 173657, "avgMonthVisitors": 5383378.0},
					{"accessDate": "201211", "visitors": 5130473, "avgDayVisitors": 171015, "avgMonthVisitors": 5130473},
					{"accessDate": "201212", "visitors": 1618784, "avgDayVisitors": 52218, "avgMonthVisitors": 1618784.0},
					{"accessDate": "2012-11-11", "visitors": 196880, "avgDayVisitors": 196880, "avgMonthVisitors": 5906400.0},
					{"accessDate": "2012-11-12", "visitors": 185053, "avgDayVisitors": 185053, "avgMonthVisitors": 5551590.0},
					{"accessDate": "2012-11-13", "visitors": 179676, "avgDayVisitors": 179676, "avgMonthVisitors": 5390280.0},
					{"accessDate": "2012-11-14", "visitors": 175508, "avgDayVisitors": 175508, "avgMonthVisitors": 5265240.0},
					{"accessDate": "2012-11-15", "visitors": 171652, "avgDayVisitors": 171652, "avgMonthVisitors": 5149560.0},
					{"accessDate": "2012-11-16", "visitors": 153903, "avgDayVisitors": 153903, "avgMonthVisitors": 4617090.0},
					{"accessDate": "2012-11-17", "visitors": 164287, "avgDayVisitors": 164287, "avgMonthVisitors": 4928610.0},
					{"accessDate": "2012-11-18", "visitors": 198660, "avgDayVisitors": 198660, "avgMonthVisitors": 5959800.0},
					{"accessDate": "2012-11-19", "visitors": 181514, "avgDayVisitors": 181514, "avgMonthVisitors": 5445420.0},
					{"accessDate": "2012-11-20", "visitors": 174789, "avgDayVisitors": 174789, "avgMonthVisitors": 5243670.0},
					{"accessDate": "2012-11-21", "visitors": 169230, "avgDayVisitors": 169230, "avgMonthVisitors": 5076900.0},
					{"accessDate": "2012-11-22", "visitors": 167766, "avgDayVisitors": 167766, "avgMonthVisitors": 5032980.0},
					{"accessDate": "2012-11-23", "visitors": 150579, "avgDayVisitors": 150579, "avgMonthVisitors": 4517370.0},
					{"accessDate": "2012-11-24", "visitors": 152336, "avgDayVisitors": 152336, "avgMonthVisitors": 4570080.0},
					{"accessDate": "2012-11-25", "visitors": 154044, "avgDayVisitors": 154044, "avgMonthVisitors": 4621320.0},
					{"accessDate": "2012-11-26", "visitors": 178648, "avgDayVisitors": 178648, "avgMonthVisitors": 5359440.0},
					{"accessDate": "2012-11-27", "visitors": 167351, "avgDayVisitors": 167351, "avgMonthVisitors": 5020530.0},
					{"accessDate": "2012-11-28", "visitors": 168808, "avgDayVisitors": 168808, "avgMonthVisitors": 5064240.0},
					{"accessDate": "2012-11-29", "visitors": 168072, "avgDayVisitors": 168072, "avgMonthVisitors": 5042160.0},
					{"accessDate": "2012-11-30", "visitors": 148535, "avgDayVisitors": 148535, "avgMonthVisitors": 4456050.0},
					{"accessDate": "2012-12-01", "visitors": 153061, "avgDayVisitors": 153061, "avgMonthVisitors": 4744891.0},
					{"accessDate": "2012-12-02", "visitors": 187715, "avgDayVisitors": 187715, "avgMonthVisitors": 5819165.0},
					{"accessDate": "2012-12-03", "visitors": 177077, "avgDayVisitors": 177077, "avgMonthVisitors": 5489387.0},
					{"accessDate": "2012-12-04", "visitors": 178070, "avgDayVisitors": 178070, "avgMonthVisitors": 5520170.0},
					{"accessDate": "2012-12-05", "visitors": 174949, "avgDayVisitors": 174949, "avgMonthVisitors": 5423419.0},
					{"accessDate": "2012-12-06", "visitors": 163857, "avgDayVisitors": 163857, "avgMonthVisitors": 5079567.0},
					{"accessDate": "2012-12-07", "visitors": 155584, "avgDayVisitors": 155584, "avgMonthVisitors": 4823104.0},
					{"accessDate": "2012-12-08", "visitors": 156593, "avgDayVisitors": 156593, "avgMonthVisitors": 4854383.0},
					{"accessDate": "2012-12-09", "visitors": 190567, "avgDayVisitors": 190567, "avgMonthVisitors": 5907577.0},
					{"accessDate": "2012-12-10", "visitors": 81311, "avgDayVisitors": 81311, "avgMonthVisitors": 2520641.0}
	];
	return timeData;
}
