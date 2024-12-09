function creatInc() {
    const rows = document.querySelectorAll("#omnibus tbody tr");
    let targetRow = null;
    let secondCellContent = null;
    
    rows.forEach(row => {
        const firstCell = row.querySelector("td"); 
        if (firstCell && firstCell.textContent.trim().includes("severity")) {
            targetRow = row; 
            
            const secondCell = row.querySelectorAll("td")[1];
            if (secondCell) {
                secondCellContent = secondCell.textContent.trim();
            }
        }
    });

    var urgency = (secondCellContent === "WARNING") ? 4 : 3;
    
    const queryParams = {
        category: "errormessage",
        subcategory: "job_failure",
        // cmdb_ci: "95cc8fec1b1a78d048b7da01dd4bcb66",
        u_machine_name: document.querySelector("#infos > table > tbody > tr:nth-child(3) > td:nth-child(2)").innerHTML,
        impact: "3",
        urgency: urgency,
        priority: Math.ceil((3 + urgency) / 2),
        contact_type: "automation",
        state: "10",
        assignment_group: "284922e213532bc4f9c274c66144b0e6",
        short_description: document.querySelector("#infos > table > tbody > tr:nth-child(1) > td:nth-child(2)").innerHTML.replace(/<\/?b>/g, ''),
        description: document.querySelector("#titre").innerText
    };

    const baseUrl = "https://disney.service-now.com";
    const table = "incident";
    const sys_id = "-1";

    const sysparm_query = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join("^");

    const url = `${baseUrl}/${table}.do?sys_id=${encodeURIComponent(sys_id)}&sysparm_query=${encodeURIComponent(sysparm_query)}`;

    const tbody = document.querySelector("#infos > table > tbody");
    const newRow = document.createElement('tr');
    newRow.className = 'ligne_paire';
    newRow.innerHTML = `
        <td><b>Action</b></td>
        <td>
            <a style="padding: 1px 6px;border: 1px outset buttonborder;border-radius: 3px;color: buttontext;background-color: buttonface;text-decoration: none;" href="${url}" target="_blank">Ouvrir un incident</a>
        </td>
    `;

    tbody.appendChild(newRow);
}

creatInc();
