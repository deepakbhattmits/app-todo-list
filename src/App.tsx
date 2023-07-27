import { useState, FC, Fragment, useContext, useEffect } from "react";
import {
  Form,
  Input,
  message,
  Button,
  Space,
  List,
  Typography,
  Divider,
  Modal,
} from "antd";
import styles from "./App.module.less";
import {
  CloseCircleTwoTone,
  CheckCircleTwoTone,
  TagsOutlined,
} from "@ant-design/icons";
import TodosProvider, { TodosContext } from "./TodosContext";
import TagsInput from "./components/TagsInut";
import "./App.less";
import ButtonComp from "./components/ButtonComp";
// import InputComp from './components/InputComp'
import Layout from "./components/Layout";
import Counts from "./components/Counts";
import { Itodos } from "./TodosContext/types";
const Todos: FC = (): JSX.Element => {
  const [form] = Form.useForm();
  const [showTagsInput, setShowTagsInput] = useState<boolean>(false);
  const [tags, setTags] = useState([]);
  const [todo, setTodo] = useState<string>("");
  const [editTodoInput, setEditTodoInput] = useState<string>("");
  const {
    todos,
    editTodoId,
    addTodo,
    removeTodo,
    markCompleted,
    editTodo,
    updateTodoFunc,
  } = useContext(TodosContext);
  const handleSubmit = () => {
    addTodo(todo);
    setTodo("");
    form.setFieldsValue({
      Todo: "",
    });
    message.success("Submit success!");
  };
  const onFinishFailed = () => {
    message.error("Submit failed!");
  };
  const onFill = () => {
    form.setFieldsValue({
      Todo: "Demo Todo",
    });
    setTodo("Demo Todo");
  };
  const handleEdit = () => {
    let foundTodo: Itodos | undefined = todos?.find(
      (todo) => !!todo.id?.match(editTodoId)?.length
    );
    let updateTodo = { ...foundTodo, title: editTodoInput };

    console.log("updateTodo : ", updateTodo);
    if (!!Object.keys(updateTodo)?.length) {
      updateTodoFunc(updateTodo?.id, updateTodo?.title, updateTodo?.completed);
    }
    editTodo("");
    message.success("Update of todo is success!");
  };

  const Header: FC = (): JSX.Element => (
    <div className={`${styles.main} table__header--wrapper`}>
      {todos?.length > 0 ? (
        <>
          <div>
            <span>Total Todo{todos?.length > 1 ? "s" : ""}: </span>
            <span>
              {todos?.length} todo{todos?.length > 1 ? "s " : " "}
            </span>
          </div>
          <div>
            <span>
              {todos?.filter(({ completed }) => completed)?.length > 0
                ? `${
                    todos?.filter(({ completed }) => completed)?.length
                  } Completed `
                : null}
            </span>
            <span>
              {todos?.filter(({ completed }) => !completed)?.length > 0 &&
              todos?.filter(({ completed }) => completed)?.length > 0
                ? ", "
                : " "}
            </span>
            <span>
              {todos?.filter(({ completed }) => !completed)?.length > 0
                ? `${
                    todos?.filter(({ completed }) => !completed)?.length
                  } Incompleted`
                : null}
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
  // const RenderContent = (
  //   editTodoInput,
  //   setEditTodoInput: { editTodoInput: string; setEditTodoInput: ()=>void }
  // ) => {
  //   useEffect(() => {
  //     const foundEditTodo: Itodos | undefined = todos?.find(
  //       (todo) => !!todo.id?.match(editTodoId)?.length
  //     );
  //     if (!!foundEditTodo?.title) {
  //       setEditTodoInput(!!foundEditTodo?.title ? foundEditTodo?.title : "");
  //     }
  //   },);
  //   return (
  //     <>
  //       <Input
  //         data-testid="todo-input"
  //         placeholder="Todo"
  //         value={editTodoInput}
  //         allowClear
  //         onChange={(e) => {
  //           console.log("UPDATE :", e);
  //           setEditTodoInput(e?.target?.value);
  //         }}
  //       />
  //     </>
  //   );
  // };
  useEffect(() => {
    const foundEditTodo: Itodos | undefined = todos?.find(
      (todo) => !!todo.id?.match(editTodoId)?.length
    );
    if (!!foundEditTodo?.title) {
      setEditTodoInput(!!foundEditTodo?.title ? foundEditTodo?.title : "");
    }
  }, [editTodoId, todos]);
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
          <div style={{ overflow: "hidden" }}>
            <Form.Item
              name="Todo"
              label="Enter todo"
              rules={[{ required: true }, { type: "string", min: 6 }]}
            >
              <Input
                data-testid="todo-input"
                placeholder="Todo"
                value={todo}
                allowClear
                onChange={(e) => {
                  setTodo(e?.target?.value);
                }}
              />
            </Form.Item>
          </div>
          <Form.Item>
            <Space>
              <Button
                data-testid="todo-submit"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
              <Button
                data-testid="todo-fill"
                htmlType="button"
                onClick={onFill}
              >
                Fill
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <Button
          type="primary"
          shape="circle"
          onClick={() => setShowTagsInput(true)}
          icon={<TagsOutlined />}
        />
      </div>
      <div>
        <ul className="todo-list">
          <Fragment>
            <Divider orientation="left">Todo List</Divider>
            <List
              data-testid="todo-list"
              header={<Header />}
              // footer={<div>Footer</div>}
              bordered
              dataSource={todos}
              renderItem={({ id, title, completed }) => (
                <List.Item data-testid="todo-item">
                  <div className="left">
                    {completed ? (
                      <CheckCircleTwoTone twoToneColor="green" />
                    ) : (
                      <CloseCircleTwoTone twoToneColor="#eb2f96" />
                    )}
                    <Typography.Text
                      style={{ marginLeft: "10px" }}
                      delete={completed}
                    >
                      {title}
                    </Typography.Text>
                  </div>
                  <div className="right">
                    <ButtonComp
                      style={{ marginRight: "10px" }}
                      btnText="Edit"
                      type="primary"
                      onClick={() => editTodo(id)}
                    />
                    <ButtonComp
                      style={{ marginRight: "10px" }}
                      btnText={completed ? "Completed" : "Incomplete"}
                      type={completed ? "default" : "primary"}
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
      <Modal
        title="Tags input"
        centered
        open={showTagsInput}
        onOk={() => {}}
        onCancel={() => setShowTagsInput(false)}
      >
        <TagsInput
          value={tags}
          maxLength={50}
          isNotDuplicate
          onChange={(val) => {
            setTags(val);
            console.log(tags);
          }}
        />
      </Modal>
      <Modal
        title="Edit todo"
        centered
        open={!!editTodoId?.length}
        onOk={handleEdit}
        onCancel={() => editTodo("")}
      >
        {/* <RenderContent
          editTodoInput={editTodoInput}
          setEditTodoInput={setEditTodoInput}
        /> */}
        <Input
          data-testid="todo-input"
          placeholder="Todo"
          value={editTodoInput}
          allowClear
          onChange={(e) => {
            console.log("UPDATE :", e);
            setEditTodoInput(e?.target?.value);
          }}
        />
      </Modal>
    </div>
  );
};
const App: FC = (): JSX.Element => (
  <TodosProvider>
    <Layout headerContent="My todo list" />
    <Todos />
    <Counts />
  </TodosProvider>
);
export default App;
