import React from 'react'
import Layout from '@/components/layout/layout'
import { useSession } from 'next-auth/react'
import { Button, Card } from 'react-bootstrap';

const index = () => {

  const { data: session } = useSession();

  return (
    <>
      <Layout>
        <br />
        <h2>Home</h2>
        <hr />
        <p>{session?.email}</p>

        <Card style={{ width: '18rem' }} className="mb-2" border="success">
          <Card.Header>Kategori</Card.Header>
          <Card.Body>
            <Card.Title>Total Kategori</Card.Title>
            <Card.Text>
              
            </Card.Text>
          </Card.Body>
        </Card>

      </Layout>
    </>
  )
}

export default index