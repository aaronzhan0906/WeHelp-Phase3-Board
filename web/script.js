document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".postForm");
    const mainContainer = document.querySelector(".main");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);

        try {
            const response = await fetch("/api/board", {
                method: "POST",
                body: formData
            });
            
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log("Post created");

            form.reset();

            addNewPost();
        } catch (error) {
            console.error("Error:", error);
        }
    });

    function addNewPost(post){
        const postElement = createPostElement(post);
        mainContainer.insertBefore(postElement, mainContainer.querySelector("hr").nextSibling);
    }

    function createPostElement(post){
        const postDiv = document.createElement("div");
        postDiv.className = "post";

        const content = document.createElement("p");
        content.className = "post__content";
        content.textContent = post.text;
        postDiv.appendChild(content);
    

        if (post.image_path) {
            const image = document.createElement("img");
            image.className = "post__image";
            image.src = post.image_path;
            image.alt = "圖片"
            postDiv.appendChild(image);
        }
        
        const hr = document.createElement("hr");
        postDiv.appendChild(hr);

        return postDiv;
    }

    async function loadInitialPosts() {
        try {
            const response = await fetch("/api/board");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const posts = await response.json();
            posts.forEach(post => addNewPost(post));
    } catch (error) {
        console.error("Error:", error)
    }}
    loadInitialPosts()
});


