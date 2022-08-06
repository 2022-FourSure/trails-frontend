import { Container, Row, Col } from 'react-bootstrap';
import Loader from './Loader';

const CenteredLoader = () => {
  return (
    <Container>
      <Row>
        <Col className='d-flex justify-content-center mt-5 mx-auto'>
          <Loader />
        </Col>
      </Row>
    </Container>
  )
}

export default CenteredLoader;