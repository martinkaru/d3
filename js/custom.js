/*globals d3, requirejs */
'use strict';

requirejs(['d3js'], function () {
    'use strict';

    // Defaults
    var width = 300,
        height = 300,
        radius = Math.min(width, height) / 2,
        outerRadius = radius - 10,
        innerRadius = radius - 20;

    /**
     * Make sure the elements' values are positive
     * @param d
     * @returns {*}
     */
    function normalize(d) {
        d.population = +d.population;
        return d;
    }

    /**
     * Attach D3 donut to elements
     */
    function attachDonut(elementName, dataLocation, color) {
        var arc = d3.svg.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function (d) {
                return d.value;
            });

        var svg = d3.select(elementName).append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        d3.csv(dataLocation, normalize, function (error, data) {
            if (error) throw error;

            var g = svg.selectAll('.arc')
                .data(pie(data))
                .enter().append('g')
                .attr('class', 'arc');

            g.append('path')
                .attr('d', arc)
                .style('fill', function (d) {
                    return color(d.data.key);
                })
                .style('stroke-width', 0);

            // fixme
            //g.append('text')
            //    .attr('text-anchor', 'middle')
            //    .attr('class', 'big-number')
            //    .text(function (d) {
            //        var total = 0;
            //        for(var i in d.data) {
            //            if (parseInt(d.data[i], 10)) {
            //                total += +parseInt(d.data[i], 10);
            //            }
            //        }
            //
            //        return total;
            //    });
        });
    }

    attachDonut('div.donut01', 'data/donut0001.csv', d3.scale.ordinal()
        .range([
            '#005d00',
            '#49d025'
        ]));
    attachDonut('div.donut02', 'data/donut0002.csv', d3.scale.ordinal()
        .range([
            '#00465c',
            '#03c4e2'
        ]));
    attachDonut('div.donut03', 'data/donut0003.csv', d3.scale.ordinal()
        .range([
            '#d34d0f',
            '#febf00'
        ]));
});
