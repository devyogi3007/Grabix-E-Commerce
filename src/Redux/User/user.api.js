// import axios from 'axios';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { getDocument } from "../../Helpers/firebaseHelper";

export const getUserAPI = async (category, params) => {
    // console.log(category,"sahil")
    let res = await getDocs(collection(db, "users")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
        return newData;
    });
    let data = await res;

    return { data }
}
export const getSinleUserAPI = async (id) => {
    // console.log(category,"sahil")
    // let res = await getDocs(collection(db, "users")).then((querySnapshot) => {
    //     const newData = querySnapshot.docs.map((doc) => ({
    //         ...doc.data(),
    //         id: doc.id
    //     }));
    //     return newData;
    // });
    let res = await getDocument("users", id)
    let data = await res;

    return { data }
}

