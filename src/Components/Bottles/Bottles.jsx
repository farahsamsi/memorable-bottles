import './Bottles.css'
import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import { addToLocalStorage, getStoredCart, removeFromLS } from '../../Utilites/LocalStorage';
import Cart from '../Cart/Cart';

const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('bottles.json')
            .then(res => res.json())
            .then(data => setBottles(data))
    }, []);

    // load cart from LS
    useEffect(() => {
        console.log(bottles.length)
        if (bottles.length > 0) {
            const storedCart = getStoredCart();
            // console.log(storedCart);

            const savedCart = [];

            for (const id of storedCart) {
                console.log(id);
                const bottle = bottles.find(bottle => bottle.id === id);
                if (bottle) {
                    savedCart.push(bottle)
                }
            }
            console.log('saved cart', savedCart);
            setCart(savedCart);

        }
    }, [bottles])

    const handleAddToCart = bottle => {
        // console.log(bottle);
        const newCart = [...cart, bottle];
        setCart(newCart);
        addToLocalStorage(bottle.id);
    }

    const handleRemoveFromCart = id => {
        // visual cart remove
        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart);

        // remove from local storage
        removeFromLS(id);
    }

    return (
        <div>
            <h4>Bottles Available: {bottles.length}</h4>


            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>

            <div className="bottle-container">
                {
                    bottles.map(bottle => <Bottle
                        key={bottle.id}
                        bottle={bottle}
                        handleAddToCart={handleAddToCart}
                    ></Bottle>)
                }
            </div>
        </div>
    );
};

export default Bottles;