import React, { Component } from 'react'
import { Row, Col, Typography, Form, Input, Checkbox, Button, message } from 'antd'
import Swiper from '../../components/swiper/Swiper'
import { Link } from 'react-router-dom'
import { request } from '../../common/util'

import logo from '../../img/logo.png'
import { setLocal } from '../../utils/storage'

import './login.scss'

const { Title, Text } = Typography

class login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgCode: {
        codeId: '',
        base64Img: ''
      }
    }
  }

  componentDidMount() {
    this.getCode()
  }

  onFinish = ({ accountName, password, codeText }) => {
    const { imgCode } = this.state
    request({
      url: '/login',
      data: {
        loginUser: accountName,
        password: password,
        codeId: imgCode.codeId,
        codeText
      }
    }).then(({ data }) => {
      setLocal('userId', data.userId)
      setLocal('userInfo', data)

      message.success('Login successfully！')
      
      // 跳转主页
      this.props.history.push('/home')
    })
  }

  getCode = () => {
    request({
      url: '/verification/code',
      method: 'GET'
    }).then(res => {
      console.log('res = ', res)
      this.setState({
        imgCode: res.data
      })
    })
  }

  render() {
    return (
      <div className='login-wrap'>
        <Row>
          <Col span={12}>
            <div className='login-form'>
              <Title level={3}>
                <img src={logo} alt='Logo' className='logo' />
              </Title>
              <div className='form-title'>
                <Title level={1}>
                  <Text type='secondary'>We are </Text>
                  <Text>LiverFactory</Text>
                </Title>
              </div>
              <div className='form-sub-title'>
                <Text type='secondary'>Welcome Back, Please Login To Your Account.</Text>
              </div>
              <div className='form-tent'>
                <Form name='normal_login' layout='vertical' onFinish={this.onFinish}>
                  <div className='border-left'>
                    <Form.Item label='Your Account Name' name='accountName'>
                      <Input placeholder='Enter your account name' />
                    </Form.Item>
                  </div>
                  <div className='border-left'>
                    <Form.Item
                      label='Your Password'
                      type='password'
                      name='password'
                      rules={[
                        {
                          required: true,
                          message: 'Enter your password'
                        }
                      ]}
                    >
                      <Input.Password placeholder='Enter your password' />
                    </Form.Item>
                  </div>
                  <div className='border-left imgCodeBox'>
                    <Form.Item
                      label='Verification Code'
                      type='text'
                      name='codeText'
                      rules={[
                        {
                          required: true,
                          message: 'Enter your code'
                        }
                      ]}
                    >
                      <Input placeholder='Enter your code' />
                    </Form.Item>
                    <img src={this.state.imgCode.base64Img} className='codeImg' alt='code' />
                  </div>
                  <div className='other-action'>
                    <Form.Item>
                      {/*<Form.Item name='remember' valuePropName='checked' noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>*/}

                      <a
                        className='login-form-forgot'
                        href='/forgetPwd'
                        alt=''
                        style={{ color: '#5170E5' }}
                      >
                        Forgot password?
                      </a>
                    </Form.Item>
                  </div>
                  <div className='login-btn'>
                    <Button
                      type='primary'
                      htmlType='submit'
                      className='login-form-button'
                      style={{ backgroundColor: '#5170E5', borderColor: '#5170E5' }}
                    >
                      {/* <Link to='/home'>Sign in</Link> */}
                      Sign in
                    </Button>

                    <Button
                      type='primary'
                      className='login-form-button'
                      style={{
                        marginLeft: '20px',
                        backgroundColor: '#5170E5',
                        borderColor: '#5170E5'
                      }}
                    >
                      <Link to='/register'> Sign up</Link>
                    </Button>
                  </div>
                </Form>
              </div>
              {/* <div className='form-other-title'>
                <Text type='secondary'>Or sign in with</Text>
              </div>
              <div className='icon' style={{ paddingTop: '15px' }}>
                <img
                  style={{ marginRight: 40, width: '45px' }}
                  src={google}
                  alt='google'
                  className='google'
                />
                <img style={{ width: '45px' }} src={facebook} alt='facebook' className='facebook' />
              </div>*/}
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

export default login
