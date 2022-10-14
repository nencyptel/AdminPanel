import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { AutoComplete } from "primereact/autocomplete";
import { Calendar } from "primereact/calendar";
import { Chips } from "primereact/chips";
import { InputNumber } from "primereact/inputnumber";
import { CountryService } from "../service/CountryService";

const Dashboard1 = () => {
    const [floatValue, setFloatValue] = useState("");
    const [selectedAutoValue, setSelectedAutoValue] = useState(null);
    const [autoFilteredValue, setAutoFilteredValue] = useState([]);
    const [autoValue, setAutoValue] = useState(null);
    const [calendarValue, setCalendarValue] = useState(null);
    const [inputNumberValue, setInputNumberValue] = useState(null);
    const [chipsValue, setChipsValue] = useState([]);

    const searchCountry = (event) => {
        setTimeout(() => {
            if (!event.query.trim().length) {
                setAutoFilteredValue([...autoValue]);
            } else {
                setAutoFilteredValue(
                    autoValue.filter((country) => {
                        return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                    })
                );
            }
        }, 250);
    };

    useEffect(() => {
        const countryService = new CountryService();
        countryService.getCountries().then((data) => setAutoValue(data));
    }, []);

    return (
        <div className="grid">
            <div className="card">
                <h5>InputText</h5>
                <div className="grid formgrid">
                    <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                        <InputText type="text" placeholder="Default"></InputText>
                    </div>
                    <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                        <InputText type="text" placeholder="Disabled" disabled></InputText>
                    </div>
                    <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                        <InputText type="text" placeholder="Invalid" className="p-invalid" />
                    </div>
                </div>

                <h5>Icons</h5>
                <div className="grid formgrid">
                    <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                        <span className="p-input-icon-left">
                            <i className="pi pi-user" />
                            <InputText type="text" placeholder="Username" />
                        </span>
                    </div>
                    <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                        <span className="p-input-icon-right">
                            <InputText type="text" placeholder="Search" />
                            <i className="pi pi-search" />
                        </span>
                    </div>
                    <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                        <span className="p-input-icon-left p-input-icon-right">
                            <i className="pi pi-user" />
                            <InputText type="text" placeholder="Search" />
                            <i className="pi pi-search" />
                        </span>
                    </div>
                </div>

                <h5>Float Label</h5>
                <span className="p-float-label">
                    <InputText id="username" type="text" value={floatValue} onChange={(e) => setFloatValue(e.target.value)} />
                    <label htmlFor="username">Username</label>
                </span>

                <h5>Textarea</h5>
                <InputTextarea placeholder="Your Message" autoResize rows="3" cols="30" />

                <h5>AutoComplete</h5>
                <AutoComplete placeholder="Search" id="dd" dropdown multiple value={selectedAutoValue} onChange={(e) => setSelectedAutoValue(e.value)} suggestions={autoFilteredValue} completeMethod={searchCountry} field="name" />

                <h5>Calendar</h5>
                <Calendar showIcon showButtonBar value={calendarValue} onChange={(e) => setCalendarValue(e.value)}></Calendar>

                <h5>InputNumber</h5>
                <InputNumber value={inputNumberValue} onValueChange={(e) => setInputNumberValue(e.value)} showButtons mode="decimal"></InputNumber>

                <h5>Chips</h5>
                <Chips value={chipsValue} onChange={(e) => setChipsValue(e.value)} />
            </div>
        </div>
    );
};

export default Dashboard1;
