import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';


const Hero = ({products}) => {

    const navigate = useNavigate();

    // function reviews(movieId)
    // {
    //     navigate(`/Reviews/${movieId}`);
    // }

  return (
    <div >
      <Carousel>
        {
            products?.map((product) =>{
                return(
                    <Paper key={product.productId}>
                        <h3>{product.productName}</h3>
                        <p>Product ID: {product.productId}</p>
                        <p>Price: ${product.productPrice}</p>
                    </Paper>
                )
            })
        }
      </Carousel>
    </div>
  )
}

export default Hero
