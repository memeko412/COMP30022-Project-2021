import { Form, Input, Modal, DatePicker } from 'antd'
import { useEffect } from 'react'
import { request } from '../../common/util'

const AddModal = ({ initData, visible, hidden, onOk }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (Object.keys(initData).length) {
      form.setFieldsValue(initData)
    }
  }, [initData, form])

  const handleOk = async () => {
    const values = form.getFieldsValue()

    if (Object.keys(initData).length) {
      await request({
        url: '/event/update',
        method: 'POST',
        data: { ...values, eventId: initData.eventId }
      })
    } else {
      await request({
        url: '/event/add',
        method: 'POST',
        data: values
      })
    }
    onOk()
  }

  return (
    <Modal width={480} visible={visible} onCancel={hidden} onOk={handleOk} centered>
      <Form layout='vertical' form={form} className='add-event-form'>
        <Form.Item label='Name' name='name'>
          <Input />
        </Form.Item>

        <Form.Item label='Time' name='time'>
          <DatePicker className='date-picker' />
        </Form.Item>

        <Form.Item label='Description' name='description'>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddModal
