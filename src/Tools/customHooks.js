import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchPets = (filters) => {
    return useQuery(["pets", filters], async () => await fetchingData(filters), {
        refetchOnWindowFocus : false
    });
};

export const useUserFavoritesPets = (filters) => {
    return useQuery(["user", filters], async () => await fetchingFavorites(filters), {
        refetchOnWindowFocus : false
    });
}

export const useFavoritesPetsDetails = (filters) => {
    return useQuery(["pets", filters], async ()=> await favoritesPetsDetails(filters),{
        refetchOnWindowFocus : false,
    })
}

async function fetchingData({ page=0, name, type, location, gender , age, size}) {

    const ageFilter = !age ? [] : passArrayByUrl(age);
    const nameFilter = !name ? "" : name;
    const typeFilter = !type.length ? '{%22dog%22,%22cat%22}' : passArrayByUrl(type);
    const genderFilter = !gender.length ? '{%22female%22,%22male%22}' : passArrayByUrl(gender);
    const sizeFilter = !size.length ?  '{%22small%22,%22medium%22,%22big%22}' : passArrayByUrl(size)
    const locationFilter = !location.length ? "" : passArrayByUrl(location)

    const dataTest = await axios.get(`https://rebirth-app-backend.herokuapp.com/?page=${page}&name=${nameFilter}&type=${typeFilter}&age=${ageFilter}&gender=${genderFilter}&size=${sizeFilter}&location=${locationFilter}`);
 
    return dataTest;
}

function passArrayByUrl(filterArray){
    var auxString = '{'
    if(filterArray.length !== 0){
        filterArray.forEach((g) => {
            auxString += `%22${g}%22,`
        })
        auxString = auxString.substring(0, auxString.length - 1 );
        auxString += '}';
    }
    return auxString 
}

async function fetchingFavorites({mail}){
    console.log('mail :>> ', mail);
    const  dataFavorites  = await axios.get(`https://rebirth-app-backend.herokuapp.com/user/Favs/${mail}`)
    return dataFavorites
}

async function favoritesPetsDetails({id}){
    console.log('mail :>> ', id);
    const dataFavorites = await axios.get(`https://rebirth-app-backend.herokuapp.com/pets/${id}`)
    console.log('favorites pets :>> ', dataFavorites);
    return dataFavorites
}

// async function favoritesPetsDetails({id}){
//     console.log('mail :>> ', id);
//     const dataFavorites = await axios.get(`http://localhost:3001/pets/${id}`)
//     console.log('favorites pets :>> ', dataFavorites);
//     return dataFavorites
// }