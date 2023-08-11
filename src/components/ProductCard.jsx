import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    const [hovered, setHovered] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const handleImageChange = (index) => {
        setCurrentImage(index);
    };

    return (
        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
            <Card style={{ height: "350px" }}>
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleImageChange((currentImage + 1) % product.images.length)}
                >
                    <img
                        className="d-block w-100"
                        src={product.images[currentImage].url}
                        alt={`Product Image ${currentImage + 1}`}
                        style={{
                            height: hovered ? "160px" : "150px",
                            objectFit: "contain",
                            padding: "10px",
                            transition: "height 0.3s",
                        }}
                    />
                </div>
                <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                        <Card.Subtitle className="mb-2 text-muted">{product.brand}</Card.Subtitle>
                        <Card.Title style={{ fontSize: "18px" }}>{product.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Price</Card.Subtitle>
                        <Card.Title>${product.price}</Card.Title>
                    </div>
                    <Button variant="primary"><i className="bx bxs-cart-add"></i> Add to Cart</Button>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default ProductCard;
