<template>
  <form @submit.prevent="createHouse()">
    <div>
      <div class="mb-3">
        <label for="imgUrl" class="form-label">Image</label>
        <input
          type="text"
          class="form-control"
          name="imgUrl"
          id="imgUrl"
          placeholder="https://thiscatdoesnotexist.com"
          v-model="editable.imgUrl"
        />
      </div>
    </div>
    <div>
      <div class="mb-3">
        <input
          type="number"
          class="form-control"
          name="price"
          id="price"
          placeholder="Price..."
          v-model="editable.price"
        />
      </div>
    </div>
    <div>
      <div class="mb-3">
        <input
          type="number"
          class="form-control"
          name="bathrooms"
          id="bathrooms"
          placeholder="Bathrooms..."
          v-model="editable.bathrooms"
        />
      </div>
    </div>
    <div>
      <div class="mb-3">
        <input
          type="number"
          class="form-control"
          name="bedrooms"
          id="bedrooms"
          placeholder="Bedrooms..."
          v-model="editable.bedrooms"
        />
      </div>
    </div>
    <div>
      <div class="mb-3">
        <input
          type="number"
          class="form-control"
          name="levels"
          id="levels"
          placeholder="Levels..."
          v-model="editable.levels"
        />
      </div>
    </div>
    <div>
      <div class="mb-3">
        <input
          type="number"
          class="form-control"
          name="year"
          id="year"
          placeholder="Year..."
          v-model="editable.year"
        />
      </div>
    </div>
    <div>
      <div class="mb-3">
        <input
          type="text"
          class="form-control"
          name="imgUrl"
          id="imgUrl"
          placeholder="Description..."
          v-model="editable.description"
        />
      </div>
    </div>
    <button class="btn btn-outline-primary">Create House</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { housesService } from "../services/HousesService";
import { watchEffect } from "@vue/runtime-core";
export default {
  props: {
    houseData: {
      type: Object,
      required: true,
      default: {},
    },
  },
  setup(props) {
    const editable = ref({});
    const router = useRouter();
    watchEffect(() => {
      editable.value = props.houseData;
    });
    return {
      editable,
      async createHouse() {
        try {
          let newHouse = await housesService.createHouse(editable.value);
          Modal.getOrCreateInstance(
            document.getElementById("form-modal")
          ).hide();
          router.push({ name: "HouseDetails", params: { id: newHouse.id } });
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.log(error.message);
        }
      },
    };
  },
};
</script>

<style>
</style>