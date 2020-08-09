$(window).on('scroll', function () {
  if ($(window).scrollTop()) {
    $('header').addClass('header-down')
  } else {
    $('header').removeClass('header-down')
  }
})
import productModal from "./js/productModal.js"
Vue.component('productModal', productModal);
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);

new Vue({
  el: "#app",
  data() {
    return {
      products: [],
      tempProduct: {
      },
      status: {
        detailloadingItem: '',
        cartloadingItem: ''
      },
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: '',
      },
      errors: [],
      carts: [],
      cartTotal: 0,
      isLoading: false,
      isLoadingClear: false,
      uuid: '3e7363b8-da21-4c72-8ae8-a20ff72c4fd1',
      apiPath: 'https://course-ec-api.hexschool.io',
    }
  },
  methods: {
    getProducts(page = 1) {
      //this.isLoading = true;
      const url = `${this.apiPath}/api/${this.uuid}/ec/products?page=${page}`;
      axios.get(url).then(res => {
        this.products = res.data.data;
        //this.isLoading = false;
      });
    },
    getProduct(id) {
      this.status.detailloadingItem = id;
      const url = `${this.apiPath}/api/${this.uuid}/ec/product/${id}`;
      axios.get(url).then(res => {
        this.tempProduct = {
          ...res.data.data, //ES6寫法
          img: res.data.data.imageUrl[0],
          num: 1
        };

        $('#productModal').modal("show");
        //console.log(res);
        this.status.detailloadingItem = "";
      })
    },
    addToCart(id, quantity = 1) {
      this.status.cartloadingItem = id;
      const url = `${this.apiPath}/api/${this.uuid}/ec/shopping`;
      const cart = {
        product: id,
        quantity
      };
      axios.post(url, cart)
        .then(res => {
          console.log(res.data.data);
          this.status.cartloadingItem = '';
          this.getCarts();
        })
        .catch(err => {
          console.log(err.response);
          this.status.cartloadingItem = '';
        })
    },
    getCarts() {
      //this.isLoading = true;
      const url = `${this.apiPath}/api/${this.uuid}/ec/shopping`;
      axios.get(url)
        .then(res => {
          console.log(res);
          this.carts = res.data.data;
          this.getCartTotal();

          //console.log("hide modal");
          $('#productModal').modal("hide");

          //this.isLoading = false;
        })
    },
    getCartTotal() {
      this.cartTotal = 0;
      this.carts.forEach(item => {
        this.cartTotal += item.product.price * item.quantity;
      })
    },
    updateQuantity(id, quantity) {
      const url = `${this.apiPath}/api/${this.uuid}/ec/shopping`;
      this.status.cartloadingItem = true;

      const cart = {
        product: id,
        quantity
      }

      axios.patch(url, cart)
        .then(res => {
          //console.log(res.data.data);
          this.getCarts();
          this.status.cartloadingItem = '';
        })
        .catch(err => {
          console.log(err.response);
          this.status.cartloadingItem = '';
        })
    },
    clearCart() {
      const url = `${this.apiPath}/api/${this.uuid}/ec/shopping/all/product`;
      this.isLoadingClear = true;
      axios.delete(url)
        .then(res => {
          this.isLoadingClear = false,
            this.getCarts();
        })
    },
    removeCartItem(id) {
      this.isLoadingClear = id;
      const url = `${this.apiPath}/api/${this.uuid}/ec/shopping/${id}`;

      axios.delete(url).then(res => {
        this.getCarts();
        //this.getCartTotal();
        this.isLoadingClear = false;
      })
    },
    submitOrder() {
      const url = `${this.apiPath}/api/${this.uuid}/ec/orders`;
      axios.post(url, this.form).then(res => {
        if (res.data.data.id) {
          $('#orderModal').modal('show');
          this.getCarts();
        }
      }).catch(err => {
        console.log(err.response.data.errors);
      })
    }
  },
  created() {
    this.getProducts();
    this.getCarts();
  }
})