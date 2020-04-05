"use strict";

function dropHandler(ev) {
	console.log('File(s) dropped');

	// Prevent default behavior (Prevent file from being opened)
	ev.preventDefault();

	if (ev.dataTransfer.items) {
		// Use DataTransferItemList interface to access the file(s)
		for (var i = 0; i < ev.dataTransfer.items.length; i++) {
			// If dropped items aren't files, reject them
			if (ev.dataTransfer.items[i].kind === 'file') {
				var file = ev.dataTransfer.items[i].getAsFile();
				console.log('... file[' + i + '].name = ' + file.name);

				var read = new FileReader();
				read.readAsText(file);
				read.onloadend = function(){
					appul.db = parse_name(read.result);
					appul.db.sort();
					appul.seen_dz = false;
					appul.seen_ul = true;
					appul.file_name = file.name;
				}
			}
		}
	} else {
		// Use DataTransfer interface to access the file(s)
		for (var i = 0; i < ev.dataTransfer.files.length; i++) {
			console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
		}
	}
}


function dragOverHandler(ev) {
	//console.log('File(s) in drop zone'); 

	// Prevent default behavior (Prevent file from being opened)
	ev.preventDefault();
}

function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

const regex_name = /"user"\s*:\s*"([^"]+)/gi;

function parse_name (input_string) {
	let db = [];
	let match;
	while ((match = regex_name.exec(input_string)) !== null) {
		db.push(match[1]);
		console.log('found:' + match[1]);
	}
	return db.filter( onlyUnique );
}
