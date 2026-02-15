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
        name: "Products",
        href: "/products",
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
        description: "Niks is a recognized and trusted name in the JCB parts industry, known for consistent quality and dependable supply.Our brand reputation helps both dealers and exporters build credibility instantly—whether selling across the counter or across borders.",
        Icon: FaAward,
    },
    {
        title: "SUPPORT AND TRAINING",
        description: "Dealers receive structured training and ongoing support to operate confidently and efficiently.From product knowledge to sales guidance, our team helps you perform at your best.",
        Icon: FaHandsHelping,
    },
    {
        title: "MARKETING AND ADVERTISING",
        description: "Niks invests in brand promotion and dealer support to help drive local demand. You benefit from professional marketing materials and brand-led campaigns designed to bring customers to you.",
        Icon: FaBullhorn,
    },
    {
        title: "BRAND PROMOTION & DEALER SUPPORT",
        description: `Niks invests in brand promotion and dealer support to help drive local demand. You benefit from professional marketing materials and brand-led campaigns designed to bring customers to you.
    
    Advantages:
    • Competitive export pricing
    • High-volume supply capability
    • Stable sourcing`,
        Icon: FaBullhorn, // you can change icon if needed
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
        name: "Media Manager",
        href: "/dashboard/media-manager",
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

export const TOTAL_LIMIT_BYTES = 2 * 1024 * 1024 * 1024;