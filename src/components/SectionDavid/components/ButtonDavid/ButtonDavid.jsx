import "./ButtonDavid.scss";

const ButtonDavid = ({ onCallBackProp }) => {
  return (
    <div className="button-david-container" onClick={() => onCallBackProp()}>
      <span className="button-david-text">Learn More</span>
    </div>
  );
};

export default ButtonDavid;
