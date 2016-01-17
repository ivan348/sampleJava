define(["react",
		"reflux", 
		"react-bootstrap",
		"actions/actions",
		"stores/Expenses",
		"api",
		"utils/fileUploader",
		"utils/backend"], function(React,
			Reflux,
			{Input, Button, Col, Table},
			actions,
			ExpenseStore,
			http,
			fileUploader,
			backend){

	var mapOptions = function(arr) {
		return arr.map(function(item){
			return <option key={item} value={item}>{item}</option>
		})
	}
	var currenciesOptions = mapOptions(["BYR", "USD", "EUR"]);
	var typeOptions = mapOptions(["+", "-"]);
	// var categoryOptions = mapOptions(["Shop", "Cinema", "Eating", "Buying"])

	return React.createClass({
		mixins: [
			Reflux.connect(ExpenseStore, "expenseList")
		],
		getInitialState: function(){
			return {
				expenseList: [],
				editing: -1,
				addingNew: false,
				categories: []
			}
		},
		createNew: function(){
			this.setState({
				addingNew: true
			})
		},
		componentDidMount: function(){
			actions.getExpenses();
			backend.getCategories(function (res) {
				this.setState({
					categories: res.map(function(item){
						return <option value={item.id}>{item.name}</option>
					})
				})
			}.bind(this));
		},
		saveNew: function(){
			var expense = {
				name: this.refs.name.getValue(),
				value: this.refs.value.getValue(),
				currency: this.refs.currency.getValue(),
				type: this.refs.type.getValue() == "+" ? 1 : 0,
				category_id: this.refs.category.getValue(),
				date: "01.01.2016",
				user_id: 3
			};			
			if (expense.type == '-'){
				expense.value = -1 * Math.abs(expense.value);
			} else {
				expense.value = Math.abs(expense.value);
			}
			actions.addExpense(expense);
			this.setState({
				addingNew: false
			});
		},
		handleClick: function(item){
			this.setState({
				editing: this.state.editing == -1 ? item.id : -1
			})
		},
		remove: function(item) {
			actions.deleteExpense(item);
		},
		save: function(item){
			var expense = {
				id: item.id,
				name: this.refs["name" + item.id].getValue(),
				value: this.refs["value" + item.id].getValue(),
				currency: this.refs["currency" + item.id].getValue(),
				type: this.refs["type" + item.id].getValue(),
				category: this.refs["category" + item.id].getValue()
			};
			if (expense.type == '-'){
				expense.value = -1 * Math.abs(expense.value);
			} else {
				expense.value = Math.abs(expense.value);
			}
			actions.editExpense(expense);
			this.handleClick(item);
		},
		upload: function(e){
			var files = e.target.files;
			var _onUpload = function(){

			}
			if(files.length != 0) {
				fileUploader.uploadFile(files, _onUpload)
			}
		},
		render: function(){
			var self=this;
			var formNew = <div>
					<Input type="text" ref="name"/>
					<Input type="text" ref="value"/>
					<Input type='select' ref="type">{typeOptions}</Input>
					<Input type='select' ref="currency">{currenciesOptions}</Input>
					<Input type='select' ref="category">{this.state.categories}</Input>
					<Button onClick={this.saveNew}>
						Save
					</Button>
				</div>
			var button = this.state.addingNew ? formNew : 
				<Button bsStyle="primary" onClick={this.createNew}>+</Button>;			
			var expenseList = this.state.expenseList.map(function(item){
				return <tr draggable="true" className={"expense-item " + (item.type == 1 ? "plus" : "minus")} key={item.id}> 
					<td>
						{self.state.editing == item.id ? 
							<span>
								<Input type="text" ref={"name" + item.id} defaultValue={item.name} onChange={this.changeName}/>						
								<Button bsStyle="primary" onClick={self.save.bind(null, item)}>
									Save
								</Button>
							</span>  : <span>
								<span className="buttons">
									<i className="fa fa-times pointer" onClick={self.remove.bind(null, item)}></i>
									<i className="fa fa-pencil-square-o pointer" onClick={self.handleClick.bind(null, item)}></i>
								</span>
								<p>{item.name}</p>
							</span>}
					</td>
					<td>
						{self.state.editing == item.id ? 
							<Input type="text" ref={"value" + item.id} defaultValue={item.value} onChange={this.changeValue}/> : 
							<p>{item.value}</p>}
					</td>
					<td>
						{self.state.editing == item.id ? <Input type='select' ref={"type" + item.id} defaultValue={item.type}>{typeOptions}</Input> : <p>{item.type}</p>}
					</td>
					<td>
						{self.state.editing == item.id ? <Input type='select' ref={"currency" + item.id} defaultValue={item.currency}>{currenciesOptions}</Input> : <p>{item.currency}</p>}
					</td>
					<td>
						{self.state.editing == item.id ? <Input type='select' ref={"category" + item.id} defaultValue={item.category.name}>{this.state.categories}</Input> : <p>{item.category}</p>}
					</td>
				</tr>
			});
			return <div>
				<form>			
					<input ref="upload" type="file" name="upload" onChange={this.upload}/>
				</form>
				<Table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Value</th>
							<th>Type</th>
							<th>Currency</th>
							<th>Category</th>
						</tr>
					</thead>
					<tbody> 
							{expenseList}
					</tbody>
				</Table>
				{button}
			</div>
		}
	})
})