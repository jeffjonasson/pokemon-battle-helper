import ball from '../assets/ball.png';
const Header = () => (
  <header className='Header'>
    <img className='Header-img' src={ball} alt='Pokeball' />
    <span>Pokémon Battle Helper</span>
  </header>
);

export default Header;
