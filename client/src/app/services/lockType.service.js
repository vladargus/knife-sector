import httpService from './http.service'

const locktypeEndpoint = 'lockType/'

const locktypeService = {
  get: async () => {
    const { data } = await httpService.get(locktypeEndpoint)
    return data
  }
}
export default locktypeService
