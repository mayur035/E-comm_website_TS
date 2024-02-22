import React from 'react'
import Carousel from '../../../UI/Carousel/Carousel'
import hero_1 from '../../../../Assets/shop-hero-1-product-slide-1.svg'
import hero_2 from '../../../../Assets/shop-hero-2-product-slide-2.svg'

const data = {
    "slides": [
        {
            "src": hero_1,
            "alt": "Carousel image 1",
            "content":{
                "heading5":"SUMMER 2020",
                "heading1":"NEW COLLECTION",
                "heading4":"We know how large objects will act,but things on a small scale.",
            }
        },
        {
            "src": hero_2,
            "alt": "Carousel image 2",
            "content":{
                "heading5":"SUMMER 2022",
                "heading1":"OLD COLLECTION",
                "heading4":"We know how large objects will act,but things on a small scale.",
            }
        },
        {
            "src": hero_1,
            "alt": "Carousel image 1",
            "content":{
                "heading5":"SUMMER 2021",
                "heading1":"NEW COLLECTION",
                "heading4":"We know how large objects will act,but things on a small scale.",
            }
        },
    ]
}

const HeroCarousel = () => {
    return (
        <Carousel
            contentCarousel={data.slides} />
    )
}

export default HeroCarousel