function saveFile(filename, location, array){

	var File = nlapiCreateFile(filename, 'PLAINTEXT', array);
	File.setFolder(location);
	nlapiSubmitFile(File);
}
