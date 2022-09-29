import axios from "axios";
import HttpService from "../components/utils/http.service";

export class CustomerService {
    getCustomersMedium() {
        return axios.get("assets/demo/data/customers-medium.json").then((res) => res.data.data);
    }

    getCustomersLarge() {
        return axios.get(`${HttpService.cutomerService}`).then((res) => res.data);
    }
}
