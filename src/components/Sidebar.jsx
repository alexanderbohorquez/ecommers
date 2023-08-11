import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';  // Importa useState
import { getFavoritesThunk, updateFavoriteThunk, purchaseCartThunk } from '../store/slices/favorite';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Sidebar({ show, handleClose }) {
    const favorites = useSelector(state => state.favorite);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFavoritesThunk());
    }, []);

    const [totalPrice, setTotalPrice] = useState(0);  // Estado para el precio total

    const updateQuantity = (product, change) => {
        const newQuantity = product.quantity + change;

        if (newQuantity >= 1) {
            dispatch(updateFavoriteThunk(product.id, newQuantity));
            updateTotalPrice(product.product?.price, newQuantity - product.quantity);
        }
    };

    const updateTotalPrice = (price, quantityChange) => {
        setTotalPrice(totalPrice + price * quantityChange);
    };

    const calculateInitialTotalPrice = () => {
        const initialTotal = favorites.reduce(
            (acc, product) => acc + product.product.price * product.quantity,
            0
        );
        setTotalPrice(initialTotal);
    };

    useEffect(() => {
        calculateInitialTotalPrice();
    }, [favorites]);

    return (
        <>
            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="list-unstyled">
                        {favorites.map(product => (
                            <li key={product.id} className="mb-3">
                                <Card>
                                    <Card.Body>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={product.product?.images[0].url}
                                                alt=""
                                                className="img-thumbnail me-3"
                                                style={{ maxWidth: '80px', maxHeight: '80px' }}
                                            />
                                            <div>
                                                <h6 className="mb-1">{product.product?.brand}</h6>
                                                <h5 className="mb-1">{product.product?.title}</h5>
                                                <h6 className="mb-1">Price: ${product.product?.price}</h6>
                                                <div className="d-flex align-items-center">
                                                    <Button variant="outline-primary" onClick={() => updateQuantity(product, -1)}>-</Button>
                                                    <span className="mx-2">{product.quantity}</span>
                                                    <Button variant="outline-primary" onClick={() => updateQuantity(product, 1)}>+</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </li>
                        ))}
                    </ul>
                    <div className="sticky-bottom d-flex flex-column align-items-center bg-white p-3">
    <Button variant="primary" onClick={() => dispatch(purchaseCartThunk())}>Checkout</Button>
    <h6 className="mt-2">Total Price: ${totalPrice.toFixed(2)}</h6>
</div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Sidebar;
