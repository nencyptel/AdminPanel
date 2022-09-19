import React ,{useRef} from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
// import 'react-dropdown/style.css';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import './components/top.css'

export const AppTopbar = (props) => {

    let items = [{label: 'New', icon: 'pi pi-fw pi-plus'},
                 {label: 'Delete', icon: 'pi pi-fw pi-trash'}];

    const menu = useRef(null);
    
    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-dark.svg' : 'assets/layout/images/logo-white.svg'} alt="logo"/>
                <span>SAKAI</span>
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

                <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-calendar"/>
                            <span>Events</span>
                        </button>
                    </li>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-cog"/>
                            <span >Settings</span>
                        </button>
                    </li>
                    <li>
                    <button className="p-link topbar-button " style={{display:"flex",marginLeft:"6px"}}  onClick={props.onMobileSubTopbarMenuClick}>
                        <Menu model={items} popup ref={menu} />
                        <Button label="" icon="pi pi-user" style={{color:"grey",border:"none",background:"transparent",display:"flex"}} onClick={(event) => menu.current.toggle(event)}/>   
                        <span className="span1">Profile</span>                                                                      
                    </button>   
                    </li>
                </ul>
        </div>
    );
}