"use strict";

var appul = new Vue({
	el: '#app-ul',
	data: {
		seen_dz: true,
		seen_ul: false,
		db: []
	},
	methods: {
		delete_user: function (index) {
			this.db.splice(index, 1);
		}
	}
})
