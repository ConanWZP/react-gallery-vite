import React, {FC, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {classNameProps, Image} from "../types";
import styles from './mainPhoto.module.scss'

interface MainPhotoProps  {
    positionCurrentPhoto: number,
    images: Image[]

}

type TypeRef = React.MutableRefObject<HTMLDivElement | null>

const MainPhoto:FC<MainPhotoProps> = ({ positionCurrentPhoto, images }) => {

    const mainDivRef = useRef<HTMLDivElement | null>(null)

    const getImageWithRef = (ref: TypeRef, index: number): HTMLElement | null => {
        return (
            ref.current!.querySelector(`img:nth-of-type(${index+1})`)
        )
    }

    const hideImage = (el: HTMLElement | null) => {
        if (!el) {
            return
        }
        el.dataset.active = 'false'

        if (el.previousSibling) {
            // @ts-ignore
            el.previousSibling.dataset.active = 'false'
        }
        if (el.nextSibling) {
            // @ts-ignore
            el.nextSibling.dataset.active = 'false'
        }

    }

    const showImage =(el: HTMLElement | null) => {
        if (!el) {
            return
        }
        el.dataset.active = 'true'

        if (el.previousSibling) {
            // @ts-ignore
            el.previousSibling.dataset.active = 'prepared'
        }
        if (el.nextSibling) {
            // @ts-ignore
            el.nextSibling.dataset.active = 'prepared'
        }

    }

   /* return (
        <div className={styles.mainPhoto} ref={mainDivRef}>
            {previousPhoto && <img className={styles.mainPhotoPrev} src={previousPhoto.src} alt={previousPhoto.description}  />}
            <img className={styles.mainPhotoCurrent} src={currentPhoto.src} alt={currentPhoto.description} />
            {nextPhoto && <img className={styles.mainPhotoNext} src={nextPhoto.src} alt={nextPhoto.description}  />}



        </div>
    );*/

    const [prevPositionPhoto, setPrevPositionPhoto] = useState(positionCurrentPhoto)

    useLayoutEffect(() => {

        if (!mainDivRef.current) {
            return
        }

        const currentActiveImage = getImageWithRef(mainDivRef, prevPositionPhoto)

        const nextActiveImage = getImageWithRef(mainDivRef, positionCurrentPhoto)

        if (prevPositionPhoto !== positionCurrentPhoto) {
            hideImage(currentActiveImage)
            showImage(nextActiveImage)
        } else {
            showImage(currentActiveImage)
        }
        setPrevPositionPhoto(positionCurrentPhoto)

    }, [positionCurrentPhoto])


    return useMemo(() => (
            <div className={styles.mainPhoto} ref={mainDivRef}>
                {
                    images.map((image, index) => (
                        <img key={image.id} className={styles.mainPhotoCurrent}
                             src={image.src} alt={image.description}
                             data-active={index === positionCurrentPhoto} loading={'lazy'} />
                    ))
                }
            </div>

    ), [])

};

export default MainPhoto;