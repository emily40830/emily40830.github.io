const MVC = {
  data: {
    uuid: '3e7363b8-da21-4c72-8ae8-a20ff72c4fd1',
    apiPath: 'https://course-ec-api.hexschool.io/',
    products: []
  },
  getData() {
    const MVCobj = this;
    const url = `${MVCobj.data.apiPath}api/${MVCobj.data.uuid}/ec/products`;
    axios.get(url)
      .then(res => {
        MVCobj.data.products = res.data.data;
        MVCobj.render();
      })
      .catch(error => { console.log(error) })
  },
  render() {
    const MVCobj = this;
    const items = document.getElementById('item-content')
    let item_show = ""
    MVCobj.data.products.forEach(item => {
      item_show += `
        <div class="card mb-3" style="width: 540px;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${item.imageUrl[0]}" class="card-img">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.content}</p>
            <p class="card-text"><small class="text-muted">NT ${item.price}</small></p>
          </div>
        </div>
      </div>
    </div>
      `
    })
    items.innerHTML = item_show;
  }
};

MVC.getData();