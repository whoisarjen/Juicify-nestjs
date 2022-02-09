import { deleteDatabaseIndexedDB } from "./indexedDB.utils";
import { setLastUpdated } from "./db.utils";
import axios from "axios";

export const logout = async () => {
    try {
        await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER}/auth/logout`,
            {},
            { withCredentials: true }
        );
        await deleteDatabaseIndexedDB();
        const isDarkMode = localStorage.getItem('isDarkMode');
        localStorage.clear();
        if (isDarkMode) {
            localStorage.setItem('isDarkMode', isDarkMode)
        }
        window.location.replace(`${window.location.origin}/login`)
    } catch (e: any) {
        console.log(e.message)
    }
}

export const readToken = async (token: string) => {
    if (!token) return ''
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

export const refreshToken = async () => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/auth/refresh`,
        {},
        { withCredentials: true }
    );
    setLastUpdated();
    return response.data.token
}

export const getCookie = async (cookieName: string) => {
    let cookie: any = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    console.log(cookie[cookieName])
    return cookie[cookieName];
}

export const parseBoolean = (value: string | boolean): boolean => value.toString().toLowerCase() === 'true' ? true : false

export const isBrowserValid = async () => {
    let agent: any = { browser: { name: null, version: null, v: null, userAgent: null, app: null } };
    let nAgt: any = navigator.userAgent;
    let browserName: any = navigator.appName;
    let fullVersion: any = '' + parseFloat(navigator.appVersion);
    let majorVersion: any = parseInt(navigator.appVersion, 10);
    let nameOffset, verOffset;
    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }
    agent.browser.name = browserName;
    agent.browser.version = fullVersion;
    agent.browser.v = majorVersion;
    agent.browser.app = navigator.appName;
    agent.browser.userAgent = navigator.userAgent;
    if (agent.browser.name == "Microsoft Internet Explorer" && parseInt(agent.browser.v) < 100) return false // Not supporting IE
    if (agent.browser.name == "Chrome" && parseInt(agent.browser.v) < 4) return false
    if (agent.browser.name == "Firefox" && parseInt(agent.browser.v) < 11) return false
    if (agent.browser.name == "Opera" && parseInt(agent.browser.v) < 13) return false
    if (agent.browser.name == "Safari" && parseInt(agent.browser.v) < 5) return false
    return true;
}