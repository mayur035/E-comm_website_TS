import React from 'react'
import WorkWithUs from '../Components/pages/AboutUs/workWithUs/WorkWithUs'
import Clients from '../Components/UI/Clients/Clients'
import BigCompany from '../Components/pages/AboutUs/BigCompanies/bigCompany'
import MeetTeam from '../Components/pages/AboutUs/MeetTeam/MeetTeam'
import VideoImage from '../Components/pages/AboutUs/videoImage/videoImage'
import AboutUsStates from '../Components/pages/AboutUs/Statistics/AboutUsStates'
import ProblemType from '../Components/pages/AboutUs/ProblemTrying/ProblemType'
import AboutHeroSection from '../Components/pages/AboutUs/hero-section/About-hero-section'

const AboutUsMain = () => {
  return (
    <React.Fragment>
      <AboutHeroSection/>
      <ProblemType />
      <AboutUsStates/>
      <VideoImage />
      <MeetTeam />
      <BigCompany />
      <WorkWithUs />
    </React.Fragment>
  )
}

export default AboutUsMain