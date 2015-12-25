define(function (require) {
    var self = this;
    var React = require('react');
    var r = React.DOM;
    var { Col, Row } = require('react-bootstrap');
    var Menu = require("jsx!./blocks/Menu");
    var Content = require("jsx!./blocks/Content");
    var Router = require("react-router");
    var Route = Router.Route;
    var Routes = Router.Routes;
    var RouteHandler = Router.RouteHandler;
    var ExpenseList = require("jsx!./blocks/ExpenseList");
    var Statistics = require("jsx!./blocks/Statistics");
    var Summ = require("jsx!./blocks/Summ");

    var Header = React.createClass({
        getInitialState: function () {
            return {

            };
        },
        render: function () {
            var text = "hello";
            return <h1>
                <a href="#">{text}</a>
            </h1>;
        }
    })
    var Grid = React.createClass({
        render: function(){
            return <div>
                    <Header/>
                    <div>
                        <Col xs={2}>
                            <Summ/>
                            <Menu/>
                        </Col>
                        <Col xs={10}>
                            <RouteHandler/>   
                        </Col>
                    </div>
                </div>
        }
    })
    var routes = <Route handler={Grid}>
        <Route name="expense list" path="/expenses" handler={ExpenseList} />
        <Route name="statistics" path="/statistics" handler={Statistics} />
    </Route>
    this.init = function(){
        // React.render(<Route children={routes}/>, document.getElementById('application'));   
        Router.run(routes, Router.HashLocation, (Root) => {
            React.render(<Root/>, document.getElementById('application'));
        });
    }
    return self
})