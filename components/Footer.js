import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"
import React from 'react'

export default function Footer() {
    return (
        <>
            <div className="flex justify-center p-20">
                <FaInstagram className="text-2xl cursor-pointer hover:text-blue-600" />
                <FaFacebook className="text-2xl cursor-pointer hover:text-blue-600" />
                <FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
                <FaYoutube className="text-2xl cursor-pointer hover:text-blue-600" />
            </div>
        </>
    )
}