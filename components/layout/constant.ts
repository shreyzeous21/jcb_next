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
        description: "Help them run their business more efficiently and effectively.",
        Icon: FaHandsHelping,
    },
    {
        title: "MARKETING AND ADVERTISING",
        description: "Attract customers, which can help you attract new business and grow your customer base.",
        Icon: FaBullhorn,
    },
    {
        title: "EXCLUSIVE TERRITORIES",
        description: "Franchise agreements often come with exclusive territories, which can help ensure that you are not competing with other franchisees for the same customers",
        Icon: FaMapMarkedAlt,
    },
    {
        title: "GROUP PURCHASING POWER",
        description: "As part of a franchise, you can often take advantage of group purchasing power to negotiate better deals on supplies and equipment, which can help reduce your operating costs.",
        Icon: FaUsers,
    },
    {
        title: "REDUCED RISK",
        description: "Franchises often have a lower risk of failure compared to independent businesses because of the proven business model and support provided by the franchisor.",
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
    {
        name: "Enquiries",
        href: "/dashboard/enquiries",
    },
]