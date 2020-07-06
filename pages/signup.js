import { signupUser } from '../lib/auth'
import { authInitialProps } from '../lib/auth'
import { useState } from 'react'
import { Layout, Form, Input, Button, message, Modal } from 'antd'
import Router from 'next/router'
const { Content } = Layout

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false)

  const modal = (user) =>
    Modal.success({
      title: '계성 생성 완료',
      okText: '로그인',
      onOk() {
        Router.push('/signin')
      },
    })

  const showError = (err) => {
    const error = (err.response && err.response.data) || err.message
    message.error(error)
  }

  const onFinish = (user) => {
    setIsLoading(true)

    signupUser(user)
      .then((createdUser) => modal(createdUser))
      .catch(showError)
      .finally(() => setIsLoading(false))
  }

  return (
    <Layout style={{ padding: '3em 0' }}>
      <div className="responsive">
        <Content style={{ padding: '2em', backgroundColor: 'white', width: '100%' }}>
          <h2 style={{ textAlign: 'center' }}>계정 생성</h2>
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={onFinish}>
            <Form.Item
              label="이름"
              name="name"
              rules={[{ required: true, message: '이름을 4~10자 입력해 주세요.', min: 4, max: 10 }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="이메일"
              name="email"
              rules={[{ required: true, message: '이메일을 입력해 주세요.', type: 'email' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="비밀번호"
              name="password"
              rules={[{ required: true, message: '비밀번호를 4~10자 입력해 주세요.', min: 4, max: 10 }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{ offset: 0, span: 30, md: { span: 24, offset: 6 } }}
              style={{ marginBottom: '0' }}
            >
              <Button type="primary" htmlType="submit" disabled={isLoading} block>
                {isLoading ? '생성 중..' : '계정 생성'}
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </div>

      <style jsx>
        {`
          .responsive {
            width: 600px;
            margin: 0 auto;
          }

          @media screen and (max-width: 700px) {
            .responsive {
              width: 100%;
            }
          }
        `}
      </style>
    </Layout>
  )
}

Signup.getInitialProps = authInitialProps()
