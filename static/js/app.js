
// get the panel-body info
function getDemoInfo(samples) {
    
    // read the json file 
    d3.json("./data/samples.json").then((data)=> {
    
        // get the metadata info for the demographic panel
        var metadata = data.metadata;
        console.log(metadata)
        
        // filter metadata info by id
        var idArray = metadata.filter(sampleObject => sampleObject.id == samples);
        var id = idArray[0]
        console.log(id)
        
        //select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");      

        //clean demographic panel
        demographicInfo.html("")

        //populate panel with id
        Object.entries(id).forEach(([key, value])=>{
            //console.log(key, value)
            demographicInfo.append("h5").text(`${key}: ${value}`);
        });        
    });
}

// get data for plots
function getPlots(sample) {
    //read the json file
    d3.json("./data/samples.json").then (sampledata =>{

        console.log(sampledata) 
        
        // filter "samples" info by id
        var individualValues = sampledata.samples.filter(sampleObject => sampleObject.id == sample)[0];
        console.log(individualValues)

        //get the array of sample_values by id, slice to get the top 10 values then reverse it for proper plot format 
        var sampleValues =  individualValues.sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        
        //get the label for the top 10 otu_values    
        var labels =  individualValues.otu_labels.slice(0,10);
        console.log (labels)
        
        //get the top 10 otu_ids     
        var OTU_top = (individualValues.otu_ids.slice(0, 10)).reverse();
        console.log(OTU_top)    
        
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

        // Create trace for the bubble plot
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

// display the default plots
function init() {
    var selector = d3.select("#selDataset");

    //read samples.json
    d3.json("./data/samples.json").then (data =>{
        
        // on change to the DOM, append tags with respective id info
        var sampleNames = data.names
        sampleNames.forEach((samples) => {
            selector
                .append("option").text(samples).property("value", samples);
        });
        
        // initiate with this info 
        var firstSample = sampleNames[0]
        getDemoInfo(firstSample);
        getPlots(firstSample);
    });
}

// function called by DOM changes
function optionChanged(newSample) {

    // call function to update the charts
    getDemoInfo(newSample);
    getPlots(newSample);
}

// call function
init();

