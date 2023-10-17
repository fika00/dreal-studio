import ButtonDavid from "../ButtonDavid/ButtonDavid";
import HeaderDavid from "../Header/HeaderDavid";
import SubHeader from "../SubHeader/SubHeader";
import "./Section1.scss";
const Section1 = () => {
  return (
    <div className="section1-container">
      <HeaderDavid text={"David Vojvoda"} />
      <SubHeader text={"Multimedia Artist"} />
      <div
        style={{
          width: "95%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <ButtonDavid />
      </div>
    </div>
  );
};

export default Section1;
