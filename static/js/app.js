// create the function to get the necessary data
function getDemoInfo(samples) {
    // read the json file to get data
    d3.json("./data/samples.json").then((data)=> {
    // get the metadata info for the demographic panel
        var metadata = data.metadata;
        console.log(metadata)
        
        // filter meta data info by id
        var idArray = metadata.filter(sampleObject => sampleObject.id == samples);
        var id = idArray[0]
        console.log(id)
        
        //select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");      

        //clean demographic panel
        demographicInfo.html("")

        //populate with result_inital
        Object.entries(id).forEach(([key, value])=>{
            console.log(key, value)
            demographicInfo.append("h5").text(`${key}: ${value}`);
        });        

    });
}


function getPlots(samples) {

    //Read samples.json
    d3.json("./data/samples.json").then (sampledata =>{
        console.log(sampledata)
            
        //Grab values from response json object to build plots
        var ids = sampledata[0].otu_ids;
        console.log(ids)
          
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
            
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log (labels)
            
        var OTU_top = (sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
            
        //get the otu id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(OTU_id)

        //Create trace for the bar plot
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
            
        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar", data, layout);

        
        // Set trace for the bubble plot
        var trace1 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text:  sampledata.samples[0].otu_labels
        };
        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
        var data1 = [trace1];
        
        Plotly.newPlot("bubble", data1, layout_2);
        });

        // Create trace for the gauge chart
    //     var data = [
    //         {
    //           domain: { x: [0, 1], y: [0, 1] },
    //           value: 450,
    //           title: { text: "Belly Button Washing Frequency" },
    //           type: "indicator",
    //           mode: "gauge+number+delta",
    //           delta: { reference: 380 },
    //           gauge: {
    //             axis: { range: [null, 500] },
    //             steps: [
    //               { range: [0, 250], color: "lightgray" },
    //               { range: [250, 400], color: "gray" }
    //             ],
    //             threshold: {
    //               line: { color: "red", width: 4 },
    //               thickness: 0.75,
    //               value: 490
    //             }
    //           }
    //         }
    //       ];
          
    //       var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
    //       Plotly.newPlot('gauge', data, layout);

}


function init() {
    var selector = d3.select("#selDataset");

    //Read samples.json
    d3.json("./data/samples.json").then (data =>{
        
        var sampleNames = data.names
        sampleNames.forEach((samples) => {
            selector
                .append("option").text(samples).property("value", samples);
        });
    
        var firstSample = sampleNames[0]

        getDemoInfo(firstSample);
        getPlots(firstSample);
    });
}

function optionChanged(newSample) {
    getDemoInfo(newSample);
    getPlots(newSample);
}

init();

