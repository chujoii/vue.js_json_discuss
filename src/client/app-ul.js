"use strict";

const max_scroll_bar_position = 60;
const min_scroll_bar_position = 20;

var appul = new Vue({
	el: '#app-ul',
	data: {
		file_name: '',
		seen_dz: true,
		seen_ul: false,
		db: [],
		scroll_bar_position: 40,
		scroll_bar_step:1
	},
	methods: {
		delete_user: function (index) {
			this.db.splice(index, 1);
		},
		scroll_up: function () {
			this.scroll_bar_position -= (min_scroll_bar_position < this.scroll_bar_position) ? this.scroll_bar_step : 0;
			console.log ("up " + this.scroll_bar_position);
		},
		scroll_down: function () {
			this.scroll_bar_position += (max_scroll_bar_position > this.scroll_bar_position) ? this.scroll_bar_step : 0;
			console.log ("down " + this.scroll_bar_position);
		},
		scroll_bar: function () {
			console.log("scroll_bar");
		}
	}
})
