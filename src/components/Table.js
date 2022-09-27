import React ,{useState,useEffect} from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
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


    const verifiedBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.verified, 'text-pink-500 pi-times-circle': !rowData.verified })}></i>;
    }

    const verifiedFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterCallback(e.value)} />
    }

    const customerService = new CustomerService();

    useEffect(() => {

        customerService.getCustomersLarge().then(data => { setCustomers1(getCustomers(data)); setLoading1(false) });
        initFilters1();

    },[]);
    function compare( a, b ) {
        if ( a.Username < b.Username ){
          return -1;
        }
        if ( a.Username > b.Username ){
          return 1;
        }
        return 0;
      }
      
    const getCustomers = (data) => {
        console.log(data.sort(compare));
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

  return (
    <div className="grid table-demo">
        <div className="col-12">
            <div className="card">
                <a href="#/createuser"><Button icon="pi pi-plus" label="Create User" className="mr-2 mb-2 btn"/></a>
                <h5>User List</h5>
                <DataTable value={customers1} paginator className="p-datatable-gridlines" showGridlines rows={10}
                    dataKey="id"  filters={filters1} filterDisplay="menu" loading={loading1} responsiveLayout="scroll"
                    emptyMessage="No customers found.">

                    <Column field="Username" sortable="custom"
                       sorting="handleSort($event)" icon="pi-arrow-up" header="Name " filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    <Column field="Email" sortable="custom"
                       sorting="handleSort($event)" header="Email" filter filterPlaceholder="Search by Email" style={{ minWidth: '12rem' }} />
                    <Column field="Phone" sortable="custom"
                       sorting="handleSort($event)" header="Phone" filter filterPlaceholder="Search by Company" style={{ minWidth: '12rem' }} />

                    <Column field="Firstname" sortable="custom"
                       sorting="handleSort($event)" header="Firstname" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />

                    <Column sortable="custom"
                       sorting="handleSort($event)" field="Lastname" header="Lastname" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />

                    <Column sortable="custom"
                       sorting="handleSort($event)" header="Date" filterField="createdAt" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate}
                        filter filterElement={dateFilterTemplate} />

                    <Column field="verified" header="Verified" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedFilterTemplate} />
                </DataTable>
            </div>
        </div>
    </div>

  )
}

export default Table