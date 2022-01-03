import { BrightnessHighFill } from "react-bootstrap-icons";

const Logo = (props) => {
    return (
        <BrightnessHighFill
            width={props.size}
            height={props.size}
            color={props.color ? props.color : "#32ca6c"}
        />
    );
};

export default Logo;
