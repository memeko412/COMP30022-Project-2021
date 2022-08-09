import { Checkbox } from 'antd'
import { memo } from 'react'

const UserList = ({ friendId, showCheck, list, checkedList, onCheckedChange, ...props }, ref) => {
  const onClick = v => {
    props?.onClick(v.friendId)
  }

  const onChange = (e, v) => {
    if (checkedList.find(c => c.friendId === v.friendId)) {
      onCheckedChange(list => list.filter(c => c.friendId !== v.friendId))
    } else {
      onCheckedChange(list => [...list, v])
    }
  }

  const renderItem = v => {
    return (
      <span className='item'>
        <img src={v.photoString} alt='' className='user-avatar' />
        <span className='user-name'>{v.name}</span>
      </span>
    )
  }

  return (
    <ul className='content-wrapper'>
      {list.map(v => (
        <li
          key={v.friendId}
          onClick={() => (showCheck ? undefined : onClick(v))}
          style={{ paddingLeft: showCheck ? 12 : 40 }}
          className={`content-item  ${
            v.friendId === friendId && !showCheck ? 'active-content' : ''
          }`}
        >
          {showCheck ? (
            <Checkbox
              checked={checkedList.find(c => c.friendId === v.friendId)}
              onChange={e => onChange(e, v)}
              className='checkbox'
            >
              {renderItem(v)}
            </Checkbox>
          ) : (
            renderItem(v)
          )}
        </li>
      ))}
    </ul>
  )
}

export default memo(UserList)
