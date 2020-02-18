const postings = [
    {
        id: "135468a",
        title: "Example",
        description: "The description of the example posting",
        category: "Clothing",
        location: "Oulu, Finland",
        images: [
            "url to the first picture",
            "url to the second picture",
            "url to the third picture",
            "url to the fourth picture"
        ],
        price: 1641,
        dateOfPosting: "2018-05-53T15:35:08Z",
        deliveryType: "Pick Up",
        sellerInfo: {
            id: 1,
            name: "John Doe",
            telephoneNumber: "+358-40-374-3608"
        },
        lastEditDate: "2020-01-02T15:36:55Z"
    }
]

module.exports = {
    // Get a posting by its id
    getById: (id) => postings.find(posting => posting.id ===id),
    // Get all postings
    getAllPostings: () => postings,
    // Get a posting by its name/title
    getByName: (postingName) => postings.find(posting => posting.title === postingTitle),
    // Creating a new posting
    createNewPosting: (newPosting) => {
        postings.push(newPosting);
        return newPosting;
    },
    // Edit a posting
    changePosting: (postingToEdit) => {
        let result = null;
        postings.forEach((posting, i) => {
            if (posting.id == postingToEdit.id && posting.sellerInfo.id == postingToEdit.sellerInfo.id) {
                postings[i] = {
                    ...postings[i],
                    ...postingToEdit
                }
                result = postings[i];
            }
        });
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
        let filteredPostings = postings.filter(category => {
            category.toLowerCase().indexOf(postingCategory.toLowerCase()) >= 0;
        })
        return filteredPostings;
    },
    // Search by location
    searchByLocation: (postingLocation) => {
        let filteredPostings = postings.filter(location => {
            location.toLowerCase().indexOf(postingLocation.toLowerCase()) >= 0;
        })
        return filteredPostings;
    },
    // Search by date of posting
    searchByDateOfPosting: (postingDate) => {
        let filteredPostings = postings.filter(date => {
            date.toLowerCase().indexOf(postingDate.toLowerCase()) >= 0;
        })
        return filteredPostings;
    }

}