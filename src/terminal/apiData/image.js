export const user = {
    uploadImage: {
        method: 'POST',
        formData: true,
        uri: 'image',
        body: {
            image: undefined
        },
        suggestions: {
            raw: "A raw example: {image:'upload an image file}.",
            image: "Please upload an an image file",
        }
    },
    getAllImages: {
        method: 'GET',
        uri: 'image',
        suggestions: {
            raw: "A raw example of the uri '/image'.",
        }
    },
    deleteImages: {
        method: 'DELETE',
        uri: 'image',
        body: {
            id: undefined
        },
        suggestions: {
            raw: "A raw example: {image:'upload an image file}.",
            id: "Please provide an array of image ids.",
        }
    },
};