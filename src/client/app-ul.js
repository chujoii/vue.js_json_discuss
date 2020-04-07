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
		scroll_up: function () {
			if (0 < this.db_pointer) {
				this.db_pointer--;
				this.db_part = this.db.slice(this.db_pointer, this.db_pointer + num_displayed_elements);
				this.scroll_bar_position = scroll_bar_button_height + (scroll_bar_height - 3*scroll_bar_button_height) * this.db_pointer / (this.db.length - num_displayed_elements);
			}
		},
		scroll_down: function () {
			if (this.db.length - num_displayed_elements > this.db_pointer) {
				this.db_pointer++;
				this.db_part = this.db.slice(this.db_pointer, this.db_pointer + num_displayed_elements);
				this.scroll_bar_position = scroll_bar_button_height + (scroll_bar_height - 3*scroll_bar_button_height) * this.db_pointer / (this.db.length - num_displayed_elements);
			}
		},
		scroll_bar: function () {
			console.log("scroll_bar");
		}
	}
})
