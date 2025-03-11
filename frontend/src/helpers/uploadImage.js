const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;
console.log(url)
const uploadImage = async (image) => {
    try {
        console.log("Inside uploadImage function");
        
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "e-commerce");

        console.log("Sending request to Cloudinary...");
        
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const responseData = await response.json();
        console.log("Cloudinary Response:", responseData);

        return responseData;
    } catch (error) {
        console.error("Error in uploadImage function:", error);
        return { error: "Upload failed" };
    }
};

export default uploadImage;


// const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`

// const uploadImage  = async(image) => {
//     const formData = new FormData()
//     formData.append("file",image)
//     formData.append("upload_preset","mern_product")
    

//     const dataResponse = await fetch(url,{
//         method : "post",
//         body : formData
//     })

//     return dataResponse.json()

// }
// console.log(url);
// export default uploadImage 