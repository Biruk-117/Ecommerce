
const {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} = require('../constants/productConstants');


export const productListReducer = (state = {products: []} , action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            console.log("request ");
            return { loading: true };
        case PRODUCT_LIST_SUCCESS:
            console.log("success ");
            return { loading: false, products: action.payload };
        case PRODUCT_LIST_FAIL:
            console.log("fail ");
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export const productDetailReducer = ( state = { product:{}, loading: true }, action ) =>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            console.log("detail request ");
            return { loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            console.log("detail success ");
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            console.log("detail fail ");
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}