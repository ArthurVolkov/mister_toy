<template>
  <section class="list-container main-container">
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        background
        :total="toysCount"
        :page-size="5"
        @current-change="setPage"
      ></el-pagination>
    </div>
    <!-- <ul v-if="!loading" class="toy-list card-grid flex"> -->
    <ul
      v-loading.fullscreen.lock="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      class="toy-list card-grid flex"
    >
      <toy-preview
        v-for="toy in toys"
        :toy="toy"
        :key="toy._id"
        class="toy-item-container flex flex-col justify-between align-center"
        @remove="remove"
      ></toy-preview>
    </ul>
    <!-- <div v-else class="toy-loading flex justify-center align-center">
      LOADING...
    </div> -->
  </section>
</template>



<script>
import toyPreview from "@/cmps/toy-preview.vue";

import { Loading } from 'element-ui';


export default {
  name: "toy-list",
  data() {
    return {
    }
  },
  methods: {
    remove(toy) {
      this.$emit('remove', toy);
    },
    setPage(val) {
      console.log('val:', val)
      this.$emit('setPage', val);
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    toysCount() {
      return this.$store.getters.toysCount
    }
  },
  props: {
    toys: {
      type: Array,
    },
  },
  components: {
    toyPreview,
  },
  created() {
  },
};
</script>