import React, { useEffect, useRef } from 'react'
import fileToBase64 from '../../utils/fileToBase64'
import EventEmitter from '../../utils/eventEmitter'

export const uploadEvent = new EventEmitter()

const UploadAvatar = ({ onChange }) => {
  const inputRef = useRef()

  useEffect(() => {
    uploadEvent.on('click', () => {
      inputRef.current?.click()
    })
  }, [])

  const onFileChange = async ({ target }) => {
    if (target.files) {
      const [file] = target.files
      const base64 = await fileToBase64(file)
      onChange(base64)
    }
  }

  return <input ref={inputRef} type='file' style={{ display: 'none' }} onChange={onFileChange} />
}

export default React.memo(UploadAvatar)
