define(["react",
		"reflux", 
		"react-bootstrap",
		"actions/actions",
		"stores/Expenses",
		"api",
		"utils/fileUploader",
		"utils/backend",
		"jsx!./ModalNew",
		"jsx!../HtmlUtils/Forms",
		"jsx!./Expense"], function(React,
			Reflux,
			{Input, Button, Col, Table, Modal, Row},
			actions,
			ExpenseStore,
			http,
			fileUploader,
			backend,
			ModalNew,
			{DatePicker, EditableValue},
			Expense){

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
		save: function(item){
			// var item = this.state.editing;
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
			var expenseList = this.state.expenseList.map(function (item) {
				return <Expense item={item} categories={that.state.categories} save={that.save} 
				 handleChange={that.handleChange} save={that.save}/>
			});
			return <div>
				<ModalNew close={this.closeModal} showModal={this.state.showModal} categories={this.state.categories} currencies={this.state.currencies} save={this.saveNew}/>
				<table className="expense-table">
					<tr>
						<th>Name</th>
						<th>Value</th>
						<th>Currency</th>
						<th>Type</th>
						<th>Date</th>
						<th>Category</th>
					</tr>
						{expenseList}
				</table>
				<Button onClick={this.showModal.bind(null, this)}>New</Button>
			</div>
		}
	})
})