// 1.Use D3 library to read in `samples.json`.
// d3.json("./data/samples.json", function(data) {
//     console.log(data);
// });
function retreiveData(sample) {
    d3.json("./data/samples.json").then(data=> {
        console.log(data)
    });
};

retreiveData();

// 2.Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// * Use `sample_values` as the values for the bar chart.= samples.samples_values
// * Use `otu_ids` as the labels for the bar chart. = samples.otu_ids
// * Use `otu_labels` as the hovertext for the chart. = samples.out_labels
function getBarPlot(id) {
    //Read samples.json
        d3.json("./data/samples.json").then (sampledata =>{
            //console.log(sampledata)
            var ids = sampledata.samples[0].otu_ids;
            //console.log(ids)
            var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
            //console.log(sampleValues)
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            //console.log (labels)

            var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
            // get the otu id's to the desired form for the plot
            var OTU_id = OTU_top.map(d => "OTU " + d);
            //console.log(OTU_id)

            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                type: "bar",
                orientation: "h"
            }
            
            var data = [trace]

            var layout = {
                title:"Top 10 OTUs",
                margin:{
                    l: 100,
                    r: 100, 
                    t: 100,
                    b: 100
                }
            }
            
            // Render the plot to the div tag with id "plot"
            Plotly.newPlot("bar", data, layout);

        });
    }

getBarPlot();



// 3.Create a bubble chart that displays each sample.

// * Use `otu_ids` for the x values.
// * Use `sample_values` for the y values.
// * Use `sample_values` for the marker size.
// * Use `otu_ids` for the marker colors.
// * Use `otu_labels` for the text values.



// 4. Display the sample metadata, i.e., an individual's demographic information.

// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// 6. Update all of the plots any time that a new sample is selected.



  


  
