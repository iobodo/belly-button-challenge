
// Read the samples.json from the provided URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then((data) => {
    // Populate the dropdown with names
    const names = data.names;
    const dropdownMenu = d3.select("#selDataset");
    names.forEach(name => {
        dropdownMenu.append("option").text(name).property("value", name);
    });

    // Display the initial bar chart
    displayChart(data, names[0]);

    // Update the chart when a new name is selected
    dropdownMenu.on("change", function() {
        const newName = dropdownMenu.property("value");
        displayChart(data, newName);
    });
});

function displayChart(data, name) {
    const sample = data.samples.find(sample => sample.id === name);
    
    // Get the top 10 OTUs
    const otu_ids = sample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    const sample_values = sample.sample_values.slice(0, 10).reverse();
    const otu_labels = sample.otu_labels.slice(0, 10).reverse();
    
    // Define the bar chart layout and data
    const trace = {
        type: "bar",
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        orientation: 'h'
    };
    
    const layout = {
        title: `Top 10 OTUs for Test Subject ${name}`
    };
    
    Plotly.newPlot("bar", [trace], layout);
}

//Given: 
// X values: otu_ids
// Y values: sample_values
// Marker Size: sample_values
// Marker Colors: otu_ids
// Text Values: otu_labels

// Fetching the data using D3.
d3.json(url).then(data => {
    createBubbleChart(data);
});

function createBubbleChart(data) {
    // Extracting required data
    let otu_ids = data.samples[0].otu_ids;
    let sample_values = data.samples[0].sample_values;
    let otu_labels = data.samples[0].otu_labels;

    // Bubble chart data
    let bubbleData = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: 'Earth'
        }
    }];

    // Layout for the bubble chart
    let layout = {
        title: 'OTU IDs vs Sample Values',
        showlegend: false,
        hovermode: 'closest',
        xaxis: { title: 'OTU ID' },
        yaxis: { title: 'Sample Values' },
        height: 600,
        width: 1200
    };

    // Render the bubble chart
    Plotly.newPlot('bubble', bubbleData, layout);
}

// Fetching the data using D3
d3.json(url).then(data => {
    displayMetadata(data.metadata[0]);  
});

function displayMetadata(metadata) {
    // Select the panel div
    let panel = d3.select("#sample-metadata");

    // Clear any existing metadata
    panel.html("");

    // Append metadata key-value pairs to the panel
    Object.entries(metadata).forEach(([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
    });
}


