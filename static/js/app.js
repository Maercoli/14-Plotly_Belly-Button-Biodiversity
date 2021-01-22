// create the function to get the necessary data
function getDemoInfo(samples) {
    // read the json file to get data
    d3.json("./data/samples.json").then((data)=> {
    // get the metadata info for the demographic panel
        var metadata = data.metadata;
        //console.log(metadata)
        
        // filter meta data info by id
        var idArray = metadata.filter(sampleObject => sampleObject.id == samples);
        var id = idArray[0]
        //console.log(id)
        
        //select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");      

        //clean demographic panel
        demographicInfo.html("")

        //populate with id
        Object.entries(id).forEach(([key, value])=>{
            //console.log(key, value)
            demographicInfo.append("h5").text(`${key}: ${value}`);
        });        
    });
}



// create function to get the necessary plots
function getPlots(sample) {
    //read samples.json
    d3.json("./data/samples.json").then (sampledata =>{

        console.log(sampledata) 
        
        //
        var individualValues = sampledata.samples.filter(sampleObject => sampleObject.id == sample)[0];
        //console.log(individualValues)

        var sampleValues =  individualValues.sample_values.slice(0,10).reverse();
        console.log(sampleValues)
            
        var labels =  individualValues.otu_labels.slice(0,10);
        console.log (labels)
            
        var OTU_top = (individualValues.otu_ids.slice(0, 10)).reverse();
            
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
            };
            
        var data = [trace];

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
            x: individualValues.otu_ids,
            y: individualValues.sample_values,
            mode: "markers",
            marker: {
                size: individualValues.sample_values,
                color: individualValues.otu_ids
            },
            text:  individualValues.otu_labels
        }
        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        }
        var data1 = [trace1];
        
        Plotly.newPlot("bubble", data1, layout_2);
        });

    }


//        // Create trace for the gauge chart
       

// }


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

