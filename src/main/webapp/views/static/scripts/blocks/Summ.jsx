define(function(require) {
	var React = require('react');
	var Reflux = require('reflux');
	var Summ = require('stores/Summ');
	var actions = require("actions/actions");
	var _ = require("lodash");
	var {Row, Col, Panel} = require('react-bootstrap');
	return React.createClass({
		mixins: [Reflux.connect(Summ, "result")],
		getInitialState: function() {
			return {
				result : {} 
			};
		},
		render: function() {
			var rows = [];
			_.each(this.state.result, function(item, n){
				rows.push(<Row> {n} : {item}</Row>)
			})
			return (
				<Panel>
					{rows}
				</Panel>
			);
		}
	
	})
})