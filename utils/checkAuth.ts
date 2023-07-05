import axios from '@/core/axios';
import nookies from 'nookies';
import * as Api from '@/api';
import { GetServerSidePropsContext } from "next";

export const checkAuth = async (ctx: GetServerSidePropsContext) => {
    const { _token } = nookies.get(ctx);
    axios.defaults.headers.Authorization = 'Bearer ' + _token;
    try {
        await Api.auth.getMe();
        return {
            props: {},
        };
    } catch (err) {
        return {
            redirect: {
                destination: '/dashboard/auth',
                permanent: false,
            },
        };
    }
};

export const checkConfirmEmail = async (ctx: GetServerSidePropsContext) => {
    const { _token } = nookies.get(ctx);
    axios.defaults.headers.Authorization = 'Bearer ' + _token;
    try {
        const userData = await Api.auth.getMe();
        if (userData.isConfirmed) {
            return {
                props: {},
            };
        } else {
            return {
                redirect: {
                    destination: '/profile',
                    permanent: false,
                },
            };
        }
    } catch (err) {
        return {
            redirect: {
                destination: '/dashboard/auth',
                permanent: false,
            },
        };
    }
};