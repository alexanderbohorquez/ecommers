import { useState, useEffect } from "react";
import axios from "axios";
import { setIsLoading } from '../store/slices/isLoading';
import { useDispatch } from "react-redux";
import getConfig from '../utils/getConfig';
import { Card, Container, Row, Col } from 'react-bootstrap'; // Importa los componentes de Bootstrap

const Purchases = () => {
    const dispatch = useDispatch();
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        dispatch(setIsLoading(true));
        axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", getConfig())
            .then(resp => setPurchases(resp.data))
            .catch(error => console.error(error))
            .finally(() => dispatch(setIsLoading(false)));
    }, []);

    return (
        <Container className="mt-5">
            <h1 className="mb-4">Your Purchases</h1>
            <Row>
                {purchases.map(item => (
                    <Col key={item.id} md={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={item.product?.images[0].url} style={{ objectFit: "contain", height: 200 }} />
                            <Card.Body>
                                <Card.Title>{item.product?.brand}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{item.product?.title}</Card.Subtitle>
                                <Card.Text>Price: ${item.product?.price}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Purchases;
