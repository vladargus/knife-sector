import httpService from './http.service'

const bladeTypeEndpoint = 'bladeType/'

const bladeTypeService = {
  get: async () => {
    const { data } = await httpService.get(bladeTypeEndpoint)
    return data
  }
}
export default bladeTypeService
