import React, {useEffect} from 'react'

export default function Login() {
    
    useEffect(() => {
        window.location.replace('http://10.93.35.176:83/scriptcase/app/c_sispen/menu_saa/menu_saa.php')
    }, [])

    return (
        <div>
            Redirecionando para página de login...
        </div>
    )
}