import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from '../components/ProductCard';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk, filterProductsByCategoryThunk} from '../store/slices/products';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

const Home = () => {
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [searchValue, setSearchValue] = useState ("")

    useEffect(() => {
        dispatch(getProductsThunk());
        getCategories();
    }, []);

    const getCategories = () => {
        axios
        .get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
        .then(resp => setCategories(resp.data))
        .catch(error => console.error(error));
    }

    return (
        <main>
            <Container>
                <Row>
                    <Col md={4} lg={3}>
                        <ListGroup style={{paddingTop: "20px" }}>
                            <h4>Categories</h4>
                            
                            {categories.map(category => (
                                <ListGroup.Item 
                                key={category.id}
                                onClick={() => dispatch(filterProductsByCategoryThunk(category.id)) }>{category.name}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col md={8} lg={9}>
                        <Row>
                            <Col style={{paddingTop: "20px" }}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="search product"
                                        aria-label="search product"
                                        aria-describedby="basic-addon2"
                                        value={searchValue}
                                        onChange={e => setSearchValue(e.target.value)}
                                    />
                                    <Button variant="primary">Search</Button>{' '}
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row xs={1} md={2} lg={3} >
                            {products?.map(product => (
                                <Col key={product.id} style={{ padding: 12 }} >
                                    <ProductCard product={product} />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default Home;
