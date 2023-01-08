import { useRef } from 'react';
import '../assets/css/UserHistory.css';
import HistoryItem from './HistoryItem';
import NotHaveItem from './NotHaveItem';
import { useSelector, useDispatch } from 'react-redux';
import { filterSlice } from '../redux/slice/FilterSlice';
import { getItemsRemainingAfterFilter } from '../redux/selectors';

function UserHistory() {
    const tab = useRef('all');
    const dispatch = useDispatch();
    const renderList = useSelector(getItemsRemainingAfterFilter);

    function handleChangeTab(tabChange) {
        tab.current = tabChange;
        dispatch(filterSlice.actions.setStatus(tabChange));
    }
    
    return (
        <div
            className='container-item'
            style={{ flexDirection: 'column', width: '74.528%', minHeight: '600px', justifyContent: 'flex-start'}}
        >
            <div className='history-menu'>
                <span
                    className={
                        tab.current === 'all'
                            ? 'history-menu-link history-checked'
                            : 'history-menu-link'
                    }
                    onClick={() => handleChangeTab('all')}
                    style={{ width: '18%' }}
                >
                    Tất cả
                </span>
                <span
                    className={
                        tab.current === 'in_cart'
                            ? 'history-menu-link history-checked'
                            : 'history-menu-link'
                    }
                    onClick={() => handleChangeTab('in_cart')}
                    style={{ width: '28%' }}
                >
                    Trong giỏ hàng
                </span>
                <span
                    className={
                        tab.current === 'on_shipping'
                            ? 'history-menu-link history-checked'
                            : 'history-menu-link'
                    }
                    onClick={() => handleChangeTab('on_shipping')}
                    style={{ width: '18%' }}
                >
                    Đang giao
                </span>
                <span
                    className={
                        tab.current === 'shipped'
                            ? 'history-menu-link history-checked'
                            : 'history-menu-link'
                    }
                    onClick={() => handleChangeTab('shipped')}
                    style={{ width: '18%' }}
                >
                    Đã giao
                </span>
                <span
                    className={
                        tab.current === 'cancelled'
                            ? 'history-menu-link history-checked'
                            : 'history-menu-link'
                    }
                    onClick={() => handleChangeTab('cancelled')}
                    style={{ width: '18%' }}
                >
                    Đã hủy
                </span>
            </div>

            <div
                className='container-item'
                style={{
                    flexDirection: 'column',
                    width: '100%',
                    gap: '16px 0',
                }}
            >
                {function () {
                    if (renderList.length !== 0)
                        return renderList.map((item) => {
                            return (
                                <HistoryItem
                                    item={item}
                                />
                            );
                        });
                    return <NotHaveItem />;
                }.call(this)}
            </div>
        </div>
    );
}
export default UserHistory;
