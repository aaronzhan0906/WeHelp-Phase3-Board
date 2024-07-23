document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".postForm");

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
            console.log(result);
            form.reset();
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    });

    async function loadInitialPosts() {
        try {
            const response = await fetch("/api/board");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const posts = await response.json();
            const mainContainer = document.querySelector(".main");
            posts.forEach(post => {
                const postElement = createPostElement(post);
                mainContainer.insertBefore(postElement, mainContainer.querySelector("hr").nextSibling);
            });
        } catch (error) {
            console.error("Error:", error);
        }
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
            image.alt = "圖片";
            postDiv.appendChild(image);
        }
        
        const hr = document.createElement("hr");
        postDiv.appendChild(hr);

        return postDiv;
    }

    loadInitialPosts();
});