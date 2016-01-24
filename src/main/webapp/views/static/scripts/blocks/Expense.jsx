define(function(require){
	var React = require('react');
	var actions = require('actions/actions');
	var {Col, Button, Input, Row, Modal} = require('react-bootstrap');
	var $ = require("jquery");
	require("datetimepicker");

	var format = "DD.MM.YYYY";
	
	// var LabeledInput = React.createClass({
	// 	mixins: [
	// 		React.addons.LinkedStateMixin
	// 	],
	// 	propTypes: {
	// 		name: React.PropTypes.string,
	// 		col: React.PropTypes.number
	// 	},
	// 	render: function () {
	// 		return  <Col xs={2} className="expense-item">
	// 		  	<label for={this.props.name}>{this.props.name}</label>
	// 			<Input name={this.props.name} type="text" valueLink={this.props.name}/>
	// 		</Col>
	// 	}
	// });
	
	return React.createClass({
		mixins: [
			React.addons.LinkedStateMixin
		],
		getInitialState: function(){
			return {
				id: "",
				name: "",
				value: "",
				date: "",
				currency: "",
				type: "",
				category: ""
			}
		},
		componentDidMount() {
		},
		shouldComponentUpdate(nextProps, nextState) {
			console.log(1, this.state);
			console.log(2,nextState);
			return true;
		},
		handleClick: function(e){
			var that = this;
			var el = $(e.currentTarget);
			if (!el.data("DateTimePicker")) {
				el.datetimepicker({
					keepOpen: false,
					format: format
				});
			}
			el.data("DateTimePicker").show();
			el.on("dp.change", function () {
				that.setState({
					date: el.val()
				});
			})
		},
		saveNew: function() {
			this.props.save(this.state);
		},
		render: function(){ 
			return <Modal show={this.props.showModal} onHide={this.props.close}>
				<Modal.Header closeButton>
					<Modal.Title>Create expense</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col xs={2} className="expense-item"><Input type="text" valueLink={this.linkState("name")}/></Col>
						<Col xs={2} className="expense-item"><Input type="text" valueLink={this.linkState("value")}/></Col>
						<Col xs={2} className="expense-item"><Input type="text" valueLink={this.linkState("currency")}/></Col>
						<Col xs={2} className="expense-item"><Input type="text" valueLink={this.linkState("type")}/></Col>
						<Col xs={2} className="expense-item"><Input id="date" type="text" onClick={this.handleClick}/></Col>
						<Col xs={2} className="expense-item"><Input type='select' >{this.props.categories}</Input></Col>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.saveNew}>Create</Button>
					<Button onClick={this.props.close}>Close</Button>
				</Modal.Footer>
	        </Modal>
		}
	})
})