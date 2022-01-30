import React from 'react'
import { Link } from 'react-router-dom';

function product(props) {
    const {product} = props
    return (
        <div key={product._id} className="card">
            {//<Link to ={ `/product/${product._id}` }>
            }

                <a href={`/product/${product._id}`}>

                    <img className="medium" 
                    src={product.image} 
                    alt={product.name} />
                </a>

                <div className="card-body" >
                    <a href={`/product/${product._id}`}>
                        <h2>{product.name}</h2>
                    </a>

                    <div className="price">
                        ${product.price}
                    </div>
                </div>
                {//</Link>
                }
        </div>
    );
}

export default product
