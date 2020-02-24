const postings = [
    {
        id: 0,
        title: "Example",
        description: "The description of the example posting",
        category: "Clothing",
        location: "Oulu",
        images: [
            "url to the first picture",
            "url to the second picture",
            "url to the third picture",
            "url to the fourth picture"
        ],
        price: 1641,
        deliveryType: "Pick Up",
        sellerId: 0,
        sellerName: "John Doe",
        sellerTelephoneNumber: "+358-40-374-3608",
        dateOfPosting: "2020-02-21T17:08:23.977Z23Z",
        lastEditDate: "2020-03-02T15:36:55.951Z"
    },
    {
        id: 1,
        title: "Lego",
        description: "The description of the example posting",
        category: "Toys",
        location: "Turku",
        images: [
            "url to the first picture",
            "url to the second picture",
            "url to the third picture",
            "url to the fourth picture"
        ],
        price: 1641,
        deliveryType: "Pick Up",
        sellerId: 0,
        sellerName: "John Doe",
        sellerTelephoneNumber: "+358-40-374-3608",
        dateOfPosting: "2018-05-23T15:35:08.223Z",
        lastEditDate: "2020-01-02T15:36:55.231Z"
    },
    {
        id: 2,
        title: "My man",
        description: "The description of the example posting",
        category: "Toys",
        location: "Oulu, Finland",
        images: [
            "url to the first picture",
            "url to the second picture",
            "url to the third picture",
            "url to the fourth picture"
        ],
        price: 1641,
        deliveryType: "Pick Up",
        sellerId: 0,
        sellerName: "John Doe",
        sellerTelephoneNumber: "+358-40-374-3608",
        dateOfPosting: "2018-05-23T15:35:08.105Z",
        lastEditDate: "2020-01-02T15:36:55.568Z"
    }
]

module.exports = {
    // Get a posting by its id
    getById: (id) => postings.find(posting => posting.id == id),
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
            if (posting.id == postingToDelete.id && posting.sellerInfo.id == postingToDelete.sellerInfo.id) {
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