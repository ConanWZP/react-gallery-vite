import React, {FC} from 'react';
import {classNameProps, Image} from "../types";
import styles from './Navigation.module.scss'

interface NavigationProps extends classNameProps {
    disabledPrevious: boolean,
    disabledNext: boolean,
    onPreviousClick: () => void,
    onNextClick: () => void,

}

const Navigation:FC<NavigationProps> = ({disabledPrevious, disabledNext,
                                            onPreviousClick, onNextClick, className}) => {
    return (
        <div className={`${className} ${styles.navigation}`}>
            <button disabled={disabledPrevious} className={`${styles.navigationButton} ${styles.navigationButtonLeft}`} onClick={onPreviousClick}>
                Previous
            </button>
            <button disabled={disabledNext} className={`${styles.navigationButton} ${styles.navigationButtonRight}`} onClick={onNextClick}>
                Next
            </button>
        </div>
    );
};

export default Navigation;