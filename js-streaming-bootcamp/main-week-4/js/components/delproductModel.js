export default {
  template: `<div class="modal-dialog" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 id="exampleModalLabel" class="modal-title">
                <span>刪除產品</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger">{{ product.title }}</strong> ，商品刪除後將無法恢復。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                取消
              </button>
              <button type="button" class="btn btn-danger" @click="deleteItem"
              :disabled="inner===product.id">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                    v-if="inner === product.id"></span>
                確認刪除
              </button>
            </div>
          </div>
        </div>`,
  data() {
    return {
      inner: ""
    }
  },
  props: ['product', 'api'],
  methods: {
    deleteItem() {
      if (this.product.id) {
        this.inner = this.product.id;
        const id = this.product.id;
        const url = `${this.api.apiPath}${this.api.uuid}/admin/ec/product/${id}`;
        axios.delete(url).then(() => {
          this.$emit("delete")
          this.inner = "";
        })
        // const index = this.items.findIndex(i => i.id === id);
        // this.items.splice(index, 1);
        // this.product = {};
      };
      //$("#delProductModal").modal('hide');
    }
  }
}