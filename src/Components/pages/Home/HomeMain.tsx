import React from "react"
import HeroCarousel from "./HeroSection/heroCarousel"
import EditorPicks from "./Editor-s-Picks/Editor-s-picks"
import BestProduct from "./BestSellerProduct/Best-Product"
import Carousel2 from "./Carousel2/Carousel2"
import SuggestionSec from "./randomSuggestion/SuggestionSec"
import FeaturedSection from "./FeaturedSection/Featured-section"

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