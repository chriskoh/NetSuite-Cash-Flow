// Load a CSV file as an array for data manipulation
function loadFile(array, id){
	
	var fileName		= nlapiLoadFile(id); // Load file
	var fileData		= fileName.getValue(); // Get file data
	var fileDataParsed	= fileData.split(","); // split data in to arrary
	array			= array.concat(fileDataParsed); // add data to an exsisitng array
	
	return array; 
}
