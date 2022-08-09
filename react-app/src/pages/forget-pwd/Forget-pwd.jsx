import React, { Component } from 'react'

import { Row, Col, Typography, Form, Input, Button, message } from 'antd'
import Swiper from '../../components/swiper/Swiper'
import { request } from '../../common/util'

import logo from '../../img/logo.png'
import arrow from '../../img/arrowLeft.png'
import './forget-pwd.scss'

const { Title, Text, Link } = Typography

class ForgetPwd extends Component {
  

  sendEmailCode = () => {
    // getFieldsValue email
    let email = this.formEl.getFieldValue('email')
    console.log('email = ', email)
    if (!email) {
      message.error('Your email cannot be empty！！！')
      return
    }
    request({
      url: `/email/code?email=${email}`,
      method: 'GET'
    }).then(res => {
      console.log('res = ', res)
      message.success('Sent successfully，please check your email！')
    })
  }

  onFinish = ({email, emailCode,updatedPassword }) => {
    request({
      url: '/reset',
      data: {
        email: email,
        emailCode: emailCode,
        updatedPassword:updatedPassword
      }
    }).then(res => {
      message.success('Password changed successfully！')
      // 跳转主页
      this.props.history.push('/login')
    })
  }


  render() {
    return (
      <div className='forget-wrap'>
        <Row>
          <Col span={12}>
            <div className='forget-form'>
              <Title level={3}>
                <img src={logo} alt='logo' className='logo' />{' '}
              </Title>
              <div className='form-title'>
                <Title level={2}>Forgot password?</Title>
              </div>
              <div className='form-tent' style={{ width: '100%' }}>
                  <Form name='normal_login' 
                  ref={el => {
                    this.formEl = el
                  }}
                  layout='vertical'  
                  onFinish={this.onFinish}>
                    <div className='border-left'>
                      <Form.Item
                        label='Your email'
                        name='email'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your email!'
                          },
                          {
                            type: 'email',
                            message: 'Please enter a valid email!'
                          }
                        ]}
                      >
                        <Input placeholder='Please input your email' />
                      </Form.Item>
                    </div>
                    <div className='border-left codeBox'>
                    <Form.Item
                      label='Your email code'
                      name='emailCode'
                      rules={[
                        {
                          required: true,
                          message: 'Enter your email code'
                        }
                      ]}
                      hasFeedback
                    >
                      <Input placeholder='Enter your email code'/>
                      
                    </Form.Item>
                    
                    <Button   onClick={this.sendEmailCode}  className='codeButton' type='primary'>
                      Send email code
                    </Button>
                    
                  </div>
                    <div className='border-left'>
                      <Form.Item
                        name='updatedPassword'
                        label='Your new password'
                        rules={[
                          {
                            required: true,
                            message: 'Enter your password'
                          },
                          {
                            min: 8,
                            message: 'Enter a longer password!'
                          },
                          {
                            whitespace: true,
                            message: 'Do not use white space!'
                          }
                        ]}
                        hasFeedback
                      >
                        <Input placeholder='Please enter your new password' />
                      </Form.Item>
                    </div>

                    <div className='login-btn'>
                      <Button
                        type='primary'
                        htmlType='submit'
                        className='login-form-button'
                        style={{ backgroundColor: '#5170E5', borderColor: '#5170E5' }}
                      >
                        reset password
                      </Button>
                    </div>
                  </Form>
                </div>
             
          
              <div className='form-other-title'>
                <img className='arrow' alt='logo' src={arrow} />
                <Link style={{ color: '#5170e5' }} href='/login'>
                  Go back to sign in
                </Link>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <Swiper index={2} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default ForgetPwd
