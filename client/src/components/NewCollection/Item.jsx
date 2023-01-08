import { useState } from 'react';
import CustomPopup from '../CustomPopup';

function NewCollectionItem(props) {
    const item = props.item;
    const [openPopup, setOpenPopup] = useState(false);

    return (
        <div className="collection-item" onClick={() => { setOpenPopup(true) }}>
            <img src={item.image} alt="listItemImage" />
            <div className="collection-listitem-desc">{item.category}</div>
            <CustomPopup openPopup={openPopup} setOpenPopup={setOpenPopup} item={item}/>
        </div>
    )
};
export default NewCollectionItem;