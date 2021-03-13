<template>
  <section v-if="toyToEdit" class="toy-edit flex flex-col align-center">
    <h2>{{ title }}</h2>
    <form @submit.prevent="saveToy">
      <label for="input-name">Set name:</label>
      <el-input
        id="input-name"
        type="text"
        placeholder="Your next toy name"
        v-model="toyToEdit.name"
        clearable
      >
      </el-input>
      <label for="input-price">Set price:</label>
      <el-input-number
        class="el-input"
        id="input-price"
        v-model.number="toyToEdit.price"
        :min="1"
      >
      </el-input-number>
      <label for="typeFilter">Tipe:</label>
      <el-select
        id="typeFilter"
        v-model="toyToEdit.type"
        class="el-input"
        placeholder="Tipe:"
      >
        <el-option
          v-for="item in tipes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <button>Save</button>
      <router-link to="/toy" class="back-btn">Back</router-link>
    </form>
  </section>
  <div
    v-else
    v-loading.fullscreen.lock="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
  </div>
</template>



<script>
import { toyService } from "@/services/toy.service.js";
import { showMsg } from '../services/eventBus.service.js'


export default {
  name: "toy-edit",
  data() {
    return {
      toyToEdit: null,
      tipes: [{
        value: 'Funny',
        label: 'Funny'
      }, {
        value: 'Adult',
        label: 'Adult'
      }, {
        value: 'Educational',
        label: 'Educational'
      }],
    }
  },
  computed: {
    toyId() {
      return this.$route.params.toyId
    },
    title() {
      return this.toyId ? 'Toy Edit' : 'Toy Add'
    },
    loading() {
      return this.toyToEdit ? false : true
    },
  },
  methods: {
    async saveToy() {
      console.log('Saving...', this.toyToEdit);
      try {
        await this.$store.dispatch({ type: 'saveToy', toy: this.toyToEdit })
        showMsg('Toy saved')
        this.toyToEdit = toyService.getEmptyToy()
        this.$router.push('/toy')
        try {
          await this.$store.dispatch({ type: "loadToys" });
        } catch (err) {
          showMsg("Cannot load toys", "danger");
        }
      } catch (err) {
        showMsg('Cannot save toys', 'danger')
      }
    },
  },
  created() {
    if (this.toyId) {
      try {
        toyService.getById(this.toyId)
          .then((toy) => {
            console.log('toy:', toy)
            this.toyToEdit = toy
          })
      } catch (err) {
        showMsg('Cannot load toy', 'danger')
      }
    } else {
      this.toyToEdit = toyService.getEmptyToy()
    }
  },
};
</script>