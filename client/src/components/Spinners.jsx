import React, {useState} from "react";
import {ClipLoader} from "react-spinners";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const Spinners = ({loading}) => {
    const [color, setColor] = useState("#ffffff")
    return (
        <div>
            <ClipLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Spinners