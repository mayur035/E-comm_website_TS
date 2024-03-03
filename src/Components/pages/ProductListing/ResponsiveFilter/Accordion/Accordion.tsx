import React, { useState } from 'react'
import classes from './Accordion.module.css'
import { KeyboardArrowDown } from '@mui/icons-material'

type accordionProps = {
  children:React.ReactNode;
  accordion_head:string;
}
const AccordionContent = (props: accordionProps) => {
  const [showContent, setShowContent] = useState<boolean>(false)
  const handleContent = () => {
    setShowContent(!showContent)
  }
  return (
    <div className={classes['accordion_main']}>
      <div className={classes['accordion_inner']}>
        <button className={classes['accordion_head']} onClick={handleContent}>{props.accordion_head}<KeyboardArrowDown /></button>
        {showContent && <div className={`${classes['accordion-content']} ${showContent ? '' : classes['accordion-content-reverse']}`}>
          {props.children}
        </div>}
      </div>
    </div>
  )
}

export default AccordionContent

const AccordionHead=(props:accordionProps)=>{}