<template>
  <div class="row justify-content-center">
    <select
      class="custom-select"
      id="inputGroupSelect"
      @change="selectGenre(selectedGenre)"
      v-model="selectedGenre"
    >
      <option selected value>All Genres</option>
      <option v-for="genre in genreList" :key="genre.id" :value="genre.id">{{genre.name}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "GenreFilter",
  props: {
    genreList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedGenre: ""
    };
  },
  methods: {
    selectGenre(selectedGenre) {
      this.$emit("selected-genre", selectedGenre);
    }
  }
};
</script>

<style>
.custom-select {
  width: 50%;
}
</style>