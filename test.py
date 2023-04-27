import os
import csv
import xml.etree.ElementTree as ET

# Set the directory path where the XML files are located
directory_path = "/path/to/xml/files"

# Set the output CSV file path
output_file_path = "/path/to/output.csv"

# Set the output TXT file path for files without <data> tag
error_file_path = "/path/to/error.txt"

# Get a list of all XML files in the directory
xml_files = [f for f in os.listdir(directory_path) if f.endswith(".xml")]

# Create a list to hold the data to be written to the CSV file
csv_data = [["Filename", "Data Value"]]

# Create a list to hold the filenames without <data> tag
error_files = []

# Loop through each XML file and extract the data value(s)
for xml_file in xml_files:
    # Parse the XML file
    tree = ET.parse(os.path.join(directory_path, xml_file))
    root = tree.getroot()

    # Find all data tags and extract their values
    data_values = [data.text for data in root.findall("data")]

    # Check if any data tags were found
    if len(data_values) == 0:
        # Add the filename to the error_files list
        error_files.append(xml_file)
    else:
        # Add the filename and data value(s) to the csv_data list
        for data_value in data_values:
            csv_data.append([xml_file, data_value])

# Write the csv_data list to a CSV file
with open(output_file_path, "w", newline="") as csv_file:
    writer = csv.writer(csv_file)
    writer.writerows(csv_data)

# Write the error_files list to a TXT file
with open(error_file_path, "w") as error_file:
    error_file.write("\n".join(error_files))

print("CSV file and error file created successfully!")
