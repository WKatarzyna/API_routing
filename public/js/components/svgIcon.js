class TaskIcon {
    constructor(params, parentNode) {
        this.qCreate(params, parentNode);
    }
    qCreate(params, parentNode) {
        let svgPanel = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgPanel.id = params.id;
        svgPanel.setAttribute("viewBox","0 0 1000 1000")
        parentNode.appendChild(svgPanel);
        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.id = "path1";
        path1.setAttribute("d", "M694.4,201.1L215.1,680.4c-27.8,27.8-27.8,72.8,0,100.5c27.7,27.8,72.8,27.8,100.5,0l479.3-479.3L694.4,201.1z M666.9,173.7l-53.3-53.3c-1.5,1.1-2.9,2.1-4.3,3.5L130,603.1c-14.9,14.9-14.9,39.2,0,54.1c14.9,14.9,39.2,14.9,54.1,0l479.3-479.3C664.8,176.6,665.8,175.1,666.9,173.7z M821.3,328c-1.5,1.1-2.9,2.1-4.3,3.5L337.8,810.8c-14.9,14.9-14.9,39.2,0,54.1c14.9,14.9,39.2,14.9,54.1,0l479.3-479.3c1.3-1.3,2.4-2.8,3.5-4.2L821.3,328z");
        svgPanel.appendChild(path1);
        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.id = "path2";
        path2.setAttribute("d", "M283.3,850.6c-153.1,0-131.2-131.2-131.2-131.2c-65.6,0-76.5-43.7-76.5-43.7L10,992.7l328-76.5C276.8,903,283.3,850.6,283.3,850.6z");
        svgPanel.appendChild(path2);
    }
}

