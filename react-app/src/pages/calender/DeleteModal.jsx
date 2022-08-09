import { Modal, Button } from 'antd'
import { useEffect } from 'react'
import { request } from '../../common/util'
import moment from 'moment'

const DeleteModal = ({ list, visible, hidden, onDelete, onEdit }) => {
  const deleteEvent = async v => {
    await request({
      url: '/event/delete',
      method: 'GET',
      data: { eventId: v.eventId }
    })
    onDelete(v.eventId)
  }

  useEffect(() => {
    if (!list.length) {
      hidden()
    }
  }, [list, hidden])

  const handleEdit = v => {
    onEdit({ ...v, eventId: v.eventId, time: moment(v.time) })
  }

  return (
    <Modal width={480} visible={visible} onCancel={hidden} centered footer={null}>
      <ul className='calender-event-list'>
        {list.map(v => (
          <li className='calender-event-item' key={v.eventId}>
            {v.description}
            <Button
              onClick={() => deleteEvent(v)}
              className='delete-btn'
              type='primary'
              danger
              size='small'
            >
              Delete
            </Button>

            <Button
              onClick={() => handleEdit(v)}
              className='delete-btn'
              type='primary'
              size='small'
            >
              Edit
            </Button>
          </li>
        ))}
      </ul>
    </Modal>
  )
}

export default DeleteModal
