<template>
  <div>
    <div class="row justify-content-center">
      <input
        type="text"
        class="form-control"
        placeholder="Please enter some keywords."
        v-model="query"
        @change="enterKeyword(query)"
        :class="{'is-invalid':error}"
        required
      />
    </div>
    <p id="error">{{errorMessage}}</p>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      query: "",
      errorMessage: "",
      error: false
    };
  },
  methods: {
    enterKeyword(query) {
      if (this.error) {
        this.errorMessage = "Please check again.";
      } else {
        this.error = false;
        this.errorMessage = "";
        this.$emit("enter-keyword", query);
      }
    }
  },
  watch: {
    query: function() {
      let rule = /^[^\s].{0,}/;
      if (!rule.test(this.query)) {
        this.error = true;
        this.errorMessage = "No blank at the first space.";
      } else {
        this.error = false;
        this.errorMessage = "";
      }
    }
  }
};
</script>

<style>
.form-control {
  width: 50%;
}
#error {
  text-align: center;
  margin: 10px auto;
  color: red;
  font-weight: bold;
  font-size: 18px;
}
</style>
