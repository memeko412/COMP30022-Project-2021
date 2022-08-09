import phone from '../../img/contact/phone.png'
import fax from '../../img/contact/fax.png'
import email from '../../img/contact/email.png'
import notes from '../../img/contact/notes.png'
import date from '../../img/contact/date.png'
import address from '../../img/contact/address.png'
import company from '../../img/contact/company.png'
import React from 'react'
import dteformat from '../../utils/dateFormate'

const UserInfo = ({ userInfo }) => {
  return (
    <div className='details'>
      <div className='left'>
        <div className='icon'>
          <img src={phone} alt='' className='img phone-img' />
          <span className='icon-text'>Phone:</span>
        </div>

        <div className='icon'>
          <img src={address} alt='' className='img phone-img' />
          <span className='icon-text'>Adress:</span>
        </div>

        <div className='icon'>
          <img src={fax} alt='' className='img' />
          <span className='icon-text'>Fax:</span>
        </div>

        <div className='icon'>
          <img src={email} alt='' className='img' />
          <span className='icon-text'>Email:</span>
        </div>

        <div className='icon'>
          <img src={notes} alt='' className='img' />
          <span className='icon-text'>Notes:</span>
        </div>

        <div className='icon'>
          <img src={date} alt='' className='img' />
          <span className='icon-text'>Date met:</span>
        </div>

        <div className='icon'>
          <img src={company} alt='' className='img' />
          <span className='icon-text'>Company:</span>
        </div>
      </div>

      <div className='right'>
        <div className='text'>{userInfo.phone}</div>
        <div className='text'>{userInfo.address}</div>
        <div className='text'>{userInfo.fax}</div>
        <div className='text'>{userInfo.email}</div>
        <div className='text'>{userInfo.notes}</div>
        <div className='text'>
          {userInfo.dateMeet && dteformat(userInfo.dateMeet, 'YYYY/MM/DD')}
        </div>
        <div className='text'>{userInfo.company}</div>
      </div>
    </div>
  )
}

export default React.memo(UserInfo)
