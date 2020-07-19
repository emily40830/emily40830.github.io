const app = new Vue({
  el: '#app',
  data: {
    items: [
      {
        id: 150943459043,
        title: 'Grinstant混搭可拆組式13吋後背包 - 藍色碎花限定版',
        category: '後背包',
        content: 'Grinstant是一種充分混搭的時尚服飾概念。我們設計師運用多種印花及色彩元素來設計後背包，搭配妳個人的創意，能迅速地展現屬於妳風格的高質感後背包。Grinstant客製化背包展現個人的專屬時尚，讓妳微笑即刻閃耀！',
        description: `多樣款式任意搭配，簡單創造自己風格 \n．持久耐用的防潑水聚脂纖維材質 ．一次擁有肩背包、後背包、零錢包 \n．輕鬆將前背袋與主背包分離 \n．主背包加墊防撞設計可攜13吋筆電 \n．內建鑰匙環可快速拿出與放回 \n．後建隱藏式口袋`,
        imageURL: 'https://cdn01.pinkoi.com/product/GAWRn3QX/0/2/800x0.jpg',
        enabled: true,
        origin_price: 1900,
        price: 1425,
        unit: '個',
        options: {
          rate: 5,

        }
      },
      {
        id: 184937710923,
        title: '真皮極簡四方焦糖咖啡掀蓋側肩背包',
        category: '斜背包',
        content: '可放錢包，鑰匙包，手機，化妝品，眼鏡盒等…… 可放A4雜誌',
        description: `真皮極簡四方焦糖咖啡掀蓋側肩背包 牛皮 包包尺寸:寬 33CM 高 27CM 包底寬 9CM 焦糖咖啡色 450g 可放錢包，鑰匙包，手機，化妝品，眼鏡盒等…… 可放A4雜誌`,
        imageURL: 'https://cdn01.pinkoi.com/product/i2aFRq84/7/800x0.jpg',
        enabled: true,
        origin_price: 2980,
        price: 2980,
        unit: '個'
      },
      {
        id: 194583024854,
        title: 'sobag復古軍綠帆布雙肩包女 日系文藝旅行背包男 ins簡約學生書包',
        category: '後背包',
        content: '它是一款中型包 男女生都很適合，在包外口添置了3個口袋，讓東西的擺放更合理方便。蓋頭位置做了一個皮標，看上去無盡的逼格呈現。肩帶也特意加寬加厚，讓肩膀更舒適。空間容量都很大 是一款可以背很久的背包。',
        description: `純色帆布，真皮裝飾， 復古包型，氣質滿滿； 大容量，內部有電腦隔層，可以放置14吋筆電`,
        imageURL: 'https://cdn01.pinkoi.com/product/rkwB9EBb/0/2/800x0.jpg',
        enabled: false,
        origin_price: 1665,
        price: 1200,
        unit: '個'
      },
    ],
    product: {}
  },
  methods: {
    updateItem() {
      // 編輯產品，id本身存在
      if (this.product.id) {
        const index = this.items.findIndex(e => {
          e.id === this.product.id
        });
        this.items[index] = this.product;

      } else { // 新增產品，id本身不存在
        const id = new Date().getTime();
        this.product.id = new Date().getTime();
        this.items.push(this.product);
      };
      this.product = {};
      $("#productModal").modal('hide');
    },
    deleteItem() {
      if (this.product.id) {
        const id = this.product.id;
        const index = this.items.findIndex(i => i.id === id);
        this.items.splice(index, 1);
        this.product = {};
      };
      $("#delProductModal").modal('hide');
    },
    openModal(action, product) {
      switch (action) {
        case "new":
          this.product = {};
          $("#productModal").modal("show");
          break;
        case "edit":
          this.product = Object.assign({}, product);
          $("#productModal").modal("show");
          break;
        case "delete":
          $("#delProductModal").modal("show");
          this.product = Object.assign({}, product);
          break;

      };
    }

  }
});