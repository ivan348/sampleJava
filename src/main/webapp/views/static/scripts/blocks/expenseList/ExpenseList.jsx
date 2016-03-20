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
			{DatePicker, EditableValue, mapOptions},
			Expense){
	
	var typeOptions = mapOptions(["+", "-"]);

	return React.createClass({
		mixins: [
			Reflux.connect(ExpenseStore, "expenseList"),
			React.addons.LinkedStateMixin
		],
		getInitialState: function(){
			return {
				expenseList: [],
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
		remove: function(item) {
			actions.deleteExpense(item);
		},
		save: function(item){
			var expense = {
				name: item.name,
				value: item.value,
				currency: item.currency,
				type: item.value >= 0 ? 1 : 0,
				category_id: item.category.id || item.category,
				date: item.date,
				user_id: 3
			};
			if (item.id) {
				expense.id = item.id;
				actions.editExpense(expense);
			} else {
				actions.addExpense(expense);
			}
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
		render: function(){
			var that = this;
			var expenseList = this.state.expenseList.map(function (item) {
				return <Expense key={item.id} item={item} categories={that.state.categories} save={that.save}
				 save={that.save} remove={that.remove}/>
			});
			return <div>
				<ModalNew close={this.closeModal} showModal={this.state.showModal} categories={this.state.categories}
				 currencies={this.state.currencies} save={this.save}/>
				<table className="expense-table">
					<tr>
						<th>Name</th>
						<th>Value</th>
						<th>Currency</th>
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