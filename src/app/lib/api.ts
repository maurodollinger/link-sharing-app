'use server';

import { getXataClient } from "@/xata";
import { ApiData } from "./definitions";

export async function checkIfUserAndTableExists(userId: string) {
    try {
        const xataClient = getXataClient();
        const userExists = await xataClient.db.users.read(userId);
        console.log(userExists);
        if (userExists) return userExists;
        
        const user = await createTable(userId);
        return user;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function getData(userId:string):Promise<ApiData | undefined> {
    try {
        const xataClient = getXataClient();

        const user = await checkIfUserAndTableExists(userId);

        if (user) {
            const data = await xataClient.db.users_links.filter('user_id', user?.id).getMany();
            return {
                json_data: data[0].json_data,
                id:data[0].id
            }
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function createTable(userId: string) {
    try {
        const xataClient = getXataClient();
        await xataClient.db.users.create({ id: userId, name: 'Username' });
        const user = await xataClient.db.users_links.create({ json_data: { links: [] }, user_id: userId });
        return user;
    } catch (error) {
        console.error('Error creating table:', error);
    }
}

export async function updateUserLinkById(id: string, data: any) { 
    try {
        const xataClient = getXataClient();
        const user = await xataClient.db.users_links.update(id, { json_data: data });
        return user;
    } catch (error) {
        console.error('Error updating data:', error);
    }
}