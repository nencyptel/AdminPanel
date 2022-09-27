import React ,{useState,useEffect} from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Calendar } from 'primereact/calendar';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { CustomerService } from '../service/CustomerService';
import { Button } from 'primereact/button';

const Table = () => {

    const [customers1, setCustomers1] = useState(null);
    const [filters1, setFilters1] = useState(null);
    const [loading1, setLoading1] = useState(true);

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date);
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }

    const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

    const customerService = new CustomerService();

    useEffect(() => {
        customerService.getCustomersLarge().then(data => { 
            setCustomers1(getCustomers1(data)); setLoading1(false) 
        })
        initFilters1();
    },[]);

    
    const getCustomers = () => {
        customerService.getCustomersLarge().then(data => { 
            setCustomers1(getCustomers1(data.sort((a, b) =>
            a.Username.toLowerCase() < b.Username.toLowerCase() ? -1 : 1)))});
            setLoading1(false);
    }
    const getCustomers2 = () => {
        customerService.getCustomersLarge().then(data => { 
            setCustomers1(getCustomers1(data.sort((a, b) =>
            a.Username.toLowerCase() > b.Username.toLowerCase() ? -1 : 1)))});
            setLoading1(false);
    }

    const getCustomers1 = (data) => {
        return [...data || []].map(d => {
            d.date = new Date(d.date);
            return d;
        });
    }

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'representative': { value: null, matchMode: FilterMatchMode.IN },
            'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            'balance': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'activity': { value: null, matchMode: FilterMatchMode.BETWEEN },
            'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
        });
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"  />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2"  />
            </div>
        );
    }

  return (
    <div className="grid table-demo">
        <div className="col-12">
        <h2>User List</h2>
            <div className="card">
                <a href="#/createuser"><Button icon="pi pi-plus" label="Create User" className="mr-2 mb-2 btn"/></a>
                <div style={{display:"flex",marginBottom:"15px"}}>
                    <Button className="mr-3 ml-3 " icon="pi pi-sort-amount-down" onClick={(e)=>getCustomers("Username")}/>
                    <Button icon="pi pi-sort-amount-up" onClick={(e)=>getCustomers2("Username")}/>
                </div>

                <DataTable value={customers1} paginator className="p-datatable-gridlines " showGridlines rows={5}
                    dataKey="id" loading={loading1} responsiveLayout="scroll"
                    emptyMessage="No customers found.">

                    <Column icon="pi pi-plus" sortable="custom"
                       sorting="handleSort($event)" allowSorting={true} field="Username"  header="User Name" style={{ minWidth: '12rem' }} />
    
                    <Column field="Firstname"  header="First Name"  style={{ minWidth: '12rem' }} />

                    <Column field="Lastname" header="Last Name" style={{ minWidth: '12rem' }} />

                    <Column field="Email" header="Email"  style={{ minWidth: '12rem' }} />

                    <Column field="Phone" header="Phone"  style={{ minWidth: '12rem' }} />

                    <Column header="Date" filterField="date" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate}
                        filter filterElement={dateFilterTemplate} />

                    <Column field="About" header="About" style={{ minWidth: '12rem' }} />

                    <Column field="verified" header="Verified" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }}/>

                    <Column  header="Edit" body={actionBodyTemplate}></Column> 
    
                </DataTable>
            </div>
        </div>
    </div>

  )
}

export default Table