import '../../../assets/css/Pagnition.css'

function Pagnition(props) {
    let pag = props.pag;
    const setPag = props.setPag;
    const length = 1256;
    const isDisablePrev = (pag.start === 0);
    const isDisableNext = (pag.start + pag.step >= length);

    function handlePrev() {
        if (isDisablePrev) return;
        pag.start -= pag.step;
        setPag({...pag});
        window.scrollTo(0, 3300);
    }

    function handleNext() {
        if (isDisableNext) return;
        pag.start += pag.step;
        setPag({...pag});
        window.scrollTo(0, 3300);
    }

    return (
        <div className='yuhsdf'>
            <button disabled={isDisablePrev} onClick={handlePrev}>Prev</button>
            <button disabled={isDisableNext} onClick={handleNext}>Next</button>
        </div>
    )
}

export default Pagnition;