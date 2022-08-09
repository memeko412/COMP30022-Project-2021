import React, { useEffect, useState } from 'react'
import { Input, Modal } from 'antd'
import saveImg from '../../../img/contact/save.png'
import dontSaveImg from '../../../img/contact/dont-save.png'
import { request } from '../../../common/util'
import { groupingAddEvent } from '../GroupingUserList'
import EventEmitter from '../../../utils/eventEmitter'
import './addGrouping.scss'

export const addOrEditGroupingEvent = new EventEmitter()

const AddGrouping = ({ visible, hidden }) => {
  const [info, setInfo] = useState({})
  const [isEdit, setIsEdit] = useState(false)

  const onCancel = () => {
    hidden()
    setInfo({ groupName: '' })
  }

  const handleAdd = async () => {
    if (isEdit) {
      await request({
        url: '/group/update',
        data: info
      })
    } else {
      await request({
        url: '/group/add',
        data: info
      })
    }

    groupingAddEvent.emit('getList')
    onCancel()
  }

  const onChange = (key, value) => {
    setInfo({ ...info, [key]: value })
  }

  useEffect(() => {
    addOrEditGroupingEvent.on('setInfo', v => {
      setInfo(v)
      setIsEdit(true)
    })
  }, [])

  return (
    <Modal
      className='add-grouping-modal'
      width={804}
      centered
      title={<div className='title'>Enter a new group name</div>}
      visible={visible}
      onCancel={onCancel}
      footer={
        <div className='settings'>
          <div onClick={handleAdd} className='one-function'>
            <img src={saveImg} alt='' className='img' />
          </div>
          <div onClick={onCancel} className='one-function'>
            <img src={dontSaveImg} alt='' className='img' />
          </div>
        </div>
      }
    >
      <div className='content'>
        <Input
          value={info.groupName}
          onChange={e => onChange('groupName', e.target.value)}
          className='input'
          placeholder='Grouping name'
        />
      </div>
    </Modal>
  )
}

export default React.memo(AddGrouping)
