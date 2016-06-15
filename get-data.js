// Pull all transaction information to be used for cashflow
// Get all transactions > get all transactions with type bank > pull bank transaction details out of the first search
// must be pulled in two searches in order to pull split accounts, pulling straight from bank search will only show transaction line items that have to deal with bank
function main() {
	
	// Get all transactions (All transaction details)
	var Filter	= new Array();
	Filter[0} 	= new nlobjSearchFilter('posting', null, 'is', 'T');
	var Column 	= new Array();
	Column[0] 	= new nlobjSearchColumn('internalid').setSort();
	Column[1] 	= new nlobjSearchColumn('line').setSort();
	Column[2] 	= new nlobjSearchColumn('trandate');
	Column[3] 	= new nlobjSearchColumn('account');
	Column[4] 	= new nlobjSearchColumn('amount');
	Column[5] 	= new nlobjSearchColumn('entity');
	Column[6] 	= new nlobjSearchColumn('type');
	Column[7] 	= new nlobjSearchColumn('custrecord_cflvl3', 'account');

	var allTransactions = search(Filter, Column, 'transaction');

	// Get all transactions, that come from bank accounts (Only ID's)
	var Filter	= new Array();
	Filter[0]	= new nlobjSearchFilter('posting', null, 'is', 'T');
	Filter[1]	= new nlobjSearchFilter('type', 'account', 'is', 'Bank');
	var Column 	= new Array();
	Column[0] 	= new nlobjSearchColumn('internalid').setSort();
	Column[1] 	= new nlobjSearchColumn('line').setSort();

	var bankTransactions = search(Filter, Column, 'transaction');

	// Create a master list of bank account transactions
	var checkArray = new Array();
	for(var x = 0; x < bankTransactions.length; x++){
		
		checkArray = checkArray.concat(bankTransactions[x].getValue('internalid'));
	}
	
	// Pull all transactions with details from alltransactions list, based on list of bank account transactions
	var completeResults = new Array();

	for(var x = 0; x < allTransactions.length; x++){
		
		try{
			if(Number(checkArray.indexOf(allTransactions[x].getValue('internalid'))) != Number(-1)){
				
				completeResults = completeResults.concat(allTransactions[x]);
			}			
		}catch(err){
			print(x);
		}
	}
	
	// Array for data saving
	var iidArray = new Array()
	var trandateArray = new Array()
	var accountArray = new Array()
	var amountArray = new Array()
	var entitiyArray = new Array()
	var typeArray = new Array()
	var cflvl3Array = new Array()
	
	// Sort data
	for(var x = 0; x < completeResults.length; x++){
			
		iidArray = iidArray.concat(completeResults[x].getValue('internalid'));
		trandateArray = trandateArray.concat(completeResults[x].getValue('trandate'));
		accountArray = accountArray.concat(completeResults[x].getValue('account'));
		amountArray = amountArray.concat(completeResults[x].getValue('amount'));
		entitiyArray = entitiyArray.concat((completeResults[x].getText('entity')).replace(/,/g,''));
		typeArray = typeArray.concat(completeResults[x].getValue('type'));
		cflvl3Array = cflvl3Array.concat(completeResults[x].getValue('custrecord_cflvl3','account'));
	}

        // Save data in database folder "11074", to be used for Cash Flow and other reports
	saveFile('Internal ID.txt', 11074, iidArray);
	saveFile('Tran Date.txt', 11074, trandateArray);
	saveFile('Account.txt', 11074, accountArray);
	saveFile('Amount.txt', 11074, amountArray);
	saveFile('Entity.txt', 11074, entitiyArray);
	saveFile('Type.txt', 11074, typeArray);
	saveFile('CF Lvl 3.txt', 11074, cflvl3Array);
}
