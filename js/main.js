const searchMobile = async () => {
    const searchAria = document.getElementById('search-box');
    const searchText = searchAria.value;

    searchAria.value = '';

    // fetch url
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    const res = await fetch(url);
    const data = await res.json();  // wait for the response
    getData(data);

}
