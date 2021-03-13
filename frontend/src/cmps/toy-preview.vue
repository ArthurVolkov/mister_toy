<template>
  <li>
    <h3>{{ toy.name }}</h3>
    <p>Price: {{ toy.price }}</p>
    <p>Type: {{ toy.type }}</p>
    <p>In stock: {{ inStock }}</p>
    <p>Created at: {{ createdAt }}</p>
    <div class="preview-btn-container flex justify-between align-center">
      <router-link class="preview-btn" :to="'/toy/details/' + toy._id"
        >Details</router-link
      >
      <router-link class="preview-btn" :to="'/toy/edit/' + toy._id"
        >Edit</router-link
      >
      <button class="preview-remove-btn" @click="removeToy(toy)">X</button>
    </div>
  </li>
</template>



<script>
import toyPreview from "@/cmps/toy-preview.vue";

export default {
  name: "toy-preview",
  computed: {
    createdAt() {
      const now = new Date(Date.now());
      const createdDate = new Date(this.toy.createdAt);
      if (
        now.getDate() === createdDate.getDate() &&
        now - createdDate < 1000 * 60 * 60 * 24
      )
        return createdDate.toTimeString().substr(0, 5);
      else if (now.getFullYear() === createdDate.getFullYear())
        return createdDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      else return createdDate.toISOString().substr(0, 10);
    },
    inStock() {
      return this.toy.inStock ? '✔' : '❌'
    }
  },
  methods: {
    removeToy(toy) {
      this.$emit("remove", toy);
    },
  },
  props: {
    toy: {
      type: Object,
    },
  },
  components: {
    toyPreview,
  },
  created() {
  }
};
</script>