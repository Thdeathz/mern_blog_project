import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { storage } from '~/firebase/config'

const useStorage = () => {
  const uploadFile = async file => {
    // upload file to storage
    const fileRef = ref(storage, `images/${file.name + v4()}`)
    const res = await uploadBytes(fileRef, file)
    const path = res.metadata.fullPath

    // get uploaded file url
    const imageRef = ref(storage, path)
    const url = await getDownloadURL(imageRef)

    return url
  }

  return uploadFile
}

export default useStorage
