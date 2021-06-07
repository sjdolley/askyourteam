//Any actions that occur on the /quizzes endpoint.

export function getQuizzes() {
    return fetch('http://localhost:3333/quizzes')
        .then(data => data.json())
}

export function setQuizzes(quiz) {
    return fetch('http://localhost:3333/quizzes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quiz })
    })
    .then(data => data.json())
} //In production applications, you’ll need to add error handling and checking
