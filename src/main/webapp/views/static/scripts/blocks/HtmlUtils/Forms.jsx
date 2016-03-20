define(["react", "jquery", "react-bootstrap", "datetimepicker"], function (React, $, {Col, Button, Input, Row, Modal}) {

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
				"select": <Input type='select' name={this.props.name} defaultValue={this.props.value.id || this.props.value} onChange={this.props.onChange}>
				 	{this.props.options}
				</Input>,
				"text": <Input type="text" name={this.props.name} 
				 onChange={this.props.onChange} value={this.props.value}/>,
				"date": <DatePicker type="text" name={this.props.name} value={this.props.value}
				 onClick={this.props.onClick} format="YYYY-MM-DD"/>
			}
			return <span> 	
				{this.props.editing
				? inputMap[this.props.type] 
				: this.props.value.name || this.props.value}
				</span>
		}
	});


	var LabeledInput = React.createClass({
		render: function () {
			var optionsMap = {
				"select": <Input type={this.props.type} valueLink={this.props.value}>
					{this.props.options}
				</Input>,
				"text": <Input onClick={this.props.onClick} name={this.props.name} type={this.props.type} valueLink={this.props.value}/>,
				"date": <DatePicker type="text" name={this.props.name} value={this.props.value}
				 onClick={this.props.onClick} format="YYYY-MM-DD"/>
			}
			return  <span>
			  	<label htmlFor={this.props.name}>{this.props.caption}</label>
			  	{optionsMap[this.props.type]}
			</span>
		}
	});

	var mapOptions = function(arr, name, value) {
		var res = arr.map(function(item){
			return <option key={item[value] || item} value={item[value] || item}>{item[name] || item}</option>
		});
		res.splice(0, 0, <option key="-1" disabled>--</option>);
		return res;
	};

	return {
		DatePicker: DatePicker,
		EditableValue: EditableValue,
		LabeledInput: LabeledInput,
		mapOptions: mapOptions
	}

});
