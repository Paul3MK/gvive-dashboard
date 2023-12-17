"use client"

import React, { useEffect, useState } from "react"
import { Grid, Column, Tag, Breadcrumb, BreadcrumbItem, OverflowMenu, OverflowMenuItem } from "@carbon/react"
import CustomTable from "@/components/CustomTable/CustomTable"
import CTA from "@/components/CTA/CTA"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


const headers = [
    {
        key: "user_id",
        header: "ID"
    },
    {
        key: "email",
        header: "Email"
    },
    {
        key: "type",
        header: "User type"
    },
    {
        key: "date_created",
        header: "Date created"
    },
    {
        key: "user_type",
        header: "User type"
    },
    {
        key: "actions",
        header: ""
    }
]

const Overflow = () => {
    return (
        <OverflowMenu>
            <OverflowMenuItem itemText="Edit user" />
            <OverflowMenuItem itemText="Deactivate user" />
            <OverflowMenuItem hasDivider itemText="Delete user" />
        </OverflowMenu>
    )
}

const rows = [
    {
        userId: "832j01ik",
        name: "Adam Boateng",
        type: "Driver",
        dateCreated: new Date(Date.now()).toDateString(),
        status: <Tag type="red">Deactivated</Tag>,
        actions: <Overflow/>

    }
]


export default function UserManagement() {

    const [ openModal, setOpenModal ] = useState<boolean>()
    const [ data, setData ] = useState<[]>()
    const queryClient = useQueryClient()

    const query = useQuery({queryKey: ["users"], queryFn: async() => {
        const req = await fetch("http://127.0.0.1:8000/users")
        const res = await req.json()

        if(!req.ok){
            throw new Error("Error.")
        }
        if(req.status == 200){
            return res
        }
    }})

    useEffect(()=>{
        setData(query.data)
    }, [query])

    if (query.isLoading){
        return(
            <p>Loading...</p>
        )
    }

    if(query.data){
        console.log(data)
        return (
            <Grid>
                <Column lg={16} md={8} sm={4} className="page__banner">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <a href="/users">Users</a>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <h1 className="page__heading">User management</h1>
                </Column>
                <Column lg={16} md={8} sm={4}>
                    <CustomTable rows={query.data} headers={headers} search button={<CTA label="Create user" modalOpener={setOpenModal}/>}/>
                </Column>
            </Grid>
        )
    }

}