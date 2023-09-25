import "./Icon.scss";

const Icon = ({ art }) => {
  return (
    <div className="outter-circle">
      <img src={art} alt="" className="icon-itself" />
    </div>
  );
};

export default Icon;
