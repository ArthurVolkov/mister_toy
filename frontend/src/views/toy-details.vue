<template>
  <div v-if="toy" class="toy-details flex flex-col justify-center align-center">
    <h2>Name: {{ toy.name }}</h2>
    <h3>Price: {{ toy.price }}</h3>
    <h3>Type: {{ toy.type }}</h3>
    <h3>In stock: {{ toy.inStock }}</h3>

    <div>Created at: {{ createdAt }}</div>

    <ul class="review-container clean-list">
      <li v-for="review in toy.reviews" :key="review._id">
        <span>Review from: {{ review.owner }} ➡ </span>
        <pre>   {{ review.txt }}</pre>
      </li>
    </ul>

    <div class="details-btn-container">
      <button @click="reviewShown = !reviewShown">Add review</button>
      <router-link to="/toy" class="back-btn">Back</router-link>
    </div>

    <form
      v-if="reviewShown"
      @submit.prevent="addReview"
      class="review-form flex flex-col"
    >
      <el-input
        type="textarea"
        :rows="4"
        placeholder="Write your review here"
        v-model="review.txt"
      >
      </el-input>
      <button>Send</button>
    </form>
  </div>
  <div
    v-else
    v-loading.fullscreen.lock="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  ></div>
</template>



<script>
import { toyService } from "@/services/toy.service.js";
import { showMsg } from '../services/eventBus.service.js'


export default {
  name: "toy-details",
  data() {
    return {
      toy: null,
      reviewShown: false,
      review: {
        txt: '',
        owner: '',
        toyId: ''
      }
    };
  },
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
    loading() {
      return this.toy ? false : true
    },
  },
  methods: {
    async loadToy() {
      const id = this.$route.params.toyId;
      try {
        const toy = await toyService.getById(id)
        this.toy = toy
      } catch (err) {
        showMsg('Cannot load toy', 'danger')
      }
    },
    async addReview() {
      this.review.toyId = this.toy._id
      try {
        await this.$store.dispatch({ type: 'addReview', review: this.review })
        this.loadToy()
        this.review.txt = ''
        showMsg('Review saved successfuly')
      } catch (err) {
        showMsg('Cannot save review', 'danger')
      }
    }
  },
  created() {
    this.loadToy()
  },
  watch: {
    "$route.params.toyId"(id) {
      console.log("Changed to", id);
      this.loadTodo();
    },
  },
};
</script>