import {
    Swiper,
    SwiperSlide
} from 'swiper/react'

import SwiperCore, {
    EffectFade,
    Mousewheel,
    Pagination
} from 'swiper'

import {
    Credit,
    Welcome,
    Champion,
    ChampionDetail,
    Trailer
} from '../components/home-section'

import { championsData } from '../assets/dummy'

SwiperCore.use([Mousewheel, Pagination, EffectFade])

const swiperOptions = {
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: true,
    pagination: true,
    effect: 'fade',
    speed: 1000
}

const Home = () => {
    return (
        <>
            <Swiper {...swiperOptions}>
                
                <SwiperSlide>
                    {({ isActive }) => <Credit isActive={isActive}/>}
                </SwiperSlide>
                <SwiperSlide>
                    {({ isActive }) => <Welcome isActive={isActive}/>}
                </SwiperSlide>
                <SwiperSlide>
                    {({ isActive }) => <Champion isActive={isActive}/>}
                </SwiperSlide>
                <SwiperSlide>
                    {({ isActive }) => <Trailer isActive={isActive}/>}
                </SwiperSlide>
            </Swiper>
            {
                championsData.map((item, index) => <ChampionDetail
                    key={index}
                    item={item}
                    id={index}
                />)
            }
            <div className="scroll">
                <span>Scroll to see effect</span>
            </div>
        </>
    )
}

export default Home
