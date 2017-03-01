var promotion  =  {
    props: ['item', 'index'],
    computed: {
        formatedDate: {
            get: function() {
                return vm.$options.filters.formatdate(this.item.drawings[0].drawing_date);
            }
        },
        promotionLink: {
            get: function() {
                var page = Number(this.index) + 1;
                return '?promo=promo0'+ page;
            }
        }
    },
    template: `<div class="col-md-12 margin_large">
                <div><img class="box_shadow" :src="item.promo_image_url"></div>
               <div class="margin_small"><a :href="promotionLink" @click.prevent="closePromotionList" :title="item.promotion_name" class="promotion_link">{{ item.promotion_name }}</a></div>
               <p class="simple_text">{{ item.summary }}</p>
               <div class="simple_text">Next Drawing Date: {{ formatedDate }}</div>
               </div>`,
    methods: {
        closePromotionList () {
            this.$emit('closepromotionlist', this.item);
        }
    }
};


var formatdate = function(value) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var d = new Date(value);
    return d.toLocaleDateString("en-US", options);
};

var formatmoney = function(value) {
    var money = value.split(' ');
    return  money[0];
}


var vm = new Vue({
    el: '#app',

    components: { promotion },

    filters: { formatdate, formatmoney },

    data: {
        items: null,
        displayPromotionView: false,
        currentItem: null
    },

    created: function() {
        this.fetchData();
    },

    updated: function() {
        this.displayTable();
    },

    methods: {
        fetchData: function() {
            var self = this;
            var apiURL = '/js/webdevtest-data.js';
            $.get(apiURL, function(data){
              self.items = data.promotion_objects;
          }, 'json')
        },
        activePromotionView: function(item) {
            this.displayPromotionView = true;
            this.currentItem = item;
        },
        activePromotionList: function() {
            this.displayPromotionView = false;
        },
        displayTable: function() {
            $('.table').cardtable();
        }
    },

    computed: {

    },

    watch:{

    },
})