import {FC, useState} from "react";
import {Image} from "./types";

import styles from './index.module.scss'
import Preview from "./Preview/Preview";
import MainPhoto from "./MainPhoto/MainPhoto";
import Navigation from "./Navigation/Navigation";

interface GalleryProps {
    images: Image[]
}

export const Gallery: FC<GalleryProps> = ({images}) => {

    const [positionCurrentPhoto, setPositionCurrentPhoto] = useState(0)
    const previousPhoto = images[positionCurrentPhoto-1]
    //const currentPhoto = images[positionCurrentPhoto]
    const nextPhoto = images[positionCurrentPhoto+1]


    if (images.length === 0) {
        return <div>No photo</div>
    }

    return (
        <div className={styles.gallery}>
            <div className={styles.galleryContainer}>
                <MainPhoto images={images} positionCurrentPhoto={positionCurrentPhoto} />
                <Navigation className={styles.navigation}
                            disabledPrevious={!previousPhoto} disabledNext={!nextPhoto}
                            onPreviousClick={() => setPositionCurrentPhoto(positionCurrentPhoto - 1)}
                            onNextClick={() => setPositionCurrentPhoto(positionCurrentPhoto + 1)}
                />
            </div>
            <Preview positionCurrentPhoto={positionCurrentPhoto} images={images}
                     className={styles.previewGallery} changePhoto={setPositionCurrentPhoto} />
        </div>
    );
};

