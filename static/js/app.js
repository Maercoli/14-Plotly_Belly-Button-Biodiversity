// 1.Use D3 library to read in `samples.json`.
function retreiveData(sample) {
    d3.json("./data/samples.json").then(data=> {
        console.log(data)
    });
};

retreiveData();


function getPlots(id) {

    //Read samples.json
    d3.json("./data/samples.json").then (sampledata =>{
        console.log(sampledata)
            
        //Grab values from response json object to build plots
        var ids = sampledata.samples[0].otu_ids;
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
    }

getPlots();


// 4. Display the sample metadata, i.e., an individual's demographic information.

// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// 6. Update all of the plots any time that a new sample is selected.

