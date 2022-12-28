
const btn = document.querySelector('#btn-img');
btn.addEventListener('click', search);
document.querySelector('#loading-text').style.display = 'none';
function search(e) {
    e.preventDefault();
    const userInput = document.querySelector('#input');
    const numberField = document.querySelector('#number-input');
    const textConvert = userInput.value.toLocaleLowerCase();
    let numberFieldVal = numberField.value;
    // const numberFieldAmount = numberFieldVal.value;
    if (!userInput.value || !numberField.value) {
        //display warning massage
        warning.innerHTML = "Please enter a something in the 'Search' field and a number in the 'Number' field...";
        //empty container if the warning shows up
        document.querySelector('#img-container').innerHTML = '';
    } else {
        document.querySelector('#warning').innerHTML = '';
        // make the API request and display the images
        console.log('numberFieldVal', numberFieldVal);
        userInput.value = '';
        numberField.value = '';
        const sortInput = document.querySelector('#sort-input')
        const getSort = sortInput.value;
        document.querySelector('#img-container').innerHTML = '';
        showAnimation(() => {
            fetchPhotos(textConvert, numberFieldVal, getSort);
        });
        

    }

}
// ==========================scroll section============================
const btnScrollTop = document.querySelector('#btn-scroll-top');
btnScrollTop.style.display = 'none';
btnScrollTop.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 0) {
        // show the scroll button
        btnScrollTop.style.display = 'block';
    } else {
        // hide the scroll button
        btnScrollTop.style.display = 'none';
    }
});



// ============================animation Selection========================

function showAnimation(callback) {
    document.querySelector('#loading-text').style.display = 'block';
    document.querySelector('#loader').style.display = 'block';
    const animation = anime({
        targets: '#loader .box1',
        scale: [
            { value: '.1', duration: 2400, easing: 'easeOutSine' },
            { value: '1', duration: 300, easing: 'easeInQuad' },
        ],
        translateY: [
            { value: '-45', duration: 200, easing: 'easeOutSine' },
            { value: '0', duration: 14, easing: 'easeInQuad' }
        ],
        opacity: [
            { value: '.1', duration: 1, easing: 'easeOutSine' },
            { value: '3', duration: 0, easing: 'easeInQuad' },
        ],
        backgroundColor: '#bc946b',
        complete: () => {
            document.querySelector('#loading-text').style.display = 'none';
            document.querySelector('#loader').style.display = 'none';
            callback();
        },
        
    });
    
}
// ====================url section===================

function fetchPhotos(textConvert, numberFieldVal, getSort) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=353cdf62bd997a3a8552befc2aacfe3f&text=${textConvert}&sort=${getSort}&per_page=${numberFieldVal}&format=json&nojsoncallback=1`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.photos.photo.length === 0) {
                // Display warning message if no images are returned
                warning.innerHTML = "No images found for the specified search criteria.";
            } else {
                // Display the images
                displayPhotos(data);
            }
        })
        .catch(error => {
            // Display error message if API request fails
            warning.innerHTML = "An error occurred while fetching the photos. Please try again later.";
            console.error(error);
        });
}

// ======================photo/card section==============================
function displayPhotos(getImgData) {
    // console.log('imageData', getImgData);
    const getData = getImgData;

    const sizeInput = document.querySelector('#size-input')
    const getSize = sizeInput.value
    // after images is complete fetching from the api and about to display in the Dom
    const imgContainer = document.querySelector('#img-container');
    imgContainer.style.opacity = '1';
    imgContainer.innerHTML = '';
    //clearing the container when the warning appear
    document.querySelector('#warning').innerHTML = '';

    

    const imgArr = getData.photos.photo;
    console.log(imgArr);

    imgArr.forEach(function (img) {
        let id = img.id;
        let server = img.server;
        let secret = img.secret;
        let getImg = `https://live.staticflickr.com/${server}/${id}_${secret}_${getSize}.jpg`;

        // Create an image element
        const image = document.createElement('img');
        image.src = getImg;
        image.alt = "image";

        imgContainer.appendChild(image);
    });
}
