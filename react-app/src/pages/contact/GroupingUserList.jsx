import { useState, useEffect, useCallback } from 'react'
import { Collapse } from 'antd'
import arrow from '../../img/contact/arrow.png'
import arrowRight from '../../img/contact/arrow-right.png'
import { request } from '../../common/util'
import deleteActive from '../../img/contact/delete-active.png'
import EventEmitter from '../../utils/eventEmitter'
import editImg from '../../img/contact/note.png'
import { addOrEditGroupingEvent } from './AddGrouping/AddGrouping'

const { Panel } = Collapse

export const groupingAddEvent = new EventEmitter()

const GroupingUserList = ({ currentStatus, handleShowGroupingAdd, onClick }) => {
  const [activeItem, setActiveItem] = useState()
  const [list, setList] = useState([])
  const [friendMap, setFriendMap] = useState({})

  const getFriendDetail = useCallback(async groupId => {
    try {
      const res = await request({
        method: 'GET',
        url: '/home/contact/getFriend',
        data: {
          groupId
        }
      })
      setFriendMap(v => ({ ...v, [groupId]: res.data }))
    } catch (error) {}
  }, [])

  const getList = useCallback(async () => {
    const res = await request({
      method: 'GET',
      url: '/group/find'
    })
    if (res.data?.length) {
      setList(res.data)

      for (const v of res.data) {
        await getFriendDetail(v.groupId)
      }
    }
  }, [getFriendDetail])

  useEffect(() => {
    getList()
    groupingAddEvent.on('getList', getList)
  }, [getList])

  const deleteGrouping = async (e, v) => {
    e.stopPropagation()
    try {
      const res = await request({
        method: 'GET',
        url: `/group/delete?groupId=${v.groupId}`
      })
      console.log('res', res)
      getList()
    } catch (error) {}
  }

  const onEditGrouping = async (e, v) => {
    e.stopPropagation()
    handleShowGroupingAdd()
    addOrEditGroupingEvent.emit('setInfo', v)
  }

  const onFriendClick =(friendId)=>{
    onClick(friendId)
    setActiveItem(friendId)
  }

  const renderList = group => {
    return (
      <ul className='grouping-content-wrapper'>
        {friendMap[group.groupId]?.map(v => (
          <li
            key={v.friendId}
            onClick={() => onFriendClick(v.friendId)}
            className={`grouping-content-item ${v.friendId === activeItem ? 'active-content' : ''}`}
          >
            <span className='item'>
              <img src={v.photoString} alt='' className='user-avatar' />
              <span className='user-name'>{v.name}</span>
            </span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <Collapse
      ghost
      bordered={false}
      expandIcon={({ isActive }) => (
        <div className='arrow-img-wrapper'>
          {isActive ? (
            <img src={arrow} alt='' className='arrow-img' />
          ) : (
            <img src={arrowRight} alt='' className='arrow-img-right' />
          )}
        </div>
      )}
      className='grouping-user-list'
    >
      {list.map((v, i) => (
        <Panel
          key={i}
          header={
            <>
              <span className='panel-header'>{v.groupName}</span>
              {currentStatus === 'delete' ? (
                <img
                  onClick={e => deleteGrouping(e, v)}
                  className='delete-grouping-img'
                  src={deleteActive}
                  alt=''
                />
              ) : currentStatus === 'batch' ? (
                <img
                  onClick={e => onEditGrouping(e, v)}
                  className='delete-grouping-img'
                  src={editImg}
                  alt=''
                />
              ) : null}
            </>
          }
        >
          {renderList(v)}
        </Panel>
      ))}
    </Collapse>
  )
}

export default GroupingUserList
