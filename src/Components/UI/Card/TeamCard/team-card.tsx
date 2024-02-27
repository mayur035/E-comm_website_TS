import React from 'react'
import classes from './team-card.module.css'
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

type teamCardProps = {
    src: string;
    alt: string;
    userName: string;
    profession: string;
    social: {
        insta: string;
        facebook: string;
        twitter: string;
    }
};

const TeamCard = (props: teamCardProps) => {
    return (
        <div className={classes['team-card-main']}>
            <div className={classes['team-user-profile']}>
                <img width='100%' height='100%' src={props.src} alt={props.alt} />
            </div>
            <div className={classes['team-user-details']}>
                <h6 className={classes.userName}>{props.userName}</h6>
                <h6 className={classes.profession}>{props.profession}</h6>
                <div className={classes['team-user-social']}>
                    <a href={props.social.insta}><Instagram /></a>
                    <a href={props.social.facebook}><Facebook /></a>
                    <a href={props.social.twitter}><Twitter /></a>
                </div>
            </div>
        </div>
    )
}

export default TeamCard