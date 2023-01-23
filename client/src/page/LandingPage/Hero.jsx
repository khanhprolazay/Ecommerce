import Vecto from '../../components/Vecto.jsx';
import '../../assets/css/Hero.css';

function Hero() {
	const vecto1 = { top: '12%' };
	const vecto2 = { right: '42%', bottom: '15.5%' };
	const vecto3 = { top: '25%', right: '3%' };

	return (
		<div
			className='Hero'
			style={{
				backgroundColor: 'var(--lighblue-color)',
				position: 'relative',
			}}>
			<main>
				<div className='container-1139 hero'>
					<div className='hero-content'>
						<h2 className='hero-heading'>
							Find the Best Fashion Style for You
						</h2>
						<p className='hero-desc'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
							ullamcorper congue eros, eget tincidunt ipsum eleifend ut.{' '}
						</p>
						<button className='button--shop'>SHOP NOW</button>
					</div>
					<img
						src={require('../../assets/img/hero-image.png').default}
						alt='heroImage'
					/>
				</div>
			</main>
			<Vecto style={vecto1}></Vecto>
			<Vecto style={vecto2}></Vecto>
			<Vecto style={vecto3}></Vecto>
			<div className='decorate-background rectancle-1'></div>
			<div className='decorate-background rectancle-2'></div>
		</div>
	);
}
export default Hero;
