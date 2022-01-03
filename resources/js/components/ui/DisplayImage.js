import React, { useState } from "react";

const PreviewImage = (props) => {
    return (
        <>
            {props.src && (
                <div>
                    <img
                        src={props.src}
                        alt="preview"
                        width="200px"
                        height="auto"
                    />
                </div>
            )}
        </>
    );
};

export default PreviewImage;
