import axios from 'axios'

export class CustomerService {
    getCustomersMedium() {
        return axios.get('assets/demo/data/customers-medium.json')
            .then(res => res.data.data);
    }

    getCustomersLarge() {

        return axios.get('http://localhost:4000/fetch/alluser')
                .then(res => res.data);

    }
    
}