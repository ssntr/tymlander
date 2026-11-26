const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

function openLightbox(imagePath) {
    lightboxImage.src = imagePath;
    lightbox.classList.add("active");
}

function closeLightbox() {
    lightbox.classList.remove("active");
    lightboxImage.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);

// Close when clicking outside the image
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Close with Escape
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeLightbox();
    }
});

async function loadProjects() {
    try {
        // Fetch project data
        const response = await fetch("data/projects.json");

        if (!response.ok) {
            throw new Error("Failed to load projects.json");
        }

        const projects = await response.json();

        const container = document.getElementById("projects-container");

        if (!container) {
            throw new Error("Project container not found!");
        }

        // Create an element for each project
        projects.forEach(project => {

            // Main container
            const projectElement = document.createElement("div");
            projectElement.classList.add("project");

            // LEFT SIDE: Title and image
            const left = document.createElement("div");
            left.classList.add("left");

            const title = document.createElement("h4");
            title.textContent = project.title;
            left.appendChild(title);

            // Main thumbnail
            const image = document.createElement("img");
            image.src = project.image;
            image.alt = project.alt || project.title;

            left.appendChild(image);

            // Media gallery
            const gallery = document.createElement("div");
            gallery.classList.add("project-gallery");

            
            // YouTube video
            if (project.youtube) {
                const videoId = project.youtube.includes("youtu.be/")
                    ? project.youtube.split("youtu.be/")[1].split("?")[0]
                    : new URL(project.youtube).searchParams.get("v");

                const videoWrapper = document.createElement("div");
                videoWrapper.classList.add("gallery-video");

                if (project.videoSize === "large") {
                    videoWrapper.classList.add("large");
                }

                const video = document.createElement("iframe");
                video.src = `https://www.youtube.com/embed/${videoId}`;
                video.title = `${project.title} Trailer`;
                video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                video.allowFullscreen = true;

                videoWrapper.appendChild(video);
                gallery.appendChild(videoWrapper);
            }

            // Screenshots
            project.screenshots?.forEach(path => {
                const link = document.createElement("a");
                link.href = "#";
                link.classList.add("screenshot-link");

                link.addEventListener("click", event => {
                    event.preventDefault();
                    openLightbox(path);
                });

                const screenshot = document.createElement("img");
                screenshot.src = path;
                screenshot.alt = `${project.title} screenshot`;

                link.appendChild(screenshot);
                gallery.appendChild(link);
            });

            left.appendChild(gallery);

            // RIGHT SIDE: Description and links
            const right = document.createElement("div");
            right.classList.add("right");

            // Reserved space for future metadata
            const metadata = document.createElement("div");
            metadata.classList.add("project-metadata");

            right.appendChild(metadata);

            // Description
            const description = document.createElement("div");
            description.classList.add("project-description");

            project.description.forEach(text => {
                const paragraph = document.createElement("p");
                paragraph.textContent = text;
                description.appendChild(paragraph);
            });

            right.appendChild(description);

            // Itch.io link
            if (project.itch) {
                const paragraph = document.createElement("p");
                const link = document.createElement("a");

                link.href = project.itch;
                link.textContent = "Playable on itch.io!";
                link.target = "_blank";
                link.rel = "noopener noreferrer";

                paragraph.appendChild(link);
                right.appendChild(paragraph);
            }

            // Assemble project
            projectElement.append(left, right);
            container.appendChild(projectElement);
        });

    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

loadProjects();