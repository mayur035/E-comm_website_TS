import React from 'react'
import { Assets } from '../../../../Assets/Assets'
import classes from './Editor-s-picks.module.css'
import CardPics from './card-pics'




const EditorPicks = () => {
  return (
    <React.Fragment>

      <div className={classes['picks-container']}>

        <div className={classes['picks-content']}>
          <h2>EDITOR'S PICKS</h2>
          <p>Problems trying to resolve the conflict between </p>
        </div>
        <div className={classes['picks-image']}>
          <div className={classes['funcky-boy']}>
            <CardPics src={Assets.images.editorPicks1} alt="funcky-boy"  label='MENS'/>
          </div>
          <div className={classes['swagy-girl']}>
            <CardPics  src={Assets.images.editorPicks2} alt="swagy-girl" label='WOMEN'/>
          </div>
          <div className={classes['professional-girl']}>
            <CardPics  src={Assets.images.editorPicks3} alt="professional-gir" label='ACCESSORIES'/>
          </div>
          <div className={classes['beach-boy']} >
            <CardPics src={Assets.images.editorPicks4} alt="beach-boy" label='KIDS'/>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default EditorPicks