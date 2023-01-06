import { NextResponse } from 'next/dist/server/web/spec-extension/response'
import axios from 'axios'
import { getCookie, hasCookie } from 'cookies-next'

export default function middleware(req) {

    let verify = req.cookies.get("token")

    let url = req.url



    if (!verify && url.includes(`http://localhost:3000/profile`)) {
        return NextResponse.redirect("http://localhost:3000/login")
    }

    else if (verify && url.includes("http://localhost:3000/login")) {

        let token = verify.value
        console.log(token)
        return NextResponse.redirect(`http://localhost:3000/profile/${token}`)
        
    }
}


