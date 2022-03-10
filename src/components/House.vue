<template>
  <router-link :to="{ name: 'HouseDetails', params: { id: house.id } }">
    <div class="row">
      <div class="col-12">
        <div class="bg-white rounded shadow">
          <img
            :src="house.imgUrl"
            alt="house image"
            class="img-fluid rounded-top"
          />
          <h4 class="text-center">
            ${{ house.price }} | Built in {{ house.year }}
          </h4>
          <p class="text-center">Click for more info</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    house: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
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