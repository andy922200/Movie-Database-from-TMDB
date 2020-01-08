<template>
  <div class="row justify-content-center">
    <input
      type="text"
      class="form-control"
      placeholder="Please enter some keywords."
      v-model="query"
      @change="enterKeyword(query)"
      required
    />
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      query: ""
    };
  },
  methods: {
    enterKeyword(query) {
      console.log(this);
      this.$emit("enter-keyword", query);
    }
  }
};
</script>

<style>
.form-control {
  width: 50%;
}
</style>
