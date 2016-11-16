var margin = {top: 20, right: 10, bottom:100, left: 40},
//Chose values for space at the bottom and left for title of y axis and words at x axis
	width = 700 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom;
	//'g' element is used as a container for grouping objects
	
	//SVG = Scalable Vector Graphics
 var svg = d3.select('body')
 	.append('svg')
 	.attr ({
 		//this gives the SVG the area it has to work in
 		"width": width + margin.right + margin.left,
 		"height": height + margin.top + margin.bottom
 	})
 		.append("g")
 			.attr("transform", "translate(" + margin.left + ',' + margin.right + ')');


//defines the x and y scales
var xScale = d3.scaleOrdinal()
//Ordinal scales have a discrete domain such as the domain being a string instead of a number. We use this here because the x axis will hold the country names
	.rangeRoundBands([0,width], 0.2, 0.2);
//Quantitative scales have a continuous domain
var yScale = d3.scaleLinear
	.range([height, 0]); 
//------------------------------------------------
	//defines axis
var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(yScale)
	.orient("left");

//-------------------------------------------------
//HERE WE ARE IMPORTING THE DATA FROM THE .csv file 
//A CSV is a comma separated values file, which allows data to be saved in a table structured format
d3.dsv("gdp.csv", function(error, data){
	if(error){
		console.log("Error: data did not load");
	}
	data.forEach(function(d){
		d.gdp = +d.gdp;
		d.country = d.country;
		console.log(d.gdp);
	})
	data.sort(function(a,b){
		return b.gdp - a.gdp;
	})

	//specify the domains of the x and y scales
	xScale.domain(data.map(function(d) {
		return d.country}) );
	yScale.domain([0, d3.max(data, function(d){ return d.gdp}) ] );

	//draw the bars
	svg.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr ({
			"x":function (d) {return xScale(d.country); },
			"y": function(d) {return yScale(d.gdp); 
				},
			"width" : xScale.rangeBand(),
			"height": function(d) { return height - yScale(d.gdp)}
		})
});

