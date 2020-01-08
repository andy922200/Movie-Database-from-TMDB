<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Vue from "vue";
import { PaginationPlugin } from "bootstrap-vue";
Vue.use(PaginationPlugin);

export default {
  name: "App"
};
</script>
