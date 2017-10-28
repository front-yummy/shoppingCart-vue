var vm = new Vue({
    el: '#app',
    data: {
        addressList: [],
        addressLimiteNum: 3,
        selectedAddressIndex: 0,
        transferType: 1,
        isShowDeleteDia: false,
        deleteId: 0

    },
    mounted: function() {
        this.$nextTick(function() {
            this.loadAdressList();
        });
    },
    methods: {
        loadAdressList: function() {
            axios.get('data/address.json')
                .then(res => {
                    if (res.data.status >= 0) {
                        this.addressList = res.data.result;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        openDelDialog: function(id) {
            this.isShowDeleteDia = true;
            this.deleteId = id;
        },
        deleteList: function() {
            this.addressList.forEach((item, index) => {
                if (item.addressId == this.deleteId) {
                    this.addressList.splice(item, 1);
                }
            });
            this.isShowDeleteDia = false;
        }
    },
    computed: {
        filterAddressList: function() {
            return this.addressList.slice(0, this.addressLimiteNum);
        }

    }

});