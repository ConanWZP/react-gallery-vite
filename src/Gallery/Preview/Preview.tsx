import React, {FC, useEffect, useMemo, useRef} from 'react';
import {classNameProps, Image} from "../types";
import styles from './Preview.module.scss'

// extents - доп тип

interface PreviewProps extends classNameProps {
    positionCurrentPhoto: number,
    images: Image[],
    changePhoto: (id: number) => void

}

const Preview: FC<PreviewProps> = ({positionCurrentPhoto, images, className, changePhoto}) => {


    const ulRef = useRef<any>();

    useEffect(() => {
        if (!ulRef.current) return
        console.log(window.innerWidth)
        if (window.innerWidth <= 520) {
            ulRef.current.style.transform = `translate3d(-${positionCurrentPhoto * 106}px, 0, 0)`;
        } else {
            ulRef.current.style.transform = `translate3d(-${positionCurrentPhoto * 164}px, 0, 0)`;
        }

    }, [positionCurrentPhoto])


    if (images.length === 0) {
        return null
    }

    return (
        <div className={`${className} ${styles.preview}`}>

            {

                useMemo(() => {
                    return (
                        <ul className={styles.previewConveyor} ref={ulRef}>

                            {
                                images.map((image, index) => (
                                    <li key={image.id} className={styles.previewWrapperImage} onClick={() => changePhoto(index)}>
                                        <img className={styles.previewImage} src={image.preview}
                                             alt={image.description}/>
                                    </li>
                                ))
                            }

                        </ul>
                    )
                }, [])

            }


            <div className={styles.previewLay}>{positionCurrentPhoto + 1} / {images.length}</div>
        </div>
    );
};

export default Preview;