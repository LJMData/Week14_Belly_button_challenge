# Week14_Belly_button_challenge

## Interactive Web Visualizations

This code provides an interactive web visualization using D3 and Plotly libraries to visualize sample data for bacterial growth from different individuals. The data is stored in a JSON file and is accessed via a URL using D3 library.

The code allows the user to select a sample ID from a dropdown menu, and then displays the following three charts for that sample:

a horizontal bar chart of the top 10 OTUs (Operational Taxonomic Units) found in that sample, based on the number of times each OTU was observed
a bubble chart showing the number of OTUs found in that sample, based on their sample values and their respective OTU IDs
metadata information about the individual corresponding to that sample, including demographic information such as age, ethnicity, gender, etc.

The code is divided into four functions:

init(): This function initializes the page and creates the dropdown menu for selecting the samples.
buildMetadata(sample): This function displays the metadata for a given sample ID.
buildBarChart(sample): This function displays a bar chart of the top 10 OTUs for a given sample ID.
buildBubbleChart(sample): This function displays a bubble chart of all OTUs for a given sample ID.

When the user selects a new sample ID from the dropdown menu, the updateCharts() function is called, which in turn calls the buildMetadata(), buildBarChart(), and buildBubbleChart() functions with the new sample ID.