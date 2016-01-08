define(["react",
	"reflux",
	"stores/Summ",
	"actions/actions",
	"lodash",
	"react-bootstrap"],function(React,
		Reflux,
		Summ,
		actions,
		_,
		{Row, Col, Panel}) {
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
				rows.push(<Row> {item.currency} : {item.sum}</Row>)
			})
			return (
				<Panel>
					{rows}
				</Panel>
			);
		}
	
	})
})