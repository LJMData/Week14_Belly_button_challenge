// Define the URL for the data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use the D3 library to read in samples.json from the URL
d3.json(url).then(data => {
  console.log(data);
});

// Create the function for initialization
function init() {

  // Use D3 to make the selection menu
  const dropdownMenu = d3.select("#selDataset");

  // Populate the selection menu
  d3.json(url).then(data => {

    // Put sample names in a variable
    const names = data.names;

    // Put the sample names on the selection menu
    names.forEach(id => {

      // Log each id
      console.log(id);

      // Append the selection
      dropdownMenu.append("option")
        .text(id)
        .property("value", id);
    });

    // Set a sample
    const sample1 = names[0];

    // Log the sample value
    console.log(sample1);

// Add event listener to the dropdown menu
d3.select("#selDataset").on("change", updateCharts);

// Function to update charts when dropdown selection changes
function updateCharts() {
  // Get the selected sample ID from the dropdown menu
  let sampleId = d3.select("#selDataset").property("value");

  // Call the buildMetadata function with the new sample ID
  buildMetadata(sampleId);

  // Call the buildBarChart function with the new sample ID
  buildBarChart(sampleId);

  // Call the buildBubbleChart function with the new sample ID
  buildBubbleChart(sampleId);
  }});
}

//Get and format the data for the metadata
function buildMetadata(sample) {

    // Link to the data source
    d3.json(url).then((data) => {

        // Extract the required data
        let metadata = data.metadata;

        // Filter and log the results 
        let value = metadata.filter(result => result.id == sample);
        console.log(value)

        // Get the first Sample 
        let valueData = value[0];

        // Prepare the holder
        let metadataHolder = d3.select("#sample-metadata");

        // Clear the metadata holder
        metadataHolder.html("");

        // Add the values into the holder
        Object.entries(valueData).forEach(([key, value]) => {
            console.log(key, value);

            metadataHolder.append("h5")
                .text(`${key}: ${value}`);
        });
    });
}

//Get and format the data for the barchart
function buildBarChart(sample) {

    // Link to the data source
    d3.json(url).then((data) => {

        // Extract the required data
        let sampledata = data.samples;

        // Filter and log the results 
        let value = sampledata.filter(result => result.id == sample);
        console.log(value)

        // Get the first Sample 
        let valueData = value[0];

        // Get and log the requires input for the bar
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;
        console.log(otu_ids,otu_labels,sample_values);

        // Get the top 10 OTUs
        let xvalue = sample_values.slice(0,10).reverse();
        let yvalue = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let hovertext = otu_labels.slice(0,10).reverse();

        //Create the trace for the horizontal bar chart
        let trace = {
            x: xvalue,
            y: yvalue,
            text: hovertext,
            type: "bar",
            orientation: "h"
        };

        // Create the data array for the plot
        const chartData = [trace];

        // Define the plot layout
        const layout = {
            title: `Top 10 OTUs for Sample ${sample}`,
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" },
            margin: { t: 50, r: 50, b: 50, l: 100 },
        };

        // Create the plot
        Plotly.newPlot("bar", chartData, layout);

    });
}

//Get and format the data for the bubble chart
function buildBubbleChart(sample) {
  // Link to the data source
  d3.json(url).then((data) => {

    // Extract the required data
    let sampledata = data.samples;

    // Filter and log the results 
    let value = sampledata.filter(result => result.id == sample);
    console.log(value)

    // Get the first Sample 
    let valueData = value[0];

    // Get and log the requires input for the bubbles
    let otu_ids = valueData.otu_ids;
    let otu_labels = valueData.otu_labels;
    let sample_values = valueData.sample_values;
    console.log(otu_ids,otu_labels,sample_values);

    // Set up the trace for bubble chart
    let trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "twilight"
      }
  };

      // Set up the layout
      let layout = {
        title: "Bacteria Per Sample",
        hovermode: "closest",
        xaxis: {title: "OTU ID"},
    };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
});
};

// Call the init function
init();

