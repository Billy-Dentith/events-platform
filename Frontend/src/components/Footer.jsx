import React from 'react'
import { FaRegCopyright, FaFacebook, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import "./Footer.css"

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-content'>
            <h3>Join Event Nest. <Link className='sign-up-link' to="/account" >Get Started</Link></h3>
            <div className='footer-socials'>
                <h4>Follow us </h4>
                <div className='footer-socials-links'>
                    <FaFacebook className='icons' />
                    <FaInstagram className='icons' />
                    <FaSquareXTwitter className='icons' />
                </div>
            </div>
            <div className='footer-links'>
                <nav className='footer-nav'>
                    Account
                    <ul>
                        <li><Link className='footer-link' to="/account" >Sign Up</Link></li>
                        <li><Link className='footer-link' to="/account" >Sign In</Link></li>
                    </ul>
                </nav>
                <nav className='footer-nav'>
                    Discover
                    <ul>
                        <li><Link className='footer-link' to="/events" >Find Events</Link></li>
                        <li><Link className='footer-link' to="/events" >Online Events</Link></li>
                    </ul>
                </nav>
                <nav className='footer-nav'>
                    Support
                    <ul>
                        <li>About</li>
                        <li>Contact Us</li>
                    </ul>
                </nav>
            </div>
            <h5><FaRegCopyright className='copyright-logo'/> 2024 Event Nest. All Rights Reserved</h5>
        </div>
    </div>
  )
}

export default Footer