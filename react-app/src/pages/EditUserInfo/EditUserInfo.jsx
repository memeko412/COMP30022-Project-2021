import Navbar from '../../components/navbar/Navbar'
import UserInfoForm from '../../components/UserInfoForm/UserInfoForm'
import { Form, Avatar, Input, message, Select } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useEffect, useState, useCallback } from 'react'
import saveImg from '../../img/contact/save.png'
import dontSaveImg from '../../img/contact/dont-save.png'
import { getLocal, removeLocal, setLocal } from '../../utils/storage'
import moment from 'moment'
import { useHistory, useLocation } from 'react-router-dom'
import { request } from '../../common/util'
import UploadAvatar, { uploadEvent } from '../../components/UploadAvatar/UploadAvatar'
import getUrlParams from '../../utils/getUrlParams'
import polygonImg from '../../img/contact/polygon.png'
import './editUserInfo.scss'

const EditUserInfo = () => {
  const history = useHistory()
  const location = useLocation()
  const [form] = Form.useForm()
  const [userName, setUserName] = useState('')
  const [friendId, setFriendId] = useState()
  const [url, setUrl] = useState()
  const [groupId, setGroupId] = useState()
  const [groupList, setGroupList] = useState([])

  useEffect(() => {
    const userInfo = getLocal('editingUserInfo')
    if (userInfo) {
      const {
        photo,
        photoString,
        phone,
        name,
        userName,
        notes,
        address,
        dateMeet,
        company,
        fax,
        email,
        friendId,
      } = userInfo

      setUserName(userName || name)
      setFriendId(friendId)
      setUrl(photoString || photo)
      form.setFieldsValue({
        phone,
        notes,
        address,
        dateMeet: dateMeet ? moment(dateMeet) : '',
        company,
        fax,
        email
      })
    }

    return () => removeLocal('editingUserInfo')
  }, [form])

  useEffect(() => {
    ;(async () => {
      const userInfo = getLocal('editingUserInfo') || {}
      const res = await request({
        method: 'GET',
        url: `/group/find`
      })
      if (res.data?.length) {
        setGroupList(res.data)
        userInfo.groupId && setGroupId(userInfo.groupId)
      }
    })()
  }, [])

  const onFileChange = useCallback(url => {
    setUrl(url)
  }, [])

  const onSave = async () => {
    const values = form.getFieldsValue()
    const params = getUrlParams(location.search)
    if (params?.type === 'userSelf') {
      const data = {
        ...values,
        userName,
        photo: url
      }
      try {
        await request({
          url: `/user/info`,
          data
        })
        setLocal('userInfo', {
          ...getLocal('userInfo'),
          ...data
        })
        message.success('Successfully modified')
        history.push('/home')
      } catch (error) {}
    } else {
      try {
        await request({
          url: `/home/contact/updateFriend/${friendId}`,
          data: {
            ...values,
            photoString: url,
            name: userName
          }
        })
        if (groupId) {
          await request({
            url: `/home/contact/change/group?friendId=${friendId}&groupId=${groupId}`
          })
        }

        message.success('Saved successfully')
      } catch (error) {}
    }
  }

  const onCancel = () => {
    const params = getUrlParams(location.search)
    if (params?.type === 'userSelf') {
      history.push('/home')
    } else {
      history.push('/contact')
    }
  }

  return (
    <div className='edit-user-info-wrapper'>
      <Navbar />
      <div className='top'>
        <div className='avatar'>
          <Avatar
            className='picture'
            shape='square'
            size={220}
            src={url}
            onClick={() => uploadEvent.emit('click')}
            icon={<UserOutlined />}
          />
        </div>
        <div className='input-wrapper'>
          <Input
            className='user-name-input'
            value={userName}
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>

        <div className='input-grouping-wrapper'>
          <Select
            value={groupId}
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

      <UploadAvatar onChange={onFileChange} />

      <div className='bottom-container'>
        <div className='settings'>
          <div onClick={onSave} className='one-function'>
            <img src={saveImg} alt='' className='img' />
          </div>
          <div onClick={onCancel} className='one-function'>
            <img src={dontSaveImg} alt='' className='img' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUserInfo
