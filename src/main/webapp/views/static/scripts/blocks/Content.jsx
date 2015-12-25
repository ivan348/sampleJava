define(function(require){
	var React = require("react");
	var Reflux = require("reflux")
	var apiCall = require("helpers/http");
	var {Input, Button, Col} = require("react-bootstrap");
	var Expenses = require("stores/Expenses");
	var actions = require("actions/actions");
	var Expense = function(data){
				return <Col xs={12}>
					this.state.editing ? <div>
						<Input type="text" value={this.props.name}/>
						<Button bsStyle= "primary" onClick={this.handleClick}>
							Save
						</Button>
					</div> : <div>
						<h3>{this.props.name}</h3>
						<Button bsStyle= "primary" onClick={this.handleClick}>
							Edit
						</Button>
					</div>
				</Col>
	}
	return React.createClass({
		mixins: [ 
			React.addons.LinkedStateMixin,
			Reflux.connect(Expenses)
		],
		handleChange: function(){
			console.log(this.refs.title.getValue());
		},
		handleClick: function(){
			actions.addExpense(this.refs.title.getValue());
		},
		// expenses: this.state.
		render: function(){
			return <div>
				<Input ref="title" type="text" onChange={this.handleChange}/>
				<Button onClick={this.handleClick}>Add</Button>
				<Expense name="title"/>
				</div>
		}
	})
})