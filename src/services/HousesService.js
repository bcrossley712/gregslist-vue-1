import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class HousesService {
  async getHouses() {
    const res = await api.get('api/houses')
    logger.log(res.data)
    AppState.houses = res.data
  }
  async getActiveHouse(id) {
    const res = await api.get('api/houses/' + id)
    logger.log(res.data)
    AppState.activeHouse = res.data
  }
  async createHouse(data) {
    const res = await api.post('api/houses', data)
    logger.log(res.data)
    AppState.houses.unshift(res.data)
    return res.data
  }
  async removeHouse(id) {
    const res = await api.delete('api/houses/' + id)
    logger.log(res.data)
  }
}

export const housesService = new HousesService()