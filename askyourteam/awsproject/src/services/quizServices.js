//Any actions that occur on the /quizzes endpoint.
export function getQuizzes() {
    //const url = 'https://bzj0anqy3l.execute-api.us-east-1.amazonaws.com/dev/getAllQuizByEmail' + '?' + qs.stringify({ email: 'example@gmail.com' });
    const url = 'https://bzj0anqy3l.execute-api.us-east-1.amazonaws.com/dev/getAllQuizByEmail' + '?email=example@gmail.com';
    return fetch(url , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ sessionStorage.getItem('token')
        }
    })
    .then(data => data.json())
}

export function getQuizByName() {
    return fetch('https://bzj0anqy3l.execute-api.us-east-1.amazonaws.com/dev/getQuizByName' )
        .then(data => data.json())
}

export function setQuizzes(newQuiz) { 
    return fetch('https://bzj0anqy3l.execute-api.us-east-1.amazonaws.com/dev/createQuiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({  
            "title": newQuiz,
            "status": "Draft"
        })
    })
    .then(data => data.json())
} 
