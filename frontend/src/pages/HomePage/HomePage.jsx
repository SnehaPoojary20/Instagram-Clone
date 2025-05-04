import './Home.css';
import LeftSide from './Left/Left';
import Middle from './Middle/Middle.jsx';

const HomePage = () => {
	return (
		<>
		<div className="Home">
          <div className="leftSide" >
          <LeftSide />
		  </div>
		  <div className="middle">
		  <Middle />
		  </div>
		  <div className="rightside">
		  <p>Right</p>
		  </div>
		</div>
		</>
	);
};

export default HomePage;

