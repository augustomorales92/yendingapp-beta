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
    console.log(data)
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

export const postPrevia = async (newFormData: Previas) => {

  try {
    const response = await customFetch({ path: `/api/previa`, method: 'POST', withCredentials: true, body: newFormData })
    return response
    } catch (error) {
    console.error('Error fetching user data:', error)
    return 'Error creating previa'
    }
}

