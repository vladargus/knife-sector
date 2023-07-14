import { useEffect, useState } from 'react'
import brands from '../mockData/brands.json'
import countries from '../mockData/countries.json'
import colors from '../mockData/colors.json'
import bladeTypes from '../mockData/bladeTypes.json'
import lockTypes from '../mockData/lockTypes.json'
import knives from '../mockData/knives.json'
import users from '../mockData/users.json'
import httpService from '../services/http.service'

const useMockData = () => {
  const statusConsts = {
    idle: 'Not Started',
    pending: 'In Process',
    successed: 'Ready',
    error: 'Error occured'
  }
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(statusConsts.idle)
  const [progress, setProgress] = useState(0)
  const [count, setCount] = useState(0)
  const summaryCount =
    knives.length +
    brands.length +
    countries.length +
    colors.length +
    bladeTypes.length +
    lockTypes.length +
    users.length

  const incrementCount = () => {
    setCount((prevState) => prevState + 1)
  }

  const updateProgress = () => {
    if (count !== 0 && status === statusConsts.idle) {
      setStatus(statusConsts.pending)
    }
    const newProgress = Math.floor((count / summaryCount) * 100)
    if (progress < newProgress) {
      setProgress(() => newProgress)
    }
    if (newProgress === 100) {
      setStatus(statusConsts.successed)
    }
  }

  useEffect(() => {
    updateProgress()
  }, [count])

  async function initialize() {
    try {
      for (const brand of brands) {
        await httpService.put('brand/' + brand.id, brand)
        incrementCount()
      }
      for (const knife of knives) {
        await httpService.put('knife/' + knife.id, knife)
        incrementCount()
      }
      for (const country of countries) {
        await httpService.put('country/' + country.id, country)
        incrementCount()
      }
      for (const color of colors) {
        await httpService.put('color/' + color.id, color)
        incrementCount()
      }
      for (const bladeType of bladeTypes) {
        await httpService.put('bladeType/' + bladeType.id, bladeType)
        incrementCount()
      }
      for (const lockType of lockTypes) {
        await httpService.put('lockType/' + lockType.id, lockType)
        incrementCount()
      }
      for (const user of users) {
        await httpService.put('user/' + user.id, user)
        incrementCount()
      }
    } catch (error) {
      setError(error)
      setStatus(statusConsts.error)
    }
  }

  return { error, initialize, progress, status }
}

export default useMockData
