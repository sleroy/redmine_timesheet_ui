var unirest = require('unirest');
var token = '';
var serverURL = 'https://ksf.metrixware.local/redmine';
//var serverURL = 'http://scm.tocea.com:90/redmine';
 
var commonHeaders = {
    'Content-type' : 'application/xml',
    'X-Redmine-API-Key' : token
};


 
exports.redmine_getStatus= function() {
    var result = {
        'closed' : [],
        'opened' : []
    };
    
    var request = unirest.get({
        type : 'GET',
        crossDomain : true,
        url : serverURL.concat("/issue_statuses.json?key=", token),
        dataType : 'jsonp',
        headers : commonHeaders,
        async : false, // Not ASYNC : Important
        success : function(data) {
            for (var i = 0; i < data.issue_statuses.length; ++i) {
                var status = data.issue_statuses[i];
 
                if (status.is_closed) {
                    result.closed.push(status.id);
                } else {
                    result.opened.push(status.id);
                }
            }
        },
        fail : function(jqXHR, textStatus) {
            alert("Request failed: " + textStatus + "/" + jqXHR);
        }
    });
    return result;
}
 
exports.redmine_getProjects = function(action) {
    
    var request = unirest
        .get(serverURL.concat("/projects.json?limit=8000"))
        .headers(commonHeaders)
        .type("json")
        .send()
        .end(function (response) {
            console.log(response);
            action(response);
    });
    return request;
}
 
exports.redmine_getProject = function(projectID, action) {
    var projectTable = [];
    var request = $.ajax({
        type : 'GET',
        crossDomain : true,
        url : serverURL.concat('/projects/' + projectID + '.json'),
        dataType : 'jsonp',
        headers : commonHeaders,
        success : action,
        fail : function(jqXHR, textStatus) {
            alert("Request failed: " + textStatus + "/" + jqXHR);
        }
    });
    return request;
}
 
exports.redmine_getIssues = function(projectID, action) {
    var request = $.ajax({
        type : 'GET',
        crossDomain : true,
        url : serverURL.concat("/issues.json").concat("?project_id=").concat(
                projectID).concat("&status_id=*&limit=99999"),
        dataType : 'jsonp',
        headers : commonHeaders,
        success : action,
        fail : function(jqXHR, textStatus) {
            alert("Request failed: " + textStatus + "/" + jqXHR);
        }
    });
    return request;
}
 
exports.redmine_getIssueJournal = function(issueID, action) {
    var request = $
            .ajax({
                type : 'GET',
                crossDomain : true,
                url : serverURL.concat("/issues/" + issueID
                        + ".json?include=journals"),
                dataType : 'jsonp',
                headers : commonHeaders,
                success : action,
                fail : function(jqXHR, textStatus) {
                    alert("Request failed: " + textStatus + "/" + jqXHR);
                }
            });
    return request;
}



