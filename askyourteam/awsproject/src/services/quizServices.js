//Any actions that occur on the /quizzes endpoint.

export function getQuizzes() {
    return fetch('http://localhost:3333/quizzes')
        .then(data => data.json())
}

export function getQuizByName() {
    return fetch('http://localhost:3333/quizzes')
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
