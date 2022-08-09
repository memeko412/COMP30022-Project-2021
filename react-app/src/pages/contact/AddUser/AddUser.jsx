import { useEffect, useRef } from 'react'
import { Form, Avatar, Input, Select } from 'antd'
import { useState } from 'react'
import UserInfoForm from '../../../components/UserInfoForm/UserInfoForm'
import polygonImg from '../../../img/contact/polygon.png'
import saveImg from '../../../img/contact/save.png'
import dontSaveImg from '../../../img/contact/dont-save.png'
import addIcon from '../../../img/contact/add-icon.png'
import { request } from '../../../common/util'
import { getLocal } from '../../../utils/storage'
import transformFileToBase64 from '../../../utils/fileToBase64'
import './addUser.scss'

const AddUser = ({ onCancel, onAddComplete }) => {
  const [userName, setUserName] = useState('')
  const [groupList, setGroupList] = useState([])
  const [groupId, setGroupId] = useState()
  const [form] = Form.useForm()
  const inputRef = useRef()
  const [photoUrl, setPhotoUrl] = useState('')

  useEffect(() => {
    ;(async () => {
      const res = await request({
        method: 'GET',
        url: `/group/find`
      })
      if (res.data?.length) {
        setGroupList(res.data)
      }
    })()
  }, [])

  const onFileChange = async ({ target }) => {
    if (target.files) {
      const [file] = target.files
      const base64 = await transformFileToBase64(file)
      form.setFieldsValue({ photo: base64 })
      setPhotoUrl(base64)
    }
  }

  const onUpload = () => {
    inputRef.current.click()
  }

  const reset = () => {
    form.resetFields()
    setPhotoUrl('')
    setGroupId()
    setUserName('')
  }

  const handleAdd = async () => {
    const values = form.getFieldsValue()
    await request({
      method: 'PUT',
      url: '/home/contact/addFriend',
      data: {
        ...values,
        name: userName,
        groupId,
        photoString:photoUrl,
        userId: getLocal('userId')
      }
    })
    onAddComplete()
    reset()
  }

  return (
    <div className='add-user-info-wrapper'>
      <div className='top-container'>
        <div className='avatar'>
          <Avatar
            className='picture'
            shape='square'
            size={220}
            src={photoUrl}
            icon={<img src={addIcon} onClick={onUpload} alt='' className='add-icon' />}
          />
        </div>
        <div className='input-wrapper'>
          <Input
            className='user-name-input'
            placeholder='Enter name'
            value={userName}
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>

        <div className='input-grouping-wrapper'>
          <Select
            onChange={v => setGroupId(v)}
            getPopupContainer={() => document.querySelector('.input-grouping-wrapper')}
            placeholder='Grouping'
            className='grouping-select'
            suffixIcon={<img src={polygonImg} alt='' className='down-arrow-img' />}
          >
            {groupList.map(v => (
              <Select.Option key={v.groupId} value={v.groupId}>
                {v.groupName}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <UserInfoForm clasName='form' form={form} />

      <div className='bottom-container'>
        <div className='settings'>
          <div onClick={handleAdd} className='one-function'>
            <img src={saveImg} alt='' className='img' />
          </div>
          <div onClick={onCancel} className='one-function'>
            <img src={dontSaveImg} alt='' className='img' />
          </div>
        </div>
      </div>

      <input ref={inputRef} type='file' className='upload-file-input' onChange={onFileChange} />
    </div>
  )
}

export default AddUser
