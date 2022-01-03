import React, { useState } from "react";

const PreviewImage = ({ file }) => {
    const [preview, setPreview] = useState(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setPreview(reader.result);
    };

    return (
        <>
            {preview && (
                <div>
                    <img
                        src={preview}
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
