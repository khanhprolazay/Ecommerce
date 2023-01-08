import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalf } from '@fortawesome/free-solid-svg-icons';

function Star(props) {
    const star = props.rating;
    const starArray = [];
    let i = star;

    for (i; i >= 1; i--) {
        starArray.push(1);
    }
    if (i === 1) starArray.push(1);
    else if (i !== 0) starArray.push(0.5);

    return (
        <div
            className='container'
            style={props.style}
        >
            {starArray.map((item) => {
                if (item === 1)
                    return (
                        <FontAwesomeIcon 
                            icon={faStar}
                            className='checked'
                        />
                    );
                return (
                    <FontAwesomeIcon 
                        icon={faStarHalf}
                        className='checked'
                    />
                );
            })}
        </div>
    );
}
export default Star;
