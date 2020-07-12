import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

export default function Footer() {
  return (
    <Row style={{ backgroundColor: "#999", minHeight: '10vh', display: 'flex', alignItems: 'center' }}>
      <Col style={{ textAlign: "center" }}>Want to have a stall, contact or co-operate</Col>
      <Col style={{ textAlign: "center" }}>
        <Button variant="danger">GET IN TOUCH WITH US</Button>
      </Col>
    </Row>
  )
}
