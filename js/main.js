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
//update get data

const getData = name => {
    const mobiles = name.data.slice(0,20);
    const mobileDiv = document.getElementById('phones');
    mobileDiv.textContent = '';

    if (mobiles.length > 0) {
        mobiles.forEach(mobile => {
            const div = document.createElement('div');
            div.classList.add('phone');
            div.textContent = '';
            div.innerHTML = `
            <figure class="bg-slate-100 rounded-xl p-8 dark:bg-slate-800">
                <img class="w-24 h-24 md:w-40 md:h-auto md:rounded-none rounded-full mx-auto" src="${mobile.image}" alt="" width="384" height="512">
                <div class="pt-6 md:p-8 md:pb-0 text-center md:text-left space-y-4">
                    <figcaption class="font-medium text-center">
                        <div class="text-zinc-900 dark:text-sky-400 text-3xl font-bold">
                            ${mobile.phone_name}
                        </div>
                        <div class="text-zinc-600 dark:text-sky-400 text-2xl font-bold">
                            ${mobile.brand}
                        </div>
                        <button type="button" onclick="loadMore('${mobile.slug}')" class="text-white text-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-8 py-3 text-center mt-5 mr-2 mb-2">Explore</button>   
                    </figcaption>
                </div>
            </figure>
            `;
            mobileDiv.appendChild(div);
            // console.log(phone);
        });
    } else if(mobiles.length == ''){
        mobileDiv.innerHTML = `
        <div class="w-full p-4 text-center">
            <div class="text-2xl text-slate-900 dark:text-sky-400">
                Please write a valid name
            </div>
        </div>
        `;
    } else {
        mobileDiv.innerHTML = `
        <div class="w-full p-4 text-center">
            <div class="text-2xl text-sky-500 dark:text-sky-400">
                No results found
            </div>
        </div>
        `;
    }
}
