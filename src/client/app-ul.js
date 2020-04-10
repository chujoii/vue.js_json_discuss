"use strict";

const num_displayed_elements = 5;
const scroll_bar_height = 180;
const scroll_bar_button_height = 20;

var appul = new Vue({
	el: '#app-ul',
	data: {
		file_name: '',
		seen_dz: true,
		seen_ul: false,
		db: [],
		db_part: [],
		db_pointer: 0,
		scroll_bar_position: 40,
		scroll_bar_step:1
	},
	methods: {
		delete_user: function (index) {
			this.db.splice(index + this.db_pointer, 1);
			this.db_part = this.db.slice(this.db_pointer, this.db_pointer + num_displayed_elements);
		},
		get_unique: function () {
			let changes = false;
			console.log("start search uniq ...");
			let i = this.db_pointer;
			let j = i + 1;
			let constrain_j;

			while (i < this.db.length - 1 && i < this.db_pointer + num_displayed_elements && j < this.db.length) {
				if (j==i) { j++; }
				if (this.db[i] === this.db[j]) {
					while (j<this.db.length && this.db[i] === this.db[j]) {
						j++;
						changes = true;
					}
					constrain_j = (j<this.db.length-1) ? j : this.db.length - 1;
					if (this.db[i] < this.db[constrain_j]) { // < or !==
						this.db[i+1] = this.db[constrain_j];
						changes = true;
					}
				}
				i++;
			}

			if (changes) {
				this.db.splice(i, j-i);
			}
			this.db_part = this.db.slice(this.db_pointer, this.db_pointer + num_displayed_elements);
			console.log("stop search uniq ...");
		},
		scroll_bar: function () {
			console.log("scroll_bar");
		},
		scroll_move: function (shift) {
			let pointer = this.db_pointer + shift * num_displayed_elements;
			if (pointer > this.db.length - num_displayed_elements) {
				pointer = this.db.length - num_displayed_elements; // subtraction can set pointer to negative value
			}
			if (pointer < 0) {
				pointer = 0;
			}

			if (this.db_pointer !== pointer) {
				this.db_pointer = pointer;
				this.db_part = this.db.slice(this.db_pointer, this.db_pointer + num_displayed_elements);
				this.get_unique();
				this.scroll_bar_position = scroll_bar_button_height + (scroll_bar_height - 3*scroll_bar_button_height) * this.db_pointer / (this.db.length - num_displayed_elements);
			}
		}
	}
})
