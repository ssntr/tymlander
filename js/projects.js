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

            const title = document.createElement("p");
            const strong = document.createElement("strong");

            strong.textContent = project.title;
            title.appendChild(strong);

            const image = document.createElement("img");
            image.src = project.image;
            image.alt = project.alt || project.title;

            left.append(title, image);

            // RIGHT SIDE: Description and links
            const right = document.createElement("div");
            right.classList.add("right");

            // Description paragraphs
            project.description.forEach(text => {
                const paragraph = document.createElement("p");
                paragraph.textContent = text;
                right.appendChild(paragraph);
            });

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