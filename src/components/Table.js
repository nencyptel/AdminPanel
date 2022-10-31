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
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import string_to_slug from "./Common/strintGenerator";
import Menubar from "./Common/menubar";

const Table = () => {
    const [customers1, setCustomers1] = useState(null);
    const [filters1, setFilters1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [deleteuserid, setDeleteUserid] = useState();
    const [edituserid, setEditUserid] = useState();
    const [pagelist, setPagelist] = useState([]);
    const [firstpage, setFirstpage] = useState();
    const [editData, setEditdata] = useState({});
    const [accesible, setAccesible] = useState([]);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

    const usertypevalues = ["Admin", "User"];
    const dropdownValues = ["Dashboard", "Dashboard 1", "Dashboard 2", "Dashboard 3"];

    const newarr = [...pagelist?.map((ele) => ele.name)];
    const newList = [];
    useEffect(() => {
        newarr.forEach((item) => {
            console.log(item, "foreach");
            setSwitchValue({ ...switchValue, [item]: (switchValue[item] = true) });
            newList.push(item);
        });
        setAccesible(newList);
    }, [switchValue, pagelist]);

    const [switchValue, setSwitchValue] = useState({
        Dashboard: false,
        "Dashboard 1": false,
        "Dashboard 2": false,
        "Dashboard 3": false,
    });

    const [dropdownValue, setDropdownValue] = useState(firstpage);

    dropdownValues.map((item) => {
        if (string_to_slug(item) === firstpage) {
            setFirstpage(item);
            setDropdownValue(item);
            console.log(setAccesible([item]), "succes");
            setSwitchValue({ ...switchValue, [item]: !switchValue[item] });
        }
    });

    const toast = useRef(null);

    const drpdwn = (e, ele) => {
        const id = e.target.name;
        setSwitchValue({ ...switchValue, [id]: !switchValue[id] });
        if (e.target.name) {
            setAccesible((prev) => (switchValue[id] ? prev.filter((cur) => cur !== id) : [...prev, e.target.name]));
        }
    };

    console.log(switchValue, accesible, "current");
    const dropdown = (e) => {
        if (e.target.value) {
            console.log(e.target.value);
            const id = e.target.value;
            setSwitchValue({ [id]: (switchValue[id] = true) });
            setFirstpage();
            setDropdownValue(e.value);
            setAccesible([e.value]);
        } else {
            setDropdownValue("Dashboard 1");
        }
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const editProduct = (user) => {
        setPagelist(user.pagelist);
        setFirstpage(user.firstpage);
        setEditdata(user);
        setEditUserid(user._id);
        setProductDialog(true);
    };

    const SaveUserlist = async () => {
        const data = {
            Username: editData.Username,
            Phone: editData.Phone,
            Email: editData.Email,
            Firstname: editData.Firstname,
            About: editData.About,
            Lastname: editData.Lastname,
            firstpage: dropdownValue,
            pagelist: accesible.map((ele) => {
                return { name: ele, url: string_to_slug(ele) };
            }),
        };

        const updateuser = await axios.post(`${HttpService.updateUser}/${edituserid}`, data);

        if (updateuser) {
            setProductDialog(false);
            customerService.getCustomersLarge().then((data) => {
                setCustomers1(getCustomers1(data));
                setLoading1(false);
            });
            toast.current.show({ severity: "success", summary: "Successful", detail: "User Updated", life: 3000 });
        }
    };

    const confirmDeleteSelected = (user) => {
        console.log(user, "deleted");
        setDeleteUserid(user._id);
        setDeleteProductsDialog(true);
    };

    const confirmDeleteuser = async () => {
        const deleteuser = await axios.post(`${HttpService.deleteUser}/${deleteuserid}`);
        console.log(deleteuser, "delete user success");

        if (deleteuser) {
            hideDeleteProductsDialog();
            customerService.getCustomersLarge().then((data) => {
                setCustomers1(getCustomers1(data));
                console.log(getCustomers1(data), "inside");
                setLoading1(false);
            });
            toast.current.show({ severity: "success", summary: "Successful", detail: "User Deleted", life: 3000 });
        }
    };

    const onInputChange = (e) => {
        setEditdata({ ...editData, [e.target.name]: e.target.value });
    };

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.createdAt);
    };

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };

    const formatDate = (value) => {
        var date = new Date(value);
        return date.toISOString().substring(0, 10);
    };

    const customerService = new CustomerService();

    useEffect(() => {
        setLoading1(true);
        customerService.getCustomersLarge().then((data) => {
            setCustomers1(getCustomers1(data));
            setLoading1(false);
        });

        initFilters1();
    }, [switchValue, accesible, firstpage]);

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
        if (rowData?.usertype === "User" || null) {
            return (
                <div className="actions">
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteSelected(rowData)} />
                </div>
            );
        } else {
            return <div className="actions"></div>;
        }
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };
    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={SaveUserlist} />
        </>
    );

    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={(e) => confirmDeleteuser(e)} />
        </>
    );
    
     const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
     const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    return (
        <>
            <Menubar
                dashboard={
                    <>
                        <div className="grid table-demo">
                            <div className="col-12">
                                <Toast ref={toast} />
                                <h2>
                                    User List{" "}
                                    <span>
                                        <Link to="/createuser">
                                            <Button icon="pi pi-plus" label="Create User" className="mr-2 mb-2 btn" />
                                        </Link>
                                    </span>
                                </h2>

                                <div className="card">
                                    <div style={{ display: "flex", marginBottom: "15px" }}></div>

                                    <DataTable 
                                    value={customers1} paginator responsiveLayout="scroll"
                                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[5,10]}
                                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} 
                                    // paginator 
                                    // className="p-datatable-gridlines " 
                                    // showGridlines 
                                     onPage={(e) => this.setState({first: e.first})}
                                    // rows={10} 
                                    // dataKey="id" 
                                    // loading={loading1} 
                                    // responsiveLayout="scroll" 
                                    emptyMessage="No customers found.">

                                        <Column icon="pi pi-plus" sortable="custom" sorting="handleSort($event)" allowSorting={true} field="Username" header="User Name" style={{ minWidth: "12rem" }} />

                                        <Column field="Firstname" sortable="custom" sorting="handleSort($event)" header="First Name" style={{ minWidth: "12rem" }} />

                                        <Column field="Lastname" sortable="custom" sorting="handleSort($event)" header="Last Name" style={{ minWidth: "12rem" }} />

                                        <Column field="Email" sortable="custom" sorting="handleSort($event)" header="Email" style={{ minWidth: "12rem" }} />

                                        <Column field="Phone" sortable="custom" sorting="handleSort($event)" header="Phone" style={{ minWidth: "12rem" }} />

                                        <Column header="Date" sortable="custom" sorting="handleSort($event)" dataType="date" style={{ minWidth: "10rem" }} body={dateBodyTemplate} filterElement={dateFilterTemplate} />

                                        <Column field="About" sortable="custom" sorting="handleSort($event)" header="About" style={{ minWidth: "12rem" }} />
                                        <Column field="firstpage" header="firstpage" style={{ minWidth: "12rem" }} />

                                        <Column field="verified" header="Verified" dataType="boolean" bodyClassName="text-center" style={{ minWidth: "8rem" }} />

                                        <Column field="usertype" body={actionBodyTemplate}></Column>
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
                                        {/* <h5>Who are you ?</h5>
                                        <>
                                            <Dropdown value={editData.usertype} onChange={dropdown} options={usertypevalues} placeholder="Select Usertype" />
                                        </> */}
                                        <h5>Date</h5>
                                        <Calendar name="createdAt" value={editData.createdAt} showIcon showButtonBar></Calendar>
                                        <h5>First Page</h5>
                                        <>
                                            <Dropdown value={firstpage ? firstpage : dropdownValue} onChange={dropdown} options={dropdownValues} placeholder="Select" />
                                            <Button type="submit" label="Create User" className="mr-2 mb-2 mt-5"></Button>
                                        </>
                                        {dropdownValues.map((ele, index) => {
                                            return (
                                                <>
                                                    <h5>{ele}</h5>
                                                    <InputSwitch checked={switchValue[ele]} value={ele} name={ele} onChange={(e) => drpdwn(e, ele)} />
                                                </>
                                            );
                                        })}
                                    </Dialog>

                                    <Dialog visible={deleteProductsDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                                        <div className="flex align-items-center justify-content-center">
                                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                                            {<span>Are you sure you want to delete the selected user ?</span>}
                                        </div>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    </>
                }
            ></Menubar>
        </>
    );
};

export default Table;
