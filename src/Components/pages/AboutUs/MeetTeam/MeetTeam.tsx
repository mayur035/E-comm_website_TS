import { Assets } from '../../../../Assets/Assets'
import TeamCard from '../../../UI/Card/TeamCard/team-card'
import classes from './MeetTeam.module.css'
import React from 'react'

const teamData = [
    {
        Img:{
            src: Assets.images.team1user1,
            alt:'team1User1'
        },
        userName:'user1',
        profession:'profession',
        social:{
            insta:"#",
            facebook:'#',
            twitter:'#'
        }
    },
    {
        Img:{
            src: Assets.images.team1user2,
            alt:'team1User2'
        },
        userName:'user2',
        profession:'profession',
        social:{
            insta:"#",
            facebook:'#',
            twitter:'#'
        }
    },
    {
        Img:{
            src: Assets.images.team1user3,
            alt:'team1User3'
        },
        userName:'user3',
        profession:'profession',
        social:{
            insta:"#",
            facebook:'#',
            twitter:'#'
        }
    },
]

const MeetTeam = () => {
    return (
        <div className={classes['meet-team-main']}>
            <div className={classes['meet-team-header']}>
                <h2>Meet Our Team</h2>
                <p>Problems trying to resolve the conflict between
                    the two major realms of Classical physics: Newtonian mechanics</p>
            </div>
            <div className={classes['team-card']}>
                {teamData.map((teamMember, index) => (
                    <TeamCard
                        key={index}
                        src={teamMember.Img.src}
                        alt={teamMember.Img.alt}
                        userName={teamMember.userName}
                        profession={teamMember.profession}
                        social={teamMember.social}
                    />
                ))}
            </div>
        </div>
    )
}

export default MeetTeam
