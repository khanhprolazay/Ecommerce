import axiosClient from "./axiosClient";

class ShopApi {
    getShopLocation = async () => {
        const url = '/shop/location';
        return axiosClient.get(url);
    }
}

const shopApi = new ShopApi();
export default shopApi;