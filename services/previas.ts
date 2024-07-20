import { Previas } from '@/types/data'
import customFetch from './customFetch'

export const getPrevias = async () => {
  try {
    const response = await customFetch({
      path: `/api/previas`,
      method: 'GET',
      withCredentials: false
    })
    const data = await response.json()
    return data.previas
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

export const getMyPrevias = async () => {
  try {
    const response = await customFetch({
      path: `/api/previas/myPrevias`,
      method: 'GET',
      withCredentials: true
    })
    const data = await response.json()
    return { previas_data: data.previa_data, user_id: data.user_id }
  } catch (error) {
    console.error('Error fetching user data:', error)
    return { previas_data: [], user_id: '' }
  }
}

export const getCreatedPrevias = async () => {
  try {
    const response = await customFetch({ path: `/api/previas/created`, method: 'GET', withCredentials: true })
    const data = await response.json()
    return data.previas
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

export const postPrevia = async (formData: Previas) => {
  try {
    const response = await customFetch({ path: `/api/previa`, method: 'POST', withCredentials: true, body: formData })
    return response
    } catch (error) {
    console.error('Error fetching user data:', error)
    }
}

