// FlashMessage.tsx
import React from 'react'

interface FlashMessageProps {
    errorMessage?: string;
}

const FlashMessage: React.FC<FlashMessageProps> = ({ errorMessage }) => {
    return (
        <React.Fragment>
            <p className="errors ml-3" style={{color: "red",fontSize: "14px",marginTop: "8px"}}>{errorMessage}</p>
        </React.Fragment>
    )
}

export default FlashMessage;
