<template>
  <div>
    <div class="row">
      <div class="col-sm-6" v-for="movie in data" :key="movie.id">
        <div class="card">
          <div class="card-body row justify-content-center">
            <img
              v-if="movie.backdrop_path"
              class="card-img-top"
              :src="imageBaseURL+movie.backdrop_path"
              alt="Movie Image"
            />
            <img v-else class="card-img-top" :src="randomImageBaseURL+movie.id" alt="Movie Image" />
          </div>
          <div class="card-body overview">
            <h4 class="card-title">{{movie.title}}</h4>
            <p v-if="movie.shortOverview === ''" class="card-text">No overview</p>
            <p v-else class="card-text">{{movie.shortOverview}}</p>
            <p class="card-text">Release Date: {{movie.release_date}}</p>
            <p class="card-text">Popularity: {{movie.popularity | formatted}}</p>
          </div>
          <div class="card-footer trailer">
            <h5>Trailer</h5>
            <p>
              <a
                v-if="movie.trailer.key"
                :href="youtubeBaseURL+movie.trailer.key"
                target="_blank"
                class="btn btn-outline-primary"
              >watch on Youtube</a>
              <button
                type="button"
                v-else
                class="btn btn-outline-danger"
                disabled
              >Wait for the update...</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "moviesData",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      imageBaseURL: "https://image.tmdb.org/t/p/w300/",
      randomImageBaseURL: "https://picsum.photos/300/169?random=",
      youtubeBaseURL: "http://youtube.com/watch?v="
    };
  },
  filters: {
    formatted(value) {
      return value.toFixed(2);
    }
  }
};
</script>

<style>
.card {
  height: 600px;
}
.card-img-top {
  width: 100%;
  max-width: 300px;
}
.trailer {
  text-align: center;
}
a:not([href]) {
  color: #dc3545;
  text-decoration: none;
}
a:not([href]):hover {
  color: white;
}
</style>
