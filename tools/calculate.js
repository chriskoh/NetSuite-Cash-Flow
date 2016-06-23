// Given an array of transaction objects, calculate and sort data in to an array (where every position is a week or moth)
function calculate(results, category){
	
	var setStartDate = new Date(request.getParameter('datefield'));
	var setEndDate = new Date(request.getParameter('datefield2'));
	var array = new Array();
	var array2 = new Array();
	
	for(var x = setStartDate; x <= setEndDate; x = nlapiAddDays(x, 7)){
		array2 = array2.concat(Number(0));
	}

	for(var x = 0; x < results.length; x++){
		
		if(Number(results[x].section) == Number(category)){
			
			var diff = daysBetween(new Date(setStartDate), new Date(results[x].trandate));
			var delta = diff / 7;
			var pos = (Math.ceil(delta)) - 1;
			array2[pos] += Number(results[x].amount);
		}
	}
	
	return array2;	
} 
