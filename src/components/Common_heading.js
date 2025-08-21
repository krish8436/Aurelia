const Common_heading = (props) => {
  return (
    <div className="common-heading">
      <div className="line-bar"></div>
      <h2>{props.heading}</h2>
      <p>{props.subheading}</p>

    </div>
  );
};

export default Common_heading;