import { useState, FC, Fragment, useContext } from 'react'
import {
  Form,
  Input,
  message,
  Button,
  Space,
  List,
  Typography,
  Divider,
} from 'antd'
import { CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons'
import TodosProvider, { TodosContext } from './TodosContext'

import './App.less'
import ButtonComp from './components/ButtonComp'
// import InputComp from './components/InputComp'
import Layout from './components/Layout'
const Todos: FC = (): JSX.Element => {
  const [form] = Form.useForm()
  const [todo, setTodo] = useState<string>('')
  const { todos, addTodo, removeTodo, markCompleted } = useContext(TodosContext)
  const handleSubmit = () => {
    addTodo(todo)
    setTodo('')
    form.setFieldsValue({
      Todo: '',
    })
    message.success('Submit success!')
  }
  const onFinishFailed = () => {
    message.error('Submit failed!')
  }
  const onFill = () => {
    form.setFieldsValue({
      Todo: 'Demo Todo',
    })
    setTodo('Demo Todo')
  }

  const Header: FC = (): JSX.Element => (
    <>
      <span>Total Todo{todos?.length > 1 ? 's' : ''}: </span>
      {todos?.length > 0 ? (
        <>
          <span>
            {todos?.length} todo{todos?.length > 1 ? 's, ' : ', '}
          </span>
          <span>
            {todos?.filter(({ completed }) => completed)?.length} Completed,
          </span>
          <span>
            {todos?.filter(({ completed }) => !completed)?.length} Incompleted
          </span>
        </>
      ) : null}
    </>
  )

  return (
    <div className="TodoArea">
      <div>
        <Divider orientation="left">Todo Form</Divider>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div style={{ overflow: 'hidden' }}>
            <Form.Item
              name="Todo"
              label="Enter todo"
              rules={[{ required: true }, { type: 'string', min: 6 }]}
            >
              <Input
                placeholder="Todo"
                value={todo}
                allowClear
                onChange={(e) => {
                  setTodo(e?.target?.value)
                }}
              />
            </Form.Item>
          </div>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onFill}>
                Fill
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <div>
        <ul className="todo-list">
          <Fragment>
            <Divider orientation="left">Todo List</Divider>
            <List
              header={<Header />}
              // footer={<div>Footer</div>}
              bordered
              dataSource={todos}
              renderItem={({ id, title, completed }) => (
                <List.Item>
                  <div className="left">
                    {completed ? (
                      <CheckCircleTwoTone twoToneColor="green" />
                    ) : (
                      <CloseCircleTwoTone twoToneColor="#eb2f96" />
                    )}
                    <Typography.Text
                      style={{ marginLeft: '10px' }}
                      delete={completed}
                    >
                      {title}
                    </Typography.Text>
                  </div>
                  <div className="right">
                    <ButtonComp
                      style={{ marginRight: '10px' }}
                      btnText={completed ? 'Completed' : 'Incomplete'}
                      type={completed ? 'default' : 'primary'}
                      onClick={() => markCompleted(id)}
                    />
                    <ButtonComp
                      btnText="Delete"
                      type="primary"
                      onClick={() => removeTodo(id)}
                    />
                  </div>
                </List.Item>
              )}
            />
          </Fragment>
          {/* ))} */}
        </ul>
      </div>
    </div>
  )
}
const App: FC = (): JSX.Element => (
  <TodosProvider>
    <Layout headerContent="My todo list" />
    <Todos />
  </TodosProvider>
)
export default App
