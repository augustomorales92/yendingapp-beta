import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"
import React from 'react'

export default function Footer() {
    return (
        <>
            <div className="text-primary flex justify-center p-20">
                <FaInstagram className="text-2xl cursor-pointer hover:text-primary_b" />
                <FaFacebook className="text-2xl cursor-pointer hover:text-primary_b" />
                <FaTwitter className="text-2xl cursor-pointer hover:text-primary_b" />
                <FaYoutube className="text-2xl cursor-pointer hover:text-primary_b" />
            </div>
        </>
    )
}