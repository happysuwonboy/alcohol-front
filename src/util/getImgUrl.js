import BASE_URL from '../constants/baseurl';

const DEFAULT_IMG = {
    noImage : '/assets/images/etc/no_image.jpeg'
}

const getImgUrl = {
    alcohol : filename =>
    filename ? `${BASE_URL}/getimg/alcohol/${filename}` : DEFAULT_IMG.noImage,

    food : filename =>
    filename ? `${BASE_URL}/getimg/food/${filename}` : DEFAULT_IMG.noImage,
    
    review : filename => 
    filename ? `${BASE_URL}/getimg/review/${filename}` : DEFAULT_IMG.noImage
}

export default getImgUrl;

