import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProductCard from '../components/ProductCard';
import { useSelector, useDispatch } from "react-redux";
import { filterProductsByCategoryThunk } from "../store/slices/products";
import { addProductThunk } from "../store/slices/favorite";

const ProductDetails = () => {

    const { id } = useParams();
    const [productDetail, setProductDetail] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const allProducts = useSelector(state => state.products)
    const dispatch = useDispatch()

    useEffect(() => {
        setQuantity(1); // Reset the quantity to 1 when a new product detail is fetched
        getDetail();
    }, [id]);

    const getDetail = () => {
        axios
            .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}/`)
            .then(resp => {
                console.log(resp.data);
                setProductDetail(resp.data);
                const productId = resp.data.id;
                axios
                    .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?recommended_for=${productId}`)
                    .then(recommendedResp => {
                        setRecommendedProducts(recommendedResp.data);
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const addProductToFavorite = () => {
        const data = {
            quantity: quantity,
            productId: productDetail.id
        };
    
        dispatch(addProductThunk(data)); // Pasa el objeto data a la función addProductThunk
    }
    


    return (
        <main>
            <Container>
                <Row>
                    <Col md={4} lg={3}>
                        <h6 style={{ padding: "20px 13px", color: "grey" }}>
                            <Link to="/">Home</Link> / {productDetail.title}
                        </h6>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Carousel interval={null} indicators={false} style={{ maxWidth: "500px", padding: "20px 20px" }}>
                            {productDetail.images && productDetail.images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={image.url}
                                        alt={`Image ${index + 1}`}
                                        style={{ maxHeight: "250px", objectFit: "contain" }}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>
                    <Col md={5} lg={7}>
                        <div>
                            <h6 style={{ color: "grey" }}>
                                {productDetail.brand}
                            </h6>
                            <h4>
                                {productDetail.title}
                            </h4>
                            <p>
                                {productDetail.description}
                            </p>
                        </div>
                        <Row>
                            <Col xs={5} md={4} lg={4} className="d-flex flex-column justify-content-between">
                                <div>
                                    <h6>Price</h6>
                                    <h2>
                                        $ {productDetail.price}
                                    </h2>
                                </div>
                            </Col>
                            <Col>
                                <div className="quantity-container">
                                    <h6 className="quantity-label">Quantity:</h6>
                                    <div className="counter">
                                        <Button variant="outline-primary" size="sm" className="counter-button" onClick={decrementQuantity}>-</Button>
                                        <span className="quantity">{quantity}</span>
                                        <Button variant="outline-primary" size="sm" className="counter-button" onClick={incrementQuantity}>+</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Button  variant="primary" className="w-100 mt-2 mt-md-0" onClick={addProductToFavorite} ><i className="bx bxs-cart-add"></i> Add to Cart</Button>
                    </Col>
                </Row>

                {/* Mostrar productos recomendados */}
                <Row>
    <h3 style={{marginTop: "20px" }}>Recommended Products</h3>
    {recommendedProducts.map(recommendedProduct => (
        <Col key={recommendedProduct.id} xs={12} sm={6} md={4} lg={4} style={{marginTop: "20px" }}>
            <ProductCard product={recommendedProduct} />
        </Col>
    ))}
</Row>
            </Container>
        </main>
    )
}

export default ProductDetails;
