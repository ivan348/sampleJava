define(["react",
	"jsx!../HtmlUtils/Forms",
	"react-bootstrap"], function (React, {EditableValue}, {Button}) {
	return React.createClass({
		getInitialState: function() {
		    return {
				editing: false,
				item: {}
		    };
		},
		handleChange: function (e) {
			var el = e.currentTarget;
			var newState = {
				editing: this.state.item
			};
			newState.editing[el.name]= el.value;
			this.setState(newState);
		},
		handleClick: function(val){
			var newState = {
				editing: this.state.item
			};
			newState.editing.date= val;
			this.setState(newState);
		},
		edit: function () {
			this.setState({
				editing: true,
				item: this.props.item
			})
		},
		save: function () {
			this.setState({
				editing: false
			})
			this.props.save(this.state.item);
		},
		render: function () {
			// <Button onClick={this.remove.bind(null, item)}>Delete</Button>
			// 			<Button onClick={this.save}>Save</Button>
			return <tr>
				<td>
					{this.state.editing 
						? <Button onClick={this.save}>Save</Button> 
						: <Button onClick={this.edit.bind(null, this.props.item)}>Edit</Button>}						
					<EditableValue type="text" name="name" onChange={this.handleChange}
					 value={this.props.item.name} editing={this.state.editing}/>
				</td>
				<td>
					<EditableValue type="text" name="value" onChange={this.props.handleChange}
					 value={this.props.item.value} editing={this.state.editing}/>
				</td>
				<td>
					<EditableValue type="text" name="currency" onChange={this.props.handleChange}
					 value={this.props.item.currency} editing={this.state.editing}/>
				</td>
				<td>
					<EditableValue type="text" name="type" onChange={this.props.handleChange}
					 value={this.props.item.type} editing={this.state.editing}/>
				</td>
				<td>
					<EditableValue type="date" name="date" onChange={this.props.handleChange}
					 value={this.props.item.date} editing={this.state.editing} onClick={this.handleClick}/>
				</td>
				<td>
					<EditableValue type="select" name="category" onChange={this.props.handleChange}
					 value={this.props.item.category} options={this.props.categories} editing={this.state.editing}/>
				</td>
			</tr>
		}
	})
});