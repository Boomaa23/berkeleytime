import React from 'react';

function ClassCard (props) {
  const { id, course, title, semester, faculty, removeCourse } = props;

  return (
    <div className="class-card card">
      <div className="class-card content">
        <div className="class-card-upper">
          <div className="class-card courseAbbreviation">
            {course}
          </div>
          <div className="class-card classInfo">
            {`${semester} | ${faculty}`}
          </div>
        </div>
        <div className="class-card-lower">
          <div className="class-card classTitle">
            {title}
          </div>
          <button type="button" className="delete" onClick={() => removeCourse(id)} />
        </div>
      </div>
    </div>
  );
}

export default ClassCard;
