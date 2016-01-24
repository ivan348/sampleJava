define(["react",
		"reflux", 
		"react-bootstrap",
		"actions/actions",
		"stores/Expenses",
		"api",
		"utils/fileUploader",
		"utils/backend",
		"jsx!./Expense"], function(React,
			Reflux,
			{Input, Button, Col, Table, Modal, Row},
			actions,
			ExpenseStore,
			http,
			fileUploader,
			backend,
			Expense){
	var obj = {
		id:"",
		name:"",
		value: "",
		currency: "",
		type:"",
		category:"",
		user_id:"",
		date:""
	}
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
				categories: [],
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
					categories: res.map(function(item){
						return <option value={item.id}>{item.name}</option>
					})
				})
			}.bind(this));
		},
		saveNew: function(item){
			debugger
			// var expense = {
			// 	name: item.name,
			// 	value: item.value,
			// 	currency: item.currency,
			// 	type: item.type == "+" ? 1 : 0,
			// 	category_id: item.category.id,
			// 	date: "01.01.2016",
			// 	user_id: 3
			// };			
			// if (expense.type == '-'){
			// 	expense.value = -1 * Math.abs(expense.value);
			// } else {
			// 	expense.value = Math.abs(expense.value);
			// }
			// actions.addExpense(expense);
			// this.setState({
			// 	addingNew: false
			// });
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
		edit: function (id) {
			this.setState({
				editing: id
			});
		},
		closeModal: function () {
			this.setState({
				showModal: false
			});
		},
		render: function(){
			var that = this;
			var expense = function (item) {
				return <Row key={item.id}>
					<Button onClick={that.edit.bind(null, item.id)}>Edit</Button>
					<Col xs={2} className="expense-item">{that.state.editing == item.id ? <Input type="text" defaultValue={item.name}/> : <span> {item.name} </span>}</Col>
					<Col xs={2} className="expense-item">{that.state.editing == item.id ? <Input type="text" defaultValue={item.value}/> : <span> {item.value} </span>}</Col>
					<Col xs={2} className="expense-item">{that.state.editing == item.id ? <Input type="text" defaultValue={item.currency}/> : <span> {item.currency} </span>}</Col>
					<Col xs={2} className="expense-item">{that.state.editing == item.id ? <Input type="text" defaultValue={item.type}/> : <span> {item.type} </span>}</Col>
					<Col xs={2} className="expense-item">{that.state.editing == item.id ? <Input type="text" defaultValue={item.date}/> : <span> {item.date} </span>}</Col>
					<Col xs={2} className="expense-item">{that.state.editing == item.id ? <Input type='select' ref="category">{that.state.categories}</Input> : <span> {item.category.name} </span>}</Col>
				</Row>		
			}	
			var expenseList = this.state.expenseList.map(expense);
			return <div>
			<Expense close={this.closeModal} showModal={this.state.showModal} categories={this.state.categories} save={this.saveNew}/>
				{expenseList}
				<Button onClick={this.showModal.bind(null, this)}>Modal</Button>
			</div>
		}
	})
})