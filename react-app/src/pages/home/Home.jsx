import Navbar from '../../components/navbar/Navbar'
import notes from '../../img/notes.png'
import leaveLogo from '../../img/right-leave.png'
import settingLogo from '../../img/setting.png'
import { Avatar } from 'antd'
import { UserOutlined, MobileOutlined, EnvironmentOutlined, HomeOutlined, MailOutlined,  PrinterOutlined, BookOutlined } from '@ant-design/icons'
import { getLocal, removeLocal, setLocal } from '../../utils/storage'
import { useHistory } from 'react-router'
import { request } from '../../common/util'
import './home.scss'

const Home = () => {
  const userInfo = () => getLocal('userInfo')

  console.log('userInfo', userInfo())

  const history = useHistory()

  const hanleQuit = async () => {
    await request({ url: '/quit', method: 'GET' })
    removeLocal('userId')
    removeLocal('userInfo')
    history.replace('/login')
  }

  const goEdit = () => {
    history.push('/editUserInfo?type=userSelf')
    setLocal('editingUserInfo', userInfo())
  }

  return (
    <div className='home'>
      <Navbar />
      <div className='split'>
        <div className='top'>
          <div className='avatar'>
            <Avatar
              src={userInfo()?.photo}
              className='picture'
              shape='square'
              size={220}
              icon={<UserOutlined />}
            />
            <div className='user-name'> {userInfo()?.userName} </div>
          </div>
        </div>
        <div className='bottom'>
          <div className='userInfo'>
            <div className='details'>
              <div className='left'>
                <div className='icon'>
                  <MobileOutlined style={{ fontSize: '28px' }} />
                  <span className='icon-text'>Contact:</span>
                </div>

                <div className='icon'>
                  <EnvironmentOutlined style={{ fontSize: '28px' }} />
                  <span className='icon-text'>Address:</span>
                </div>
                <div className='icon'>
                  <HomeOutlined style={{ fontSize: '28px' }} />
                  <span className='icon-text'>Company:</span>
                </div>
                <div className='icon'>
                  <MailOutlined style={{ fontSize: '28px' }} />
                  <span className='icon-text'>Email:</span>
                </div>
                <div className='icon'>
                  <PrinterOutlined style={{ fontSize: '28px' }} />
                  <span className='icon-text'>Fax:</span>
                </div>
                {/*<div className='icon'>
                  <BookOutlined style={{ fontSize: '28px' }} />
                  <span className='icon-text'>Notes:</span>
  </div>*/}
              </div>

              <div className='right'>
                <div className='text'>{userInfo()?.phone}</div>
                <div className='text'>{userInfo()?.address}</div>
                <div className='text'>{userInfo()?.company}</div>
                <div className='text'>{userInfo()?.email}</div>
                <div className='text'>{userInfo()?.fax}</div>
                {/*<div className='text'>{userInfo()?.notes}</div>*/}
              </div>
            </div>
          </div>

          <div className='settings'>
            <div onClick={goEdit} className='one-function'>
              <img src={notes} alt='' className='img' />
            </div>
            {/*<div className='one-function'>
              <img src={settingLogo} alt='' className='img' />
</div>*/}
            <div onClick={hanleQuit} className='one-function'>
              <img src={leaveLogo} alt='' className='img' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home