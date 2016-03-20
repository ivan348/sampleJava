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
				item: this.state.item
			};
			newState.item[el.name] = el.value;
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
			return <tr className={"expense-item " + (this.props.item.type == 1 ? "plus" : "minus")}>
				<td>
					{this.state.editing 
					? <Button onClick={this.save}>Save</Button>
					: <span className="buttons">
						<i className="fa fa-times pointer" onClick={this.props.remove.bind(null, this.props.item)}></i>
						<i className="fa fa-pencil-square-o pointer" onClick={this.edit}></i>
					</span>}			
					<EditableValue type="text" name="name" onChange={this.handleChange}
					 value={this.props.item.name} editing={this.state.editing}/>
				</td>
				<td>
					<EditableValue type="text" name="value" onChange={this.handleChange}
					 value={this.props.item.value} editing={this.state.editing}/>
				</td>
				<td>
					<EditableValue type="text" name="currency" onChange={this.handleChange}
					 value={this.props.item.currency} editing={this.state.editing}/>
				</td>
				<td>
					<EditableValue type="date" name="date" onChange={this.handleChange}
					 value={this.props.item.date} editing={this.state.editing} onClick={this.handleClick}/>
				</td>
				<td>
					<EditableValue type="select" name="category" onChange={this.handleChange}
					 value={this.props.item.category} options={this.props.categories} editing={this.state.editing}/>
				</td>
			</tr>
		}
	})
});