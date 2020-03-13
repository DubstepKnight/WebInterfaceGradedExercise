const postings = [
    {
        id: 0,
        title: "Bike '24'",
        description: "Good condition, size: 24, 3 speeds",
        category: "Transport",
        location: "Oulu",
        images: [
            "https://res.cloudinary.com/hbgq5qscq/image/upload/v1583954081/sell-out/bike_image_1_xviohl.jpg",
            "https://res.cloudinary.com/hbgq5qscq/image/upload/v1583954081/sell-out/bike_image_2_dcj1hs.jpg",
            "https://res.cloudinary.com/hbgq5qscq/image/upload/v1583954081/sell-out/bike_image_3_csh8v9.jpg"
        ],
        price: 60,
        deliveryType: "Pick Up",
        sellerId: 0,
        sellerName: "Soussi Ghassen",
        sellerTelephoneNumber: "+358-40-374-3608",
        dateOfPosting: "2020-02-21T17:08:23.977Z23Z",
        lastEditDate: "2020-03-02T15:36:55.951Z"
    },
    {
        id: 1,
        title: "Kettle",
        description: "Kettle - perfectly working and clean. Can contain up to 1.5 liters of water. Pm if you're interested!",
        category: "Kitchen applience",
        location: "Oulu",
        images: [
            "https://res.cloudinary.com/hbgq5qscq/image/upload/v1583954371/sell-out/kettle2_bnhgrp.jpg",
            "https://res.cloudinary.com/hbgq5qscq/image/upload/v1583954371/sell-out/kettle1_xsiix5.jpg"
        ],
        price: 10,
        deliveryType: "Pick Up",
        sellerId: 1,
        sellerName: "Georges Delmotte",
        sellerTelephoneNumber: "+358-40-354-2200",
        dateOfPosting: "2018-05-23T15:35:08.223Z",
        lastEditDate: "2020-01-02T15:36:55.231Z"
    },
    {
        id: 2,
        title: "New ankle boots by Ted Barker",
        description: "New Ankle Boots by Ted Barker, Black Leather and Suede Uppers in Gold Metal Detail. Size 39, price 100 € Pick up at the center or at the Mill Customs",
        category: "Boots",
        location: "Oulu, Finland",
        images: [
            "https://res.cloudinary.com/hbgq5qscq/image/upload/v1583954651/sell-out/89835754_10157406552304685_1317012495382085632_n.jpg_hecrac.jpg",
            "https://res.cloudinary.com/hbgq5qscq/image/upload/v1583954643/sell-out/89435721_10157406552444685_2992042800154935296_n.jpg_ohgmzh.jpg",
            "https://res.cloudinary.com/hbgq5qscq/image/upload/v1583954633/sell-out/89435721_10157406552119685_2805953506580627456_o.jpg_u6hvyx.jpg",
            "https://res.cloudinary.com/hbgq5qscq/image/upload/v1583954614/sell-out/89605133_10157406552024685_3081849707320836096_o.jpg_qczd2b.jpg"
        ],
        price: 100,
        deliveryType: "Delivery",
        sellerId: 1,
        sellerName: "Blanca Ramos",
        sellerTelephoneNumber: "+358-40-992-2567",
        dateOfPosting: "2018-05-23T15:35:08.105Z",
        lastEditDate: "2020-01-02T15:36:55.568Z"
    }
]

module.exports = {
    // Get a posting by its id
    getById: (id) => postings.find(posting => posting.id == id),
    // Get by sellerId 
    getBySellerId: (Id) => {
        let postingsBySellerId = postings.filter(posting =>  posting.sellerId == Id);
        return postingsBySellerId;
    },
    // Get all postings
    getAllPostings: () => postings,
    // Get a posting by its name/title
    getByName: (postingTitle) => postings.find(posting => posting.title === postingTitle),
    // Creating a new posting
    createNewPosting: (newPosting) => {
        let newerPosting = {
            id: postings.length + 1,
            ...newPosting,
            dateOfPosting: new Date()
        }
        postings.push(newerPosting);
        return newerPosting;
    },
    // Edit a posting
    changePosting: (postingToEdit) => {
        let result = null;
        console.log("posting to edit blyat nahui!", postingToEdit);
        postings.forEach((posting, i) => {
            if (posting.id == postingToEdit.id && posting.sellerId == postingToEdit.sellerId) {
                postings[i] = {
                    ...postings[i],
                    ...postingToEdit,
                    lastEditDate: new Date()
                }
                result = postings[i];
            }
        });
        console.log("result", result);
        return result;
    },
    // Delete a posting
    deletePosting: (postingToDelete) => {
        let result = null;
        postings.forEach((posting, i) => {
            if (posting.id == postingToDelete) {
                console.log(posting);
                postings.splice(i, 1);
                result = true;
            }
        });
        return result;
    },
    // Search by category
    searchByCategory: (postingCategory) => {
        let filteredPostings = postings.filter(({category}) => category.toLowerCase().indexOf(postingCategory.toLowerCase()) >= 0)
        return filteredPostings;
    },
    // Search by location
    searchByLocation: (postingLocation) => {
        let filteredPostings = postings.filter(({location}) => location.toLowerCase().indexOf(postingLocation.toLowerCase()) >= 0 );
        return filteredPostings;
    },
    // Search by date of posting
    searchByDateOfPosting: (postingDate) => {
        console.log("posting date: ", postingDate);
        let filteredPostings = postings.filter(({dateOfPosting}) => JSON.stringify(dateOfPosting).indexOf(postingDate) >= 0);
        return filteredPostings;
    }
}