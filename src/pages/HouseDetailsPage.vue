<template>
  <div class="container">
    <div class="row mt-2 bg-white rounded shadow">
      <div class="col-6 py-2">
        <img class="img-fluid" :src="house.imgUrl" alt="" />
      </div>
      <div class="col-6 py-2">
        <h4 class="text-center">
          ${{ house.price }} | Built in {{ house.year }}
        </h4>
        <p>{{ house.bedrooms }} bedrooms</p>
        <p>{{ house.bathrooms }} bathrooms</p>
        <p>{{ house.levels }} level(s)</p>
        <p>{{ house.description }}</p>
      </div>
      <div class="col-3 offset-9">
        <button class="btn btn-outline-warning m-1" @click="openModal">
          Edit House
        </button>
        <button class="btn btn-outline-danger m-1" @click="removeHouse(id)">
          Delete
        </button>
      </div>
      <Modal id="form-modal">
        <template #modal-title>Edit House</template>
        <template #modal-body><HouseForm :houseData="house" /></template>
      </Modal>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { housesService } from "../services/HousesService";
import { useRoute, useRouter } from "vue-router";
import { AppState } from "../AppState";
import { Modal } from "bootstrap";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    onMounted(async () => {
      try {
        await housesService.getActiveHouse(route.params.id);
      } catch (error) {
        Pop.toast(error.message, "error");
        logger.log(error.message);
      }
    });
    return {
      house: computed(() => AppState.activeHouse),
      openModal() {
        Modal.getOrCreateInstance(document.getElementById("form-modal")).show();
      },
      async removeHouse() {
        try {
          if (await Pop.confirm()) {
            await housesService.removeHouse(route.params.id);
            router.push({ name: "Houses" });
          }
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