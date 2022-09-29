import React, { useState, useEffect, useRef } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Calendar } from "primereact/calendar";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { CustomerService } from "../service/CustomerService";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import HttpService from "./utils/http.service";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import axios from "axios";

const Table = () => {
    const [customers1, setCustomers1] = useState(null);
    const [filters1, setFilters1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [deleteuserid, setDeleteUserid] = useState();
    const [edituserid, setEditUserid] = useState();
    const [deleteUser, setDeleteUser] = useState([]);
    const [editData, setEditdata] = useState({});
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [userlist , setUserlist]=useState([]);
    const toast = useRef(null);

  
    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const editProduct = (user) => {
        //setProduct({ ...product });
        setEditdata(user);
        setEditUserid(user._id);
        setProductDialog(true);
    };
    
    const SaveUserlist = async()=>{

        const data= {
            Username: editData.Username,
            Phone: editData.Phone,
            Email:editData.Email,
            Firstname:editData.Firstname,
            About: editData.About,
            Lastname: editData.Lastname,
        }
        const updateuser= await axios.post(`http://localhost:4000/update/user/${edituserid}` , data);
        if(updateuser){
            setProductDialog(false);
            toast.current.show({ severity: "success", summary: "Successful", detail: "User Updated", life: 3000 });
        }

    }

    const confirmDeleteSelected = (user) => {
        setDeleteUser(user);
        console.log(user, "deleted");
        setDeleteUserid(user._id);
        setDeleteProductsDialog(true);
    };

    const confirmDeleteuser = async () => {
        const deleteuser = await axios.post(`${HttpService.deleteUser}/${deleteuserid}`);
        console.log(deleteuser, "delete user success");
        
        if (deleteuser) {
            // let _users = userlist.filter(val => val._id !== deleteuserid);
            // setCustomers1(_users);
            hideDeleteProductsDialog();
            toast.current.show({ severity: "success", summary: "Successful", detail: "User Deleted", life: 3000 });
        }
    };

    const onInputChange = (e) => {
        setEditdata({ ...editData, [e.target.name]: e.target.value });
    };

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date);
    };

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };

    const formatDate = (value) => {
        return value.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const customerService = new CustomerService();

    useEffect(() => {
        customerService.getCustomersLarge().then((data) => {
            setCustomers1(getCustomers1(data));
            setLoading1(false);
        });

        initFilters1();
    }, [customers1]);
    const getCustomers = () => {
        customerService.getCustomersLarge().then((data) => {
            setCustomers1(getCustomers1(data.sort((a, b) => (a.Username.toLowerCase() < b.Username.toLowerCase() ? -1 : 1))));
        });
        setLoading1(false);
    };

    const getCustomers2 = () => {
        customerService.getCustomersLarge().then((data) => {
            setCustomers1(getCustomers1(data.sort((a, b) => (a.Username.toLowerCase() > b.Username.toLowerCase() ? -1 : 1))));
        });
        setLoading1(false);
    };
  
    const getCustomers1 = (data) => { 
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);
            return d;
        });
    };

    const initFilters1 = () => {
        setFilters1({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            "country.name": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
            verified: { value: null, matchMode: FilterMatchMode.EQUALS },
        });
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteSelected(rowData)} />
            </div>
        );
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };
    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={SaveUserlist}/>
        </>
    );

    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={(e) => confirmDeleteuser(e)} />
        </>
    );

    return (
        <div className="grid table-demo">
            <div className="col-12">
                <Toast ref={toast} />
                <h2>User List</h2>
                <div className="card">
                    <a href="#/createuser">
                        <Button icon="pi pi-plus" label="Create User" className="mr-2 mb-2 btn" />
                    </a>
                    <div style={{ display: "flex", marginBottom: "15px" }}>
                        <Button className="mr-3 ml-3 " icon="pi pi-sort-amount-down" onClick={(e) => getCustomers("Username")} />
                        <Button icon="pi pi-sort-amount-up" onClick={(e) => getCustomers2("Username")} />
                    </div>

                    <DataTable value={customers1} paginator className="p-datatable-gridlines " showGridlines rows={5} dataKey="id" loading={loading1} responsiveLayout="scroll" emptyMessage="No customers found.">
                        <Column icon="pi pi-plus" sortable="custom" sorting="handleSort($event)" allowSorting={true} field="Username" header="User Name" style={{ minWidth: "12rem" }} />

                        <Column field="Firstname" header="First Name" style={{ minWidth: "12rem" }} />

                        <Column field="Lastname" header="Last Name" style={{ minWidth: "12rem" }} />

                        <Column field="Email" header="Email" style={{ minWidth: "12rem" }} />

                        <Column field="Phone" header="Phone" style={{ minWidth: "12rem" }} />
                        <Column field={"createdAt"} header="Date" style={{ minWidth: "12rem" }} />

                        <Column header="Date" dataType="date" style={{ minWidth: "10rem" }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />

                        <Column field="About" header="About" style={{ minWidth: "12rem" }} />

                        <Column field="verified" header="Verified" dataType="boolean" bodyClassName="text-center" style={{ minWidth: "8rem" }} />
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                    <Dialog visible={productDialog} header="Edit Details" style={{ width: "450px" }} modal className="p-fluid" onHide={hideDialog} footer={productDialogFooter}>
                        <div className="field">
                            <label className="mt-3" htmlFor="Username">
                                Username
                            </label>
                            <InputText name="Username" value={editData.Username} onChange={(e) => onInputChange(e)} required autoFocus className={classNames({ "p-invalid": submitted })} />
                            {submitted && <small className="p-invalid">Username is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="Firstname">Firstname</label>
                            <InputText name="Firstname" value={editData.Firstname} onChange={(e) => onInputChange(e)} required autoFocus className={classNames({ "p-invalid": submitted })} />
                            {submitted && <small className="p-invalid">Firstname is required.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="Lastname">Lastname</label>
                            <InputText name="Lastname" value={editData.Lastname} onChange={(e) => onInputChange(e)} required autoFocus className={classNames({ "p-invalid": submitted })} />
                            {submitted && <small className="p-invalid">Lastname is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="Email">Email</label>
                            <InputText name="Email" value={editData.Email} onChange={(e) => onInputChange(e)} required autoFocus className={classNames({ "p-invalid": submitted })} />
                            {submitted && <small className="p-invalid">Email is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="Phone">Phone</label>
                            <InputText name="Phone" value={editData.Phone} onChange={(e) => onInputChange(e)} required autoFocus className={classNames({ "p-invalid": submitted })} />
                            {submitted && <small className="p-invalid">Phone is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="About">About</label>
                            <InputTextarea name="About" value={editData.About} onChange={(e) => onInputChange(e)} required autoFocus className={classNames({ "p-invalid": submitted })} />
                            {submitted && <small className="p-invalid">About is required.</small>}
                        </div>
                        <h5>Date</h5>
                        <Calendar name="createdAt" value={editData.createdAt} showIcon showButtonBar></Calendar>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {<span>Are you sure you want to delete the selected products ?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Table;
