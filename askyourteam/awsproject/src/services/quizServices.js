import useToken from '../useToken';

//Any actions that occur on the /quizzes endpoint.
export function getUserEmail(useToken) {
    return fetch('/dev/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }, body: useToken
    })
    .then(data => data.json())
}

export function getQuizzes(userEmail) {
    return fetch('/dev/getAllQuizByEmail', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }, body: userEmail
    })
    .then(data => data.json())
}

export function getQuizByName() {
    return fetch('/dev/getQuizByName')
        .then(data => data.json())
}

export function setQuizzes(newQuiz) { 
    return fetch('/dev/createQuiz', {
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
