<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-4 my-2" v-for="h in houses" :key="h.id">
        <House :house="h" />
      </div>
      <Modal>
        <template #modal-title>Create House</template>
        <template #modal-body><HouseForm /></template>
      </Modal>
    </div>
    <b
      title="Create Car"
      class="
        create-btn
        btn btn-success
        rounded-pill
        shadow
        d-flex
        align-items-center
        justify-content-center
      "
      data-bs-toggle="modal"
      data-bs-target="#form-modal"
    >
      <i class="mdi mdi-plus"></i>
    </b>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { housesService } from "../services/HousesService";
import { AppState } from "../AppState";
export default {
  setup() {
    onMounted(async () => {
      try {
        housesService.getHouses();
      } catch (error) {
        Pop.toast(error.message, "error");
        logger.log(error.message);
      }
      AppState.activeHouse = {};
    });
    return {
      houses: computed(() => AppState.houses),
    };
  },
};
</script>

<style>
.create-btn {
  font-size: 20px;
  height: 60px;
  width: 60px;
  z-index: 100;
  position: fixed;
  bottom: 10vh;
  right: 5vh;
}
</style>