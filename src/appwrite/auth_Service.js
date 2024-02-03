import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

// class containing all the properties and methods
export class AuthService
{
    client = new Client();
    account;

    constructor()
    {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account= new Account(this.client);
    }

    async createAccount({email, password, name})
    {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if(userAccount)
            {
                //if account creation success then move to login
                return this.login({email,password})
            }
            else
            {
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite Service :: createAccount :: error ", error);
        }
    }

    async login({email,password})
    {
        try {
          return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log("Appwrite Service :: login :: error ", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout()
    {
        try {
           return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service :: logout :: error ", error);
        }
    }

}

//obj
const authService = new AuthService();

//obj export so that using this obj methods can be accessed anywhere
export default authService;