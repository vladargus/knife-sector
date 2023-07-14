import httpService from './http.service'

const knivesEndpoint = 'knife/'

const knifeService = {
  get: async () => {
    const { data } = await httpService.get(knivesEndpoint)
    return data
  },
  create: async (payload) => {
    const { data } = await httpService.put(knivesEndpoint + payload.id, payload)
    return data
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      knivesEndpoint + payload.id,
      payload
    )
    return data
  },
  remove: async (knifeId) => {
    const { data } = await httpService.delete(knivesEndpoint + knifeId)
    return data
  }
}

export default knifeService
