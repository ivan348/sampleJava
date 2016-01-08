// (function () {
    'use strict';

    var libs = '/views/static/bower_components/';

    requirejs.config({
        baseUrl: '/views/static/scripts',
        paths: {
            "react": libs + "react/react-with-addons",
            "JSXTransformer": libs + "react/JSXTransformer",
            "jsx": libs + "requirejs-react-jsx/jsx",
            "text": libs + "requirejs-text/text",
            "react-bootstrap": libs + "react-bootstrap/react-bootstrap",
            "reflux": libs + "reflux/dist/reflux",
            "lodash": libs + "lodash/lodash",
            "react-router": libs + "react-router/build/umd/ReactRouter",
            "jquery": libs + "jquery/dist/jquery.min",
            "chartist": libs + "chartist/dist/chartist.min",
            "highcharts": libs + "highcharts/highcharts.src"
        },
        shim : {
            "react": {
              exports: "React"
            },
            "JSXTransformer": "JSXTransformer",
            "highcharts": {
                exports: "Highcharts",
                deps: ["jquery"]
            }
        },
        config: {
            jsx: {
                fileExtension: ".jsx",
                transformOptions: {
                    harmony: true,
                    stripTypes: false,
                    inlineSourceMap: true
                },
                usePragma: false
            }
        }
    });

    require(['jsx!home'], function(Home){
        // var app = new Home();
        Home.init();
    });
// })