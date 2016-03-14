define(function(require){
	var React = require('react');
	var actions = require('actions/actions');
	var {Col, Button, Input, Row, Modal} = require('react-bootstrap');
	var $ = require("jquery");
	var {DatePicker} = require("jsx!../HtmlUtils/Forms");
	require("datetimepicker");
	
	var LabeledInput = React.createClass({
		render: function () {
			var optionsMap = {
				select: <Input type={this.props.type} valueLink={this.props.value}>
						{this.props.options}
					</Input>,
				text: <Input onClick={this.props.onClick} name={this.props.name} type={this.props.type} valueLink={this.props.value}/>,
				date: <DatePicker type="text" name={this.props.name} value={this.props.value} onClick={this.props.onClick} format="DD.MM.YYYY"/>
			}
			return  <span>
			  	<label htmlFor={this.props.name}>{this.props.caption}</label>
			  	{optionsMap[this.props.type]}
			</span>
		}
	});
	
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
			return true;
		},
		handleClick: function(val){
			this.setState({
				date: val
			});
		},
		saveNew: function() {
			this.props.save(this.state);
			this.props.close();
		},
		render: function(){ 
			return <Modal show={this.props.showModal} onHide={this.props.close}>
				<Modal.Header closeButton>
					<Modal.Title>Create expense</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col xs={2} className="expense-item"><LabeledInput type="text" caption="Name" name="name" value={this.linkState("name")}/></Col>
						<Col xs={2} className="expense-item"><LabeledInput type="text" caption="Value" name="value" value={this.linkState("value")}/></Col>
						<Col xs={2} className="expense-item"><LabeledInput type="select" caption="Currency" name="currency" value={this.linkState("currency")} options={this.props.currencies}/></Col>
						<Col xs={2} className="expense-item"><LabeledInput type="text" caption="Type" name="type" value={this.linkState("type")}/></Col>
						<Col xs={2} className="expense-item"><LabeledInput type="date" caption="Date" name="date" value={this.state.date} onClick={this.handleClick}/></Col>
						<Col xs={2} className="expense-item"><LabeledInput type="select" caption="Category" name="category" value={this.linkState("category")} options={this.props.categories}/></Col>
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