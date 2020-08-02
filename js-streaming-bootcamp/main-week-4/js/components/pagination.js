export default {
  template: `<nav aria-label="Page navigation example">
        <ul class="pagination">

          <li class="page-item" :class="{disabled:pages.current_page === 1}">
            <a class="page-link" href="#" @click.prevent="updatePages(pages.current_page-1)"> << </a>
          </li>

          <li class="page-item" 
            v-for="i in pages.total_pages" :key="i" :class="{'active':pages.current_page === i}">
            <a class="page-link" href="#" 
               @click.prevent="updatePages(i)">{{ i }} </a>
          </li>
          
          <li class="page-item" :class="{disabled:pages.current_page === pages.total_pages}"><a class="page-link" href="#" @click.prevent="updatePages(pages.current_page+1)"> >> </a></li>
        </ul>
      </nav>`,
  props: ['pages'],
  methods: {
    updatePages(num) {
      console.log(num);
      this.$emit("update", num)
    }

  }

}