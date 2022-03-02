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
// lode more
const loadMore = async name => {
    const url = `https://openapi.programming-hero.com/api/phone/${name}`;

    const res = await fetch(url);
    const data = await res.json();  // wait for the response
    mobileDetails(data);
}

//mobile details
const mobileDetails = details => {
    const mobileData = details.data;
    const sensors = mobileData.mainFeatures.sensors;
    const keys = mobileData.others ? Object.entries(mobileData.others) : [];
    const releaseDate = mobileData.releaseDate ? mobileData.releaseDate : 'No Release Date Found';
    const modelDetails = document.getElementById('phone-details');

    modelDetails.innerHTML = `
    <div class="mx-auto px-4 py-8 bg-white rounded-lg max-w-4xl mt-12 mb-16 shadow-2xl">
        <div class="md:flex flex-wrap">
            <div class="w-full md:w-1/2 px-4 mb-12 md:mb-0">
                <div class="relative">
                    <img class="w-full" src="${mobileData.image}" alt="">
                </div>
            </div>
            <div class="w-full md:w-1/2 px-4">
                <div class="flex flex-wrap -mx-4">
                    <div class="w-full px-4">
                        <div class="text-3xl font-bold text-black-900 dark:text-sky-400">
                            ${mobileData.name}
                        </div>
                        <div class="text-lg text-amber-900 dark:text-sky-400">
                            ${mobileData.brand}
                        </div>
                        <div class="mt-6">
                            <p class="mt-2 text-lg text-lime-900 dark:text-sky-400 flex gap-4">
                                <strong>ID:</strong>
                                <span>${mobileData.slug}</span>
                            </p>
                            <p class="mt-2 text-lg text-lime-900 dark:text-sky-400 flex gap-4">
                                <strong>Storage:</strong>
                                <span>${mobileData.mainFeatures.storage}</span>                                
                            </p>
                            <p class="mt-2 text-lg text-lime-900 dark:text-sky-400 flex gap-4">
                                <strong>Release Date:</strong>
                                <span>${releaseDate}</span>
                            </p>
                            <div class="mt-2 text-lg text-lime-900 dark:text-sky-400 flex gap-4">
                                <strong>Sensor:</strong>
                                <ul>${sensors.map(sensor => `<li>${sensor}</li>`).join('')}</ul>
                            </div>
                            <div class="mt-2 text-lg text-lime-900 dark:text-sky-400 flex gap-4">
                                <strong>Others:</strong>
                                <ul>${keys.map((value) => `<li>${value[0]} : ${value[1]}</li>`).join('')}</ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

