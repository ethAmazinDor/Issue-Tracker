document.getElementById('issueInputForm').addEventListener('submit', saveIssue)



function saveIssue(event) {
    //getting the value out of the input in our form
    let issueDesc = document.getElementById('issueDescInput').value
    let issueSeverity = document.getElementById('issueSeverityInput').value
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value
    let issueId = chance.guid()
    let issueStatus = 'Open'


    //created an issue object 
    let issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    //insert the object into local storage
    if (localStorage.getItem('issues') == null) {
        let issues = []
        issues.push(issue)
        localStorage.setItem('issues', JSON.stringify(issues)) // JSON takes our array and generates a JSON object that is the value we are storing into the issues object in local storage
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'))
        issues.push(issue)
        localStorage.setItem('issues', JSON.stringify(issues))
    }

    document.getElementById('issueInputForm').reset()

    fetchIssues()

    event.preventDefault()

}

//sets the status of the issue to close
function setStatusClosed(id) {
    let issues = JSON.parse(localStorage.getItem('issues'))

    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = 'Closed'
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues))

    fetchIssues()
}

//deletes the item in the array

function deleteIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues'))

    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1)
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues))

    fetchIssues()
}

function fetchIssues() {
    //retrieveing data from local storage 
    let issues = JSON.parse(localStorage.getItem('issues'))
    let issuesList = document.getElementById('issueList')

    issuesList.innerHTML = ''

    for (let i = 0; i < issues.length; i++) {
        let id = issues[i].id
        let desc = issues[i].description
        let severity = issues[i].severity
        let assignedTo = issues[i].assignedTo
        let status = issues[i].status

        issuesList.innerHTML += '<div class="well">' +
            `<h6>Issue ID:  ${id}  </h6>` +
            '<p><span class="label label-info">' + status + '</span></p>' +
            '<h3>' + desc + '</h3>' +
            `<p><span class="glyphicon glyphicon-time"></span>  ${severity}  </p>` +
            '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
            '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn btn-warning"> Close </a>' +
            '<a href="#" onclick= "deleteIssue(\'' + id + '\')" class="btn btn-danger"> Delete </a>' +
            '</div>'




    }

}