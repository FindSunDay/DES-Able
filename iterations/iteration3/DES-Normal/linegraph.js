// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 530 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#line_graph")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//function draw(){
//	
//	svg.selectAll('*').remove();
	
//Read the data
d3.csv("./resources/DES_PERFORMANCE_NUMERICAL.csv", function(data) {

	data.forEach(function(d) {
			d.Year_Month = new Date(d.Year_Month);
	});

	// group the data: I want to draw one line per group
	  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
		.key(function(d) { return d.Year;})
		.entries(data);

	// List of groups (here I have one group per column)
	var allGroup = []
	allGroup = d3.map(data, function(d){return(d.Year)}).keys()
//		console.log(allGroup)

	// add the options to the button
	d3.select("#selectButton")
	  .selectAll('myOptions')
		.data(allGroup)
	  .enter()
		.append('option')
	  .text(function (d) { return d; }) // text showed in the menu
	  .attr("value", function (d) { return d; }) // corresponding value returned by the button

	// A color scale: one color for each group
	var myColor = d3.scaleOrdinal()
	  .domain(allGroup)
	  .range(d3.schemeSet2);

	function draw(){
		svg.selectAll('*').remove();
		var x = d3.scaleLinear()
		.domain(d3.extent(data, function(d) { return d.Year_Month.getMonth()+1; }))
	//	var x = d3.scaleBand()
	//  	.domain(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'])
		.range([ 0, width ]);
	  svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x)
			  .ticks(5)
			 );

	  // Add Y axis
	  var y = d3.scaleLinear()
		.domain([140000, d3.max(data, function(d) { return +d.Total; })])
		.range([ height, 0 ]);
	  svg.append("g")
		.call(d3.axisLeft(y));

		// Initialize line with first group of the list
		function init_line(){
			var line = svg.selectAll(".line")
					  .data(sumstat)
					  .enter()
					  .append("path")
						.attr("fill", "none")
						.attr("stroke", function(d){ return myColor(d.key) })
						.attr("stroke-width", 4)
						.attr("d", function(d){
		//					console.log(d);
						  return d3.line()
							.x(function(d) { 
				//			  				console.log(d.Year_Month.getMonth());
											return x(d.Year_Month.getMonth()+1); 
				//			  				return x('Feb')
				//			  				return x(d.Month); 
											})
							.y(function(d) { return y(+d.Total); })
							(d.values)
						})
			return line;
		}
		var line = init_line();
	//    var line = svg
	//      .append('g')
	//      .append("path")
	//        .datum(data.filter(function(d){return d.Year==allGroup[0]}))
	//        .attr("d", d3.line()
	//          .x(function(d) { return x(d.Year_Month.getMonth()+1) })
	//          .y(function(d) { return y(+d.Total) })
	//        )
	//        .attr("stroke", function(d){ return myColor("valueA") })
	//        .style("stroke-width", 4)
	//        .style("fill", "none")

		// A function that update the chart
		function update(selectedGroup) {
			if (selectedGroup == "2011-2020"){
	//			this.svg.selectAll('*').remove();
				// Draw the line

	//		  var dataFilter = sumstat
	////		  line = svg.selectAll(".line")
	////			  .data(sumstat)
	////			  .enter()
	////			  .append("path")
	////				.attr("fill", "none")
	////				.attr("stroke", function(d){ return myColor(d.key) })
	////				.attr("stroke-width", 4)
	//		  line
	//			  .datum(dataFilter)
	//				  .transition()
	//				  .duration(1000)	
	//				.attr("d", function(d){
	////					console.log(d);
	//				  return d3.line()
	//					.x(function(d) { 
	//		//			  				console.log(d.Year_Month.getMonth());
	//									return x(d.Year_Month.getMonth()+1); 
	//		//			  				return x('Feb')
	//		//			  				return x(d.Month); 
	//									})
	//					.y(function(d) { return y(+d.Total); })
	//					(d.values)
	//				})
	//				this.line.selectAll('*').remove();
	//				this.line = init_line();
				draw();
			}
			else {
			  // Create new data with the selection?

	//		  svg.selectAll('path').remove();

			  var dataFilter = data.filter(function(d){return d.Year==selectedGroup})

			  // Give these new data to update line
			  line
				  .datum(dataFilter)
				  .transition()
				  .duration(1000)
				  .attr("d", d3.line()
					.x(function(d) { return x(d.Year_Month.getMonth()+1) })
					.y(function(d) { return y(+d.Total) })
				  )
				  .attr("stroke", function(d){ return myColor(selectedGroup) })
			}
		}

		// When the button is changed, run the updateChart function
		d3.select("#selectButton").on("change", function(d) {
			// recover the option that has been chosen
			var selectedOption = d3.select(this).property("value")
			// run the updateChart function with this selected option
			update(selectedOption)		
		})
	}
	draw()
})
//}

