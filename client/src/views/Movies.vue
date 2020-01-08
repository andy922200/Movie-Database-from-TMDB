<template>
  <div>
    <!--add navbar-->
    <navBar />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="container">
      <!--add filter-->
      <genreFilter :genre-list="genres" @selected-genre="fetchGenreMovies" />
      <!--add searchBar-->
      <searchBar @enter-keyword="fetchByKeyword" />
      <!--blank-->
      <br />
      <div class="row justify-content-center">
        <h2>{{thisYear}} Movie Database</h2>
      </div>
      <br />
      <div class="row justify-content-center">
        <!--Pagination-->
        <b-pagination
          v-model="currentPage"
          :total-rows="totalPage"
          :per-page="perPage"
          first-text="First"
          prev-text="Prev"
          next-text="Next"
          last-text="Last"
          @click.native="fetchNextData(currentPage)"
        ></b-pagination>
      </div>
      <br />
      <!--show matched Movie Data -->
      <moviesData :data="movies" />
    </div>
  </div>
</template>

<script>
import moviesAPI from "./../apis/movies";
import { Toast } from "./../utils/helpers";
import genreFilter from "./../components/MoviesGenreFilter";
import moviesData from "./../components/MoviesData";
import searchBar from "./../components/SearchBar";
import navBar from "./../components/Navbar";

export default {
  name: "Movies",
  components: {
    genreFilter,
    moviesData,
    searchBar,
    navBar
  },
  data() {
    return {
      movies: [],
      genres: [],
      currentPage: 1,
      totalPage: 0,
      perPage: 1,
      genreId: -1,
      query: "",
      thisYear: new Date().getFullYear()
    };
  },
  created() {
    this.fetchInitialData();
    this.fetchGenreList();
  },
  methods: {
    async fetchInitialData() {
      try {
        let year = new Date().getFullYear();
        let page = 1;

        /*get movie data by the genre*/
        const res = await moviesAPI.getInitialMovies({ year, page });
        if (res.status >= 400 || res.data.results.length === 0) {
          throw new Error();
        }

        /*get all movie id*/
        const movieIdList = res.data.results.map(r => {
          return r.id;
        });

        /*get trailers info*/
        if (movieIdList.length !== 0) {
          for (let i = 0; i < movieIdList.length; i++) {
            let res2 = await moviesAPI.getTrailer(movieIdList[i]);

            if (res2.data.results.length === 0) {
              res.data.results[i].trailer = [];
            } else {
              res.data.results[i].trailer = res2.data.results[0];
            }
          }
        }

        res.data.results = res.data.results.map(r => ({
          ...r,
          shortOverview: r.overview.substring(0, 100)
        }));

        this.totalPage = res.data.total_pages;
        this.currentPage = res.data.page;
        this.movies = res.data.results;
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "暫時無法取得資料，請稍後再試"
        });
      }
    },
    async fetchGenreList() {
      try {
        const res = await moviesAPI.getGenreList();
        if (res.status >= 400 || res.data.genres.length === 0) {
          throw new Error();
        }
        this.genres = res.data.genres;
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "暫時無法取得資料，請稍後再試"
        });
      }
    },
    async fetchGenreMovies(genreId) {
      try {
        let year = new Date().getFullYear();
        let page = 1;
        /*get movie data by the genre*/
        const res = await moviesAPI.getGenreMovies({ genreId, year, page });

        if (res.status >= 400 || res.data.results.length === 0) {
          throw new Error();
        }

        /*get all movie id*/
        const movieIdList = res.data.results.map(r => {
          return r.id;
        });

        /*get trailers info*/
        if (movieIdList.length !== 0) {
          for (let i = 0; i < movieIdList.length; i++) {
            let res2 = await moviesAPI.getTrailer(movieIdList[i]);

            if (res2.data.results.length === 0) {
              res.data.results[i].trailer = [];
            } else {
              res.data.results[i].trailer = res2.data.results[0];
            }
          }
        }

        res.data.results = res.data.results.map(r => ({
          ...r,
          shortOverview: r.overview.substring(0, 100)
        }));

        this.currentPage = 1;
        this.genreId = genreId;
        this.movies = res.data.results;
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "暫時無法取得資料，請稍後再試"
        });
      }
    },
    async fetchByKeyword(query) {
      try {
        let year = new Date().getFullYear();
        let page = 1;

        /*get movie data by the keyword*/
        const res = await moviesAPI.searchMovies({ query, page, year });

        if (res.status >= 400 || res.data.results.length === 0) {
          throw new Error();
        }

        /*get all movie id*/
        const movieIdList = res.data.results.map(r => {
          return r.id;
        });

        /*get trailers info*/
        if (movieIdList.length !== 0) {
          for (let i = 0; i < movieIdList.length; i++) {
            let res2 = await moviesAPI.getTrailer(movieIdList[i]);

            if (res2.data.results.length === 0) {
              res.data.results[i].trailer = [];
            } else {
              res.data.results[i].trailer = res2.data.results[0];
            }
          }
        }

        res.data.results = res.data.results.map(r => ({
          ...r,
          shortOverview: r.overview.substring(0, 100)
        }));

        this.query = res.config.params.query;
        this.totalPage = res.data.total_pages;
        this.currentPage = 1;
        this.movies = res.data.results;
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "暫時無法取得資料 or 無資料，請稍後再試"
        });
      }
    },
    async fetchNextData(idx) {
      try {
        if (idx <= 0 || idx > this.totalPage) {
          return;
        }
        this.currentPage = idx;

        let year = new Date().getFullYear();
        let page = idx;
        let genreId = this.genreId;
        let query = this.query || "query";
        /*divide 3 functions*/
        if (query.length !== 0) {
          const res = await moviesAPI.searchMovies({ query, page, year });
          if (res.status >= 400) {
            throw new Error();
          }

          /*get all movie id*/
          const movieIdList = res.data.results.map(r => {
            return r.id;
          });

          /*get trailers info*/
          if (movieIdList.length !== 0) {
            for (let i = 0; i < movieIdList.length; i++) {
              let res2 = await moviesAPI.getTrailer(movieIdList[i]);

              if (res2.data.results.length === 0) {
                res.data.results[i].trailer = [];
              } else {
                res.data.results[i].trailer = res2.data.results[0];
              }
            }
          }

          res.data.results = res.data.results.map(r => ({
            ...r,
            shortOverview: r.overview.substring(0, 100)
          }));

          this.totalPage = res.data.total_pages;
          this.currentPage = res.data.page;
          this.movies = res.data.results;
        } else if (genreId === -1) {
          const res = await moviesAPI.getInitialMovies({ year, page });
          if (res.status >= 400 || res.data.results.length === 0) {
            throw new Error();
          }
          /*get all movie id*/
          const movieIdList = res.data.results.map(r => {
            return r.id;
          });

          /*get trailers info*/
          if (movieIdList.length !== 0) {
            for (let i = 0; i < movieIdList.length; i++) {
              let res2 = await moviesAPI.getTrailer(movieIdList[i]);

              if (res2.data.results.length === 0) {
                res.data.results[i].trailer = [];
              } else {
                res.data.results[i].trailer = res2.data.results[0];
              }
            }
          }

          res.data.results = res.data.results.map(r => ({
            ...r,
            shortOverview: r.overview.substring(0, 100)
          }));

          this.totalPage = res.data.total_pages;
          this.currentPage = res.data.page;
          this.movies = res.data.results;
        } else {
          const res = await moviesAPI.getGenreMovies({ genreId, year, page });

          if (res.status >= 400 || res.data.results.length === 0) {
            throw new Error();
          }
          /*get all movie id*/
          const movieIdList = res.data.results.map(r => {
            return r.id;
          });

          /*get trailers info*/
          if (movieIdList.length !== 0) {
            for (let i = 0; i < movieIdList.length; i++) {
              let res2 = await moviesAPI.getTrailer(movieIdList[i]);

              if (res2.data.results.length === 0) {
                res.data.results[i].trailer = [];
              } else {
                res.data.results[i].trailer = res2.data.results[0];
              }
            }
          }

          res.data.results = res.data.results.map(r => ({
            ...r,
            shortOverview: r.overview.substring(0, 100)
          }));

          this.totalPage = res.data.total_pages;
          this.currentPage = res.data.page;
          this.movies = res.data.results;
        }
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "暫時無法取得資料，或無資料，請稍後再試"
        });
      }
    }
  }
};
</script>
