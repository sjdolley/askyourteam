//Any actions that occur on the /quizzes endpoint.
import useToken from '../useToken';


export function getQuizzes() {
    return fetch('http://localhost:3333/quizzes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }, 
    })
    .then(data => data.json())
}

export function getQuizByName(quizName) {
    const url = 'http://localhost:3333/quizContent' + '?quiz-id=' + quizName ;
    return fetch(url, {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
           //auth header
       }})
        .then(data => data.json())
}

export function setQuizzes(newQuiz) { 
    return fetch('http://localhost:3333/quizzes', {
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
