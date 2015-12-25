define(function(require) {
	var React = require("react");
	var Reflux = require("reflux");
	var Chartist = require("chartist");
	var highcharts = require("highcharts");
	var Stat = require("stores/Stat");
	var actions = require("actions/actions");
	var {Col} = require("react-bootstrap");
	return React.createClass({
		mixins: [
			Reflux.connect(Stat, "stat")
		],
		getInitialState: function() {
			return {
				width : 100 ,
				height : 100,
				stat: []
			};
		},
		componentDidMount: function() {
			actions.getStat("BYR");
		},
		render: function() {	
			console.log(this.state.stat);
			$('#high').highcharts({
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false,
		            type: 'pie'
		        },
		        title: {
		            text: 'Expense statisctics'
		        },
		        tooltip: {
		            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                    style: {
		                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                    }
		                }
		            }
		        },
		        series: [{
		            name: "Expense",
		            colorByPoint: true,
		            data: this.state.stat
		        }]
		    });		
			return (
				<div className="statitics">
					<Col xs={6} id="high" width={this.state.width + "px"} height={this.state.height + "px"}></Col>
				</div>
			);
		}
	});
})