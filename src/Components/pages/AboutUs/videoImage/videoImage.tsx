import { Assets } from '../../../../Assets/Assets'
import classes from './videoImage.module.css'
import React from 'react'

const VideoImage = () => {
  return (
    <div className={classes['video-image-main']}>
        <div className={classes['video-image']}>
            <img width='100%' src={Assets.images.videoCardImg} alt="" />
        </div>
    </div>
  )
}

export default VideoImage