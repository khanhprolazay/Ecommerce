import '../../assets/css/UserHistory.css';
import HistoryItem from '../HistoryItem';
import NotHaveItem from '../NotHaveItem';
import Nav from './nav';
import { useSelector } from 'react-redux';
import { getItemsRemainingAfterFilter } from '../../redux/selectors';

function UserHistory() {
	const renderList = useSelector(getItemsRemainingAfterFilter);

	console.log(true)

	return (
		<div
			className='container-item'
			style={{
				flexDirection: 'column',
				width: '74.528%',
				minHeight: '600px',
				justifyContent: 'flex-start',
			}}>
			<Nav />
			<div
				className='container-item'
				style={{
					flexDirection: 'column',
					width: '100%', 
					gap: '16px 0',
				}}>
				{function () {
					if (renderList.length !== 0) {
						return renderList.map((item) => {
							return <HistoryItem item={item} />;
						});
					}
					return <NotHaveItem />;
				}.call(this)}
			</div>
		</div>
	);
}
export default UserHistory;
