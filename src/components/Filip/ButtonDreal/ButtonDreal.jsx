import "./ButtonDreal.scss";

const ButtonDreal = ({ onClick, text }) => {
  return (
    <div className="custom-button" onClick={() => onClick()}>
      <span className="button-text">{text}</span>
    </div>
  );
};

export default ButtonDreal;
