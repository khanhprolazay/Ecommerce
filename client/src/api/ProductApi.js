import axiosClient from "./axiosClient";

class ProductApi {
    getProducts = async (_sortBy, _limit, _skip) => {
        const params = {_sortBy, _limit, _skip};
        const url = '/product/get';
        return axiosClient.get(url, {params});
    }

    getProductById = async (_id) => {
        const url = `/product/${_id}/get`;
        return axiosClient.get(url);
    }

    getTotalProducts = async () => {
        const url = '/product/getTotalProducts';
        return axiosClient.get(url);
    }
}

const productApi = new ProductApi();
export default productApi;