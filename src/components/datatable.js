import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import axios from "axios";
import { InputTextarea } from "primereact/inputtextarea";
import HttpService from "./utils/http.service";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import string_to_slug from "./Common/strintGenerator";


function DataTable1() {


    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [deleteuserid, setDeleteUserid] = useState();
    const [edituserid, setEditUserid] = useState();
    const [pagelist, setPagelist] = useState([]);
    const [firstpage, setFirstpage] = useState();
    const [editData, setEditdata] = useState({});
    const [accesible, setAccesible] = useState([]);

    const [customers1, setCustomers1] = useState(null);
    const [filters1, setFilters1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState("Press 'Enter' key to go to this page.");

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

    // console.log(switchValue, accesible, "current");
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

    const editProduct = (row) => {
        // setPagelist(row.pagelist);
        // setFirstpage(row.firstpage);
          setEditdata(row);
        // setEditUserid(row._id);
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

     //    if (updateuser) {
     //        setProductDialog(false);
     //        customerService.getCustomersLarge().then((data) => {
     //            setCustomers1(getCustomers1(data));
     //            setLoading1(false);
     //        });
     //        toast.current.show({ severity: "success", summary: "Successful", detail: "User Updated", life: 3000 });
     //    }
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
          //   customerService.getCustomersLarge().then((data) => {
          //       setCustomers1(getCustomers1(data));
          //       console.log(getCustomers1(data), "inside");
          //       setLoading1(false);
          //   });
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
    const columns = [
        {
            name: "Username",
            selector: (row) => row.Username,
            width: "100px",
        },
        {
            name: "Firstname",
            cell: (row) => row.Firstname,
            selector: (row) => row.coverimage,
            width: "100px",
        },
        {
            name: "Lastname",
            selector: (row) => row.Lastname,
            width: "200px",
        },
        {
            name: "Email",
            selector: (row) => row.Email,
            width: "500px",
        },
        {
            name: "Phone",
            selector: (row) => row.Phone,
            width: "100px",
        },
        {
            name: "Date",
            name: "Email",
            selector: (row) => row.Email,
            width: "500px",
        },
         {
            button: true,
            cell: (row ) => <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={editProduct(row)} />,
        },
        // {
        //     cell: (row) => <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={editProduct(row)} />,
        // },
    ];

    useEffect(() => {
        fetchData(1, perPage);
    }, [perPage]);

    const fetchData = async (page, per_page) => {
        fetch(`http://localhost:4000/fetch/alluser/?page=${page}&per_page=${per_page}`)
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result.user, "response");
                    setIsLoaded(true);
                    setItems(result.user);
                    setTotalRows(result.totalcount);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    };

    const handlePageChange = (page) => {
        fetchData(page, perPage);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setPerPage(newPerPage);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="App">
                <DataTable columns={columns} data={items} pagination paginationServer paginationTotalRows={totalRows} onChangePage={handlePageChange} onChangeRowsPerPage={handlePerRowsChange} />
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
            </div>
        );
    }
}

export default DataTable1;
