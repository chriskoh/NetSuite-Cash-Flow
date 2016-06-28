function printRow(name, data, type, indent){
	
	var setStartDate = new Date(request.getParameter('datefield'));
	var setEndDate = new Date(request.getParameter('datefield2'));
	
	if(type == 'data'){
		
		if(indent == true){
			var title = "titlesIndented"
		}else{
			var title = "titles";
		}
		
		var tdid = "data";
		
	}else{
		
		var title = "names";
		var tdid = "dataTotal";		
	}
	
	var cwt = Number(0);
	
	html += '<tr id="myTRWhite">' +
				'<td id="' + title + '">' + name + '</td>';
	
	if(data != null){
		
		for(var x = 0; x < data.length; x++){
			html += '<td id="' + tdid + '"><div id="dollarSign">$</div> ' + accountingFormat(data[x]) + '</td>';
			cwt += data[x];
		}
		html += 	'<td id="' + tdid + '"><div id="dollarSign">$</div> ' + accountingFormat(cwt) + '</td>';
		
	}else{
		
		for(var x = setStartDate; x <= setEndDate; x = nlapiAddDays(x, 7)){
			html += '<td id="data"></td>';
		}
		html += '<td id="data"></td>';
	}
	
	html +=	'</tr>';
}
