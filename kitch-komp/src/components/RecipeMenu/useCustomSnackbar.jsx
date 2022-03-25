import React from 'react';

export function useCustomSnackbar() {
    const [isActive, setIsActive] = React.useState(false);
    const [message, setMessage] = React.useState();
    
    React.useEffect(() => {
        if (isActive === true) {
            setTimeout(() => {
                setIsActive(false);
            }, 3000);
        }
    }, [isActive]);

    const openCustomSnackBar = (msg = 'Something went wrong...') => {
        console.log(msg)
        setMessage(msg)
        setIsActive(true);
    }

    return { isActive, message, openCustomSnackBar }
}