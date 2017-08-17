function getIssues() {
	let repo = 'javascript-fetch-lab'
	let user = document.getElementById("username").innerHTML

	fetch('https://api.github.com/repos/' + user + '/' + repo + '/issues', {
  	method: 'GET',
  	headers: { 
    Authorization: 'token ' + getToken()
  	}
  	}).then(res => res.json()).then(json => showIssues(json));
}

function showIssues(json) {
	const src = document.getElementById("issues-template").innerHTML
	const template = Handlebars.compile(src)
	const issuesList = template(json)
	document.getElementById("issues").innerHTML = issuesList
}

function createIssue() {
	let repo = 'javascript-fetch-lab'
	let user = document.getElementById("username").innerHTML
	let bodyText = document.getElementById("body").value
	let titleText = document.getElementById("title").value
	let issueText = {title: `${titleText}`, body: `${bodyText}`}

	fetch('https://api.github.com/repos/' + user + '/' + repo + '/issues', {
  	method: 'POST',
  	body: JSON.stringify(issueText),
  	headers: { 
    Authorization: 'token ' + getToken()
  	}
  	}).then(res => getIssues());
}

function showResults(json) {
	const src = document.getElementById("repo-template").innerHTML
	const template = Handlebars.compile(src)
	const repoList = template(json)
	document.getElementById("results").innerHTML = repoList
}

function forkRepo() {
  let usernameDiv = document.getElementById("username")
  const repo = 'learn-co-curriculum/javascript-fetch-lab'
  fetch('https://api.github.com/repos/' + repo + '/forks', {
  method: 'POST',
  headers: {
    Authorization: 'token ' + getToken()
  }
  }).then(res => res.json()).then(json => {showResults(json), usernameDiv.innerHTML = `${json.owner.login}`});

}

function getToken() {
	// de432aac9488c86ff8f60fc0f38ac79a99277e6a
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  // 679cf3e0670e98525a8bccf4224a5105b31c4c34
  return ''
}
