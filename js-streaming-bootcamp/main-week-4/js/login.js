new Vue({
  el: '#app',
  data: {
    user: {
      email: '',
      password: '',
    },
  },
  methods: {
    signUp() {
      const api = `https://course-ec-api.hexschool.io/api/auth/login`;
      axios.post(api, this.user)
        .then(res => {
          console.log(res);
          document.cookie = `hexWeek4Token=${res.data.token}; expires=${new Date(res.data.expired * 1000)}; path=/`;
          window.location = "/products.html";
        }).catch(err => {
          console.log(err);
        });
    },
    signOut() {
      document.cookie = `hexWeek4Token=; expires=; path=/`;
      //this.token = "";
    },
  },
})

