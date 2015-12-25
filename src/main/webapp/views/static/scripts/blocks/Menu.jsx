define(function(require){
	var React = require('react');
	var Expenses = require("stores/Expenses");
	var { ListGroup, ListGroupItem} = require("react-bootstrap");
	return React.createClass({
		render: function() {
			var list = [{ 
				name : "Expenses",
				link : "#expenses"
			},{
				name : "Statistics",
				link : "#statistics"
			}].map(function(item){
				return <ListGroupItem key={item.link} href={item.link}>{item.name}</ListGroupItem>
			})
			return <div>
				<ListGroup>{list}</ListGroup>
			</div>
		}
	})
})