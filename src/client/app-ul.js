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
			console.log("search uniq ...");
			let uniq = this.db_part.filter( onlyUnique );
			if (uniq.length === this.db.length) {console.log("return uniq"); return uniq;}
			if (uniq.length === this.db_part.length) {console.log("return uniq"); return uniq;}

			// found not equal elements
			console.log(this.db);
			console.log(this.db_part);
			console.log(uniq);
			console.log("delete ununique  from" + (this.db_pointer + uniq.length) + "   num" +  (num_displayed_elements - uniq.length));
			this.db.splice(this.db_pointer + uniq.length, num_displayed_elements - uniq.length);
			for (let i=0; i<uniq.length; i++) {
				this.db[this.db_pointer + i] = uniq[i]; // fixme: this element already exist in db, but in unknown places
			}
			this.db_part = this.db.slice(this.db_pointer, this.db_pointer + num_displayed_elements);
			return this.get_unique();
		},
		scroll_up: function () {
			if (0 < this.db_pointer) {
				this.db_pointer -= num_displayed_elements;
				this.db_part = this.db.slice(this.db_pointer, this.db_pointer + num_displayed_elements);
				this.get_unique();
				this.scroll_bar_position = scroll_bar_button_height + (scroll_bar_height - 3*scroll_bar_button_height) * this.db_pointer / (this.db.length - num_displayed_elements);
			}
		},
		scroll_down: function () {
			if (this.db.length - num_displayed_elements > this.db_pointer) {
				this.db_pointer += num_displayed_elements;
				this.db_part = this.db.slice(this.db_pointer, this.db_pointer + num_displayed_elements);
				this.get_unique();
				this.scroll_bar_position = scroll_bar_button_height + (scroll_bar_height - 3*scroll_bar_button_height) * this.db_pointer / (this.db.length - num_displayed_elements);
			}
		},
		scroll_bar: function () {
			console.log("scroll_bar");
		}
	}
})
