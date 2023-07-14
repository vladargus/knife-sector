import httpService from './http.service'

const colorEndpoint = 'color/'

const colorService = {
  get: async () => {
    const { data } = await httpService.get(colorEndpoint)
    return data
  }
}
export default colorService
