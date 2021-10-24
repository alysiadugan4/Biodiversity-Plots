// Strategy: 
// Step 0: explore data 
// Open up a terminal window where the index.html is. Then run
// python -m http.server
// Step 1: fill dropdown with ids
// Step 2: Response function that responds to a dropdown change
// Step 3: Create a function that draws all of the charts using either the initial value on page load or the user selected value
// Step 4: In that function need to filter by the id so draws chart using that id's data (filter works on an array and returns an array so you need to take the first one from that array [0])
// Step 5: Do bar and bubble charts using .sameples
// Step 6: Do demo panel using .metadata

// ** COME UP WITH YOUR OWN VARIABLE AND FUNCTION NAMES **

function loadCharts(id) {

  console.log(id)

  d3.json("samples.json").then((data) => {

    console.log(data)

    let filteredData = data.samples.filter(obj => obj.id == id);

    console.log(filteredData)

    let otu_ids = filteredData[0].otu_ids.map(otu => "OTU " + otu);
    let otu_labels = filteredData[0].otu_labels;
    let sample_values = filteredData[0].sample_values;

    console.log(otu_ids);
    console.log(otu_labels);
    console.log(sample_values);

    // For the bar chart just take the first 10
    // Meaning you need to for each of the 3 arrays you need to do .slice(0,10).reverse()
    // For the bar chart, x is going to be the sample_values, y is going to be the otu_ids, and text is going to be
    // otu_labels

    let dropdown = d3.select("#selDataset");
    //for drop down
    data.names.forEach((id) => {
        // console.log(id);
        
        dropdown.append("option").text(id).property("value", id);
    });
    TopSamples(data.names[0]);
    DemographicInfo(data.names[0]);
    BubbleChart(data.names[0]);
});

function optionChanged(selectedID){
    // console.log(selectedID);

    TopSamples(selectedID);
    DemographicInfo(selectedID);
    BubbleChart(selectedID);
    // LoadCharts(selectedID);
}

function TopSamples(id)
{
  d3.json("samples.json").then(data => {
      // console.log(data);
      let filteredData =data.samples.filter(obj => obj.id == id);

      // console.log(filteredData);

      let otu_ids = filteredData[0].otu_ids.map(otu=> "OTU " + otu);
      let otu_labels = filteredData[0].otu_labels;
      let sample_values = filteredData[0].sample_values;
      // console.log(otu_ids);
      // console.log(otu_labels);
      // console.log(sample_values);

      let otu_ids_slice = otu_ids.slice(0,10).reverse();
      let otu_labels_slice = otu_labels.slice(0,10).reverse();
      let sample_values_slice = sample_values.slice(0,10).reverse();

      let traceBar = 
      {
        x: sample_values_slice,
        y: otu_ids_slice,
        text: otu_labels_slice,
        type: "bar",
        orientation: "h"
      };

      // Data trace array
      let traceData = [traceBar];

      // Apply the group barmode to the layout
      let layout = 
      {
        title: "Top 10 Samples"
      };

      // Render the plot to the div tag with id "plot"
      Plotly.newPlot("bar", traceData, layout);
    }
  );
}

    //Now do the bubble chart, but it uses all of the data, also don't need to do the .map

    
    //Now do the metadata demo panel at sample-metadata
    let filteredMetaData = data.metadata.filter(obj => obj.id == id);

    console.log(filteredMetaData);

    let panel = d3.select("#sample-metadata");

    // Look up looping through an Object.entries with a forEach [key, value]
    // panel.append("h5").text(key + ": " + value)



d3.json("samples.json").then((data) => {

  let dropdown = d3.select("#selDataset");

  data.names.forEach((id) => {

    dropdown.append("option").text(id).property("value", id);

  })

  loadCharts(data.names[0])

})


function optionChanged(selectedID) 

  loadCharts(selectedID)}
