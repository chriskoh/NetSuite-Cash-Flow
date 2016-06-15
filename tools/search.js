// filters **MUST** include internalid && line
// filters **MUST** must stort by internalid && line (ex. "new nlobjSearchColumn('internalid').setSort();")
function search(filters, columns, searchtype, scriptid){ 

	var allResults 	= new Array();	// Array for search result storage

	var results = nlapiSearchRecord(searchtype, scriptid, filters, columns); // Search for first 1000 results
	allResults 	= allResults.concat(results);	// Store first 1000 results in storage array
	
	while(results.length == 1000){ // Search for results greater than 1000
		
		// store values of the last result searched
		var lastId2 = results[999].getValue('internalid');
		var lastLine = results[999].getValue('line');
		
		filters[filters.length] = new nlobjSearchFilter('internalidNumber', null, 'greaterthanorequalto', lastId2); // New filter, get results that have an internal ID greater than the last searched
	
		var results = nlapiSearchRecord(searchtype, scriptid, filters, columns); // Search for the next 1000 records
		
		for(var i = 0; i < results.length; i++){
			
			var result = results[i];
		
			// If the last result was a multi line transaction, whos entire contents were not searched
			if(Number(result.getValue('internalid')) == Number(lastId2) && Number(result.getValue('line')) > Number(lastLine)){ // Get the remaining lines

				allResults = allResults.concat(result);
			  
			}else if(result.getValue('internalid') > lastId2){ // If the last result was not multi lined -OR- if it was not missing a line, get the next result
			  
				allResults = allResults.concat(result);
			}
		}
	}	
	
	return allResults;
}	
