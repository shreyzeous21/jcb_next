import {
    FaAward,
    FaHandsHelping,
    FaBullhorn,
    FaMapMarkedAlt,
    FaUsers,
    FaShieldAlt
} from "react-icons/fa";


export const navLinks = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "About",
        href: "/about",
    },
    {
        name: "Quality",
        href: "/quality",
    },
    {
        name: "Shop",
        href: "/shop",
    },
    {
        name: "Events",
        href: "/events",
    },
    {
        name: "Contact Us",
        href: "/contact-us",
    },
]

export const homeBanner = [
    {
        image: "/1.webp",
    },
    {
        image: "/2.jpg",
    },
    {
        image: "/3.jpg",
    },
]

export const benefits = [
    {
        title: "ESTABLISHED BRAND RECOGNITION",
        description: "Helps to attract customers and build trust in your business.",
        Icon: FaAward,
    },
    {
        title: "SUPPORT AND TRAINING",
        description: "Helps to attract customers and build trust in your business.",
        Icon: FaHandsHelping,
    },
    {
        title: "MARKETING AND ADVERTISING",
        description: "Helps to attract customers and build trust in your business.",
        Icon: FaBullhorn,
    },
    {
        title: "EXCLUSIVE TERRITORIES",
        description: "Helps to attract customers and build trust in your business.",
        Icon: FaMapMarkedAlt,
    },
    {
        title: "GROUP PURCHASING POWER",
        description: "Helps to attract customers and build trust in your business.",
        Icon: FaUsers,
    },
    {
        title: "REDUCED RISK",
        description: "Helps to attract customers and build trust in your business.",
        Icon: FaShieldAlt,
    },
]

export const WEBSITE_NAME = "JCV Parts";
export const WEBSITE_LOGO = "/jcblogo.png";

export const DASHBOARD_MENU_ITEMS = [

    {
        name: "User Management",
        href: "/dashboard/user-management",
        role: "SUPERADMIN",
    },
    {
        name: "Categories",
        href: "/dashboard/categories",
    },
    {
        name: "Products",
        href: "/dashboard/products",
    },
    {
        name: "Contacts",
        href: "/dashboard/contacts",
    },
    {
        name: "Newsletter",
        href: "/dashboard/newsletter",
    },
]