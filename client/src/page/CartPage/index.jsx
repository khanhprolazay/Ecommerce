import "../../assets/css/CartPage.css";
import Header from "../../components/Header";
import Logo from "../../components/Logo";
import Total from "./total";
import Item from "./item";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { getUser, getItemsInCart } from "../../redux/selectors";
import Category from "./category";
import { useState } from "react";
import DeletePopup from "../PurchasedPage/deletepopup";

function CartPage() {
	const user = useSelector(getUser);
	const itemsInCart = useSelector(getItemsInCart);
	const [deleteItem, setDeleteItem] = useState(null);

	return (
		<div style={{ backgroundColor: "var(--gray-color)" }}>
			<Header user={user} />
			<Logo location="Giỏ hàng" />
			<div style={{ minHeight: "calc(100vh - 450px)" }}>
				<section className="container-1056" style={{ flexDirection: "column" }}>
					<Category />
					{itemsInCart.map((item) => {
						return <Item item={item} setDeleteItem={setDeleteItem} />;
					})}
				</section>
				<Total />
			</div>
			<Footer />
			<DeletePopup deleteItem={deleteItem} setDeleteItem={setDeleteItem} />
		</div>
	);
}

export default CartPage;
