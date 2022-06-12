import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import Tables from './TablePage'

export default function Dashboard() {
  return (
    <Container >
        <Row style={{marginTop:20}}><Tables/></Row>
    </Container>
  )
}
