 
import React from 'react'
import { useMediaQuery }  from 'react-responsive'


export default function MediaQuery(device){

    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 992 })
        return isDesktop ? children : null
    }

    const Tablet = ({ children }) => {
        const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
        return isTablet ? children : null
    }
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 767 })
        return isMobile ? children : null
    }

    if( device == 'desktop' )
        return Desktop
    
    if( device == 'tablet' )
        return Tablet
    
    if( device == 'mobile' )
        return Mobile
    
} 