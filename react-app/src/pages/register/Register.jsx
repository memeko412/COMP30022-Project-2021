import React, { Component } from 'react'
import { Row, Col, Typography, Form, Input, Checkbox, Button, message } from 'antd'
import Swiper from '../../components/swiper/Swiper'
import logo from '../../img/logo.png'
import facebook from '../../img/facebook.png'
import google from '../../img/google.png'
import arrow from '../../img/arrow.png'
import { request } from '../../common/util'

import './register.scss'

const { Title, Text, Link } = Typography

class register extends Component {
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

  onFinish = data => {
    request({
      url: '/register',
      data
    }).then(res => {
      message.success('Register succesfully！')
      // 跳转主页
      this.props.history.push('/login')
    })
  }

  render() {
    return (
      <div className='login-wrap'>
        <Row>
          <Col span={12}>
            <div className='login-form'>
              <Title level={3}>
                <img src={logo} alt='logo' className='logo' />
              </Title>
              <div className='form-title'>
                <Title level={1}>
                  <Text type='secondary'>We are </Text>
                  <Text>LiverFactory</Text>
                </Title>
              </div>
              <div className='form-sub-title'>
                <Text type='secondary'>Welcome, Please Register Your Account.</Text>
              </div>
              <div className='form-tent'>
                <Form
                  name='normal_login'
                  ref={el => {
                    this.formEl = el
                  }}
                  layout='vertical'
                  onFinish={this.onFinish}
                >
                  <div className='border-left'>
                    <Form.Item
                      label='Your username'
                      name='userName'
                      rules={[
                        {
                          required: true,
                          message: 'Enter a username'
                        },
                        {
                          min: 6,
                          message: 'Enter a longer username!'
                        }
                      ]}
                      hasFeedback
                    >
                      <Input placeholder='Enter a username' />
                    </Form.Item>
                  </div>
                  <div className='border-left'>
                    <Form.Item
                      label='Your account name'
                      name='accountName'
                      rules={[
                        {
                          required: true,
                          message: 'Enter an account name'
                        },
                        {
                          min: 6,
                          message: 'Enter a longer account name!'
                        }
                      ]}
                      hasFeedback
                    >
                      <Input placeholder='Enter an account name' />
                    </Form.Item>
                  </div>
                  <div className='border-left'>
                    <Form.Item
                      name='email'
                      label='Your email'
                      rules={[
                        {
                          type: 'email',
                          message: 'The input is not valid email format.'
                        },
                        {
                          required: true,
                          message: 'Enter your email'
                        }
                      ]}
                      hasFeedback
                    >
                      <Input placeholder='Enter your email' />
                    </Form.Item>
                  </div>
                  <div className='border-left'>
                    <Form.Item
                      name='password'
                      label='Your password'
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
                      <Input.Password placeholder='Enter your password' />
                    </Form.Item>
                  </div>
                  <div className='border-left'>
                    <Form.Item
                      name='confirm'
                      label='Confirm your password'
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Please confirm your password!'
                        },
                        {
                          min: 8,
                          message: 'Enter a longer password!'
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve()
                            }

                            return Promise.reject(
                              new Error('The two passwords that you entered do not match!')
                            )
                          }
                        })
                      ]}
                    >
                      <Input.Password placeholder='Confirm your password' />
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
                      <Input placeholder='Enter your email code' />  
                    </Form.Item>
                    <Button onClick={this.sendEmailCode} className='codeButton' type='primary'>
                      Send email code
                    </Button>
                    
                  </div>
                  <br />
                  <div className='login-btn'>
                    <Button
                      type='primary'
                      htmlType='submit'
                      className='login-form-button'
                      style={{ backgroundColor: '#5170E5', borderColor: '#5170E5' }}
                    >
                      Let's start
                    </Button>
                  </div>
                </Form>
              </div>
             {/* <div className='form-other-title' style={{ padding: '15px 0' }}>
                <Text type='secondary'>Or sign in with</Text>
              </div>
              <div className='icon'>
                <img
                  style={{ marginRight: 40, width: '45px' }}
                  src={google}
                  alt='Google'
                  className='google'
                />
                <img style={{ width: '45px' }} src={facebook} alt='facebook' className='facebook' />
              </div>*/}
              <div className='form-other-title' style={{ paddingTop: '35px' }}>
                <Link style={{ color: '#5170e5' }} href='/login'>
                  Go back to sign in
                </Link>
                <img style={{ width: '25px', marginLeft: '12px' }} src={arrow} alt='arrow' />
              </div>
            </div>
          </Col>
          <Col span={12}>
            <Swiper index={0} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default register


