import httpService from './http.service'

const cartEndpoint = 'cart/'

const cartService = {
  get: async () => {
    const { data } = await httpService.get(cartEndpoint)
    return data
  },
  create: async (payload) => {
    const { data } = await httpService.put(cartEndpoint + payload.id, payload)
    return data
  },
  update: async (payload) => {
    const { data } = await httpService.patch(cartEndpoint + payload.id, payload)
    return data
  },
  remove: async (cartId, itemId) => {
    const { data } = await httpService.delete(
      cartEndpoint + `${cartId}/` + 'items/' + itemId
    )
    return data
  }
}
export default cartService
