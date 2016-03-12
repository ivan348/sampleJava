define(["react",
		"reflux", 
		"react-bootstrap",
		"actions/actions",
		"stores/Expenses",
		"api",
		"utils/fileUploader",
		"utils/backend",
		"jsx!./ModalNew",
		"jsx!./HtmlUtils/Forms"], function(React,
			Reflux,
			{Input, Button, Col, Table, Modal, Row},
			actions,
			ExpenseStore,
			http,
			fileUploader,
			backend,
			ModalNew,
			{DatePicker, EditableValue}){

	var obj = function () {
		var self = this;
		self.id = "";
		self.name = "";
		self.value = "";
		self.currency = "";
		self.type = "";
		self.category = "";
		self.user_id = "";
		self.date = "";
	}
	var mapOptions = function(arr, name, value) {
		var res = arr.map(function(item){
			return <option key={item[value] || item} value={item[value] || item}>{item[name] || item}</option>
		});
		res.splice(0, 0, <option disabled>--</option>);
		return res;
	}
	var typeOptions = mapOptions(["+", "-"]);

	return React.createClass({
		mixins: [
			Reflux.connect(ExpenseStore, "expenseList"),
			React.addons.LinkedStateMixin
		],
		getInitialState: function(){
			return {
				expenseList: [],
				editing: {},
				addingNew: false,
				categories: [],
				currencies: [],
				showModal: false
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
					categories: mapOptions(res, "name", "id")
				})
			}.bind(this));
			backend.getCurrencies(function (res) {
				this.setState({
					currencies: mapOptions(res, "name", "value")
				})
			}.bind(this));
		},
		saveNew: function(item){
			var expense = {
				name: item.name,
				value: item.value,
				currency: item.currency,
				type: item.type == "+" ? 1 : 0,
				category_id: item.category,
				date: item.date,
				user_id: 3
			};
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
		save: function(){
			var item = this.state.editing;
			var expense = {
				id: item.id,
				name: item.name,
				value: item.value,
				currency: item.currency,
				type: item.type == "+" ? 1 : 0,
				category_id: item.category.id,
				date: item.date,
				user_id: 3
			};
			actions.editExpense(expense);
			this.setState({
				editing: {}
			});
		},
		upload: function(e) {
			var files = e.target.files;
			var _onUpload = function(){

			}
			if(files.length != 0) {
				fileUploader.uploadFile(files, _onUpload)
			}
		},
		showModal: function() {
			this.setState({
				showModal: !this.state.showModal,
				editing: -1
			})
		},
		edit: function (item) {
			this.setState({
				editing: item
			});
		},
		closeModal: function () {
			this.setState({
				showModal: false
			});
		},
		handleChange: function (id, e) {
			var el = e.currentTarget;
			var newState = {
				editing: this.state.editing
			};
			newState.editing[el.name]= el.value;
			this.setState(newState);
		},
		render: function(){
			var that = this;
			var expense = function (item) {
				return <Row key={item.id}>
					<span>
						<Button onClick={that.save}>Save</Button>
						<td>
							<EditableValue type="text" name="name" onChange={that.handleChange.bind(that, item.id)}
							 value={that.state.editing.name} editing={that.state.editing.id == item.id}/>
						</td>
						<td>
							<EditableValue type="text" name="value" onChange={that.handleChange.bind(that, item.id)}
							 value={that.state.editing.value} editing={that.state.editing.id == item.id}/>
						</td>
						<td>
							<EditableValue type="text" name="currency" onChange={that.handleChange.bind(that, item.id)}
							 value={that.state.editing.currency} editing={that.state.editing.id == item.id}/>
						</td>
						<td>
							<EditableValue type="text" name="type" onChange={that.handleChange.bind(that, item.id)}
							 value={that.state.editing.type} editing={that.state.editing.id == item.id}/>
						</td>
						<td>
							<EditableValue type="date" name="date" onChange={that.handleChange.bind(that, item.id)}
							 value={that.state.editing.date} editing={that.state.editing.id == item.id}/>
						</td>
						<td>
							<EditableValue type="select" name="category" onChange={that.handleChange.bind(that, item.id)}
							 value={that.state.editing.category} options={that.state.categories} editing={that.state.editing.id == item.id}/>
						</td>
						</span>
					<span>
						<Button onClick={that.edit.bind(null, item)}>Edit</Button>
						<Button onClick={that.remove.bind(null, item)}>Delete</Button>
						<Col xs={2} className="expense-item"><span>{item.name}</span></Col>
						<Col xs={2} className="expense-item"><span>{item.value}</span></Col>
						<Col xs={2} className="expense-item"><span>{item.currency}</span></Col>
						<Col xs={2} className="expense-item"><span>{item.type}</span></Col>
						<Col xs={2} className="expense-item"><span>{item.date}</span></Col>
						<Col xs={2} className="expense-item"><span>{item.category.name}</span></Col>
						</span>
					
				</Row>		
			}	
			var expenseList = this.state.expenseList.map(expense);
			return <div>
				<ModalNew close={this.closeModal} showModal={this.state.showModal} categories={this.state.categories} currencies={this.state.currencies} save={this.saveNew}/>
				<table>
					<tr>
						<th>Name</th>
						<th>Value</th>
						<th>Currency</th>
						<th>Type</th>
						<th>Date</th>
						<th>Category</th>
					</tr>
					<tr>
						{expenseList}
					</tr>
				</table>
				<Button onClick={this.showModal.bind(null, this)}>New</Button>
			</div>
		}
	})
})