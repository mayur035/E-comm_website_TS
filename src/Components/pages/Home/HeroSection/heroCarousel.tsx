import Carousel from '../../../UI/Carousel/Carousel'
import {Assets} from '../../../../Assets/Assets'

const data = {
    "slides": [
        {
            "src": Assets.images.hero1,
            "alt": "Carousel image 1",
            "content":{
                "heading5":"SUMMER 2020",
                "heading1":"NEW COLLECTION",
                "heading4":"We know how large objects will act,but things on a small scale.",
            }
        },
        {
            "src":Assets.images.hero2,
            "alt": "Carousel image 2",
            "content":{
                "heading5":"SUMMER 2022",
                "heading1":"OLD COLLECTION",
                "heading4":"We know how large objects will act,but things on a small scale.",
            }
        },
        {
            "src": Assets.images.hero1,
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