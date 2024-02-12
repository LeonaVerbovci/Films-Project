import React from 'react';

const FilmCard = () => {
  const confirm = false;

  return (
    <div className="ui card">
      <span className="ui right corner label">
        <i className="empty star icon"></i>
      </span>
      <div className="image">
        <span className="ui green label ribbon">$ 4.5</span>
        <img
          src="https://bst.icons8.com/wp-content/themes/icons8/app/uploads/2019/05/poster-for-movie.png"
          alt="film"
        />
      </div>
      <div className="content">
        <span className="header">Harry Potter</span>
        <div className="meta">
          <i className="icon users"></i>
          John
          <span className="right floated">
            <i className="icon wait right"></i>2:23:00 min
          </span>
        </div>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          {confirm ? (
            <>
              <span className="ui red button">
                <i className="ui icon check" />
                YES
              </span>
              <span className="ui grey basic button">
                <i className="ui icon close" />
                NO
              </span>
            </>
          ) : (
            <>
              <span className="ui green basic button">
                <i className="ui icon edit"></i>
              </span>
              <span className="ui red basic button">
                <i className="ui icon trash"></i>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
