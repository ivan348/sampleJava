define(["react", "jquery", "react-bootstrap"], function (React, $, {Col, Button, Input, Row, Modal}) {

	var DatePicker = React.createClass({
		handleClick: function (e) {
			var that = this;
			var el = $(e.currentTarget);
			if (!el.data("DateTimePicker")) {
				el.datetimepicker({
					keepOpen: false,
					format: this.props.format
				});
			}
			el.data("DateTimePicker").show();
			el.on("dp.change", function () {
				that.props.onClick(el.val());
			})
		},
		render: function () {
			return <Input onClick={this.handleClick} name={this.props.name} type={this.props.type} defaultValue={this.props.value}/>
		}
	});

	var EditableValue = React.createClass({
		render: function () {		
			var inputMap = {
				"select": <Input type='select'
				defaultValue={this.props.value} onChange={this.props.onChange}>{this.props.options}</Input>,
				"text": <Input type="text" name={this.props.name} 
				onChange={this.props.onChange} value={this.props.value}/>,
				"date": <DatePicker type="text" name={this.props.name} value={this.props.value}
				 onClick={this.props.onClick} format="YYYY-MM-DD"/>
			}
			return <span> 	
				{this.props.editing
				? inputMap[this.props.type] 
				: this.props.value}
				</span>
		}
	})

	return {
		DatePicker: DatePicker,
		EditableValue: EditableValue
	}

});
