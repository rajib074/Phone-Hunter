const searchPhone = async () => {
    const searchAria = document.getElementById('search-btn');
    const searchAriaText = searchAria.value;
    searchAria.value = '';

    // fetch url
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchAriaText}`;

    const res = await fetch(url);
    const data = await res.json();
    getData(data);

}