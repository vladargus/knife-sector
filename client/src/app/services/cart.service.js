import httpService from './http.service'

const cartEndpoint = 'cart/'

const cartService = {
  get: async () => {
    const { data } = await httpService.get(cartEndpoint)
    return data
  },
  create: async (payload) => {
    const { data } = await httpService.post(cartEndpoint, payload)
    return data
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      cartEndpoint + payload._id,
      payload
    )
    return data
  }
}
export default cartService
