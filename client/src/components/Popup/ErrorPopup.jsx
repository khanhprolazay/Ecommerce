import '../../assets/css/Popup.css';

export default function ErrorPopup(props) {
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
                    <div className='check' style={{backgroundColor: '#A50203'}}>X</div>
                    <p>Error</p>
                    <p>{state.message}</p>
                    <button id='ok-error' onClick={() => closePopup()}>OK</button>
                </div>
            </div>
        </div>
    )
}