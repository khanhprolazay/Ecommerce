import '../../assets/css/Popup.css';

export default function SuccessPopup(props) {
    const state = props.state;
    const closePopup = state.closePopup;

    const closePopupWithEvent = (e) => {
        if (e.target.id === 'children') {
            closePopup();
        }
    }

    return (
        <div className="uiewr">
            <div className="loading-container" id='children' onClick={(e) => closePopupWithEvent(e)}>
                <div className='message'>
                    <div className='check'>&#10004;</div>
                    <p>Success</p>
                    <p>{state.message}</p>
                    <button id='ok-success' onClick={() => closePopup()}>OK</button>
                </div>
            </div>
        </div>
    )
}