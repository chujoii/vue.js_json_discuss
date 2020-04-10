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

				bench_time = Date.now();
				console.log('benchmark: drop_file_time start!');

				var read = new FileReader();
				read.readAsText(file);
				read.onloadend = function(){
					bench('file loaded: ');
					appul.db = parse_name(read.result);
					bench('file parsed: ');
					console.log("start sort ...");
					appul.db.sort();
					console.log("end sort");
					bench('array sorted: ');
					appul.seen_dz = false;
					appul.seen_ul = true;
					appul.file_name = file.name;
					appul.scroll_bar_position = scroll_bar_button_height;
					appul.db_part = appul.db.slice(appul.db_pointer, num_displayed_elements);
					bench('copy to db_part: ');
					appul.get_unique();
					bench('leave only unique in db_part: ');
					console.log("ready for render");
				}
			}
		}
	} else {
		// Use DataTransfer interface to access the file(s)
		for (var i = 0; i < ev.dataTransfer.files.length; i++) {
			//console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
		}
	}
}


function dragOverHandler(ev) {
	//console.log('File(s) in drop zone'); 

	// Prevent default behavior (Prevent file from being opened)
	ev.preventDefault();
}

const regex_name = /"user"\s*:\s*"((?:[^"\\]+|\\.)+)/gi;

function parse_name (input_string) {
	let db = [];
	let match;
	console.log("parse start");
	while ((match = regex_name.exec(input_string)) !== null) {
		db.push(match[1]);
		//console.log('found:' + match[1]);
	}
	console.log("parse finish");
	return db;
}

function bench (msg) {
	let new_time = Date.now();
	console.log('benchmark:\t' + msg + (new_time - bench_time) + ' ms');
	bench_time = new_time;
}
