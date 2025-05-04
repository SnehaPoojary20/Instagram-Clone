import './Middle.css';
import Post from './PostH';
import { FaHeart } from "react-icons/fa";

const Middle = () => {
  return (
    <div className="middleBlock">
      {/* Stories */}
      <div className="story">
        {[
          { name: 'Rohan', img: './image1.png' },
          { name: 'Kian', img: './image3.jpg' },
          { name: 'Ankita', img: './image4.jpg' },
          { name: 'Sharvari', img: './image5.jpg' },
          { name: 'Shreya', img: './image6.jpg' },
          { name: 'Pihu', img: './image7.jpg' },
          { name: 'Rishika', img: './image8.jpg' },
          { name: 'John', img: './image9.jpg' },
          { name: 'Rose', img: './image10.jpg' },
        ].map((story, index) => (
          <div className="perstory" key={index}>
            <div className="images">
              <img className="status" src={story.img} alt="status" />
            </div>
            <div className="profileName">{story.name}</div>
          </div>
        ))}
      </div>

      {/* Posts */}
      <img src="./image5.jpg" className="feed" alt="post" />
      <span>
        <FaHeart className='heart' />
      </span>
    </div>
  );
};

export default Middle;




