// Parse numbers to be printed in to accouting format 
// if 0 return -
// if less than 0 enclose in ()
function accountingFormat(number){

	if(number == 0){
		return "-";
	}else{
		
		if(number > 0){
			
			return numberWithCommas(Number(number).toFixed(2));
		}else{
			
			return "(" + numberWithCommas(Math.abs(Number(number).toFixed(2))) + ")";
		}
	}
}
