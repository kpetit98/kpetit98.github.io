function creatInc() {
    var urgency = document.querySelector("#omnibus > tbody > tr:nth-child(16) > td:nth-child(2)").innerHTML;
    
    const queryParams = {
        category: "errormessage",
        subcategory: "job_failure",
        // cmdb_ci: "95cc8fec1b1a78d048b7da01dd4bcb66",
        u_machine_name: document.querySelector("#infos > table > tbody > tr:nth-child(3) > td:nth-child(2)").innerHTML,
        impact: "3",
        urgency: (message === "WARNING") ? 4 : 3,
        contact_type: "automation",
        state: "10",
        assignment_group: "284922e213532bc4f9c274c66144b0e6",
        short_description: document.querySelector("#infos > table > tbody > tr:nth-child(1) > td:nth-child(2)").innerHTML.replace(/<\/?b>/g, '')
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
