import Navbar from '../../components/navbar/Navbar'
import notes from '../../img/contact/notes.png'
import add from '../../img/contact/add.png'
import share from '../../img/contact/share.png'
import search from '../../img/contact/search.png'
import menu from '../../img/contact/menu.png'
import grouping from '../../img/contact/grouping.png'
import add2 from '../../img/contact/add-circle.png'
import menu2 from '../../img/contact/menu2.png'
import menu2Active from '../../img/contact/menu2-active.png'
import deleteActive from '../../img/contact/delete-active.png'
import cancelIcon from '../../img/contact/cancel.png'
import deleteLogo from '../../img/contact/delete.png'

import { Avatar, Checkbox, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserList from './UserList'
import GroupingUserList from './GroupingUserList'
import UserInfo from './UserInfo'
import AddUser from './AddUser/AddUser'
import { request } from '../../common/util'
import { getLocal, setLocal } from '../../utils/storage'
import AddGrouping from './AddGrouping/AddGrouping'
import './contact.scss'

const Contact = () => {
  const history = useHistory()

  const [acitveTab, setActiveTab] = useState('all')
  const [currentAction, setCurrentAction] = useState('')
  const [pagination] = useState({
    currentPage: 1,
    pageSize: 200
  })
  const [friendId, setFriendId] = useState('')
  const [list, setList] = useState([])
  const [checkedList, setCheckedList] = useState([])
  const [showGroupingAdd, setShowGroupingAdd] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [searchValue, setSearchValue] = useState('')

  const getList = useCallback(async () => {
    const res = await request({
      method: 'GET',
      url: '/home/contact',
      data: {
        ...pagination,
        userId: getLocal('userId')
      }
    })
    if (res.data?.length) {
      setList(res.data)
      setFriendId(res.data[0].friendId)
    }
  }, [pagination])

  useEffect(() => {
    getList()
  }, [getList])

  useEffect(() => {
    if (!friendId) {
      return
    }
    const getFriendInfo = async () => {
      try {
        const res = await request({
          method: 'GET',
          url: `/home/contact/${friendId}`
        })
        setUserInfo(res.data)
      } catch (error) {}
    }

    getFriendInfo()
  }, [friendId])

  const onTabChange = v => setActiveTab(v)

  const onActionClick = useCallback(v => {
    setCurrentAction(v)
  }, [])

  const getActiveActionClass = v => {
    return `action ${currentAction ? 'clear-border' : ''} ${
      currentAction === v ? 'action-active' : ''
    }`
  }

  const onSelectAll = ({ target }) => {
    target.checked ? setCheckedList(list) : setCheckedList([])
  }

  const onCheckedChange = v => {
    setCheckedList(v)
  }

  const onCancel = () => setCheckedList([])

  const handleSetFriendId = useCallback(id => setFriendId(id), [])

  const onDelete = async () => {
    if (!checkedList.length) {
      return
    }

    const hide = message.loading({ content: 'deleting...', duration: 0 })
    for (const v of checkedList) {
      await request({
        url: `/home/contact/deleteFriend/${v.friendId}`,
        method: 'DELETE'
      })
    }
    hide()
    setCheckedList([])
    getList()
  }

  const onEdit = () => {
    history.push('/editUserInfo')
    setLocal('editingUserInfo', userInfo)
  }

  const onAddIconClick = () => {
    if (acitveTab === 'all') {
      currentAction !== 'add' ? setCurrentAction('add') : setCurrentAction('')
    } else {
      // show modal
      setShowGroupingAdd(true)
    }
  }

  const onDeleteIconClick = async () => {
    currentAction !== 'delete' ? setCurrentAction('delete') : setCurrentAction('')

    if (acitveTab === 'all') {
      if (!friendId) return
      await request({
        url: `/home/contact/deleteFriend/${friendId}`,
        method: 'DELETE'
      })
      getList()
    }
  }

  const handleShowGroupingAdd = useCallback(() => {
    setShowGroupingAdd(true)
  }, [])

  const hideGroupingAdd = useCallback(() => {
    setShowGroupingAdd(false)
  }, [])

  const onBatchIconClick = () => {
    currentAction !== 'batch' ? setCurrentAction('batch') : setCurrentAction('')
  }
  const searchRequest = async () => {
    const res = await request({
      method: 'GET',
      url: '/home/contact/get',
      data: {
        name: searchValue
      }
    })
    if (res.data) {
      setList(res.data)
      res.data.length && setFriendId(res.data[0].friendId)
    }
  }

  const onSearch = async e => {
    if (e.code === 'Enter') {
      if (!searchValue) {
        getList()
        return
      }
      searchRequest()
    }
  }

  const onSearchChange = e => setSearchValue(e.target.value)

  return (
    <div className='contact'>
      <Navbar />
      <div className='container'>
        <div className='left-container'>
          <div className='search-wrapper'>
            <img onClick={searchRequest} src={search} src={search} alt='' className='search-icon' />
            <input
              onKeyDown={onSearch}
              onChange={onSearchChange}
              className='search-input'
              placeholder='Search'
            />
          </div>

          <div className='tab-wrapper'>
            <div
              onClick={() => onTabChange('all')}
              className={`tab-item ${acitveTab === 'all' ? 'active' : ''}`}
            >
              <img src={menu} alt='' className='tab-img' />
              <span className='text'>Show all</span>
            </div>

            <div
              onClick={() => onTabChange('grouping')}
              className={`tab-item ${acitveTab === 'grouping' ? 'active' : ''}`}
            >
              <img src={grouping} alt='' className='tab-img' />
              <span className='text'>Grouping</span>
            </div>
          </div>

          {currentAction === 'batch' && acitveTab === 'all' ? (
            <div className='batch-action-wrapper'>
              <Checkbox checked={checkedList.length === list.length} onChange={onSelectAll} />
              {/*<span className='batch-action'>
                <img src={moveIcon} alt='' className='batch-action-icon' />
                <span className='move-to-text'>Move to</span>
          </span>*/}
              <span onClick={onDelete} className='batch-action'>
                <img src={deleteActive} alt='' className='batch-action-icon' />
                <span className='delete-text'>delete</span>
              </span>
              <span onClick={onCancel} className='batch-action'>
                <img src={cancelIcon} alt='' className='batch-action-icon' />
                <span className='cancel-text'>cancel</span>
              </span>
            </div>
          ) : null}

          {acitveTab === 'all' ? (
            <UserList
              list={list}
              friendId={friendId}
              onClick={handleSetFriendId}
              checkedList={checkedList}
              onCheckedChange={onCheckedChange}
              showCheck={currentAction === 'batch'}
            />
          ) : (
            <GroupingUserList
              currentStatus={currentAction}
              onClick={handleSetFriendId}
              handleShowGroupingAdd={handleShowGroupingAdd}
            />
          )}

          <div className='bottom-actions'>
            <div onClick={() => onAddIconClick()} className={getActiveActionClass('add')}>
              <img src={add2} alt='' className='img' />
            </div>
            <div onClick={() => onBatchIconClick()} className={getActiveActionClass('batch')}>
              <img src={currentAction === 'batch' ? menu2Active : menu2} alt='' className='img' />
            </div>
            <div
              onClick={() => onDeleteIconClick('delete')}
              className={
                currentAction === 'all'
                  ? `action ${currentAction ? 'clear-border' : ''}`
                  : getActiveActionClass('delete')
              }
            >
              <img src={deleteLogo} alt='' className='img' />
            </div>
          </div>
        </div>

        {currentAction === 'add' ? (
          <AddUser onCancel={() => onActionClick('')} onAddComplete={getList} />
        ) : (
          <div className='right-container'>
            <div className='top'>
              <div className='avatar'>
                <Avatar
                  src={userInfo.photoString}
                  className='picture'
                  shape='square'
                  size={220}
                  icon={<UserOutlined />}
                />
                <div className='user-name'>{userInfo.name}</div>
                {userInfo.groupName ? <div className='btn'>{userInfo.groupName}</div> : null}
              </div>
            </div>
            <div className='bottom'>
              <UserInfo userInfo={userInfo} />

              <div className='settings-wrapper'>
                <div className='settings'>
                  <div onClick={() => history.push('/calender')} className='one-function'>
                    <img src={add} alt='' className='img' />
                  </div>
                  <div className='one-function'>
                    <img src={notes} onClick={onEdit} alt='' className='img' />
                  </div>
                  <div className='one-function'>
                    <img src={share} alt='' className='img' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <AddGrouping visible={showGroupingAdd} hidden={hideGroupingAdd} />
      </div>
    </div>
  )
}

export default Contact
