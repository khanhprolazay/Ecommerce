import { useDispatch } from "react-redux";
import { itemsSlice } from "../../redux/slice/ItemsSlice";

function NewCollectionItem(props) {
    const item = props.item;
    const dispatch = useDispatch();

    return (
        <div className="collection-item" onClick={() => dispatch(itemsSlice.actions.setPopupItem(item))}>
            <img src={item.image} alt="listItemImage" />
            <div className="collection-listitem-desc">{item.category}</div>
        </div>
    )
};
export default NewCollectionItem;