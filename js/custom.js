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

        var svg = d3.select(elementName).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        d3.csv(dataLocation, normalize, function (error, data) {
            if (error) throw error;

            var g = svg.selectAll(".arc")
                .data(pie(data))
                .enter().append("g")
                .attr("class", "arc");

            g.append("path")
                .attr("d", arc)
                .style("fill", function (d) {
                    return color(d.data.key);
                })
                .style('stroke-width', 0);

            g.append("text")
                .attr("transform", function (d) {
                    return "translate(" + arc.centroid(d) + ")";
                })
                .attr("dy", ".35em")
            //.text(function (d) {
            //    return d.data.age;
            //});
        });
    }

    attachDonut('div.donut01', 'data/donut0001.csv', d3.scale.ordinal()
        .range(["#49d025", "#005d00"]));
    attachDonut('div.donut02', 'data/donut0002.csv', d3.scale.ordinal()
        .range(["#03c4e2", "#00465c"]));
    attachDonut('div.donut03', 'data/donut0003.csv', d3.scale.ordinal()
        .range(["#febf00", "#d34d0f"]));
});
