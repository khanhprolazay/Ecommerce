function AboutUsItem(props) {
    const aboutusStrong = {
        fontFamily: 'Frank Ruhl Libre',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '40px',
        textTransform: 'capitalize',
        margin: '0 0 0 0',
        display: 'flex',
        justifyContent: 'space-around',
    };
    const aboutusNor = {
        fontFamily: 'Lato',
        fontWeight: '400',
        fontSize: '18px',
        textTransform: 'capitalize',
        margin: '0 0 0 0',
    };
    const aboutusItemContainer = {
        flexDirection: 'column',
        justifyContent: 'space-around',
        gap: '24px 0',
    };
    return (
        <div style={aboutusItemContainer}>
            <p style={aboutusStrong}>{props.heading}</p>
            <p style={aboutusNor}>{props.content}</p>
        </div>
    );
}
export default AboutUsItem;
