import axios from 'axios'

export class CustomerService {
    getCustomersMedium() {
        return axios.get('assets/demo/data/customers-medium.json')
            .then(res => res.data.data);
    }

    getCustomersLarge() {
<<<<<<< HEAD
        return axios.get('http://localhost:4001/fetch/alluser')
                .then(res => res.data.user);
=======
        return axios.get('http://localhost:4000/fetch/alluser')
                .then(res => res.data);
>>>>>>> 9eebda40b6898a7124153be643234498a37cb30d
    }
    
}