import { Fragment, useCallback, useState } from "react";
import { Button, Col, Form, Input, Row, Tabs, message } from "antd";
import { request } from "../../server/request";
import { useEffect } from "react";
import { setAuthCookies } from "../../utils/setAuthCookies";

const { useForm } = Form;

const AccountP = () => {
  let items = [
    {
      label: "Information",
      key: "info",
      children: <Information />,
    },
    {
      label: "Password",
      key: "pass",
      children: <Password />,
    },
  ];
  return (
    <Fragment>
      <div className="account-txt">
        <h1>Account</h1>
      </div>
      <Tabs defaultActiveKey="info" centered items={items} />
    </Fragment>
  );
};

const Information = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [callback] = useState(false);

  const getUserData = useCallback(() => {
    request("auth/me").then(({ data }) => {
      form.setFieldsValue(data);
    });
  }, [form]);

  useEffect(() => {
    getUserData();
  }, [callback, getUserData]);

  const submit = async (values) => {
    try {
      setLoading(true);
      await request.put("auth/details", values);
      message.success("Edited successfully !");
      getUserData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Row className="row-account">
      <Col lg={18}>
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={submit}
        >
          <Form.Item
            name="first_name"
            label="First name"
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last name"
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <center>
            <Form.Item>
              <Button loading={loading} htmlType="submit" type="primary">
                Save
              </Button>
            </Form.Item> 
          </center>
        </Form>
      </Col>
    </Row>
  );
};

const Password = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const submit = async (values) => {
    try {
      setLoading(true);
      let { data } = await request.put("auth/password", values);
      setAuthCookies(data);
      message.success("Changed successfully !");
      form.resetFields();
    } catch (err) {
      message.error(err.response.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <center>
      <Form
        className="row-password"
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={submit}
      >
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[
            {
              required: true,
              message: "Please fill this field !",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New password"
          rules={[
            {
              required: true,
              message: "Please fill this field !",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} htmlType="submit" type="primary">
            Change password
          </Button>
        </Form.Item>
      </Form>
    </center>
  );
};

export default AccountP;
