//profile


import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

//profileid
import Router from 'next/router';
import { listeners } from 'process';
import Appbar from './navbar';
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import { alignProperty } from '@mui/material/styles/cssUtils';
import { textAlign } from '@mui/system';
import Navbar from './navbar';
import axios from 'axios';
import { deleteCookie, getCookie, hasCookie } from 'cookies-next';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import Restriction from './restriction'
import Item from '@mui/material/ListItem'
import ProfilePage from './profilepage';
import { NextResponse } from 'next/dist/server/web/spec-extension/response'
import { useEffect } from "react";
import { useLayoutEffect } from "react"
import { Box, Typography } from '@mui/material';

//register
import { useState, useRef } from 'react';
import { useFormik } from 'formik';
import type { NextPage } from 'next';
import * as yup from 'yup';
import { AppBar } from '@mui/material'
import { Button } from '@mui/material';
import { Container } from '@mui/material';
import { TextField } from '@mui/material'
import Link from "next/link";

//navbar

import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import cookie from 'js-cookie'
