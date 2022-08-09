import { Form, Input, DatePicker } from 'antd'
import phone from '../../img/contact/phone.png'
import address from '../../img/contact/address.png'
import fax from '../../img/contact/fax.png'
import email from '../../img/contact/email.png'
import note from '../../img/contact/note.png'
import date from '../../img/contact/date.png'
import company from '../../img/contact/company.png'
import './userInfoForm.scss'

const { Item } = Form

const UserInfoForm = ({ clasName, form }) => {
  return (
    <div className={`user-info-form-container ${clasName}`}>
      <Form form={form}>
        <div className='item-wrapper'>
          <Item
            name='phone'
            className='form-item'
            colon={false}
            label={
              <div className='label-item'>
                <img src={phone} alt='' className='img' />
                <span className='text'>Phone:</span>
              </div>
            }
          >
            <Input className='input' />
          </Item>

          <Item
            name='notes'
            className='form-item right-item'
            colon={false}
            label={
              <div className='label-item'>
                <img src={note} alt='' className='img' />
                <span className='text'>Notes:</span>
              </div>
            }
          >
            <Input className='input' />
          </Item>
        </div>

        <div className='item-wrapper'>
          <Item
            name='address'
            className='form-item'
            colon={false}
            label={
              <div className='label-item'>
                <img src={address} alt='' className='img' />
                <span className='text'>Address:</span>
              </div>
            }
          >
            <Input className='input' />
          </Item>

          <Item
            name='dateMeet'
            className='form-item right-item'
            colon={false}
            label={
              <div className='label-item'>
                <img src={date} alt='' className='img' />
                <span className='text'>Date met:</span>
              </div>
            }
          >
            <DatePicker placeholder='' className='date-picker' />
          </Item>
        </div>

        <div className='item-wrapper'>
          <Item
            name='fax'
            className='form-item'
            colon={false}
            label={
              <div className='label-item'>
                <img src={fax} alt='' className='img' />
                <span className='text'>Fax:</span>
              </div>
            }
          >
            <Input className='input' />
          </Item>

          <Item
            name='company'
            className='form-item right-item'
            colon={false}
            label={
              <div className='label-item'>
                <img src={company} alt='' className='img' />
                <span className='text'>company:</span>
              </div>
            }
          >
            <Input className='input' />
          </Item>
        </div>

        <div className='item-wrapper'>
          <Item
            name='email'
            className='form-item'
            colon={false}
            label={
              <div className='label-item'>
                <img src={email} alt='' className='img' />
                <span className='text'>email:</span>
              </div>
            }
          >
            <Input className='input' />
          </Item>
        </div>
      </Form>
    </div>
  )
}

export default UserInfoForm
