import classes from './Suggestion.module.css'
import { Assets } from '../../../../Assets/Assets'
import Button from '../../../UI/Button/PrimaryButton'
const SuggestionSec = () => {
    return (
        <div className={classes['main-container']}>
            <div className={classes['inner-container']}>
                <div className={classes['winter-clothes']}>
                    <img src={Assets.images.winterClothes} alt="winterClothes" />
                </div>
                <div className={classes['winter-clothes-content']}>
            
                        <h5>SUMMER 2020</h5>
                        <h2>Part of the Neural Universe</h2>
                        <h4>We know how large objects will act, but things on a small scale.</h4>
                        <div className={classes.btns}>
                            <Button text='Buy Now' isPrimary={false} />
                            <Button text='Read more' isPrimary={true} />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default SuggestionSec