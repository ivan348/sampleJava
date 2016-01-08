define(function(require) {
	var React = require("react"), 
		Reflux = require("reflux"),
		Chartist = require("chartist"),
		highcharts = require("highcharts"),
		Stat = require("stores/Stat"),
		actions = require("actions/actions"),
		backend = require("utils/backend"),
		_ = require("lodash"),
		{Col, Input} = require("react-bootstrap"),
		currencies = [];
	return React.createClass({
		mixins: [
			Reflux.connect(Stat, "stat")
		],
		getInitialState: function() {
			return {
				width : 100 ,
				height : 100,
				stat: [],
				currencies: []
			};
		},
		componentDidMount: function() {
			actions.getStat("BYR");
			backend.getCurrencies(function (res) {
				this.setState({
					currencies: res
				});
			}.bind(this));
		},
		render: function() {
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
		    var currencies = _.map(this.state.currencies, function (item) {
		    	return <option>{item}</option>
		    });	
			return (
				<div className="statitics">
					<select>
						{currencies}
					</select>
					
					<Col xs={6} id="high" width={this.state.width + "px"} height={this.state.height + "px"}></Col>
				</div>
			);
		}
	});
})