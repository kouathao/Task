document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
  var issueSubj = document.getElementById('issueSubjInput').value;
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  var issueDate = document.getElementById('issueDateInput').value;
  var issueId = chance.guid();
  var issueStatus = 'Open';

  var issue = {
    id: issueId,
    subject: issueSubj,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    dueDate: issueDate,
    status: issueStatus
  }

  if (localStorage.getItem('issues') == null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('issueInputForm').reset();

  fetchIssues();

  e.preventDefault();
}

function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Completed';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesListe = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var subject = issues[i].subject;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var dueDate = issues[i].dueDate;
    var status = issues[i].status;

    issuesList.innerHTML +=   '<div class="well col-lg-6">'+
                            //  '<h6>Issue ID: ' + id + '</h6>'
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>Subject: ' + subject + '</h3>'+
                              '<h4>Details: ' + desc + '</h4>'+
                              '<p>Severity: ' + severity + '</p>'+
                              '<p><span class="glyphicon glyphicon-time"></span> Due Date: ' + dueDate + '</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span> Assigned To: ' + assignedTo + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-success">Mark As Done</a> '+
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div>';
  }

}