export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
import { CALL_API } from '../middleware/api';
export const QUOTE_REQUEST = 'QUOTE_REQUEST';
export const QUOTE_SUCCESS = 'QUOTE_SUCCESS';
export const QUOTE_FAILURE = 'QUOTE_FAILURE';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const AUTH_CHECK = 'AUTH_CHECK';
export const GALLERY_REQUEST = 'GALLERY_REQUEST';
export const GALLERY_SUCCESS = 'GALLERY_SUCCESS';
export const GALLERY_FAILURE = 'GALLERY_FAILURE';
import jwt_decode from 'jwt-decode';
import { loadavg } from 'os';

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    };
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user
    };
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    };
}

function requestGallery(title) {
    return {
        type: GALLERY_REQUEST,
        isFetching: true,
        title
    };
}

function receiveGallery(images) {
    return {
        type: GALLERY_SUCCESS,
        isFetching: false,
        images: images
    };
}

function galleryError(message) {
    return {
        type: GALLERY_FAILURE,
        isFetching: false,
        message
    };
}

function requestSignup(signupObj) {
    return {
        type: SIGNUP_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        signupObj
    };
}

function signupError(message) {
    return {
        type: SIGNUP_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

function receiveSignup(user) {
    return {
        type: SIGNUP_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user
    };
}

export function loginUser(creds) {
    let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/x-www-form-urlencoded' },
        body: `Email=${creds.username}&Password=${creds.password}`
    };

    return dispatch => {
        dispatch(requestLogin(creds));

        return fetch('http://localhost:28826/api/Account/login', config)
            .then(response =>
                response.json().then(user => ({ user, response }))
            ).then(({ user, response }) => {
                if (!response.ok) {
                    dispatch(loginError(user.message));
                    return Promise.reject(user);
                } else {
                    localStorage.setItem('id_token', user);
                    localStorage.setItem('access_token', user);
                    dispatch(receiveLogin(user));
                }
            });
    };
}

export function signupUser(signupObj) {
    let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/x-www-form-urlencoded' },
        body: `Email=${signupObj.emailAddress}&Password=${signupObj.password}&ConfirmPassword=${signupObj.confirmPassword}`
    };

    return dispatch => {
        dispatch(requestSignup(signupObj));

        return fetch('http://localhost:28826/api/Account/Register', config)
            .then(response =>
                response.json().then(user => ({ user, response}))
            ).then(({ user, response }) => {
                if (!response.ok) {
                    dispatch(signupError(user.message));
                    return Promise.reject(user);
                } else {
                    localStorage.setItem('id_token', user);
                    localStorage.setItem('access_token', user);
                    dispatch(receiveSignup(user));
                }
            });
    };
}

function authCheck() {
    return {
        type: AUTH_CHECK
    };
}

export function checkUserClaims() {
    return dispatch => {
        dispatch(authCheck());
    };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    dispatch(receiveLogout());
  };
}

export function fetchQuote() {
    return {
        [CALL_API]: {
            endpoint: 'api/quote/random',
            types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
        }
    };
}

export function fetchSecretQuote() {
    return  {
        [CALL_API]: {
            endpoint: 'api/quote/secret',
            authenticated: true,
            types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
        }
    };
}

export function fetchGallery(title) {
    // let config = {
    //     method: 'GET',
    //     mode: 'cors',
    //     headers: { 'Content-Type':'application/json' }
    // };

    // requestGallery(title);

    // var result = fetch('http://localhost:28826/api/Gallery/GetImagesByGalleryName?galleryName=' + title, config)
    //     .then(response =>
    //         response.json().then(images => ({ images, response }))
    //     ).then(({ images, response }) => {
    //         if (!response.ok) {
    //             galleryError(images.message);
    //             return Promise.reject(images);
    //         } else {
    //             receiveGallery(images);
    //             return images;
    //         }
    //     });
    return [
        {
            src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
            thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 174,
            tags: [{value: "Nature", title: "Nature"}, {value: "Flora", title: "Flora"}],
            caption: "After Rain (Jeshu John - designerspics.com)"
        },
        {
            src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
            thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 212,
            caption: "Boats (Jeshu John - designerspics.com)"
        },
        {
            src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
            thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 212,
            caption: "Color Pencils (Jeshu John - designerspics.com)"
        },
        {
            src: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
            thumbnail: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            caption: "Red Apples with other Red Fruit (foodiesfeed.com)"
        },
        {
            src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
            thumbnail: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 183,
            caption: "37H (gratispgraphy.com)"
        },
        {
            src: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
            thumbnail: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_n.jpg",
            thumbnailWidth: 240,
            thumbnailHeight: 320,
            tags: [{value: "Nature", title: "Nature"}],
            caption: "8H (gratisography.com)"
        },
        {
            src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
            thumbnail: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 190,
            caption: "286H (gratisography.com)"
        },
        {
            src: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
            thumbnail: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 148,
            tags: [{value: "People", title: "People"}],
            caption: "315H (gratisography.com)"
        },
        {
            src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
            thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            caption: "201H (gratisography.com)"
        },
        {
            src: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
            thumbnail: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_n.jpg",
            thumbnailWidth: 248,
            thumbnailHeight: 320,
            caption: "Big Ben (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg",
            thumbnail: "https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 113,
            tags: [{value: "People", title: "People"}],
            caption: "Red Zone - Paris (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
            thumbnail: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_n.jpg",
            thumbnailWidth: 313,
            thumbnailHeight: 320,
            caption: "Wood Glass (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
            thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg",
            thumbnail: "https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 194,
            caption: "Old Barn (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg",
            thumbnail: "https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            caption: "Cosmos Flower Macro (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
            thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
            thumbnailWidth: 271,
            thumbnailHeight: 320,
            caption: "Orange Macro (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg",
            thumbnail: "https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            tags: [{value: "Nature", title: "Nature"}, {value: "People", title: "People"}],
            caption: "Surfer Sunset (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
            thumbnail: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            tags: [{value: "People", title: "People"}, {value: "Sport", title: "Sport"}],
            caption: "Man on BMX (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
            thumbnail: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            caption: "Ropeman - Thailand (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg",
            thumbnail: "https://c4.staticflickr.com/8/7476/28973628875_069e938525_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            caption: "Time to Think (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_b.jpg",
            thumbnail: "https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 179,
            tags: [{value: "Nature", title: "Nature"}, {value: "Fauna", title: "Fauna"}],
            caption: "Untitled (Jan Vasek - jeshoots.com)"
        },
        {
            src: "https://c6.staticflickr.com/9/8893/28897116141_641b88e342_b.jpg",
            thumbnail: "https://c6.staticflickr.com/9/8893/28897116141_641b88e342_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 215,
            tags: [{value: "People", title: "People"}],
            caption: "Untitled (moveast.me)"
        },
        {
            src: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
            thumbnail: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_n.jpg",
            thumbnailWidth: 257,
            thumbnailHeight: 320,
            caption: "A photo by 贝莉儿 NG. (unsplash.com)"
        },
        {
            src: "https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_b.jpg",
            thumbnail: "https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_n.jpg",
            thumbnailWidth: 226,
            thumbnailHeight: 320,
            caption: "A photo by Matthew Wiebe. (unsplash.com)"
        }
    ]
}