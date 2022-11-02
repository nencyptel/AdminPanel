import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Route, BrowserRouter, Switch, useHistory, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { AppConfig } from "./AppConfig";
import MyProfile from "./components/MyProfile";

import DataTable from "./components/datatable";
import NotFoundPage from "./components/NotFoundPage";
import ForgetPassword from "./components/ForgetPassword";
import Dashboard from "./components/Dashboard";
import ButtonDemo from "./components/ButtonDemo";
import ChartDemo from "./components/ChartDemo";
import Documentation from "./components/Documentation";
import FileDemo from "./components/FileDemo";
import FloatLabelDemo from "./components/FloatLabelDemo";
import FormLayoutDemo from "./components/FormLayoutDemo";
import InputDemo from "./components/InputDemo";
import ListDemo from "./components/ListDemo";
import MenuDemo from "./components/MenuDemo";
import MessagesDemo from "./components/MessagesDemo";
import MiscDemo from "./components/MiscDemo";
import OverlayDemo from "./components/OverlayDemo";
import MediaDemo from "./components/MediaDemo";
import PanelDemo from "./components/PanelDemo";
import TableDemo from "./components/TableDemo";
import TreeDemo from "./components/TreeDemo";
import InvalidStateDemo from "./components/InvalidStateDemo";
import BlocksDemo from "./components/BlocksDemo";
import IconsDemo from "./components/IconsDemo";
import PrivateRoute from "./components/Routes/ProtectedRoutes";
import Login from "./components/Login";
import Crud from "./pages/Crud";
import EmptyPage from "./pages/EmptyPage";
import TimelineDemo from "./pages/TimelineDemo";
import PrimeReact from "primereact/api";
import { Tooltip } from "primereact/tooltip";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./assets/demo/flags/flags.css";
import "./assets/demo/Demos.scss";
import "./assets/layout/layout.scss";
import "./App.scss";
import Register from "./components/Register";
import ConfirmPassword from "./components/ConfirmPassword";
import Dashboard1 from "./components/Dashboard1";
import Dashboard2 from "./components/Dashboard2";
import Dashboard3 from "./components/Dashboard3";
import CreateUser from "./components/CreateUser";
import Table from "./components/Table";
import axios from "axios";
import EditProfile from "./components/EditProfile";
import HttpService from "./components/utils/http.service";

const App = () => {
    const [layoutMode, setLayoutMode] = useState("static");
    const [layoutColorMode, setLayoutColorMode] = useState("light");
    const [inputStyle, setInputStyle] = useState("outlined");
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const [page, setPage] = useState();

    const [login, setLogin] = useState(false);

    const copyTooltipRef = useRef();
    const location = useLocation();
    const history = useHistory();

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode);
    };

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode);
    };

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    };

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === "overlay") {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            } else if (layoutMode === "static") {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    const fetchaccesiblepage = async () => {
        const user = await axios.get(`${HttpService.accesiblepage}/${token}`);
        setPage(user);
    };

    const menu = [
        {
            label: "Home",

            items: page?.data?.user?.pagelist.map((ele, index) => {
                return {
                    label: `${ele.name}`,
                    icon: "pi pi-fw pi-home",
                    to: `${ele.url}`,
                };
            }),
        },
        {
            label: "UI Components",
            icon: "pi pi-fw pi-sitemap",
            items: [
                { label: "Form Layout", icon: "pi pi-fw pi-id-card", to: "/formlayout" },
                { label: "Input", icon: "pi pi-fw pi-check-square", to: "/input" },
                { label: "Float Label", icon: "pi pi-fw pi-bookmark", to: "/floatlabel" },
                { label: "Invalid State", icon: "pi pi-fw pi-exclamation-circle", to: "invalidstate" },
                { label: "Button", icon: "pi pi-fw pi-mobile", to: "/button" },
                { label: "Table", icon: "pi pi-fw pi-table", to: "/table" },
                { label: "Data - Table", icon: "pi pi-fw pi-table", to: "/table1" },
                { label: "List", icon: "pi pi-fw pi-list", to: "/list" },
                { label: "Tree", icon: "pi pi-fw pi-share-alt", to: "/tree" },
                { label: "Panel", icon: "pi pi-fw pi-tablet", to: "/panel" },
                { label: "Overlay", icon: "pi pi-fw pi-clone", to: "/overlay" },
                { label: "Media", icon: "pi pi-fw pi-image", to: "/media" },
                { label: "Menu", icon: "pi pi-fw pi-bars", to: "/menu" },
                { label: "Message", icon: "pi pi-fw pi-comment", to: "/messages" },
                { label: "File", icon: "pi pi-fw pi-file", to: "/file" },
                { label: "Chart", icon: "pi pi-fw pi-chart-bar", to: "/chart" },
                { label: "Misc", icon: "pi pi-fw pi-circle-off", to: "/misc" },
            ],
        },
        {
            label: "UI Blocks",
            items: [
                { label: "Free Blocks", icon: "pi pi-fw pi-eye", to: "/blocks", badge: "NEW" },
                { label: "All Blocks", icon: "pi pi-fw pi-globe", url: "https://www.primefaces.org/primeblocks-react" },
            ],
        },
        {
            label: "Icons",
            items: [{ label: "PrimeIcons", icon: "pi pi-fw pi-prime", to: "/icons" }],
        },
        {
            label: "Pages",
            icon: "pi pi-fw pi-clone",
            items: [
                { label: "Crud", icon: "pi pi-fw pi-user-edit", to: "/crud" },
                { label: "Timeline", icon: "pi pi-fw pi-calendar", to: "/timeline" },
                { label: "Empty", icon: "pi pi-fw pi-circle-off", to: "/empty" },
            ],
        },
        {
            label: "Menu Hierarchy",
            icon: "pi pi-fw pi-search",
            items: [
                {
                    label: "Submenu 1",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        {
                            label: "Submenu 1.1",
                            icon: "pi pi-fw pi-bookmark",
                            items: [
                                { label: "Submenu 1.1.1", icon: "pi pi-fw pi-bookmark" },
                                { label: "Submenu 1.1.2", icon: "pi pi-fw pi-bookmark" },
                                { label: "Submenu 1.1.3", icon: "pi pi-fw pi-bookmark" },
                            ],
                        },
                        {
                            label: "Submenu 1.2",
                            icon: "pi pi-fw pi-bookmark",
                            items: [
                                { label: "Submenu 1.2.1", icon: "pi pi-fw pi-bookmark" },
                                { label: "Submenu 1.2.2", icon: "pi pi-fw pi-bookmark" },
                            ],
                        },
                    ],
                },
                {
                    label: "Submenu 2",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        {
                            label: "Submenu 2.1",
                            icon: "pi pi-fw pi-bookmark",
                            items: [
                                { label: "Submenu 2.1.1", icon: "pi pi-fw pi-bookmark" },
                                { label: "Submenu 2.1.2", icon: "pi pi-fw pi-bookmark" },
                                { label: "Submenu 2.1.3", icon: "pi pi-fw pi-bookmark" },
                            ],
                        },
                        {
                            label: "Submenu 2.2",
                            icon: "pi pi-fw pi-bookmark",
                            items: [
                                { label: "Submenu 2.2.1", icon: "pi pi-fw pi-bookmark" },
                                { label: "Submenu 2.2.2", icon: "pi pi-fw pi-bookmark" },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            label: "Get Started",
            items: [
                {
                    label: "Documentation",
                    icon: "pi pi-fw pi-question",
                    command: () => {
                        window.location = "#/documentation";
                    },
                },
                {
                    label: "View Source",
                    icon: "pi pi-fw pi-search",
                    command: () => {
                        window.location = "https://github.com/primefaces/sakai-react";
                    },
                },
            ],
        },
    ];

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": layoutMode === "overlay",
        "layout-static": layoutMode === "static",
        "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
        "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
        "layout-mobile-sidebar-active": mobileMenuActive,
        "p-input-filled": inputStyle === "filled",
        "p-ripple-disabled": ripple === false,
        "layout-theme-light": layoutColorMode === "light",
    });

    return (
        <>
        <BrowserRouter>
        <Switch>
        <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/forgetpassword" component={ForgetPassword} />
                <Route exact path="/confirmpassword/:_id/:token" component={ConfirmPassword} />
                <Route exact path="/menu" component={MenuDemo} />
                <PrivateRoute path="/formlayout" component={FormLayoutDemo}></PrivateRoute>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute exact path="/dashboard-1" component={Dashboard1} />
                <PrivateRoute exact path="/dashboard" component={FormLayoutDemo} />
                <PrivateRoute exact path="/dashboard-2" component={Dashboard2} />
                <PrivateRoute exact path="/dashboard-3" component={Dashboard3} />
                <PrivateRoute exact path="/input" component={InputDemo} />
                <PrivateRoute exact path="/floatlabel" component={FloatLabelDemo} />
                <Route exact path="/invalidstate" component={InvalidStateDemo} />
                <Route exact path="/button" component={ButtonDemo} />
                <Route exact path="/table" component={TableDemo} />
                <Route exact path="/list" component={ListDemo} />
                <Route exact path="/tree" component={TreeDemo} />
                <Route exact path="/panel" component={PanelDemo} />
                <Route exact path="/overlay" component={OverlayDemo} />
                <Route path="/media" component={MediaDemo} />
                <Route path="/messages" component={MessagesDemo} />
                <Route path="/blocks" component={BlocksDemo} />
                <Route path="/icons" component={IconsDemo} />
                <Route path="/file" component={FileDemo} />
                <Route path="/chart" render={() => <ChartDemo colorMode={layoutColorMode} location={location} />} />
                <Route path="/misc" component={MiscDemo} />
                <Route exact path="/timeline" component={TimelineDemo} />
                <Route path="/crud" component={Crud} />
                <Route path="/datatable" component={Table}/>
                <Route path="/empty" component={EmptyPage} />
                <PrivateRoute path="/documentation" component={Documentation} />
                <PrivateRoute exact path="/createuser" component={CreateUser} />
                <PrivateRoute exact path="/table1" component={DataTable} />
                <PrivateRoute exact path="/myprofile" component={MyProfile}></PrivateRoute>
                <PrivateRoute exact path="/editprofile" component={EditProfile}></PrivateRoute>
            
              <Route component={NotFoundPage} />
        </Switch>
        </BrowserRouter>
           
               

          
            {/* </div> */}
        </>
    );
};

export default App;
