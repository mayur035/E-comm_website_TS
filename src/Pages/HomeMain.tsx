import React from "react"
import HeroCarousel from "../Components/pages/Home/HeroSection/heroCarousel"
import EditorPicks from "../Components/pages/Home/Editor-s-Picks/Editor-s-picks"
import BestProduct from "../Components/pages/Home/BestSellerProduct/Best-Product"
import Carousel2 from "../Components/pages/Home/Carousel2/Carousel2"
import SuggestionSec from "../Components/pages/Home/randomSuggestion/SuggestionSec"
import FeaturedSection from "../Components/pages/Home/FeaturedSection/Featured-section"

const HomeMain = () => {
    return (
        <React.Fragment>
            <HeroCarousel />
            <EditorPicks />
            <BestProduct />
            <Carousel2 />
            <SuggestionSec />
            <FeaturedSection />
        </React.Fragment>
    )
}

export default HomeMain