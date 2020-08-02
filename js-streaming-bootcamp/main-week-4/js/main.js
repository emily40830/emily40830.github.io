import pagination from "./components/pagination.js";
import productModal from "./components/productModal.js";
import delproductModal from "./components/delproductModel.js";

Vue.component("pagination", pagination);
Vue.component("productModal", productModal);
Vue.component("delproductModal", delproductModal);

const app = new Vue({
  el: "#app",
  data() {
    return {
      token: "",
      items: [],
      product: {
        imageUrl: [],

      },
      pagination: {},
      api: {
        uuid: "3e7363b8-da21-4c72-8ae8-a20ff72c4fd1",
        apiPath: "https://course-ec-api.hexschool.io/api/",
      },
      token: "",
      action: "",
      loadingbtn: "",
      delloadingbtn: ""
    }
  },
  methods: {
    getItems(num = 1) {
      //後端取得資料的api
      //console.log(num);
      const url = `${this.api.apiPath}${this.api.uuid}/admin/ec/products?page=${num}`;
      //axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      //console.log(url)
      // 將token傳入header做驗證
      axios.get(url).then(res => {
        //console.log(res.data.meta)
        this.items = res.data.data;
        this.pagination = res.data.meta.pagination;
        this.loadingbtn = "";
        if (this.product.title) {
          //console.log("hide modal");
          this.product = { imageUrl: [] }
          $("#productModal").modal('hide');
          $("#delProductModal").modal('hide');
        }
        //console.log(this.items);
      }).catch(err => {
        console.log(err);
      })
    },
    openModal(action, product) {
      this.action = action;
      let url = ""
      if (action !== "new") {
        url = `${this.api.apiPath}${this.api.uuid}/admin/ec/product/${product.id}`;
      }
      switch (action) {
        case "new":
          this.product = { imageUrl: [] };
          $("#productModal").modal("show");
          break;
        case "edit":
          this.loadingbtn = product.id;
          axios.get(url)
            .then(res => {
              this.product = res.data.data;
              $("#productModal").modal("show");
              this.loadingbtn = ''
            })
          //this.product = Object.assign({}, product);
          break;
        case "delete":
          this.delloadingbtn = product.id
          axios.get(url)
            .then(res => {
              this.product = res.data.data;
              $("#delProductModal").modal("show");
              this.delloadingbtn = ''
              //this.loadingbtn = ''
            })
          //this.product = Object.assign({}, product);
          break;

      };
    },
    // deleteItem() { },
    // updateItem() { }
  },
  created() {
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexWeek4Token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
    if (this.token === '') {
      window.location = 'login.html';
    }

    this.getItems()
  }
})