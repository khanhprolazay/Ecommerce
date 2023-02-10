import { useDispatch } from "react-redux";
import Loading  from '../../components/Loading';
import { itemsSlice } from "../../redux/slice/ItemsSlice";
import { useState } from "react";
import cartApi from "../../api/CartApi";

function DeletePopup(props) {
    const user = JSON.parse(localStorage.getItem('user'));
	const deleteItem = props.deleteItem;
	const setDeleteItem = props.setDeleteItem;
    const dispatch = useDispatch();
    const [state, setState] = useState('init');

	const closePopupWithEvent = (e) => {
		if (e.target.id === 'children') setDeleteItem(null);
	};
    
    const deleteItemInCart = () => {
        setState('loading');
		cartApi
			.deleteProduct(user.username, deleteItem.itemId)
			.then(() => {
				setState('init');
				dispatch(itemsSlice.actions.deleteItemInCart({itemId: deleteItem.itemId}));
				setDeleteItem(null);
			})
			.catch(err => console.log(err))
    }

	if (!deleteItem) return;

    if (state === 'loading') return <Loading />

	return (
		<div className='uiewr'>
			<div
				id='children'
				className='mainContnt'
				onClick={(e) => closePopupWithEvent(e)}
				style={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
				<div className='cart-page-delete-popup-container'>
					<h3>Bỏ sản phẩm này khỏi gỏ hàng ?</h3>
					<p>{deleteItem.productName}</p>
					<div>
						<button onClick={() => setDeleteItem(null)}>KHÔNG</button>
						<button
                            onClick={() => deleteItemInCart()}
							style={{
								backgroundColor: 'var(--heavyblue-color)',
								color: 'white',
							}}>
							CÓ
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DeletePopup;
