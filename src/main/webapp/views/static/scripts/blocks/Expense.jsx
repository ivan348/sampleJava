define(function(require){
	var React = require('react');
	var actions = require('actions/actions');
	var {Col, Button, Input, Row} = require('react-bootstrap');
	return React.createClass({
		mixins: [
			React.addons.LinkedStateMixin
		],
		getInitialState: function(){
			return {
				editing: false,
				expense: {
					id: 0,
					name: "",
					value: 0
				}
			}
		},
		componentDidMount: function(){
			this.setState({
				expense: {
					id: this.props.id,
					name: this.props.name,
					value: this.props.value					
				}
			})
		},
		handleClick: function(){
			this.setState({
				editing: !this.state.editing
			})
		},
		remove: function() {
			actions.deleteExpense(this.state.expense);
		},
		// changeName: function(){
		// 	this.setState({
		// 		name: 
		// 	})
		// },
		// changeValue: function(){
		// 	this.setState({
		// 		value: 
		// 	})
		// },
		save: function(){
			var expense = {
				name: this.refs.name.getValue(),
				value: this.refs.value.getValue()
			};
			this.setState({
				expense: expense
			});
			actions.editExpense(expense);
			this.handleClick();
		},
		render: function(){
			console.log(this.linkState('expense'))
			var form = this.state.editing ? <div>	
					<i className="fa fa-times pointer" onClick={this.remove}></i>
					<Col xs={6} className="expense-item">
						<Input type="text" ref="name" valueLink={this.linkState('expense.name')}/>
					</Col>
					<Col xs={6} className="expense-item">
						<Input type="text" ref="value" defaultValue={this.state.expense.value}/>
					</Col>
					<Button bsStyle="primary" onClick={this.save}>
						Save
					</Button>
				</div> : <div>
					<Col xs={6} className="expense-item">
						<p>{this.state.expense.name}</p>
					</Col>
					<Col xs={6} className="expense-item">
						<p>{this.state.expense.value}</p>
					</Col>
					<i className="fa fa-pencil-square-o pointer" onClick={this.handleClick}></i>
				</div>
			return <div>
				{form}	
			</div>
		}
	})
})