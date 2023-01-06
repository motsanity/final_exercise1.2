import Router from 'next/router';
import { listeners } from 'process';
import Appbar from '../../components/navbar';
import UserList from '../users'
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import { alignProperty } from '@mui/material/styles/cssUtils';
import { textAlign } from '@mui/system';
import Navbar from '../../components/navbar';
import axios from 'axios';
import { deleteCookie, getCookie, hasCookie } from 'cookies-next';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import Restriction from '../../components/restriction'
import Item from '@mui/material/ListItem'
// import ProfilePage from '../../components/profilepage';
import { NextResponse } from 'next/dist/server/web/spec-extension/response'
import { useEffect } from "react";
import { useLayoutEffect } from "react"
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic'


const ProfilePage = dynamic(() => import('../../components/profilepage'))



export default function Profile({ profile }) {

    const router = useRouter();
    const token = getCookie("token")

    console.log(profile.id)

    useEffect(() => {
        const checkCookie = setInterval(() => {
            // If the cookie is removed, automatically logout the user by redirecting them to the login page
            if (!hasCookie('token')) {
                router.push('/login')
            }
        }, 1000)

        return () => clearInterval(checkCookie)
    }, [])



    useEffect(() => {
        if (token !== profile.id) {
            router.replace(`./${token}`);
        }
    }, []);

    if (token == profile.id) {
        return (
            <Box>
                <Appbar />
                <ProfilePage profile={profile} />
            </Box>

        )
    }
    return (
        <Box>
            <Appbar />
            <Typography variant='h5' align='center'>Page Don't Exist. You will be redirected back to your profile..</Typography>
        </Box>

    )

}

export async function getStaticPaths() {

    const response = await fetch
        ('https://638aa9827220b45d22805a6a.mockapi.io/data'
        )
    const data = await response.json()

    const paths = data.map(function (profile) {
        return {
            params: {
                profileId: `${profile.id}`
            }
        }
    })

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps(context) {

    const { params } = context
    const { data } = await axios.get
        (`https://638aa9827220b45d22805a6a.mockapi.io/data/${params.profileId}`
        )


    return {
        props: {
            profile: data,
        },
    }

}

