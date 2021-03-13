<template>
  <section class="toy-app flex flex-col">
    <div class="filter-container">
      <div class="filter-btns main-container flex justify-between align-center">
        <toy-filter @setFilter="setFilter" @setSort="setSort"></toy-filter>
        <router-link class="open-edit" to="/toy/edit">Add new toy</router-link>
      </div>
    </div>

    <toy-list
      :toys="toysToShow"
      @remove="removeToy"
      @setPage="setPage"
    ></toy-list>
  </section>
</template>


<script>
import toyList from "@/cmps/toy-list.vue";
import toyFilter from "@/cmps/toy-filter.vue";
import { showMsg } from '../services/eventBus.service.js'

export default {
  name: "toy-app",
  computed: {
    toysToShow() {
      // console.log("toysToShow in toy-app:", this.$store.getters.toysToShow);
      return this.$store.getters.toysToShow;
    },
  },
  methods: {
    async removeToy(toy) {
      console.log("Removing...", toy);
      try {
        await this.$store.dispatch({ type: "removeToy", toy })
        showMsg("Toy removed");
        try {
          await this.$store.dispatch({ type: "loadToys" });
        } catch (err) {
          showMsg("Cannot load toys", "danger");
        }
      } catch (err) {
        showMsg("Cannot remove toy", "danger");
      };
    },
    // async removeToy(toy) {
    //   console.log("Removing...", toy);
    //   try {
    //     await this.$store.dispatch({ type: "removeToy", toy })
    //     showMsg("Toy removed");
    //   } catch (err) {
    //     showMsg("Cannot remove toy", "danger");
    //   };
    // },
    async setFilter(filterBy) {
      this.$store.commit({
        type: "setFilter",
        filterBy: JSON.parse(JSON.stringify(filterBy))
      });
      try {
        await this.$store.dispatch({ type: "loadToys" });
      } catch (err) {
        showMsg("Cannot load toys", "danger");
      }
    },
    async setPage(page) {
      this.$store.commit({ type: "setPage", page });
      try {
        await this.$store.dispatch({ type: "loadToys" });
      } catch (err) {
        showMsg("Cannot load toys", "danger");
      }
    },
    async setSort(sortBy) {
      this.$store.commit({ type: 'setSort', sortBy })
      try {
        await this.$store.dispatch({ type: "loadToys" });
      } catch (err) {
        showMsg("Cannot load toys", "danger");
      }
    }
  },
  components: {
    toyList,
    toyFilter,
  },
};
</script>