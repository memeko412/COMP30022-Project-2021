import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../img/logo.png'
import home_logo from '../../img/home2.png'
import contact_logo from '../../img/contact.png'
import notification_logo from '../../img/notification.png'
import calender_logo from '../../img/calender1.png'
import { useLocation } from 'react-router'
import './navbar.scss'

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <div className='icon_bar'>
      <div aria-disabled={true} className='logo'>
        <img src={logo} className='img_logo' alt='logo' />
      </div>
      <div className='functional_bar'>
        <div className='button'>
          <li className={pathname === '/home' ? 'active' : ''}>
            <Link to='/home'>
              <img src={home_logo} style={{ height: '35px' }} alt='' />
            </Link>
          </li>
          <li className={pathname === '/contact' ? 'active' : ''}>
            <Link to='/contact'>
              <img src={contact_logo} style={{ height: '35px' }} alt='' />
            </Link>
          </li>
          <li className={pathname === '/calender' ? 'active' : ''}>
            <a href='/calender'>
              <img src={calender_logo} style={{ height: '40px' }} alt='' />
            </a>
          </li>
        </div>
      </div>
      <br />
    </div>
  )
}
