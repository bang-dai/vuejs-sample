let formatdate = function(value) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var d = new Date(value);
    return d.toLocaleDateString("en-US", options);
};

//var apiURL = 'https://api.github.com/repositories/11730342/commits?per_page=5&sha=';
var apiURL = '/js/webdevtest-data.js';

let vm = new Vue({
    el: '#app',

    filters: { formatdate },

    data: {
        items: null
    },

    created: function() {
        this.fetchData();
    },

    methods: {
        fetchData: function() {
            var self = this;
            $.get(apiURL, function(data){
              self.items = data.promotion_objects;
              console.log('data fetched');
          }, 'json')
        },
        link : function(e) {
            console.log(e.target);
        }
    },

    computed: {

    },

    watch:{

    },
})