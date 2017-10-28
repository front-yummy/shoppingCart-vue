var vm = new Vue({
    el: '#app',
    data: {
        productList: [],
        checkAllFlag: false,
        totalMoney: 0,
        isShowDeleteDia: false,
        deleteId: 0
    },
    mounted() {
        this.$nextTick(function() {
            this.loadlist();
        })
    },
    methods: {
        loadlist: function() {
            axios.get('data/cart.json')
                .then(res => {
                    if (res.data.status >= 0) {
                        this.productList = res.data.result.list;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });

        },
        changeMoney: function(item, type) {
            if (type > 0) {
                item.count++;
            } else {
                if (item.count > 0) {
                    item.count--;
                }
            }
            this.calTotalMoney();
        },
        selectProduct: function(item) {
            if (typeof(item.checked) == 'undefined') {
                this.$set(item, 'checked', false);
            }
            item.checked = !item.checked;
            this.calTotalMoney();

        },
        selectAll: function(flag) {
            this.checkAllFlag = (flag > 0) ? true : false;
            var _this = this;
            this.productList.forEach(function(item, index) {
                if (typeof(item.checked) == 'undefined') {
                    _this.$set(item, 'checked', _this.checkAllFlag);
                } else
                    item.checked = _this.checkAllFlag;
            });
            this.calTotalMoney();
        },
        calTotalMoney: function() {
            this.totalMoney = 0;
            this.productList.forEach((item, index) => {
                if (item.checked)
                    this.totalMoney += item.count * item.price;
            });

        },
        openDelDialog: function(id) {
            this.isShowDeleteDia = true;
            this.deleteId = id;
        },
        deleteList: function() {
            this.productList.forEach((item, index) => {
                if (item.id == this.deleteId) {
                    this.productList.splice(item, 1);
                }
            });
            this.isShowDeleteDia = false;
            this.calTotalMoney();
        }
    },
    filters: {
        formatMoney: function(value) {
            return "￥" + value.toFixed(2) + "元";
        }
    }
});