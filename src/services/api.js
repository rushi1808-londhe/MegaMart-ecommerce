export async function fetchData() 
    {
        let response = await fetch("https://dummyjson.com/products?limit=194");
        let data = await response.json();
        console.log(data);
        return data;
    }



