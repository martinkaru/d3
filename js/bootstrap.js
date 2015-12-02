/*globals requirejs */

requirejs.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        'd3js': '//d3js.org/d3.v3.min',
        'custom': 'js/custom'
    },
    priority: [
        'custom'
    ],
    shim: {
        'custom': {
            deps: ['d3js']
        }
    }
});

requirejs(['custom']);
