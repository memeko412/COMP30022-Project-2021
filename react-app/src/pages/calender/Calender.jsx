import { Calendar, Badge, Layout, Button } from 'antd'
import Navbar from '../../components/navbar/Navbar'
import { request } from '../../common/util'
import moment from 'moment'
import AddModal from './AddModal'
import DeleteModal from './DeleteModal'
import './calender.scss'
import add from '../../img/contact/add-circle.png'

const { Content, Sider } = Layout

function getMonthData(value) {
  if (value.month() === 8) {
    return 12
  }
}

function monthCellRender(value) {
  const num = getMonthData(value)
  const year = value.year()
  return num ? (
    <div className='notes-month'>
      <section>{num}</section>
      <span>{year}</span>
    </div>
  ) : null
}

function formateTime(date) {
  return moment(date).format('YYYY-MM-DD')
}

const Calender = () => {
  const [date, setDate] = useState(moment(moment()))
  const [data, setData] = useState([])
  const [currentDay, setCurrentDay] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [initData, setInitData] = useState({})

  const getData = useCallback(async () => {
    const res = await request({
      url: '/event/find',
      method: 'POST',
      data: {
        eventAddVo: {
          startTime: moment().startOf('months'),
          endTime: moment().endOf('months')
        }
      }
    })
    res.data?.length && setData(res.data)
    console.log('res', res)
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  const onPanelChange = date => {
    setDate(date)
  }

  const getCurrentDataList = day => {
    return data.filter(v => formateTime(v.time) === day)
  }

  const onSelect = date => {
    setDate(date)
    const currentDay = moment(date).format('YYYY-MM-DD')
    setCurrentDay(currentDay)
    if (getCurrentDataList(currentDay).length) setShowDeleteModal(true)
  }

  const onAdd = () => {
    setShowAddModal(true)
    setInitData({})
  }

  const onAddModalHidden = useCallback(() => {
    setShowAddModal(false)
  }, [])

  const onAddModalOk = useCallback(() => {
    setShowAddModal(false)
    getData()
  }, [])

  const onDeleteModalHidden = useCallback(() => {
    setShowDeleteModal(false)
  }, [])

  const onDeleteModalOk = useCallback(() => {
    setShowDeleteModal(false)
  }, [])

  const onDelete = useCallback(
    id => {
      setData(data.filter(v => v.eventId !== id))
    },
    [data]
  )

  const onEdit = useCallback(v => {
    setInitData(v)
    setShowAddModal(true)
  }, [])

  const dateCellRender = date => {
    return (
      <ul className='events'>
        {data.map(item =>
          date.format('YYYY-MM-DD') === formateTime(item.time) ? (
            <li key={item.eventId}>{item.name}: {item.description}</li>
          ) : null
        )}
      </ul>
    )
  }

  return (
    <>
      <div className='navigation-bar'>
        <Navbar />
      </div>
      <Layout style={{ padding: '100px 24px 0px 24px' }}>
        <Content
          className='calender-layout'
          style={{
            padding: 24,
            margin: 0,
            minHeight: 600
          }}
        >
          <div onClick={onAdd} className='add-event-btn'>
            <img src={add} alt='' className='img'  />
          </div>
          <Calendar
            value={date}
            onSelect={onSelect}
            onPanelChange={onPanelChange}
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
          />
        </Content>
      </Layout>

      <AddModal
        initData={initData}
        visible={showAddModal}
        hidden={onAddModalHidden}
        onOk={onAddModalOk}
      />
      <DeleteModal
        onEdit={onEdit}
        list={getCurrentDataList(currentDay)}
        visible={showDeleteModal}
        onDelete={onDelete}
        hidden={onDeleteModalHidden}
        onOk={onDeleteModalOk}
      />
    </>
  )
}

export default Calender;
