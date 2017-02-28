let promotion  =  {
    props: ['item', 'index'],
    computed: {
        formatedDate: {
            get: function() {
                return vm.$options.filters.formatdate(this.item.drawings[0].drawing_date);
            }
        },
        promotionLink: {
            get: function() {
                let page = Number(this.index) + 1;
                return '?promo=promo0'+ page;
            }
        }
    },
    template: `<div class="col-md-12 margin_large">
                <div><img class="box_shadow" :src="item.promo_image_url"></div>
               <div class="margin_small"><a :href="promotionLink" @click.prevent="closePromotionList" :title="item.promotion_name" class="promotion_link">{{ item.promotion_name }}</a></div>
               <p class="promotion_summary">{{ item.summary }}</p>
               <div class="next_drawing">Next Drawing Date: {{ formatedDate }}</div>
               </div>`,
    methods: {
        closePromotionList () {
            this.$emit('closepromotionlist', this.item);
        }
    }
};


let formatdate = function(value) {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let d = new Date(value);
    return d.toLocaleDateString("en-US", options);
};


let vm = new Vue({
    el: '#app',

    components: { promotion },

    filters: { formatdate },

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
            let self = this;
            let apiURL = '/js/webdevtest-data.js';
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